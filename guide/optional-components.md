# Optional components

opa-stack looks for some components when it starts, if it can find them, it includes them and makes them available for plugins.

Configuration is done using the `OPTIONAL_COMPONENTS` key in the configuration. Please find it, on [github](https://github.com/opa-stack/opa-stack/blob/master/api/data/opa/default-settings.yaml), or view the file here..

::: details docker-compose.yaml
<<< @/opa-stack/api/data/opa/default-settings.yaml
:::

## Redis

There are two different redis-libs available if redis is connected.

### [Aioredis](https://aioredis.readthedocs.io/)

* Async redis library

```py
from opa.utils.redis import get_aioredis
...
```

### [Walrus](https://walrus.readthedocs.io)

* Very powerful redis library with support for a lot of additional features

```py
from opa.utils.redis import get_walrus
...
```

## Mongodb

```py
from opa.db.mongodb import AsyncIOMotorClient, AsyncIOMotorDatabase, get_database
```