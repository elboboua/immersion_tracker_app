const router = require('express').Router();
const knex = require('../config/KnexConnection');

router.get('/stats/top-users', async (req, res) => {
    let result = await knex('user')
    .join('log', 'log.user_id', 'user.id')
    .select(knex.raw('user.username, user.avatar_name, sum(log.time) as time'))
    .whereRaw('log.date_created >= DATE(NOW()) - INTERVAL 7 DAY')
    .andWhere('deleted', '=', '0')
    .andWhere('private', '=', '0')
    .groupBy('log.user_id')
    .orderBy('time', 'desc')
    .limit(5)

    res.send(result);
})

router.get('/:username', (req, res) => {
    if (req.user) {
        res.render('user', {
            layout: 'logged-in'
        });  
    } else {
        res.render('user');
    }
})

router.get('/:username/followers-following', (req, res) => {
    if (req.user) {
        res.render('followers-following', {
            layout: 'logged-in'
        });  
    } else {
        res.render('followers-following');
    }
})

router.get('/:username/avatar', async (req, res) => {
    let result = await knex('user').select('avatar_name').where({username: req.params.username});
    res.json({avatar_name: result[0].avatar_name})
})

router.get('/:username/get-dashboard-info', async (req, res) => {
    let user = await knex('user').where({username: req.params.username})
    let loggedHours = await knex('log').select(knex.raw('sum(time) as time')).where({user_id: user[0].id}).andWhere('deleted', '=', 0)
    loggedHours = (loggedHours[0].time)
    res.send({
        username: req.params.username,
        loggedHours
    });
})

// get all logs for a user
router.get('/:username/getAllLogs', async (req, res) => {
    let user = await knex('user').where({username: req.params.username});
    let result = await knex('log').where({user_id: user[0].id, deleted: false}).orderBy('date_created', 'desc');
    res.send(result);
})

router.get('/:username/getAllLogsWithLanguages', async (req, res) => {
    let user = await knex('user').where({username: req.params.username});
    let result = await knex('log')
    .select('log.id')
    .select('log.name')
    .select('log.date')
    .select('language.name as language')
    .select('log.time')
    .select('type.name as type')
    .join('language', 'language.id', 'log.language_id' )
    .join('type', 'type.id', 'log.type_id')
    .where({user_id: user[0].id, deleted: false})
    .orderBy('date_created', 'desc')
    .orderBy('id', 'desc');
    res.send(result);
});

router.get('/:username/getLogsDate', async (req, res) => {
    let user = await knex('user').where({username: req.params.username});
    let result = await knex('log').select(knex.raw("distinct(DATE_FORMAT(date_created, '%Y-%m-%d')) as date")).where({user_id: user[0].id, deleted: false}).orderBy('date', 'desc');
    res.send(result);
})


router.post('/:username/getLastWeek', async (req, res) => {
    let user = await knex('user').where({username: req.params.username});
    let result = await knex('log')
    .join('language', 'language.id', 'log.language_id')
    .select(knex.raw("DATE_FORMAT(log.date, '%Y-%m-%d') as date, sum(log.time) as time, language.name as language"))
    .where({user_id: user[0].id})
    .andWhere('date', '<=', req.body.today)
    .andWhere('date', '>=', req.body.lastWeek)
    .andWhere('deleted', '=', '0')
    .groupBy('date')
    .groupBy('language_id')
    .orderBy('language_id')
    .orderBy('date', 'asc')

    res.send(result);
})

router.post('/:username/getLastMonth', async (req, res) => {
    let user = await knex('user').where({username: req.params.username});
    let result = await knex('log')
    .join('language', 'language.id', 'log.language_id')
    .select(knex.raw("DATE_FORMAT(log.date, '%Y-%m-%d') as date, sum(log.time) as time, language.name as language"))
    .where({user_id: user[0].id})
    .andWhere('date', '<=', req.body.today)
    .andWhere('date', '>=', req.body.lastMonth)
    .andWhere('deleted', '=', '0')
    .groupBy('date')
    .groupBy('language_id')
    .orderBy('language_id')
    .orderBy('date', 'asc')
    res.send(result);

})

router.post('/:username/getLastYear', async (req, res) => {

    let date = new Date();
    let user = await knex('user').where({username: req.params.username});
    let result = await knex('log')
    .join('language', 'language.id', 'log.language_id')
    .select(knex.raw('month(date) as date, sum(log.time) as time, language.name as language'))
    .where({user_id: user[0].id})
    .andWhere('date', '<=', req.body.today)
    .andWhere('date', '>=', req.body.lastYear)
    .andWhere('deleted', '=', '0')
    .groupBy(knex.raw('month(date)'))
    .groupBy('language_id')
    .orderBy('language_id')
    .orderBy('date', 'asc')

    res.send(result);
})

router.post('/:username/getAllTime', async (req, res) => {

    let user = await knex('user').where({username: req.params.username});
    let result = await knex('log')
    .join('language', 'language.id', 'log.language_id')
    .select(knex.raw('year(date) as year, sum(log.time) as time, language.name as language'))
    .where({user_id: user[0].id})
    .andWhere('date', '<=', req.body.today)
    .andWhere('deleted', '=', '0')
    .groupBy(knex.raw('year(date)'))
    .groupBy('language_id')
    .orderBy('language_id')
    .orderBy('year', 'asc')

    res.send(result);
})
module.exports = router;