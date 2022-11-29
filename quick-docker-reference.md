# For Development

## First Time Setup
1. Run `docker-compose build`
2. Run `docker-compose run --rm npm npm ci`
3. Run `docker-compose run --rm django ./manage.py migrate`
4. Create a superuser
5. Make superuser a client

## Create a superuser
- `docker-compose run --rm django ./manage.py createsuperuser`

## Make superuser a client
- `docker-compose run --rm django ./manage.py makeclient --username <your-email@address.domain> --uri http://localhost:8081`
    - Replace `<your-email@address.domain>` with your email address.

## Starting MIQA
- `docker-compose up`

## Make DB Migrations
- `docker-compose run --rm django ./manage.py makemigrations`

## Execute DB Migrations
- `docker-compose run --rm django ./manage.py migrate`