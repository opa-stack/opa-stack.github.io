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