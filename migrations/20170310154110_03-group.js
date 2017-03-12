
exports.up = function(knex, Promise) {
  return knex.schema.createTable('group', table =>{
    table.increments();
    table.text('name').notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('group');
};
