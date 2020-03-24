---
sidebarDepth: 3
---

# Plugins

What we call `plugins` are what is used to use opa-stack.

Plugins are just python packages or modules available to opa-stack. See [general info](./api/plugin-system) about the plugin-system to see how it works.

::: warning
Make sure the name of your plugin is unique, since we are using the pythons import system when importing it.
Example.. Don't call your plugin `redis.py` and expect it to work... :) You will probably get some errors down the line.
:::

## Types of plugins

### Importables

Every `PLUGIN_PATHS` are loaded into pythons `sys.path` and imported. Therefor, you can also have plugins that exposes functionality to other plugins.

So, if you got

* `/plugins/common/math_utils.py` with a function `double()`
* `/plugins/secure/grade_calculations.py` that adds a route. It can use `from math_utils import double` without problems

### Optional components

#### Configuration

A driver is a reference to another thing, example redis or mongodb. It is something you can use throwout your other plugins.
The default configuration loads a couple of drivers if it can find the component (example a hostname of `redis` avalable).

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
* It will use the `redis-walrus`
* Give you an instance of it named `myredis` available in your plugins
* Load if the hostname `some-external-redis` answers
* Merge with the other optional-components already defined (`dynaconf_merge`)

#### Using

To use an optional-component (lets say the one defined above), load it as a dependency in your route, like

```
@router.get("/counter")
def counter_sync(myredis=Depends(get_component('myredis'))):
    counter = myredis.instance.incr('counter')
    return f'Counter is {counter}'
```

Note that `myredis` is the component itself, not just the instance. There might be other functions available, like utility-functions.

Take a look at the [optional-components reference](./optional-components-reference) for a list of all builtin drivers/optional-components

#### Adding a driver

You can add a driver using a plugin. For probably the best example, see the [driver-redis](https://github.com/opa-stack/opa-stack/blob/master/api/data/opa/plugins/driver_redis.py) plugin at github (or below). It have additional comments.

::: details driver_redis.py
<<< @/opa-stack/api/data/opa/plugins/driver_redis.py
:::

In driver_redis you will see that we use `register_driver` inside `Plugin.startup` to simply register it using a name (name is used in the configuration, to choose the correct driver).

The `connect` and `disconnect` functions also supports both normal functions, or async functions if you have an async lib you want to support.

### Hooks

Hooks are used if you want to replace or provide a custom function for different code.
Example, let say you have a plugin, but want for a part of the plugin to be dynamic.

You can then create a place in your code where the hook should run.

[Example](https://github.com/opa-stack/opa-stack/tree/master/examples/docker-compose/hooks)

The job of the helloer is to give expose a "hello" in different languages..

::: details helloer.py
<<< @/opa-stack/examples/docker-compose/hooks/plugins/helloer.py
:::

Then in the plugin where you want this used, you can register and use the hooks..

::: details hello_no.py
<<< @/opa-stack/examples/docker-compose/hooks/plugins/hello_no.py
:::

Now, this was a really simple example. But it can be used for many things
* A hierarcy of internal plugins, where you define some of their behavior dynamicly using a simple environment variable to choose an env
* Provide additional info if running in dev-env
* Provide a solid base, for others to built small custom plugins on

In general, hooks*
* Must be registered for usage using `hooks` in your `Plugin`
* Can have settings
  * `require`: Make your app crash before it starts if hook are not handled
* Can only be registered and used one time
* Can only be registered as a hook one time

### API's and routes

If you want to add a route accessible via an api, you must use `Plugin.setup` and the `app`-instance available in it.
An example is always best, so take a look at [timekeeper example](https://github.com/opa-stack/opa-stack/blob/master/examples/docker-compose/timekeeper/plugins/timekeeper.py) for a nice little example.

::: details timekeeper.py
<<< @/opa-stack/examples/docker-compose/timekeeper/plugins/timekeeper.py
:::

::: warning
Notice that in `Plugin`, there are 2 different functions called when it initializes.

* `setup()`
  * With an optional `app` - Which is the FastAPI's app instance

* `startup()`
  * With optional `register_driver`, or `register_hook` - Which are register functions for adding drivers and hooks
:::

Example...

```py
class Plugin(BasePlugin):
    def setup(self, app):
        app.include_router(router)

    def startup(self, register_driver, register_hook):
        register_driver('my-driver', MyDriver)
        register_hook('my-hook', get_hookdata)

```

### Config

### Metadata

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
