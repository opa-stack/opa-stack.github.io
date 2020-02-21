# More info

## Project goal

Working as an engineer/devop-person for some years, one thing often missing is a home for your code doing very custom things, specially logic you often want in the middle of other API's.

The requirements was therefor more or less:

* Need for python3, non-blocking, async and modern
* A place to store non-relational temporary (or semi-permanent) data
* Job queue for things that might take time or you want custom schedule
* Good self-documenting api endpoints for building other tools on. rest, graphql and websocket out of the box
* Be dynamic enough to support multiple instances of it running, with some optional communication between them. (Example for different security contexts)

You can read more about the main part of the stack (the **api**) on the [api](/api) page.


## FAQ

### Why not use something out there? Example node-red..

There are a lot of nice tooling out there that solves similar problems. But I really coulnt find anything that was dynamic enough to support what I wanted/needed.

### Whats about the name?

The `OP` in `OPA` stands for `ops`, as in a group of people/mindset (yes, yes.. `dev` is not a part of the name, but it's kinda implicit given the whole name.. kinda :)).

The `A` is for API or Automation, or both. You choose :smirk: