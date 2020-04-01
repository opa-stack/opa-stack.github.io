---
sidebarDepth: 4
---

# Plugin system

The plugin-system are powerfull and should cover most use-cases.

::: tip
If you want to peak at code that drives the plugin-system, it's on [github](https://github.com/opa-stack/opa-stack/blob/master/api/data/opa/core/plugin.py) or just expand it here
::: details plugin.py
<<< @/opa-stack/api/data/opa/core/plugin.py
:::

## Adding plugin-paths

To use a custom plugin-folder, populate the configuration named `PLUGIN_PATHS` with a comma-separated-list of path's.

::: tip
The path `/data/opa/plugins` will always be appened, this is because we use plugins internally as well. However, they can easiely be overridden if wanted as they are appended as the last item in the list.
:::

## File-structure

When loading plugins, we uses `PLUGIN_PATHS` to find possible plugins. We will load both plugins that are single files, but also packages containing an `__init__.py`.

::: warning
Make sure the name of your plugin is unique, since we are using the pythons import system when importing it.
Example.. Don't call your plugin `redis.py` and expect it to work... :) You will probably get some errors down the line.
:::

The order when the plugins are loaded is important. If you want to load plugin `myplugin`, and there are 2 files with that name, the first one in the `PLUGIN_PATHS` will win. Just as in normal with `PATH` variables.
We will ONLY care about the first one. Even if the first one is going to get ignored by a filter (see below)

## Configuration

* `PLUGIN_PATH`: List of paths to potentially load plugins from, default `[]`, ie, only `/data/opa/plugins` (as it is always there..).
This is an array, and can be overwritten if you define it multiple places, to merge multiple entries, write, example (notice the `dynacon_merge`) ([dynaconf-docs](https://dynaconf.readthedocs.io/))

```yaml
default:
  PLUGIN_PATHS:
    - "/extra_plugins"
    - dynaconf_merge
```

::: tip
If you want to define this value using an environment-variable, you can define it as a string (`OPA_PLUGIN_PATHS='/plugins'`) or a list, (`OPA_PLUGIN_PATHS='["/plugins", "/more_plugins"]'`)
:::

If a plugin is loaded or not can be dictated using rules. There are many different filters, and they are all set to allow-as-default.
You should only use 0, 1 or maybe 2 of the settings.. But feel free to use as many as you like :)

* `PLUGIN_WHITELIST_LIST` (default: []): List of whitelisted plugins to load.
* `PLUGIN_WHITELIST_RE` (default: ""): Regex of whitelisted plugins to load. 
* `PLUGIN_WHITELIST_TAGS` (default: []): List of whitelisted plugin tags to load. Setting this means that we will ONLY load plugins having one or more of these tags.

* `PLUGIN_BLACKLIST_LIST` (default: []): List of blacklisted plugins to not load.
* `PLUGIN_BLACKLIST_RE` (default: ""): Regex of blacklisted plugins to not load. 
* `PLUGIN_BLACKLIST_TAGS` (default: []): List of blacklisted plugin tags to not load.

The default settings means that **ALL** available plugins (in the paths) will be loaded by default. Which might be just what you want.

::: tip
The `_LIST` and `_RE` matches will match against the plugin-path, and the module-name. Example-paths it will need to match against
  * `/data/opa/demo-plugins/demo_noop`: For the file inside `/data/opa/demo-plugins` named `demo_noop.py`
  * `/data/opa/demo-plugins/demo_model`: For the `demo_model` package (a folder with an `__init__.py` file)

The `_TAGS` matchers will check for metadata
:::
