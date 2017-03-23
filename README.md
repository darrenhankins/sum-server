## Sum-Server

#### Server Set-up using Express, Knex


- 1.) Github Creation
- 2.) Express Install w/handlebars (decoupled app - not used)
    - `$ express --view=hbs --git`
- 3.) Install Knex
    - `$ npm install pg knex --save`
- 4.) Install Dotenv
    - `$ npm install dotenv  --save `
- 5.) Create Knex.js file
    - `$ init knex`
    - knexfile.js
    ```js
    require("dotenv").config();
    module.exports = {
        development: {
          client: 'pg',
          connection: 'postgres://localhost/db-name'
        },
        production: {
          client: 'pg',
          connection: process.env.DATABASE_URL + '?ssl=true'
        }
    };
    ```
- 6.) Create `dotenv` and `dotenv.sample` file, add to .gitignore
    - `$ touch .env .env.sample`
    - `$ echo .env >> .gitignore`
- 7.) Create a database
    - `$ createdb sum-app;`
- 8.) Create migrations
    - `$ knex migrate:make`
    - `$ knex migrate:latest`
- 9.) Seed database
    - `$ knex seed:make 01-user`
    - `$ knex seed:run`
- 10.) Install Bookshelfjs or Objection
    - `$ npm install bookself --save`
    - `$ npm install objection --save`
- 11.) Create a new folder for the database connection script
    - db folder
    - knex.js connection file
    ```js
    var config = require('../knexfile')[process.env.NODE_ENV || 'development'];
    module.exports = require('knex')(config);

    ```
- 12.) Install Cors
    - `$ npm install cors --save`
- 13.) Install UUID (creates a unique id)
    - `$ npm install uuid --save`
- 14.) Install NodeMailer (send emails)
    - `$ npm install nodemailer --save`
- 15.) Install bcrypt
    - `$ yarn add bcrypt`
- 16.) Install JWT
    - https://jwt.io/introduction/
    - `$ npm install jsonwebtoken --save`
    - `$ npm install jwt-simple --save`

---

### Testing routes

- `$ nodemon`
- Postman
  - `http://localhost:3000/items/2`

---

### Testing front end

- `$ npm start`
- http://localhost:3000/
- https://sum-app.herokuapp.com/
- https://sum-app.herokuapp.com/
- user/1/items (GET)
- user/1/items (POST)

---

### ERD

<img src="../images/sum-app-erd.png" width="500px">

---

### Heroku Deployment

```
$ heroku login
$ heroku create sum-app
$ heroku addons:create heroku-postgresql --app sum-app  // Add databases
$ heroku config --app sum-app  // Get database URL
$ git add -A
$ git commit -m "Initial Heroku Deployment"
$ git push heroku master
$ knex migrate:latest --env production
$ knex seed:run --env production
$ heroku pg:psql  // connect database

```

Bike Helmet

Kids Blue Bicycle Helment

http://media.micro-scooters.co.uk/media/catalog/product/cache/1/thumbnail/632x770/17f82f742ffe127f42dca9de82fb58b1/M/A/MAH01NBU.png
