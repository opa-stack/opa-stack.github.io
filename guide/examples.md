# Examples

::: tip
Read [this](./new-project) first if you need a new project
:::

Note that on all the examples, you will also get these url's

* http://127.0.0.1:8001/docs - Swagger documentation
* http://127.0.0.1:8001/redoc - Redoc documentation
* http://127.0.0.1:8001/openapi.json - OpenAPI schema


## Hello world

The first example is a simple docker-compose setup where you will

* Uses docker-compose
* Use only the api container
* Expose output from a simple command on `/hello`
* Mount the plugins from a local plugin-folder

* Interesting url's
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
* Expose output on `/sleep` that sleeps.. This is an async function
* Mount the plugins from a local plugin-folder, but also watches them for changes
* Sets the environment to `DEV` (see [docs](api/configuration.html#dev) for more info)
  * In addition to other things, enabling `DEV` gives some neat developing features.. Check [here](development.html#development-mode-env-dev) for more info how to leverage them

### Files

* Files at github: [https://github.com/opa-stack/opa-stack/tree/master/examples/docker-compose/timekeeper](https://github.com/opa-stack/opa-stack/tree/master/examples/docker-compose/timekeeper)

::: details docker-compose.yaml
<<< @/opa-stack/examples/docker-compose/timekeeper/docker-compose.yaml
:::

::: details plugins/hello.py
<<< @/opa-stack/examples/docker-compose/timekeeper/plugins/hello.py
:::