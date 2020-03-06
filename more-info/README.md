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


## FAQ

### Why not use something out there? Example node-red..

There are a lot of nice tooling out there that solves similar problems. But I really coulnt find anything that was dynamic enough to support what I wanted/needed.

### But what about just setting up everything yourself..?

That is just what this project is trying to do, but doing it in a way so you can use plugins with your actual code, without needing to setup a whole stack. opa-stack tries to gives you a modern base, with minimal efford to start coding.

Take a look at [what it's made of](#what-it-s-made-of) below for information what this stack is made of

### But... Then what about other project templates, cookiecutter and other examples

Fair point.. There are a lot of good start-templates out there, both for [FastAPI](https://fastapi.tiangolo.com/project-generation/) and [cookiecutter](https://github.com/cookiecutter/cookiecutter).
And in many cases, they might be better. Example if you are making a big website, or a custom api for a chat platform (or ...).

What the opa-stack gives you is a powerfull platform for where you can do very custom things, but as plugins. Those plugins have access to things they need to be a good api, and to talk to other api's.

### When should I not use opa-stack?

Hard to say, but I woulnt want to use it if the project will have dedicated people working on it, then it might be a good thing starting from scratch, or maybe from a cookiecutter template.

Feel free to use it as an api-endpoint for other parts of your project tho. Let say your main work is on the frontend, but you need an api for something custom..

### When should I use the opa-stack?

Read some docs, see if it fits. If you are a team that needs to talk to a bunch of api's and do custom things using python, it is probably a good fit.

Or maybe you have a team of 20 people, all going to eventually wanting to do a little thing in python where they want access to it via an api, or any other channel.

Opa-stack might also be a good fit if you want a python engine that does something, if something.. You don't haveto use the api-part :)

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
    * [dynaconf](https://dynaconf.readthedocs.io/) for configuration management

* Docs
  * [vuepress](vuepress.vuejs.org/) for generating [docs](https://github.com/opa-stack/opa-stack.github.io)
  * [yarn](https://yarnpkg.com/) to keep track of packages/plugins
  * [Google analytics](https://analytics.google.com/) to see some site-stats
  * [Algolia](https://www.algolia.com/ref/docsearch/) for searching

* Development
  * Everything under [github](https://github.com/opa-stack)
  * [Travis-ci](https://travis-ci.org/opa-stack/) for stuff
  * An [organization](https://hub.docker.com/orgs/opastack) on hub.docker.io for container-images