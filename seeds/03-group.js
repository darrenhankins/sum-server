
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex.raw('DELETE FROM "group"; ALTER SEQUENCE group_id_seq RESTART WITH 1')
    .then(function() {
      const groups = [{
        user_id: 1,
        name: 'Family (darren)'
      },{
        user_id: 1,
        name: 'Friends (darren)'
      },{
        user_id: 1,
        name: 'Co-Workers (darren)'
      },{
        user_id: 2,
        name: 'Family (jesse)'
      },{
        user_id: 2,
        name: 'Friends (jesse)'
      },{
        user_id: 3,
        name: 'Family (doug)'
      },{
        user_id: 3,
        name: 'friends (doug)'
      }];
      return knex('group').insert(groups);
    });
};
