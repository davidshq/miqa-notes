# [Django](https://www.djangoproject.com/)

## Apps
- [django.apps](https://docs.djangoproject.com/en/4.1/ref/applications/) (apps, AppConfig)
    Primarily provides information about registered apps (e.g. miqa).
- [django.conf.settings](https://docs.djangoproject.com/en/4.1/topics/settings/)
    Settings for one's Django app.

## Contrib
- [django.contrib.admin](https://docs.djangoproject.com/en/4.1/ref/contrib/admin/index)
    - Automatic Django admin interface.
- [django.contrib.auth](https://docs.djangoproject.com/en/4.1/ref/contrib/auth/) (logout)
    - Handles authentication/authorization.
- django.contrib.auth.models (User)
- [django.contrib.auth.signals](https://docs.djangoproject.com/en/4.1/ref/contrib/auth) (user_logged_out)
    - NOTE: [Django docs](https://docs.djangoproject.com/en/4.1/topics/signals/) recommend using signals only when direct calling isn't feasible.

## Core
- django.core.asgi (get_asgi_application)
- [django.core.exceptions](https://docs.djangoproject.com/en/4.1/ref/exceptions) (BadRequest, ValidationError)
- [django.core.mail](https://docs.djangoproject.com/en/4.1/topics/email) (EmailMultiAlternatives)
    Allows one to send multiple types of content with a single email (e.g. HTML and plain text).
- [django.core.management](https://docs.djangoproject.com/en/4.1/howto/custom-management-commands) (execute_from_command_line)
- django.core.wsgi (get_wsgi_application)

## DB
- [django.db](https://docs.djangoproject.com/en/4.1/topics/db/index) (models)
- [django.db.models](https://docs.djangoproject.com/en/4.1/topics/db/models)
- [django.db.models.signals](https://docs.djangoproject.com/en/4.1/ref/signals) (pre_delete)

## Dispatch
- [django.dispatch](https://docs.djangoproject.com/en/4.1/topics/signals) (receiver)
    For receiving signals.

## Forms
- [django.forms](https://docs.djangoproject.com/en/4.1/ref/forms/api)

## HTTP
- [django.http](https://docs.djangoproject.com/en/4.1/ref/request-response) (FileResponse, HttpResponseServerError)

## Shortcuts
- [django.shortcuts](https://docs.djangoproject.com/en/4.1/topics/http/shortcuts) (get_object_or_404, render)

## Urls
- [django.urls](https://docs.djangoproject.com/en/4.1/ref/urlresolvers) (include, path)

## Utils
- [django.utils.timezone](https://docs.djangoproject.com/en/4.1/ref/utils)
- [django.utils.functional](https://docs.djangoproject.com/en/4.1/ref/utils) (wraps)

## Views
- [django.views](https://docs.djangoproject.com/en/4.1/ref/views)
- django.views.generic (View)
- django.views.generic.base (RedirectView, TemplateView)