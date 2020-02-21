---
sidebarDepth: 4
---

# Plugin system

The plugin-system are powerfull and should cover most use-cases.


## Adding plugin-paths

To use a custom plugin-folder, populate the configuration named `PLUGIN_PATHS` with a comma-separated-list of path's.

::: tip
The path `/data/opa/plugins` will always be appened, this is because we use plugins internally as well. However, they can easiely be overridden if wanted.
:::

## File-structure

When loading plugins, we uses `PLUGIN_PATHS` to find possible plugins. We will load both plugins that are single files, but also packages containing an `__init__.py`.

The order is important, and your plugin-name (filename, foldername), must match the regex in `PLUGIN_ALLOWED`, see below for more info.

The loading behaves the same way python does when importing. The first `PLUGIN_PATHS` containing the package wins, ie, you can easiely override other plugins, or make yourself multiple folders to load plugins from. This might be usefull in cases where

* You need multiple instances of opa-stack running, example each in it's own zone.
* You want most of them the same, but you still want one of them to have some extra functionality.

To get this to work

* Build 1 `common` version and have a `PLUGIN_PATH` like `/plugins/common`

  * zone-normal builds from common
  * zone-secure builds from common, but change `PLUGIN_PATH` to `/plugins/common,/plugins/secure`.

## Configuration

* `PLUGIN_PATH`: Comma separated list of paths to load from.

* `PLUGIN_ALLOWED` (default: ""): Regex of plugins to allow. It will match against the plugin-path, and the module-name. Example-paths it will need to match against
  * `/data/opa/demo-plugins/demo_noop`: For the file inside `/data/opa/demo-plugins` named `demo_noop.py`
  * `/data/opa/demo-plugins/demo_model`: For the `demo_model` package (a folder with an `__init__.py` file)

::: tip
The default regex will match everything, so you can use ordering and overriding instead.
:::

## Making a plugin

### Adding functionality

Every `PLUGIN_PATHS` are loaded into pythons `sys.path`. Therefor, you can also have plugins that exposes functionality to other plugins.
So, if you got

* `/plugins/common/math_utils.py` with a function `double()`
* `/plugins/secure/grade_calculations.py` that adds a route. It can use `from math_utils import double` without problems

### hooks

### Config

### Examples