---
sidebarDepth: 3
---

# Plugins

A `plugin` is how you make things using opa-stack.
They are just python packages or modules available to opa-stack. See [general info](./api/plugin-system) about the plugin-system to see how it works.

## Types of plugins

Different types of plugins are initialized in different order. Example, all hooks are initialized before drivers are initialized. Drivers are done when setup is run.

### Importables

Every `PLUGIN_PATHS` are loaded into pythons `sys.path` and imported. Therefor, you can also have plugins that exposes functionality to other plugins.

So, if you got

* `/plugins/common/math_utils.py` with a function `double()`
* `/plugins/secure/grade_calculations.py` that adds a route. It can use `from math_utils import double` without problems

### Hook Definition

Hooks need to be defined before you can use them, so for this, you need a hook-definition.

A simple example looks like

```py
from opa.core.plugin import HookDefinition

class name_hook(HookDefinition):
    required = True
    is_async = False
    name = 'fullname'
```

Parameters:
* required (default: False): Set to True if you don't want the application to be able to start unless there is a hook for this definition.
* is_async (default: False): Set to True if the hook should be an async function.
* name (default: function-name): Override the function-name as the name of the hook.

### Hook

Hooks are used if you want to replace or provide a custom function for a part of your code.

Example, think of a tiny generic app like this:

```py
from fastapi import Depends, APIRouter
from opa.core.plugin import (
    get_plugin_manager,
    PluginManager,
    Hook,
    Setup,
)

router = APIRouter()


@router.get("/get-fullname/{firstname}/{surname}")
def show_name(
    firstname: str, surname: str, pm: PluginManager = Depends(get_plugin_manager)
):
    fullname = pm.call('fullname', firstname, surname)
    return {'name': fullname}


class MyApp(Setup):
    def __init__(self, app):
        app.include_router(router)

```

It calculates `fullname` based on whatever the hook called `fullname` returns.
The `fullname` is already defined above in `HookDefinition`, so now lets define the function itself in a completly different plugin.

```py
from opa.core.plugin import Hook

class fullname_hook(Hook):
    name = 'fullname'
    order = 1

    def run(self, firstname, lastname):
        return f'{firstname} {lastname}'
```

Some key takeaways:
* If the hook-definition's `is_async` is True, you will get an error if the run function is not async (`async def run(...)`)
* `pm.call` is for sync, but you also have `pm.call_async` for async
* Whatever arguments that the call-functions gets are what the run functions will get.
* If there are multiple hooks for a single definition, the one with the highest `order` wins (default order is 0).
* The `HookDefinition`, the route that calls `pm.call..` are usually together in the same plugin. The hooks are normally separate plugins.
* A typical usecase is to also define a `Hook` with default order of `-1` togehter with the `HookDefinition`, that way, your pm.call will have a default hook
* There can only be 1 hook definition per `name` or you will get an error.

[Complete example](https://github.com/opa-stack/opa-stack/tree/master/examples/docker-compose/hooks)

Now, this was a really simple example. But it can be used for many things
* Language or environment specific code (load different hook-plugins based on tags)
* A hierarcy of internal plugins, where you define some of their behavior dynamicly using a simple environment variable to choose an env
* Provide additional info if running in dev-env
* Provide a solid base, for others to built small custom plugins on


### Drivers / Optional-components

More than often, you will need a database, cache backend (redis) or another 3rd party component.
You can use one of the [built-in drivers](./optional-components-reference), or you can make your own very easiely.

#### Configuration

The default configuration loads a couple of drivers if it can find the component. That means that, if opa-stack think redis is available, it will try to connect to it. The redis drivers just uses a simple host-lookup for this check (check if `redis` avalable).

All drivers are configured under the `OPTIONAL_COMPONENTS` in the configuration. The default configuration is [here](https://github.com/opa-stack/opa-stack/blob/master/api/data/opa/default-settings.yaml), or see below.

::: details docker-compose.yaml
<<< @/opa-stack/api/data/opa/default-settings.yaml
:::

##### Simple example

```yaml
myenv:
  OPTIONAL_COMPONENTS:
    dynaconf_merge: true
    MYREDIS:
      LOAD: "auto"
      DRIVER: "redis-walrus"
      OPTS:
        URL: "redis://some-external-redis"
```

In the example above:
* It will use the `redis-walrus` driver
* Give you an instance of it named `myredis` available in your plugins
* Load if the hostname `some-external-redis` answers
* Merge with the other optional-components already defined (`dynaconf_merge`)

#### Using

To use an optional-component (lets say the one defined above), load it as a dependency in your route, like

```py
@router.get("/counter")
def counter_sync(myredis=Depends(get_component('myredis'))):
    counter = myredis.instance.incr('counter')
    return f'Counter is {counter}'
```

Note that `myredis` is the component itself, not just the instance. There might be other functions available, like utility-functions.

Take a look at the [optional-components reference](./optional-components-reference) for a list of all builtin drivers/optional-components

#### Adding a driver

You can add a driver using a plugin. For probably the best example, see the [driver-redis](https://github.com/opa-stack/opa-stack/blob/master/api/data/opa/plugins/driver_redis.py) plugin at github (or below).

::: details driver_redis.py
<<< @/opa-stack/api/data/opa/plugins/driver_redis.py
:::

In driver_redis you will see that a driver is just a class inherited from `opa.core.plugin.Driver`:
* `pm` is the plugin-manager instance, that is available as `self.pm` inside the driver-instance
* `connect(self, opts)`
  * Can by `async` or `sync`.
  * Is run when we load the application.
  * `opts` is the opts configured, example `opts.URL`
  * Is responsible for setting `self.instance`.
* `validate(self)`:
  * Needs to be async if connect is async
  * Will run only if the `LOAD` config is `yes` (ie, must be connected)
  * Should raise an exception of any kind if it is not able to validate the connection.
* `disconnect(self)`: Not implemented yet
* `get_instance(self)`: Normally it just returns `self.instance`, but if you want, you can override it

::: tip
If you want some logic in your driver, you can use `hooks`, just use `self.pm.call` or `self.pm.call_async` as described above.
:::

### API's and routes

If you want to add a route accessible via an api, you must use make a class that inherits from `opa.core.plugin.Setup`. It is initialized at the right time, so you can put your logic in `__init__`.
An example is always best, so take a look at [timekeeper example](https://github.com/opa-stack/opa-stack/blob/master/examples/docker-compose/timekeeper/plugins/timekeeper.py) for a nice little example.

::: details timekeeper.py
<<< @/opa-stack/examples/docker-compose/timekeeper/plugins/timekeeper.py
:::

When the init-function is called, you will get access to some objects, if you define them as attributes, example, `def __init__(self, app)` will make the FastAPI `app` available.

* `app`: The FastAPI app
* `pm`: Plugin-manager instance


## Metadata

A plugin can have metadata attached to it in form of a `json` file.
* If it's a flat `.py` file. Create a file with `-meta.json`
  * Exammple on `my_utils.py` you will have `my_utils-meta.json`
* If it is a python package, make `/meta.json` in the same folder as the package.

Currently, you can only define tags as metadata, which can be used for filtering (`PLUGIN_WHITELIST_TAGS` and `PLUGIN_BLACKLIST_TAGS`) which plugins to load.

Example

```json
{
  "tags": ["utils", "admin"]
}
```

## Examples

* [demo-plugins](https://github.com/opa-stack/opa-stack/tree/master/api/data/opa/demo-plugins)
* [core-plugins](https://github.com/opa-stack/opa-stack/tree/master/api/data/opa/plugins)
* [examples](https://github.com/opa-stack/opa-stack/tree/master/examples)
