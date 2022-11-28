When Postgres is setup as part of setting up a dev instance of MIQA no password is set for the `postgres` user. This is fine if one is dropping into the Postgres container terminal and running `psql -U postgres` but makes it difficult to access if you want to use an IDE on your local machine.

To rectify this issue:

1. Open the terminal for the Postgres container.
2. Run `psql -U postgres`
3. Create a new user with `CREATE USER <someusername> LOGIN SUPERUSER;`
4. Give the user access to the `django` database: `GRANT ALL ON DATABASE django TO <someusername>`

Once this is done you should be able to access the database from your local system.