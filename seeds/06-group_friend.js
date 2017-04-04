
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex.raw('DELETE FROM group_friend; ALTER SEQUENCE group_friend_id_seq RESTART WITH 1')
    .then(function(){
      const group_friends = [{
        group_id: 1,
        friend_id: 1
      },{
        group_id: 1,
        friend_id: 2
      },{
        group_id: 1,
        friend_id: 3
      },{
        group_id: 2,
        friend_id: 4
      },{
        group_id: 3,
        friend_id: 5
      },{
        group_id: 4,
        friend_id: 6
      },{
        group_id: 5,
        friend_id: 7
      }];
      return knex('group_friend').insert(group_friends);
    });
};
