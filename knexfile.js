// Update with your config settings.
require("dotenv").config();
module.exports = {

  development: {
    client: 'pg',
    connection: 'postgresql://localhost/sum-app'
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL+'?ssl=true'
  }
};
