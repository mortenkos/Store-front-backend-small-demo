# Storefront Backend Project
development environment: Windows 11, Node v16.13.0, typescript

This server runs on localhost port 3000 and my PostgresSQL runs on localhost port 5432

## Getting Started
After you cloned this repo don't forget to: 'npm install'

Before DB migration make sure that you have crated 2 DB's, 1 for development and another for test cases(continue reading in DB Creation and Migrations section).

To migrate db schema: 'npm run migrate'

To run tests in test env: 'npm run test'

To run tests in dev env: 'npm run jasmine' or 'jasmine'

to build project into build folder: 'npm run tsc'

To run and watch: 'npm run watch'

## DB Creation and Migrations
Create 2 Postgres databases 1 for development and another for test.

Add your DB values like db name, user etc. into .env file and into database.json file

Note: You need to create an .env file if it doesn't exist.
Note: For testin set PEPPER in .env: PEPPER=tere_tali_kas_see_on_nali otherwise some of the tests may fail. 
But in production keep this PEPPER extremely secret!

Example .env file content:

PG_HOST=127.0.0.1
PG_DB=db_name
PG_DB_TEST=test_db_name
PG_USER=full_stack_user
PG_PWD=db password
ENV=dev
BCRYPT_PASSWORD=password
SALT_ROUNDS=10
PEPPER=tere_tali_kas_see_on_nali
TOKEN_SECRET=kas_siit_saab_putru

Take a look at package.json file for all available commands.

## Express endpoints

'/users/auth'
'/users/:id'
'/users/:id/current-order'
'/users/:id/completed-orders'
'/users'
'/users'
'/products/category/:category'
'/products/top-5'
'/products'
'/products/:id'
'/products'