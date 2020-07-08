const router = require('express').Router();
const logModels = require('../models/log.models');
const knex = require('../config/KnexConnection');


// get all logs for a user
router.get('/getAllLogs', async (req, res) => {
    let result = await logModels.getAllLogsByID(req.user.id);
    res.send(result);
})

router.get('/getAllLogsWithLanguages', async (req, res) => {
    let result = await logModels.getAllLogsJoinLanguage(req.user.id);
    res.send(result);
})

router.get('/get-community-logs', async (req, res) => {
    let result = await knex('log')
    .join('user', 'user.id', 'log.user_id')
    .join('language', 'language.id', 'log.language_id')
    .join('type', 'type.id', 'log.type_id')
    .select(knex.raw('username, avatar_name, user_id, log.name as activity, log.time, log.date, language.name as language, type.name as type'))
    .where('private', '=', 0)
    .orderBy('date_created', 'desc')
    .limit(100)
    res.send(result);
})

router.get('/getLogsDate', async (req, res) => {
    let result = await logModels.getLogsDateByID(req.user.id);
    res.send(result);
})

// create a new log
router.post('/create', async (req, res) => {
    await logModels.insertLog(req.body, req.user);
    res.redirect('/')
})

router.post('/delete', async (req, res) => {
    let result = await logModels.deleteLog(req.body);
    let status;
    if (result > 0) {
        status = 200;
    } else {
        status = 404;
    }
    res.sendStatus(status);
})

router.post('/getLastWeek', async (req, res) => {
    let result = await logModels.getLastWeek(req.body, req.user);
    res.send(result);
})

router.post('/getLastMonth', async (req, res) => {

    let result = await logModels.getLastMonth(req.body, req.user)
    res.send(result);

})

router.post('/getLastYear', async (req, res) => {
    let result = await logModels.getLastYear(req.body, req.user);
    res.send(result);
})

router.post('/getAllTime', async (req, res) => {
    let result = await logModels.getAllTime(req.body, req.user);
    res.send(result);
})

router.get('/getRatios', async (req,res) => {
    let result = await knex('log')
    .join('type', 'type.id', 'log.type_id')
    .join('language', 'language.id', 'log.language_id')
    .select(knex.raw("type.name as type, language.name as language, sum(time) as time"))
    .where('log.user_id', '=', req.user.id)
    .andWhere('log.deleted', '=', 0)
    .groupBy('type.id')
    .groupBy('log.language_id')
    .orderBy('language', 'asc')
    .orderBy('time', 'desc')
    res.send(result);
})


module.exports = router