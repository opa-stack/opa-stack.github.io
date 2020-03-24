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

Take a look at the default configuration [here](https://github.com/opa-stack/opa-stack/blob/master/api/data/opa/default-settings.yaml) or see the file below..

::: details default-settings.yaml
<<< @/opa-stack/api/data/opa/default-settings.yaml
:::

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
