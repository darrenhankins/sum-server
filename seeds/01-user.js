var bcrypt = require('bcryptjs');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex.raw('DELETE FROM "user"; ALTER SEQUENCE user_id_seq RESTART WITH 1')
    .then(function() {
      const users = [{
        username: 'test1',
        email: 'test1@test1.com',
        password:  bcrypt.hashSync('test1', 10)
      },{
        username: 'test2',
        email: 'test2@test2.com',
        password: bcrypt.hashSync('test2', 10)
      },{
        username: 'test3',
        email: 'test3@test3.com',
        password: bcrypt.hashSync('test3', 10)
      }];
      return knex('user').insert(users);
    });
};
