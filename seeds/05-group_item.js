
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex.raw('DELETE FROM group_item; ALTER SEQUENCE group_item_id_seq RESTART WITH 1')
    .then(function(){
      const group_items = [{
        item_id: 1,
        group_id: 1
      },{
        item_id: 1,
        group_id: 2
      },{
        item_id: 1,
        group_id: 3
      },{
        item_id: 2,
        group_id: 1
      },{
        item_id: 2,
        group_id: 3
      },{
        item_id: 3,
        group_id: 4
      },{
        item_id: 4,
        group_id: 4
      },{
        item_id: 5,
        group_id: 5
      },{
        item_id: 6,
        group_id: 5
      },{
        item_id: 7,
        group_id: 5
      }];
      return knex('group_item').insert(group_items);
    });
};
