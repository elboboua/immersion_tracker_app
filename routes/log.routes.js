const router = require('express').Router();
const knex = require('../config/KnexConnection');

// get all logs for a user
router.get('/getAllLogs', async (req, res) => {

    let result = await knex('log').where({user_id: req.user.id, deleted: false}).orderBy('date', 'desc').orderBy('id', 'desc');
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
        date: req.body.date
    }
    let result = await knex('log').insert(log);
    res.send(result[0].id)

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
    .select('date')
    .sum('time as time',)
    .groupBy('date')
    .as('time')
    .where({user_id: req.user.id})
    .andWhere('date', '<=', req.body.today)
    .andWhere('date', '>=', req.body.lastWeek)
    .orderBy('date', 'asc');
    console.log(result)

    res.send(result);
})


module.exports = router