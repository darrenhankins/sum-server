
exports.up = function(knex, Promise) {
  return knex.schema.createTable('friend', table => {
    table.increments();
    table.text('name').notNullable();
    table.text('email').unique();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('friend');
};
