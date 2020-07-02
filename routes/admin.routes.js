const router = require('express').Router();
const knex = require('../config/KnexConnection');


router.get('/', (req, res) => {
    res.render('admin')
})

router.get('/count-users', async (req, res) => {
    let result = await knex('user').select(knex.raw('count(*) as count'));
    res.send(result[0]);
})

router.get('/count-logs', async (req, res) => {
    let result = await knex('log').select(knex.raw('count(*) as count')).where('deleted', '=', '0');
    res.send(result[0]);
})

router.get('/count-hours', async (req, res) => {
    let result = await knex('log').select(knex.raw('sum(time) as minutes')).where('deleted', '=', '0');
    result[0].hours = result[0].minutes/60;
    res.send(result[0]);
})

router.get('/count-languages', async (req, res) => {
    let result = await knex('log').select(knex.raw('count(distinct language_id) as count'));
    console.log(result)
    res.send(result[0]);
})

router.get('/get-top-users', async (req, res) => {
    let result = await knex('log')
                .join('user', 'user.id', 'log.user_id')
                .select(knex.raw('user.username, count(log.user_id) as count'))
                .groupBy('log.user_id')
                .where('user.username', '<>', '""')
                .orderBy('count', 'desc');
    res.send(result);
})

router.get('/get-new-users', async (req, res) => {
    let result = await knex('log')
                .join('user', 'user.id', 'log.user_id')
                .select(knex.raw('user.username, count(log.user_id) as count'))
                .groupBy('log.user_id')
                .where('user.username', '<>', '""')
                .orderBy('user.id', 'desc');
    res.send(result);
})

module.exports = router;