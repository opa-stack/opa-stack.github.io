# Examples

::: tip
Read [this](./new-project) first if you need a new project
:::

Note that on all the examples, you will also get these url's

* http://127.0.0.1:8001/docs - Swagger documentation
* http://127.0.0.1:8001/redoc - Redoc documentation
* http://127.0.0.1:8001/openapi.json - OpenAPI schema

::: tip
The [FastAPI](https://fastapi.tiangolo.com/) have already made an extremely usefull documentation that you should consider reading as well.
Because it exists, this doc won't be about deep things you can do with FastAPI
:::

## Hello world

The first example is a simple docker-compose setup where you will

* Setup
  * Uses docker-compose
  * Use only the api container
  * Expose output from a simple command on `/hello`
  * Mount the plugins from a local plugin-folder.

  * Things to try
    * http://127.0.0.1:8001/hello - The output of the route in `hello.py`

### Files

* Files at github: [https://github.com/opa-stack/opa-stack/tree/master/examples/docker-compose/hello-world](https://github.com/opa-stack/opa-stack/tree/master/examples/docker-compose/hello-world)

::: details docker-compose.yaml
<<< @/opa-stack/examples/docker-compose/hello-world/docker-compose.yaml
:::

::: details plugins/hello.py
<<< @/opa-stack/examples/docker-compose/hello-world/plugins/hello.py
:::

## Timekeeper

This example is still simple, but shows you how to do a little bit more, including a better development environment.

* Setup
  * Uses docker-compose
  * Using only the api container
  * Expose output on `/time` that also accept some parameters
  * Expose output on `/month/{month}` that converts a number (1-12) to month-name. Crashes if it is not able to...
  * Expose output on `/sleep-async/{seconds}` that sleeps.. This is an async function
  * Expose output on `/sleep-sync/{seconds}` that sleeps.. This is not an async function..
  * Mount the plugins from a local plugin-folder, watches them for changes.
  * Sets the environment to `DEV` (see [docs](api/configuration.html#dev) for more info)
    * In addition to other things, enabling `DEV` gives some neat developing features.. Check [here](development.html#development-mode-env-dev) for more info how to leverage them

* Things to try
  * http://127.0.0.1:8001/time - Should show you the time in the default format
  * http://127.0.0.1:8001/docs#/timekeeper/get_time_time_get > Try it out > change format > Execute
  * http://127.0.0.1:8001/month/2
  * http://127.0.0.1:8001/month/20
    * See the better-exception (with variable output) in the console.
    * Try setting up vscode [debugging](development.html#PTVSD) and set a breakpoint and so on..
  * Hammer on http://127.0.0.1:8001/sleep-async/10 and http://127.0.0.1:8001/sleep-sync/20 on multiple terminals.. See how async is the king when it comes to things that blocks.
  * Or use something like [hey](https://github.com/rakyll/hey), for better benchmarking.
    * hey -n 100 -c 100 http://127.0.0.1:8001/sleep-async/5
    * hey -n 100 -c 100 http://127.0.0.1:8001/sleep-sync/5

### Files

* Files at github: [https://github.com/opa-stack/opa-stack/tree/master/examples/docker-compose/timekeeper](https://github.com/opa-stack/opa-stack/tree/master/examples/docker-compose/timekeeper)

::: details docker-compose.yaml
<<< @/opa-stack/examples/docker-compose/timekeeper/docker-compose.yaml
:::

::: details plugins/timekeeper.py
<<< @/opa-stack/examples/docker-compose/timekeeper/plugins/timekeeper.py
:::

## Redis

Example using redis (both async and normal), using two different libs (aioredis and walrus), see [dependencies](./optional-components-reference.html#redis) for more info.

* Setup
  * Uses docker-compose
  * Using the api container, and a redis-container
  * Expose output on `/counter-async` increments when you visit using aioredis
  * Expose output on `/counter-sync` increments when you visit using walrus
  * Expose output to GET and POST on `/bloom`, one to add entries to a bloom-filter (using walrus) and one to check. Walrus have a ton of neat feature, this is one of them.

* Things to try
  * http://127.0.0.1:8001/counter-async - See a counter
  * `cat a_file.md | curl -X POST -d @- "http://localhost:8000/bloom"` - fill up a bloom filter
  * http://localhost:8000/bloom?string=sleep - Check for `sleep` in the bloomfilter

### Files

* Files at github: [https://github.com/opa-stack/opa-stack/tree/master/examples/docker-compose/redis](https://github.com/opa-stack/opa-stack/tree/master/examples/docker-compose/redis)

::: details docker-compose.yaml
<<< @/opa-stack/examples/docker-compose/redis/docker-compose.yaml
:::

::: details plugins/timekeeper.py
<<< @/opa-stack/examples/docker-compose/redis/plugins/redisfun.py
:::

## Background tasks

Background tasks are built into FastAPI/Starlette. If you come from the sync-world, you are probably used to Celery.
Celery complicates a lot, so if you just got a simple fire-and-forget job. A background-task might fit your needs.

See [below](#celery-task) for info about running a celery task.

* Setup
  * Uses docker-compose
  * Using the api container
  * Uses redis for locking and keeping track of a string (not needed for running tasks where you don't care about results)
  * Runs background tasks using [FastAPI](https://fastapi.tiangolo.com/tutorial/background-tasks/)'s [starlette background tasks](https://www.starlette.io/background/)
  * Let you POST to `/runone` to put a task to the queue, it runs for 4 seconds
  * Expose output on `/runone` to see status of which task is currently running

* Things to try
  * Terminal 1 - Status
    * `while true; do curl http://localhost:8001/runone; echo; sleep 1; done`
  * Terminal 2 - Trigger new tasks, try triggering many, see they queue up on terminal 1
    * curl -X POST http://localhost:8001/runone

### Files

* Files at github: [https://github.com/opa-stack/opa-stack/tree/master/examples/docker-compose/background-task](https://github.com/opa-stack/opa-stack/tree/master/examples/docker-compose/background-task)

::: details docker-compose.yaml
<<< @/opa-stack/examples/docker-compose/background-task/docker-compose.yaml
:::

::: details plugins/tasks.py
<<< @/opa-stack/examples/docker-compose/background-task/plugins/tasks.py
:::

## Celery task

[Celery](http://www.celeryproject.org/) is a very powerfull distributed task-queue. It is much more feature-rich than the default background tasks available in FastAPI/Starlette.

* Setup
  * Uses docker-compose
  * Same container image, but different config for
    * api container
    * worker-math - Runs celery and consumes the `math` queue
    * worker-counter - Runs celery and consumes the `counter` queue
  * Redis for storing task-results
  * Rabbitmq for keeping track of tasks (broker)
  * Flower to see statuses

* Things to try
  * http://localhost:8001/inc/5 - Hit the url a couple of times
    * They will queue up. At the end of each task, the celery worker (in the `worker-counter` container) will increment a counter
    * The same counter is reported as output when accessing this url, since the api can access the same redis instance as the worker
  * http://localhost:8001/div/A/B - Hit the other worker (`worker-math`)
    * http://localhost:8001/div/2/1 - normal queuing
    * http://localhost:8001/div/2/0 - one that will get an error
  * See tasks as they arrive
    * Using celery events (doesnt mather which)
      * docker-compose exec -w /data worker-counter celery -A opa.main events
      * docker-compose exec -w /data worker-math celery -A opa.main events
    * Using flower
      * http://localhost:5555/
  * http://localhost:8001/inc/100 - Queue a task which takes 100 seconds
    * Take a note of the task_id in the output
  * http://localhost:8001/status/27deec1a-c8f0-4d0d-95dc-59c6dd937207 - Check status for task
    * The inc task updates some meta-info that we can query using another endpoint
    * There are also a background task that will get those updates in the fastapi context, see the `__init__.py` file for info
  * http://localhost:8001/last_status - Another way to get the status


* Files at github: [https://github.com/opa-stack/opa-stack/tree/master/examples/docker-compose/celery-task](https://github.com/opa-stack/opa-stack/tree/master/examples/docker-compose/celery-task)

::: details docker-compose.yaml
<<< @/opa-stack/examples/docker-compose/celery-task/docker-compose.yaml
:::

::: details plugins/celerydemo/__init__.py
<<< @/opa-stack/examples/docker-compose/celery-task/plugins/celerydemo/__init__.py
:::

::: details plugins/celerydemo/tasks.py
<<< @/opa-stack/examples/docker-compose/celery-task/plugins/celerydemo/tasks.py
:::