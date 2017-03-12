
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex.raw('DELETE FROM friend; ALTER SEQUENCE friend_id_seq RESTART WITH 1')
    .then(function() {
      const friends = [{
        name: 'friend1',
        email: 'friend1@test.com'
      },{
        name: 'friend2',
        email: 'friend2@test.com'
      }];
      return knex('friend').insert(friends);
    });
};
