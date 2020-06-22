const router = require('express').Router();
const knex = require('../config/KnexConnection');

// get all logs for a user
router.get('/getAllLogs', async (req, res) => {

    let result = await knex('log').where({user_id: req.user.id, deleted: false}).orderBy('id', 'desc');
    res.send(result);
})

// create a new log
router.post('/create', async (req, res) => {
    // create a log
    // a log has these columns name, time, date, type_id, user_id, language_id
    let log = {
        name: req.body.name,
        user_id: parseInt(req.user.id),
        language_id: parseInt(req.body.language_id),
        type_id: parseInt(req.body.type_id),
        time: req.body.time,
        date: req.body.date,
        date_created: new Date().toISOString().slice(0,10),
    }
    let result = await knex('log').insert(log);
    //res.send(result[0].id)
    res.redirect('/')
})

router.post('/delete', async (req, res) => {
    let result = await knex('log').update({deleted: true}).where({id: req.body.id});
    let status;
    if (result > 0) {
        status = 200;
    } else {
        status = 404;
    }
    res.sendStatus(status);
})

router.post('/getLastWeek', async (req, res) => {
    let result = await knex('log')
    .join('language', 'language.id', 'log.language_id')
    .select(knex.raw("DATE_FORMAT(log.date, '%Y-%m-%d') as date, sum(log.time) as time, language.name as language"))
    .where({user_id: req.user.id})
    .andWhere('date', '<=', req.body.today)
    .andWhere('date', '>=', req.body.lastWeek)
    .andWhere('deleted', '=', '0')
    .groupBy('date')
    .groupBy('language_id')
    .orderBy('language_id')
    .orderBy('date', 'asc')

    res.send(result);
})

router.post('/getLastMonth', async (req, res) => {

    let result = await knex('log')
    .join('language', 'language.id', 'log.language_id')
    .select(knex.raw("DATE_FORMAT(log.date, '%Y-%m-%d') as date, sum(log.time) as time, language.name as language"))
    .where({user_id: req.user.id})
    .andWhere('date', '<=', req.body.today)
    .andWhere('date', '>=', req.body.lastMonth)
    .andWhere('deleted', '=', '0')
    .groupBy('date')
    .groupBy('language_id')
    .orderBy('language_id')
    .orderBy('date', 'asc')
    res.send(result);

})

router.post('/getLastYear', async (req, res) => {

    let date = new Date();
    
    let result = await knex('log')
    .join('language', 'language.id', 'log.language_id')
    .select(knex.raw('month(date) as date, sum(log.time) as time, language.name as language'))
    .where({user_id: req.user.id})
    .andWhere('date', '<=', req.body.today)
    .andWhere('date', '>=', req.body.lastYear)
    .andWhere('deleted', '=', '0')
    .groupBy(knex.raw('month(date)'))
    .groupBy('language_id')
    .orderBy('language_id')
    .orderBy('date', 'asc')

    res.send(result);
})

router.post('/getAllTime', async (req, res) => {

    
    let result = await knex('log')
    .join('language', 'language.id', 'log.language_id')
    .select(knex.raw('year(date) as year, sum(log.time) as time, language.name as language'))
    .where({user_id: req.user.id})
    .andWhere('date', '<=', req.body.today)
    .andWhere('deleted', '=', '0')
    .groupBy(knex.raw('year(date)'))
    .groupBy('language_id')
    .orderBy('language_id')
    .orderBy('year', 'asc')

    res.send(result);
})


module.exports = router