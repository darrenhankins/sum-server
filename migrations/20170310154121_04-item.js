
exports.up = function(knex, Promise) {
  return knex.schema.createTable('item', table => {
    table.increments();
    table.integer('user_id').references('user.id').unsigned().onDelete('cascade');
    table.text('name').notNullable();
    table.text('description');
    table.text('image_url');
    table.boolean('free').defaultTo('true');
    table.boolean('available').defaultTo('true');
    table.text('uuid');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('item');
};
