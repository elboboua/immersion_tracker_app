const tableNames = require('../../constants/tableNames')


exports.seed = async (knex) => {
  // Deletes ALL existing entries

  await knex(tableNames.user).del()
   
  await knex(tableNames.user).insert([
    {name: 'Johnny Bluegras', email: 'jo@apple.co', google_id: '1234yujgfw5hsgrsev'},
    {name: 'Timothy Winter', email: 'abdlhkm@cam.bridge', google_id: 'asdg76as7dfg68af8'},
    {name: 'Kishek Bobbo', email: 'Iam@a.cat', google_id: 'asd344g8sfr9s8e'},
  ])
};
