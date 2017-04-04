
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex.raw('DELETE FROM friend; ALTER SEQUENCE friend_id_seq RESTART WITH 1')
    .then(function() {
      const friends = [{
        user_id: 1,
        name: 'Adrnln',
        email: 'darren@adrnln.com'
      },{
        user_id: 1,
        name: 'darren',
        email: 'darren@xtremecartoon.com'
      },{
        user_id: 1,
        name: 'sellonline',
        email: 'sellonline71@gmail.com'
      },{
        user_id: 2,
        name: 'hankins.darren',
        email: 'hankins.darren@gmail.com'
      },{
        user_id: 3,
        name: 'Darren Hankins',
        email: 'darren.hankins00@gmail.com'
      },{
        user_id: 3,
        name: 'hankins.darren.3',
        email: 'hankins.darren@gmail.com'
      },{
        user_id: 2,
        name: 'hankins.darren.2',
        email: 'hankins.darren@gmail.com'
      }];
      return knex('friend').insert(friends);
    });
};
