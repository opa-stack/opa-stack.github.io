# Optional-components reference

If you havent read it, you should read about [plugins](./plugins) first

## Configuration

::: tip
You must use dynaconf merge when changing these parameters.. Example

```yaml
myenv:
  OPTIONAL_COMPONENTS:
    dynaconf_merge: true
    WALRUS:
      LOAD: "auto"
      DRIVER: "redis-walrus"
      OPTS:
        URL: "redis://redis"
```
:::

Take a look at the default configuration [here](https://github.com/opa-stack/opa-stack/blob/master/api/data/opa/default-settings.yaml) or see the file below (it is under the `OPTIONAL_COMPONENTS` key) for some examples.

::: details default-settings.yaml
<<< @/opa-stack/api/data/opa/default-settings.yaml
:::

## Usage

When you want to use an optional-component you the best way is to use `opa.get_instance(name)` like this

```py
from opa import get_instance, get_router
from opa.plugins.driver_redis import Walrus

router = get_router()

@router.get("/")
def counter_sync():
    walrus = get_intance('walrus')
    counter = walrus.incr('counter')
    return f'Counter is {counter}'
```

::: warning
`opa.get_instance()` takes the lowercase component key-name as input
:::

The other ways to get the instance (might be usefull in some cases)

* Use `component = opa.get_component(name)`
  * The instance will be under `component.instance`, but there are other component-info you might want under `component`
* Use `pm = opa.get_plugin_manager()`, then `pm.optional_components[name]` to get the component instance

## Drivers

| Backend | Library        | Drivername         | Async |
| -- | --------------- | ---------------- | -------- |
| Redis | [Aioredis](https://aioredis.readthedocs.io/) | [redis-aioredis](#aioredis)  | yes |
| Redis | [Walrus](https://walrus.readthedocs.io) | [redis-walrus](#walrus) | no |
| Mongodb | [Motor](https://motor.readthedocs.io/en/stable/) | [mongodb-async-motor](#motor) | yes |
| Celery | [Celery](http://www.celeryproject.org/) | [celery](#celery) | no |

### Redis

#### Aioredis

#### Walrus

* Very powerful redis library with support for a lot of additional features

### Mongodb

#### Motor

### Celery / tasks

If you need basic background tasks, look into [FastAPI/Starlette BackgroundTasks](https://fastapi.tiangolo.com/tutorial/background-tasks/) instead.

There is builtin support for running celery tasks, see the [sample-project](https://github.com/opa-stack/opa-stack/tree/master/examples/docker-compose/celery-task) for details, view info about the sample project [here](./examples.html#celery-task)

The opa-stack's api-container can run in `worker mode`, ie, it will run a celery worker with the same codebase as the rest of the api. This is by far the simplest setup, but feel free to run your own workers if you need.
* Set environment-variable `MODE=worker` to start it as a worker
* Set additional celery params (`celery worker -A opa.main ${CELERY_PARAMS}`) 

Some important notes about using celery in opa-stack is:
* The tasks must be defined in `tasks.py`, ie, you will need your plugin to be a python package (folder with `__init__.py`).
* You can access optional-components as usual in the tasks, but only non-async drivers are working. Ie, you can't use drivers like `motor` or `aioredis` in your tasks.
* The celery worker is using most of the opa-stack code. So configuration, driver-loading, hooks and so on will also work in the celery worker.