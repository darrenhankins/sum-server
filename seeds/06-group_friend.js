
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex.raw('DELETE FROM group_friend; ALTER SEQUENCE group_friend_id_seq RESTART WITH 1')
    .then(function(){
      const group_friends = [{
        // darren - family - david
        // user_id: 1,
        group_id: 1,
        friend_id: 1
      },{
        // darren - family- doug
        // user_id: 2,
        group_id: 1,
        friend_id: 2
      },{
        // darren - co-workers - phil
        // user_id: 2,
        group_id: 3,
        friend_id: 8
      },{
        // darren - co-workers - matt
        // user_id: 2,
        group_id: 3,
        friend_id: 9
      },{
        // darren - co-workers - paul
        // user_id: 2,
        group_id: 2,
        friend_id: 10
      },{
        // darren - friends- jesse
        // user_id: 2,
        group_id: 2,
        friend_id: 3
      },{
        // jesse - family- robert
        // user_id: 2,
        group_id: 4,
        friend_id: 4
      },{
        // jesse - friend - paul
        // user_id: 2,
        group_id: 5,
        friend_id: 5
      },{
        // doug - family - david
        // user_id: 3,
        group_id: 6,
        friend_id: 6
      },{
        // doug - family - darren
        // user_id: 3,
        group_id: 6,
        friend_id: 7
      }];
      return knex('group_friend').insert(group_friends);
    });
};
