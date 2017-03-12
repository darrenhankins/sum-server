var config = require('../knexfile')[process.env.NODE_ENV || 'development'];
var knex = require('knex');
module.exports = require('bookshelf')(knex)(config);
