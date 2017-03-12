
exports.up = function(knex, Promise) {
  return knex.schema.createTable('group_item', table => {
    table.increments();
    table.integer('item_id').references('item.id').unsigned().onDelete('cascade');
    table.integer('group_id').references('group.id').unsigned().onDelete('cascade');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('group_item');
};
