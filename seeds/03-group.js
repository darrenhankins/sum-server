
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex.raw('DELETE FROM "group"; ALTER SEQUENCE group_id_seq RESTART WITH 1')
    .then(function() {
      const groups = [{
        user_id: 1,
        name: 'Family'
      },{
        user_id: 1,
        name: 'Friends'
      },{
        user_id: 1,
        name: 'Broncos Tickets'
      },{
        user_id: 1,
        name: 'Rockies Tickets'
      },{
        user_id: 2,
        name: 'Family Members'
      }];
      return knex('group').insert(groups);
    });
};
