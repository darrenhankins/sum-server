
exports.up = function(knex, Promise) {
  return knex.schema.createTable('group_user', table => {
    table.increments();
    table.integer('user_id').references('user.id').unsigned().onDelete('cascade');
    table.integer('group_id').references('group.id').unsigned().onDelete('cascade');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('group_user');
};
