const Knex = require('knex')
const tableNames = require('../../constants/tableNames')

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
    await knex.schema.createTable(tableNames.user, (table) => {
        table.increments().notNullable();
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('google_id').notNullable();
    })

    await knex.schema.createTable(tableNames.language, (table) => {
        table.increments().notNullable();
        table.string('name').notNullable();
    })

    await knex.schema.createTable(tableNames.type, (table) => {
        table.increments().notNullable();
        table.string('name').notNullable();
    })

    await knex.schema.createTable(tableNames.log, (table) => {
        table.increments().notNullable();
        table.string('name').nullable();
        table.integer('user_id').unsigned().references('id').inTable('user');
        table.integer('language_id').unsigned().references('id').inTable('language');
        table.integer('type_id').unsigned().references('id').inTable('type');
        table.decimal('time').notNullable();
        table.date('date').nullable();
    })
};

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
    await knex.schema.dropTable(tableNames.log);
    await knex.schema.dropTable(tableNames.type);
    await knex.schema.dropTable(tableNames.language);
    await knex.schema.dropTable(tableNames.user);

};
