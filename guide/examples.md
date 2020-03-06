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
* Use the api container
* Expose output from a simple command on `/hello`
* Mount the plugins from a local plugin-folder

* Interesting url's
  * http://127.0.0.1:8001/hello - The output of the route in `hello.py`

