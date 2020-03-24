# New project

The only sane way to run the opa-stack is using containers and it is build using containers in mind from the very beginning.
There are multiple ways to run it, so choose whatever orchestrator fits you best below.

There are also some [optional components](./optional-components-reference) you can use together with opa-stack if you want caching, db or and so on.


## Orchestrators

### docker-compose

Docker-compose is the simplest of the container orchestrators. You can download it from [here](https://docs.docker.com/compose/install/), and read the getting started guide [here](https://docs.docker.com/compose/gettingstarted/).

Take a look at the simplest example project [here](https://github.com/opa-stack/opa-stack/tree/master/examples/docker-compose/hello-world).
In the folder just run `docker-compose up`, and you got things running.. See the [docker-compose docs](https://docs.docker.com/compose/) for more info.

### kubernetes (helm)

Nothing here yet...