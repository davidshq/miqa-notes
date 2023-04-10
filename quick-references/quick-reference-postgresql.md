When Postgres is setup as part of setting up a dev instance of MIQA no password is set for the `postgres` user. This is fine if one is dropping into the Postgres container terminal and running `psql -U postgres` but makes it difficult to access if you want to use an IDE on your local machine.

NOTE: This meant for local development access not a production scenario!

To rectify this issue:

1. Open the terminal for the Postgres container.
2. Run `psql -U postgres`
3. Create a new user with `CREATE USER <someusername> LOGIN SUPERUSER;`
    - Example: `CREATE USER localuser LOGIN SUPERUSER;`
4. Give the user access to the `django` database: `GRANT ALL ON DATABASE django TO <someusername>;`
    - Example: `GRANT ALL ON DATABASE django TO localuser;`
5. Set a password for the user `ALTER USER <someusername> WITH PASSWORD '<somepassword>';`
    - Example: `ALTER USER localuser WITH PASSWROD 'password';`

Once this is done you should be able to access the database from your local system using the following settings:

Host: localhost
Port: 5432
User: someusername
Password: somepassword
Database: django
URL: jdbc:postgresql://localhost:5432/django

NOTE: If using a JetBrains IDE to explore the DB it may by default hide the django DB. To the right of "django@localhost" in the Database Explorer view click on "x of x" (e.g. "1 of 2") and ensure "django" is selected.
