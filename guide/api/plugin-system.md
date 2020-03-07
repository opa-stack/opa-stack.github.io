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

The order is important, and your plugin-name (filename, foldername), must match
* the regex in `PLUGIN_WHITELIST_RE`
* be in the csv list `PLUGIN_WHITELIST_LIST` (if not populated, the whole list is ignored)

* not match the regex in `PLUGIN_BLACKLIST_RE`
* not be in the csv list `PLUGIN_BLACKLIST_LIST` (if not populated, the whole list is ignored)

The loading behaves the same way python does when importing. The first `PLUGIN_PATHS` containing the package wins, ie, you can easiely override other plugins, or make yourself multiple folders to load plugins from. If there are 2 or more plugins with the same name, both in different paths.
We will ONLY care about the first one. Even if the first one is going to get ignored by a filter..

## Configuration

* `PLUGIN_PATH`: List of paths to potentially load plugins from, default `[]`, ie, only `/data/opa/plugins` (as it is always there..).
This is an array, and can be overwritten if you define it multiple places, to merge multiple entries, write, example

```yaml
default:
  PLUGIN_PATHS:
    - "/extra_plugins"
    - dynaconf_merge
```

::: tip
If you want to define this value using an environment-variable, you can define it as a string (`OPA_PLUGIN_PATHS='/plugins'`) or a list, (`OPA_PLUGIN_PATHS='["/plugins", "/more_plugins"]'`)
:::

If plugins should be loaded or not can be defined multiple different ways. There are many ways to cover many usecases.
Please **don't** overuse these settings. They are not ment to be used all at once!

The settings are only active if they are defined, that means that we will not use the blacklist, unless it is defined.
Same with the other settings.

* `PLUGIN_WHITELIST_LIST` (default: []): List of whitelisted plugins to load.
* `PLUGIN_WHITELIST_RE` (default: ""): Regex of whitelisted plugins to load. 
* `PLUGIN_WHITELIST_TAGS` (default: []): List of whitelisted plugin tags to load. Setting this means that we will ONLY load plugins having one or more of these tags.

* `PLUGIN_BLACKLIST_LIST` (default: []): List of blacklisted plugins to not load.
* `PLUGIN_BLACKLIST_RE` (default: ""): Regex of blacklisted plugins to not load. 
* `PLUGIN_BLACKLIST_TAGS` (default: []): List of blacklisted plugin tags to not load.

The default settings means that **ALL** available plugins (in the paths) will be loaded by default. Which might be just what you want.

::: tip
The _LIST and _RE matches will match against the plugin-path, and the module-name. Example-paths it will need to match against
  * `/data/opa/demo-plugins/demo_noop`: For the file inside `/data/opa/demo-plugins` named `demo_noop.py`
  * `/data/opa/demo-plugins/demo_model`: For the `demo_model` package (a folder with an `__init__.py` file)

The _TAGS matchers will check for metadata
:::

## Making a plugin

### Adding functionality

Every `PLUGIN_PATHS` are loaded into pythons `sys.path`. Therefor, you can also have plugins that exposes functionality to other plugins.
So, if you got

* `/plugins/common/math_utils.py` with a function `double()`
* `/plugins/secure/grade_calculations.py` that adds a route. It can use `from math_utils import double` without problems

### hooks

### Config

### Metadata

A plugin can have metadata attached to it in form of a `json` file.
* If it's a flat `.py` file. Create a file with `-meta.json`
  * Exammple on `my_utils.py` you will have `my_utils-meta.json`
* If it is a python package, make `/meta.json` in the same folder as the package.

Currently, you can only define tags as metadata, which can be used for filtering (`PLUGIN_WHITELIST_TAGS` and `PLUGIN_BLACKLIST_TAGS`) which plugins to load.

Example

```json
{
  "tags": ["utils", "admin"]
}
```

### Examples