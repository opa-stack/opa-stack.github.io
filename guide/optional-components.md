# Optional components

opa-stack looks for some components when it starts, if it can find them, it includes them and makes them available for plugins.

::: danger
Most of the items below are just for future references, they are NOT implemented yet...
:::

## Cache (redis)

Very often, you need a cache available.

```py
from opa.extra import redis

redis.RedisClient
redis.get
```

## Non-relational db (mongodb)

```py
from opa.db.mongodb import AsyncIOMotorClient, AsyncIOMotorDatabase, get_database
```