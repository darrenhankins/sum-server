
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex.raw('DELETE FROM group_user; ALTER SEQUENCE group_user_id_seq RESTART WITH 1')
    .then(function(){
      const group_users = [{
        user_id: 1,
        group_id: 1
      },{
        user_id: 1,
        group_id: 2
      },{
        user_id: 2,
        group_id: 1
      }];
      return knex('group_user').insert(group_users);
    });
};
