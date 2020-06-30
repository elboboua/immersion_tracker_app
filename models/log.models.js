const knex = require('../config/KnexConnection');

const getAllLogsByID = (id) => {
    return knex('log')
    .where({user_id: id, deleted: false})
    .orderBy('date_created', 'desc')
    .orderBy('id', 'desc');
}

const getAllLogsJoinLanguage = (id) => {
    return knex('log')
    .select('log.id')
    .select('log.name')
    .select('log.date')
    .select('language.name as language')
    .select('log.time')
    .select('type.name as type')
    .join('language', 'language.id', 'log.language_id' )
    .join('type', 'type.id', 'log.type_id')
    .where({user_id: id, deleted: false})
    .orderBy('date_created', 'desc')
    .orderBy('id', 'desc');
}

const getLogsDateByID = (id) => {
    return knex('log')
    .select(knex.raw("distinct(DATE_FORMAT(date_created, '%Y-%m-%d')) as date"))
    .where({user_id: id, deleted: false})
    .orderBy('date', 'desc');
}

const insertLog = (rb, ru) => {
    console.log(rb)
    let log = {
        name: rb.name,
        user_id: parseInt(ru.id),
        language_id: parseInt(rb.language_id),
        type_id: parseInt(rb.type_id),
        time: rb.time,
        date: rb.date,
        date_created: new Date().toISOString().slice(0,10),
    };
    return knex('log').insert(log);
}

const deleteLog = (rb) => {
    return knex('log').update({deleted: true}).where({id: rb.id});
}

const getLogsBetweenDates = (id, today, previousDate) => {
    return knex('log')
    .join('language', 'language.id', 'log.language_id')
    .select(knex.raw("DATE_FORMAT(log.date, '%Y-%m-%d') as date, sum(log.time) as time, language.name as language"))
    .where({user_id: id})
    .andWhere('date', '<=', today)
    .andWhere('date', '>=', previousDate)
    .andWhere('deleted', '=', '0')
    .groupBy('date')
    .groupBy('language_id')
    .orderBy('language_id')
    .orderBy('date', 'asc');
}

const getLastWeek = (rb, ru) => {
    return getLogsBetweenDates(ru.id, rb.today, rb.lastWeek);
}

const getLastMonth = (rb, ru) => {
    return getLogsBetweenDates(ru.id, rb.today, rb.lastMonth);
}

const getLastYear = (rb, ru) => {
    return knex('log')
    .join('language', 'language.id', 'log.language_id')
    .select(knex.raw('month(date) as date, sum(log.time) as time, language.name as language'))
    .where({user_id: ru.id})
    .andWhere('date', '<=', rb.today)
    .andWhere('date', '>=', rb.lastYear)
    .andWhere('deleted', '=', '0')
    .groupBy(knex.raw('month(date)'))
    .groupBy('language_id')
    .orderBy('language_id')
    .orderBy('date', 'asc');
}

const getAllTime = (rb, ru) => {
    return knex('log')
    .join('language', 'language.id', 'log.language_id')
    .select(knex.raw('year(date) as year, sum(log.time) as time, language.name as language'))
    .where({user_id: ru.id})
    .andWhere('date', '<=', rb.today)
    .andWhere('deleted', '=', '0')
    .groupBy(knex.raw('year(date)'))
    .groupBy('language_id')
    .orderBy('language_id')
    .orderBy('year', 'asc');
}

module.exports = {
    getAllLogsByID,
    getAllLogsJoinLanguage,
    getLogsDateByID,
    insertLog,
    deleteLog,
    getLastWeek,
    getLastMonth,
    getLastYear,
    getAllTime
}