# Third-Party

## AllAuth
- [allauth](https://django-allauth.readthedocs.io/en/latest/)
- allauth.account.admin (EmailAddress)
- allauth.account.forms (SignupForm)
- allauth.account.signals(email_confirmed)
- allauth.account.views (LoginView)

## AWS SDK for Python (Boto3)
- [boto3](https://boto3.amazonaws.com/v1/documentation/api/latest/index.html)
- [botocore](https://github.com/boto/botocore) (UNSIGNED)
- botocore.client (Config)

## Celery
- [celery](https://docs.celeryq.dev/en/stable/index.html) (Celery, shared_task)
- celery.schedules (crontab)

## dateparser
- [dateparser](https://dateparser.readthedocs.io/en/latest/)

## Django Click (djclick)
- [djclick](https://github.com/GaretJax/django-click) (click)
    - Simplifies writing Django management commands.

## Django Extensions
- [django_extensions](https://django-extensions.readthedocs.io/en/latest/) (TimeStampedModel)

## Django Filters
- [django_filters](https://django-filter.readthedocs.io/en/stable/index.html) (rest_framework as filters)

## Django Rest Framework
- [djangorestframework](https://www.django-rest-framework.org/)
- rest_framework (django_filters, mixins, permissions, routers, serializers, status)
- rest_framework.authtoken.views(obtain_auth_token)
- rest_framework.decorators (action)
- rest_framework.exceptions(APIException, ValidationError)
- rest_framework.fields (UUIDField)
- rest_framework.permissions(BasePermission, IsAuthenticated, SAFE_METHODS)
- rest_framework.request (Request)
- rest_framework.response (Response)
- rest_framework.reverse (reverse_lazy)
- rest_framework.views (APIView,exception_handler)
- rest_framework.viewsets(GenericViewSet, ReadOnlyModelViewSet,ViewSet)

## Django OAuth Toolkit
- [django-oauth-toolkit](https://django-oauth-toolkit.readthedocs.io/en/latest/)
- oauth2_provider.models (Application)

## drf_yasg
- [drf_yasg](https://drf-yasg.readthedocs.io/en/stable/)
    - Creates OpenAPI 2.0 docs from DRF.
    - NOTE: Does not support / intend to support OpenAPI 3.0, recommends drf-spectacular
- drf_yasg.utils (no_body, openapi,swagger_auto_schema)
- drf_yasg.views (get_schema_view)

## Girder: Composed Configuration
- [composed_configuration](https://github.com/girder/django-composed-configuration) (ComposedConfighuration, ConfigMixin,DevelopmentBaseConfiguration,HerokuProductionBaseConfiguration,HttpsMixin, S3StorageMixin,SmtpEmailMixin, TestingBaseConfiguration)
- composed_configuration._configuration(_BaseConfiguration)

## Girder: django-s3-file-field
- [s3_file_field](https://github.com/girder/django-s3-file-field) (S3FileField)

## Guardian
- [guardian](https://django-guardian.readthedocs.io/en/stable/)
    - Per object permissions
- guardian.admin (GuardedModelAdmin)
- guardian.shortcuts (assign_perm,get_objects_for_user, get_perms,get_users_with_perms, remove_perm)

## Pandas
- [pandas](https://pandas.pydata.org/)

## Schema
- [schema](https://github.com/keleshev/schema) (Optional, Or, Schema, SchemaError, Use)