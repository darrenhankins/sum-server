
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
        item_id: 2,
        group_id: 1
      }];
      return knex('group_item').insert(group_items);
    });
};
