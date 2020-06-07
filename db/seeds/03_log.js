const tableName = require('../../constants/tableNames')
const knexConnection = require('../../config/KnexConnection')
const Knex = require('knex')

/**
 * @param {Knex} knex
 */
exports.seed = async (knex) => {
  // Deletes ALL existing entries
  await knex(tableName.log).del();

  let user = JSON.parse(JSON.stringify(await knex(tableName.user).select('id').where({name: 'Kishek Bobbo'})));
  let language = JSON.parse(JSON.stringify(await knex(tableName.language).select('id').where({name: 'English'})));
  let type = JSON.parse(JSON.stringify(await knex(tableName.type).select('id').where({name: 'Listening'})));
  let date = new Date().toJSON().slice(0, 19).replace('T', ' ')

  await knex(tableName.log).insert([
    {
      name: 'Watched some fun youtube playthroughs',
      user_id: user[0].id,
      language_id: language[0].id,
      type_id: type[0].id,
      time: 60,
      date: date,
    },
  ])

};
