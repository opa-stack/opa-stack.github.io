# Configuration

We are using [dynaconf](https://dynaconf.readthedocs.io/) for configuration management and the default config is:

::: details /data/opa/default-settings.yaml
<<< @/opa-stack/api/data/opa/default-settings.yaml
:::

Dynaconf have a lot of ways to set configuration using files and/or environment-variables. They have very good documentation, so take a look at their page for tips if you need anything special.

The settings we use for dynaconf is:

* `ENV_SWITCHER_FOR_DYNACONF`: Is `ENV`, meaning you use the environment variable `ENV` to set the environment if you want to use those.
* `ENVVAR_PREFIX_FOR_DYNACONF`: Is `OPA`. So every setting you want to override using environment variable needs to be prefixed with `OPA_`
* `ROOT_PATH_FOR_DYNACONF`: Is `/data/settings`, which is the folder you need to put all your settings in if not overwritten by environment variables.
* `INCLUDES_FOR_DYNACONF`: Is `['/data/opa/default-settings.yaml', '*.yaml', '*.json', '*.py', '*.ini', '*.toml']`. So those are the settings loaded in that order.

Configurig opa-stack can therefor be done in a bunch of ways, see some [examples](#examples) below

## Environment

Settings are put into environments. So if you want to bundle up your project with all different configuration, and an easy way to switch between the configs. Environments is for you..

See the examples below and you will see how you can have specific config only active in a specific environment.

You can set the environment using the `ENV` environment variable to whichever environment you want. Note that the default variables is still set, but they can be overridden by the environments configuration.

### Special environments

#### dev

If you set `dev` as the `ENV`, you will get:

* A webserver that reloads on file-changes
* PTVSD enabled ([Python Tools for Visual Studio debug server](https://github.com/Microsoft/ptvsd/))
* [better exceptions](https://github.com/Qix-/better-exceptions)
* `/data/opa/demo-plugins` ([github code](https://github.com/opa-stack/opa-stack/tree/master/api/data/opa/demo-plugins)) enabled

::: tip
Take a look at the [development guide](/guide/development) for more info about how to leverage what dev-mode enables.
:::

## Examples

### Using a file mounted

If you mount files into the directory `/data/settings`, you can have your settings in 1 or more files with `.yaml`, `.json`, `.py`, `.ini`, or `.toml` extension. Example with a simple `.yaml` file

```yaml
default:
  PROJECT_NAME: "opa-stack"
```

### Using environment variables

Prepend your environment-variable with `OPA_`, example setting `OPA_PROJECT_NAME=opa-stack`

### File with different environments

Mounting in a yaml-file like this

```yaml
default:
  PLUGIN_PATHS:
    - "/data/defaultplugins"
both:
  PLUGIN_PATHS:
    - "/data/specialplugins"
    - dynaconf_merge
secret:
  PLUGIN_PATHS:
    - "/data/specialplugins"
```

will default set the plugin-path to `/data/defaultplugins`. However, if you set the environment variable `ENV` to `both`, it will load plugins from both `/data/defaultplugins` and `/data/specialplugins` (the special item `dynaconf_merge` merges instead of overwriting).

Setting `ENV` to `secret` will only load plugins from `/data/specialplugins`