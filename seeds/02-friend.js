
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex.raw('DELETE FROM friend; ALTER SEQUENCE friend_id_seq RESTART WITH 1')
    .then(function() {
      const friends = [{
        user_id: 1,
        name: 'Paul',
        email: 'sharesumstuff@gmail.com'
      },{
        user_id: 1,
        name: 'Darren',
        email: 'darren@adrnln.com'
      }];
      return knex('friend').insert(friends);
    });
};
