var bcrypt = require('bcrypt');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex.raw('DELETE FROM "user"; ALTER SEQUENCE user_id_seq RESTART WITH 1')
    .then(function() {
      const users = [{
        username: 'monkey',
        email: 'test1@test1.com',
        password:  bcrypt.hashSync('test1', 10)
      // },{
      //   username: 'bear',
      //   email: 'test2@test2.com',
      //   password: 'test2'
      }];
      return knex('user').insert(users);
    });
};
