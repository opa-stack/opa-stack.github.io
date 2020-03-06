# Development

## Commands

* Getting a mongo-shell
  * docker-compose exec mongo mongo mongodb://mongo:mongo@localhost:27017/api

* Stop api and run manually
  * s6-svc -dh /var/run/s6/services/api/
  * cd /data/ && /usr/bin/python3.6 /usr/local/bin/uvicorn opa.main:app --host 0.0.0.0
    * Use `--log-level debug` if you want debug-logging

## Resources

* Cheatsheet - https://gitlab.com/euri10/fastapi_cheatsheet