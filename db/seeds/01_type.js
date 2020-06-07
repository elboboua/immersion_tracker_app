const tableNames = require('../../constants/tableNames')

exports.seed = async (knex) => {
  // Deletes ALL existing entries
  await knex(tableNames.type).del();

  await knex(tableNames.type).insert([
    {name: 'Listening'},
    {name: 'Reading'},
    {name: 'Writing'},
    {name: 'Reading'},
    {name: 'Grammar'},
    {name: 'Vocabulary'},
    {name: 'Pronunciation'},
  ])
};
