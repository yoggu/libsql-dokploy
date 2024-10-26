1.  Generate a new keypair running:

```
node gen_jwt.mjs
```

2. Use the jwt_key.base64 and set as your environment variable SQLD_AUTH_JWT_KEY in your libsql docker compose

3. to insert some example users run

```
DATABASE_URL="..." AUTH_TOKEN="..." node example_data.mjs
```

DATABASE_URL -> the url to the db "http://....."
AUTH_TOKEN -> the generated JWT Token
