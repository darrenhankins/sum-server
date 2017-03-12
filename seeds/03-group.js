
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex.raw('DELETE FROM "group"; ALTER SEQUENCE group_id_seq RESTART WITH 1')
    .then(function() {
      const groups = [{
        name: 'group1'
      },{
        name: 'group2'
      }];
      return knex('group').insert(groups);
    });
};
