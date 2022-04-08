# CRUD in Sequelize
## Migrations
In migrations dir we create the blueprint for the tables in postgreSQL for the given DB.
With the createTable() method we create a table with the given columns

## Seeders
We use seeders to pass default values to the tables defined in migrations. In our case we use faker library to generate multiple random data

## src/models
In models dir we create models/blueprints for each type of object whether it's a user, an account, or a post. Don't forget to initialize them in the index file using initializeModel method

## src/repositories
Under the repositories dir we define controllers within classes, which are in turn used in app routes to present the necessary data