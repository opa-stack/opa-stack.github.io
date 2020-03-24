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

When you want to use an optional-component, use FastAPI and it `Depends` to get the component instance.

```py
from fastapi import APIRouter, Depends
from opa.core.plugin import get_component
from opa.plugins.driver_redis import Walrus

router = APIRouter()

@router.get("/")
def counter_sync(walrus: Walrus = Depends(get_component('walrus'))):
    counter = walrus.instance.incr('counter')
    return f'Counter is {counter}'
```

Notice that:
* `get_component()` takes the lowercase component key-name as input
* Driver should include types if possible, but you don't need that.. (ie, `walrus = Depends(get...)` would work as well..)
* The driver's instance is under `walrus.instance`, not directly as `walrus`
* The driver can also provide utility functions or other functions; (fictional example: `walrus.utils.backup(to='...')`)

## Drivers

| Backend | Library        | Drivername         | Async |
| -- | --------------- | ---------------- | -------- |
| Redis | [Aioredis](https://aioredis.readthedocs.io/) | [redis-aioredis](#aioredis)  | yes |
| Redis | [Walrus](https://walrus.readthedocs.io) | [redis-walrus](#walrus) | no |
| Mongodb | [Motor](https://motor.readthedocs.io/en/stable/) | [mongodb-async-motor](#motor) | yes |


### Redis

#### Aioredis

#### Walrus

* Very powerful redis library with support for a lot of additional features

### Mongodb

#### Motor
