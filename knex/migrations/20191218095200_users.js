exports.up = async knex => {
    await knex.schema.createTable('users', function(table) {
        table.increments('id').unsigned().primary();
        table.string('name').notNull();
        table.string('location').notNull();
        table.string('profile_img');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
};

exports.down = async knex => {
    await knex.schema.dropTableIfExists('users');
};