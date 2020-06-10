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

    console.log(req.body)
    let result = await knex('log')
    .select(knex.raw('date_format(date, "%Y-%m-%d") as date, sum(time) as time'))
    .where({user_id: req.user.id})
    .andWhere('date', '<=', req.body.today)
    .andWhere('date', '>=', req.body.lastWeek)
    .groupBy('date')
    .orderBy('date', 'asc');
    console.log(result)

    let result2  = await knex.raw(
        //`select sum(time), date from log where date between ${req.body.lastWeek} and ${req.body.today} and user_id = ${req.user.id} group by date`
        "select date, sum(time) from log where date between '2020-06-02' and '2020-06-09' and user_id = 9 group by date"
        )
        console.log(result2)

    res.send(result);
})


module.exports = router