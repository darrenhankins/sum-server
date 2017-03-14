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
- 10.) Install Bookshelfjs
    - `$ npm install bookself --save`
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

---

### Testing routes

- `$ nodemon`
- Postman
  - `http://localhost:3000/items/2`

---

### Testing front end

- `$ npm start`
- http://localhost:3000/
