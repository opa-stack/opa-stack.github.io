# Development

## Commands

* Getting a mongo-shell
  * docker-compose exec mongo mongo mongodb://mongo:mongo@localhost:27017/api

* Stop api and run manually
  * s6-svc -dq /var/run/s6/services/api/
  * cd /data/ && /usr/bin/python3.6 /usr/local/bin/uvicorn opa.main:app --host 0.0.0.0
    * Use `--log-level debug` if you want debug-logging

## Resources

* Cheatsheet - https://gitlab.com/euri10/fastapi_cheatsheet

## Development mode (ENV=dev)

* Currently, only the `api` does something when `ENV` is set.. But this might change when more components are added later.

On dev, if you set `ENV` to `dev`, a [few things happens](api/configuration.html#dev), some of them are

### PTVSD

* [Python Tools for Visual Studio debug server](https://github.com/Microsoft/ptvsd/)

The port `5678` will be exposed, and you can connect example vscode to it so it can help you debug your code.
You will be able to set breakpoints, and do the regular debugging in vscode. This also works inside async code.

Example-configuration (`launch.json`) for vscode if you use docker-compose and expose the port like `"127.0.0.1:5678:5678"`

```json
{
    "version": "0.2.0",
    "configurations": [{
        "name": "Python: Remote Attach",
        "type": "python",
        "request": "attach",
        "port": 5678,
        "host": "localhost",
        "pathMappings": [{
            "localRoot": "${workspaceFolder}/api/data/opa",
            "remoteRoot": "/data/opa"
        }]
    }]
}
```

### Better exceptions

* [github](https://github.com/Qix-/better-exceptions)

Get better exception output on the console. It does many things, but one very usefull thing is that it shows you the content of variables inside the different exception frames.

## Plugins

The plugin-system is powerfull, you can read about it [here](./api/plugin-system).
Since there is a lot to it for developing them, there is a [dedicated](./plugins) page for info about it.
