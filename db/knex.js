var config = require('../knexfile')[process.env.NODE_ENV || 'development'];
module.exports = require('knex')(config);

// var knex = require('knex');
// module.exports = require('bookshelf')(knex)(config);
