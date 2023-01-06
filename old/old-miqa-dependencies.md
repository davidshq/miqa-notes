# Development

## docker
- postgres:latest
- rabbitmq:management
- minio/minio:latest
- python:3.8-slim

## Postgres
- libpq-dev
- gcc
- libc6-dev

## Other
- Supports ASGI (Asynchronous Server Gateway Interface) and WSGI.
- gunicorn - "Green Unicorn is a pure-Python WSGI server for UNIX." - https://docs.djangoproject.com/en/3.2/howto/deployment/wsgi/gunicorn/
- jsonschema - https://python-jsonschema.readthedocs.io/en/stable/