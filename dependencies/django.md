# [Django](https://www.djangoproject.com/)
- django (forms)
- [django.apps](https://docs.djangoproject.com/en/4.1/ref/applications/) (apps, AppConfig)
    Primarily provides information about registered apps (e.g. miqa).
- django.conf.settings
    Settings for one's Django app.
- django.contrib.admin
    - Automatic Django admin interface.
- [django.contrib.auth](https://docs.djangoproject.com/en/4.1/ref/contrib/auth/) (logout)
    - Handles authentication/authorization.
- django.contrib.auth.models (User)
- django.contrib.auth.signals (user_logged_out)
    - NOTE: [Django docs](https://docs.djangoproject.com/en/4.1/topics/signals/) recommend using signals only when direct calling isn't feasible.
- django.core.asgi (get_asgi_application)
- django.core.exceptions (BadRequest, ValidationError)
- django.core.mail (EmailMultiAlternatives)
    Allows one to send multiple types of content with a single email (e.g. HTML and plain text).
- django.core.management (execute_from_command_line)
- django.core.wsgi (get_wsgi_application)
- django.db (models)
- django.db.models.signals (pre_delete)
- django.dispatch (receiver)
- django.http (FileResponse, HttpResponseServerError)
- django.shortcuts (get_object_or_404, render)
- django.urls (include, path)
- django.utils (timezone)
- django.utils.functional (wraps)
- django.views.generic (View)
- django.views.generic.base (RedirectView, TemplateView)