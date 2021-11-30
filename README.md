# Storefront Backend Project
development environment: Windows 11, Node v16.13.0, typescript

This server runs on localhost port 3000 and my PostgresSQL runs on localhost port 5432

## Getting Started
After you cloned this repo don't forget to: 'npm install'

Before DB migration make sure that you have created 2 DB's, 1 for development and another for test cases(continue reading in DB Creation and Migrations section).

To migrate db schema: 'npm run migrate'

To run tests in test env: 'npm run test'

To run tests in dev env: 'npm run jasmine' or 'jasmine'

to build project into build folder: 'npm run tsc'

To run and watch: 'npm run watch'

## DB Creation and Migrations
Create 2 Postgres databases 1 for development and another for test.

Add your DB values like db name, user etc. into .env file and into database.json file

Note: You need to create an .env file if it doesn't exist.  <br/>
Note: For testin set PEPPER in .env: PEPPER=tere_tali_kas_see_on_nali otherwise some of the tests may fail. <br/>
But in production keep this PEPPER extremely secret!

Example .env file content:

PG_HOST=127.0.0.1  <br/>
PG_DB=db_name  <br/>
PG_DB_TEST=test_db_name  <br/>
PG_USER=full_stack_user  <br/>
PG_PWD=db password  <br/>
ENV=dev  <br/>
BCRYPT_PASSWORD=password  <br/>
SALT_ROUNDS=10  <br/>
PEPPER=tere_tali_kas_see_on_nali  <br/>
TOKEN_SECRET=kas_siit_saab_putru  <br/>

Take a look at package.json file for all available commands.

## Express endpoints

GET '/users/auth'  returns auth token [token required]<br/>
GET '/users/:id'  return user with id [token required]<br/>
GET '/users/:id/current-order'  returns user active order [token required]<br/>
GET '/users/:id/completed-orders'  returns user completed orders [token required]<br/>
GET '/users'  returns all users [token required]<br/>
POST '/users'  use request header body to make new user [token required]<br/>
body raw json example: <br/>
```
{
    "first_name": "morten",
    "last_name": "kose",
    "password": "vitamiin"
}
```
GET '/products/category/:category'  <br/>
GET '/products/top-5'  <br/>
GET '/products'  <br/>
GET '/products/:id'  <br/>
POST '/products'  use request header body to make new user [token required]<br/>
body raw json example: <br/>
```
{
    "name": "tuuuus",
    "price": 5,
    "category": "toode"
}
```