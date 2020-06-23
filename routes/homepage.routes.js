const router = require('express').Router();
const knex = require('../config/KnexConnection');

// get all logs for a user
router.get('/getAllLogs', async (req, res) => {
    let result = await knex('log').where({deleted: false}).orderBy('id', 'desc').limit(30);
    res.send(result);
})

router.get('/sumByType', async (req,res) => {
    let result = await knex('log')
    .join('type', 'type.id', 'log.type_id')
    .select(knex.raw("type.name, sum(time) as time"))
    .groupBy('type.id')
    .orderBy('time', 'desc')
    res.send(result);
})


router.post('/getLastWeek', async (req, res) => {
    let result = await knex('log')
    .join('language', 'language.id', 'log.language_id')
    .select(knex.raw("DATE_FORMAT(log.date, '%Y-%m-%d') as date, sum(log.time) as time, language.name as language"))
    .andWhere('date', '<=', req.body.today)
    .andWhere('date', '>=', req.body.lastWeek)
    .andWhere('deleted', '=', '0')
    .groupBy('date')
    .groupBy('language_id')
    .orderBy('language_id')
    .orderBy('date', 'asc')

    res.send(result);
})






module.exports = router