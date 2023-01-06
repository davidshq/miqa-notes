# Development

## Tox

## Flake8
- flake8-black
- flake8-bugbear
- flake8-docstrings
- flake8-isort
- flake8-quotes
- pep8-naming - plugin for flak8e

## mypy
http://mypy-lang.org/
- optional static typing
- typeddjango/django-stubs
- typeddjango/djangorestframework-stubs
- factory-boy

## pytest
- pytest-django
- pytest-mock
- pytest-factoryboy

## celery

## django
- django-allauth
- django-configurations[database,email] - https://django-configurations.readthedocs.io/en/stable/
- django-extensions - https://github.com/django-extensions/django-extensions
- django-filter - https://django-filter.readthedocs.io/en/stable/
- django-oauth-toolkit - http://dot.evonove.it/
    - Doesn't this duplicate django-allauth?
- djangorestframework - https://www.django-rest-framework.org/
- drf-yasg - swagger generator - https://drf-yasg.readthedocs.io/en/stable/
- girder/django-composed-configuration[prod]
- django-s3-file-field[boto3]


## dev
- girder/django-composed-configuration[dev] (https://github.com/girder/django-composed-configuration)
- django-debug-toolbar
- django-s3-file-field[minio]
- ipython
- django-click
- factory_boy/factory-boy - fixture factory - https://factoryboy.readthedocs.io/en/stable/

## docker
- postgres:latest
- rabbitmq:management
- minio/minio:latest
- python:3.8-slim

## Postgres
- libpq-dev
- gcc
- libc6-dev

## GitHub Actions
- ubuntu-latest
- postgres:latest
- rabbitmq:management
- bitnami/minio:latest
- actions/checkout@v2
- actions/setup-python@v2
- docker/login-action@v1
- docker/build-push-action@v2

## Other
- Supports ASGI (Asynchronous Server Gateway Interface) and WSGI.
- gunicorn - "Green Unicorn is a pure-Python WSGI server for UNIX." - https://docs.djangoproject.com/en/3.2/howto/deployment/wsgi/gunicorn/
- jsonschema - https://python-jsonschema.readthedocs.io/en/stable/