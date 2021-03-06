
exports.up = function(knex, Promise) {
  return knex.schema.createTable('group_friend', table => {
    table.increments();
    table.integer('group_id').references('group.id').unsigned().onDelete('cascade');
    table.integer('friend_id').references('friend.id').unsigned().onDelete('cascade');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('group_friend');
};
