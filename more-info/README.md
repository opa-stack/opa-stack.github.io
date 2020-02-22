# More info

## Project goal

Working as an engineer/devop-person for some years, one thing often missing is a home for your code doing very custom things, specially logic you often want in the middle of other API's.

The requirements was therefor more or less:

* Need for python3, non-blocking, async and modern
* A place to store non-relational temporary (or semi-permanent) data
* Job queue for things that might take time or you want custom schedule
* Good self-documenting api endpoints for building other tools on. rest, graphql and websocket out of the box
* Be dynamic enough to support multiple instances of it running, with some optional communication between them. (Example for different security contexts)
* Good support for an out-of-the-box k8s deployment, including scalability

You can read more about the main part of the stack (the **api**) on the [api](/api) page.


## FAQ

### Why not use something out there? Example node-red..

There are a lot of nice tooling out there that solves similar problems. But I really coulnt find anything that was dynamic enough to support what I wanted/needed.

### But what about just setting up everything yourself..?

That is just what this project is trying to do, but doing it in a way so you can use plugins with your actual code, without needing to setup a whole stack. opa-stack tries to gives you a modern base, with minimal efford to start coding.

Take a look at [what it's made of](#what-it-s-made-of) below for information what this stack is made of

### Whats about the name?

The `OP` in `OPA` stands for `ops`, as in a group of people/mindset (yes, yes.. `dev` is not a part of the name, but it's kinda implicit given the whole name.. kinda :)).

The `A` is for API or Automation, or both. You choose :smirk:


## What it's made of

* API (main component)
  * Centos8 [base-image](https://hub.docker.com/r/opastack/base-centos) with [s6-overlay](https://github.com/just-containers/s6-overlay) as init
  * [Mongodb](https://www.mongodb.com/) as general database
  * Python 3.6+
    * Using typing
    * Usinc async where possible
    * [FastAPI](https://fastapi.tiangolo.com/) for web
      * [uvicorn](https://www.uvicorn.org/) as asgi server
      * [Pydantic](https://pydantic-docs.helpmanual.io/) for api modelling
    * [motor](https://motor.readthedocs.io/) for comminicating with mongo

* Docs
  * [vuepress](vuepress.vuejs.org/) for generating [docs](https://github.com/opa-stack/opa-stack.github.io)
  * [yarn](https://yarnpkg.com/) to keep track of packages/plugins
  * Google analytics to see how it goes

* Development
  * Everything under [github](https://github.com/opa-stack)
  * [Travis-ci](https://travis-ci.org/opa-stack/) for stuff
  * An [organization](https://hub.docker.com/orgs/opastack) on hub.docker.io for container-images