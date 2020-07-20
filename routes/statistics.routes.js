const router = require('express').Router();
const knex = require('../config/KnexConnection');
const { andWhere } = require('../config/KnexConnection');

router.get('/get-languages', async (req, res) => {
    let result = await knex('language')
    .select(knex.raw('distinct(language.id), language.name'))
    .join('log', 'log.language_id', 'language.id')
    .join('user', 'log.user_id', 'user.id')
    .where('user.id', '=', req.user.id)
    .andWhere('log.deleted', '=', 0)
    .orderBy('language.name');

    res.send(result);
})

router.get('/get-focus-language', async (req, res) => {
    let focusLang = await knex('user')
    .select('focus_language_id')
    .where('id', '=', req.user.id);
    focusLang = focusLang[0];

    res.send(focusLang)
})


// get start date
router.get('/get-basic-stats/:language_id', async (req, res) => {
    // get start date
    let start_date = await knex('log')
    .select(knex.raw('min(date) as start_date'))
    .where('user_id', '=', req.user.id)
    .andWhere('language_id', '=', req.params.language_id)
    .andWhere('deleted', '=', 0);

    // get total time
    let total_hours = await knex('log')
    .select(knex.raw('sum(time) as time '))
    .where('user_id', '=', req.user.id)
    .andWhere('language_id', '=', req.params.language_id)
    .andWhere('deleted', '=', 0);
    total_hours = Math.round((total_hours[0].time/60)*100)/100;

    // find daily average
    let today = new Date();
    let start = new Date(start_date[0].start_date);
    let diffTime = Math.abs(today-start);
    let diffDays = Math.ceil(diffTime/(1000*60*60*24));
    let daily_average = Math.round((total_hours/diffDays)*100) / 100;
    


    let result = {
        start_date: start_date[0].start_date,
        total_hours,
        daily_average
    }


    res.send(result)

})

router.get('/get-ratio/:language_id', async (req, res) => {

    let result = await knex('log')
    .join('type', 'type.id', 'log.type_id')
    .join('language', 'language.id', 'log.language_id')
    .select(knex.raw("type.name as type, language.name as language, sum(time) as time"))
    .where('log.user_id', '=', req.user.id)
    .andWhere('language_id', '=', req.params.language_id)
    .andWhere('log.deleted', '=', 0)
    .groupBy('type.id')
    .groupBy('log.language_id')
    .orderBy('language', 'asc')
    .orderBy('time', 'desc')

    res.send(result);
})

router.post('/get-last-week/:language_id', async (req, res) => {

    let result = await knex('log')
    .select(knex.raw("date, sum(time) as time"))
    .where('user_id', '=', req.user.id)
    .andWhere('date', '<=', req.body.today)
    .andWhere('date', '>=', req.body.lastWeek)
    .andWhere('deleted', '=', '0')
    .andWhere('language_id', '=', req.params.language_id)
    .groupBy('date')
    .orderBy('date', 'asc');

    res.send(result)
})

module.exports = router;