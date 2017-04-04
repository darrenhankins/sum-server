
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex.raw('DELETE FROM "group"; ALTER SEQUENCE group_id_seq RESTART WITH 1')
    .then(function() {
      const groups = [{
        user_id: 1,
        name: 'Family (user1)'
      },{
        user_id: 1,
        name: 'Friends (user1)'
      },{
        user_id: 1,
        name: 'Co-Workers (user1)'
      },{
        user_id: 2,
        name: 'Family (user2)'
      },{
        user_id: 3,
        name: 'Family (user3)'
      }];
      return knex('group').insert(groups);
    });
};
