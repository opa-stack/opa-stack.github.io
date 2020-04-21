(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{225:function(t,e,o){"use strict";o.r(e);var a=o(0),r=Object(a.a)({},(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[o("h1",{attrs:{id:"more-info"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#more-info"}},[t._v("#")]),t._v(" More info")]),t._v(" "),o("h2",{attrs:{id:"project-goal"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#project-goal"}},[t._v("#")]),t._v(" Project goal")]),t._v(" "),o("p",[t._v("Working as an engineer/devop-person for some years, one thing often missing is a home for your code doing very custom things, specially logic you often want in the middle of other API's.")]),t._v(" "),o("p",[t._v("The requirements was therefor more or less:")]),t._v(" "),o("ul",[o("li",[t._v("Need for python3, non-blocking, async and modern")]),t._v(" "),o("li",[t._v("A place to store non-relational temporary (or semi-permanent) data")]),t._v(" "),o("li",[t._v("Job queue for things that might take time or you want custom schedule")]),t._v(" "),o("li",[t._v("Good self-documenting api endpoints for building other tools on. rest, graphql and websocket out of the box")]),t._v(" "),o("li",[t._v("Be dynamic enough to support multiple instances of it running, with some optional communication between them. (Example for different security contexts)")]),t._v(" "),o("li",[t._v("Good support for an out-of-the-box k8s deployment, including scalability")]),t._v(" "),o("li",[t._v("A way to do almost everything via plugins")]),t._v(" "),o("li",[t._v("An optional component system where you can just attach some additional services, like redis, and have it working")])]),t._v(" "),o("h2",{attrs:{id:"faq"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#faq"}},[t._v("#")]),t._v(" FAQ")]),t._v(" "),o("h3",{attrs:{id:"why-not-use-something-out-there-example-node-red"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#why-not-use-something-out-there-example-node-red"}},[t._v("#")]),t._v(" Why not use something out there? Example node-red..")]),t._v(" "),o("p",[t._v("There are a lot of nice tooling out there that solves similar problems. But I really coulnt find anything that was dynamic enough to support what I wanted/needed.")]),t._v(" "),o("h3",{attrs:{id:"but-what-about-just-setting-up-everything-yourself"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#but-what-about-just-setting-up-everything-yourself"}},[t._v("#")]),t._v(" But what about just setting up everything yourself..?")]),t._v(" "),o("p",[t._v("That is just what this project is trying to do, but doing it in a way so you can use plugins with your actual code, without needing to setup a whole stack. opa-stack tries to gives you a modern base, with minimal efford to start coding.")]),t._v(" "),o("p",[t._v("Take a look at "),o("a",{attrs:{href:"#what-it-s-made-of"}},[t._v("what it's made of")]),t._v(" below for information what this stack is made of")]),t._v(" "),o("h3",{attrs:{id:"but-then-what-about-other-project-templates-cookiecutter-and-other-examples"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#but-then-what-about-other-project-templates-cookiecutter-and-other-examples"}},[t._v("#")]),t._v(" But... Then what about other project templates, cookiecutter and other examples")]),t._v(" "),o("p",[t._v("Fair point.. There are a lot of good start-templates out there, both for "),o("a",{attrs:{href:"https://fastapi.tiangolo.com/project-generation/",target:"_blank",rel:"noopener noreferrer"}},[t._v("FastAPI"),o("OutboundLink")],1),t._v(" and "),o("a",{attrs:{href:"https://github.com/cookiecutter/cookiecutter",target:"_blank",rel:"noopener noreferrer"}},[t._v("cookiecutter"),o("OutboundLink")],1),t._v(".\nAnd in many cases, they might be better. Example if you are making a big website, or a custom api for a chat platform (or ...).")]),t._v(" "),o("p",[t._v("What the opa-stack gives you is a powerfull platform for where you can do very custom things, but as plugins. Those plugins have access to things they need to be a good api, and to talk to other api's.")]),t._v(" "),o("h3",{attrs:{id:"when-should-i-not-use-opa-stack"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#when-should-i-not-use-opa-stack"}},[t._v("#")]),t._v(" When should I not use opa-stack?")]),t._v(" "),o("p",[t._v("Hard to say, but I woulnt want to use it if the project will have dedicated people working on it, then it might be a good thing starting from scratch, or maybe from a cookiecutter template.")]),t._v(" "),o("p",[t._v("Feel free to use it as an api-endpoint for other parts of your project tho. Let say your main work is on the frontend, but you need an api for something custom..")]),t._v(" "),o("h3",{attrs:{id:"when-should-i-use-the-opa-stack"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#when-should-i-use-the-opa-stack"}},[t._v("#")]),t._v(" When should I use the opa-stack?")]),t._v(" "),o("p",[t._v("Read some docs, see if it fits. If you are a team that needs to talk to a bunch of api's and do custom things using python, it is probably a good fit.")]),t._v(" "),o("p",[t._v("Or maybe you have a team of 20 people, all going to eventually wanting to do a little thing in python where they want access to it via an api, or any other channel.")]),t._v(" "),o("p",[t._v("Opa-stack might also be a good fit if you want a python engine that does something, if something.. You don't haveto use the api-part 😃")]),t._v(" "),o("h3",{attrs:{id:"whats-about-the-name"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#whats-about-the-name"}},[t._v("#")]),t._v(" Whats about the name?")]),t._v(" "),o("p",[t._v("The "),o("code",[t._v("OP")]),t._v(" in "),o("code",[t._v("OPA")]),t._v(" stands for "),o("code",[t._v("ops")]),t._v(", as in a group of people/mindset (yes, yes.. "),o("code",[t._v("dev")]),t._v(" is not a part of the name, but it's kinda implicit given the whole name.. kinda 😃).")]),t._v(" "),o("p",[t._v("The "),o("code",[t._v("A")]),t._v(" is for API or Automation, or both. You choose 😏")]),t._v(" "),o("h2",{attrs:{id:"what-it-s-made-of"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#what-it-s-made-of"}},[t._v("#")]),t._v(" What it's made of")]),t._v(" "),o("ul",[o("li",[o("p",[t._v("API (main component)")]),t._v(" "),o("ul",[o("li",[t._v("Centos8 "),o("a",{attrs:{href:"https://hub.docker.com/r/opastack/base-centos",target:"_blank",rel:"noopener noreferrer"}},[t._v("base-image"),o("OutboundLink")],1),t._v(" with "),o("a",{attrs:{href:"https://github.com/just-containers/s6-overlay",target:"_blank",rel:"noopener noreferrer"}},[t._v("s6-overlay"),o("OutboundLink")],1),t._v(" as init")]),t._v(" "),o("li",[o("a",{attrs:{href:"https://www.mongodb.com/",target:"_blank",rel:"noopener noreferrer"}},[t._v("Mongodb"),o("OutboundLink")],1),t._v(" as general database")]),t._v(" "),o("li",[t._v("Python 3.6+\n"),o("ul",[o("li",[t._v("Using typing")]),t._v(" "),o("li",[t._v("Usinc async where possible")]),t._v(" "),o("li",[o("a",{attrs:{href:"https://fastapi.tiangolo.com/",target:"_blank",rel:"noopener noreferrer"}},[t._v("FastAPI"),o("OutboundLink")],1),t._v(" for web\n"),o("ul",[o("li",[o("a",{attrs:{href:"https://www.uvicorn.org/",target:"_blank",rel:"noopener noreferrer"}},[t._v("uvicorn"),o("OutboundLink")],1),t._v(" as asgi server")]),t._v(" "),o("li",[o("a",{attrs:{href:"https://pydantic-docs.helpmanual.io/",target:"_blank",rel:"noopener noreferrer"}},[t._v("Pydantic"),o("OutboundLink")],1),t._v(" for api modelling")])])]),t._v(" "),o("li",[o("a",{attrs:{href:"https://motor.readthedocs.io/",target:"_blank",rel:"noopener noreferrer"}},[t._v("motor"),o("OutboundLink")],1),t._v(" for comminicating with mongo")]),t._v(" "),o("li",[o("a",{attrs:{href:"https://dynaconf.readthedocs.io/",target:"_blank",rel:"noopener noreferrer"}},[t._v("dynaconf"),o("OutboundLink")],1),t._v(" for configuration management")])])])])]),t._v(" "),o("li",[o("p",[t._v("Docs")]),t._v(" "),o("ul",[o("li",[o("RouterLink",{attrs:{to:"/more-info/vuepress.vuejs.org/"}},[t._v("vuepress")]),t._v(" for generating "),o("a",{attrs:{href:"https://github.com/opa-stack/opa-stack.github.io",target:"_blank",rel:"noopener noreferrer"}},[t._v("docs"),o("OutboundLink")],1)],1),t._v(" "),o("li",[o("a",{attrs:{href:"https://yarnpkg.com/",target:"_blank",rel:"noopener noreferrer"}},[t._v("yarn"),o("OutboundLink")],1),t._v(" to keep track of packages/plugins")]),t._v(" "),o("li",[o("a",{attrs:{href:"https://analytics.google.com/",target:"_blank",rel:"noopener noreferrer"}},[t._v("Google analytics"),o("OutboundLink")],1),t._v(" to see some site-stats")]),t._v(" "),o("li",[o("a",{attrs:{href:"https://www.algolia.com/ref/docsearch/",target:"_blank",rel:"noopener noreferrer"}},[t._v("Algolia"),o("OutboundLink")],1),t._v(" for searching")])])]),t._v(" "),o("li",[o("p",[t._v("Development")]),t._v(" "),o("ul",[o("li",[t._v("Everything under "),o("a",{attrs:{href:"https://github.com/opa-stack",target:"_blank",rel:"noopener noreferrer"}},[t._v("github"),o("OutboundLink")],1)]),t._v(" "),o("li",[o("a",{attrs:{href:"https://travis-ci.org/opa-stack/",target:"_blank",rel:"noopener noreferrer"}},[t._v("Travis-ci"),o("OutboundLink")],1),t._v(" for stuff")]),t._v(" "),o("li",[t._v("An "),o("a",{attrs:{href:"https://hub.docker.com/orgs/opastack",target:"_blank",rel:"noopener noreferrer"}},[t._v("organization"),o("OutboundLink")],1),t._v(" on hub.docker.io for container-images")])])])])])}),[],!1,null,null,null);e.default=r.exports}}]);