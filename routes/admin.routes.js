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

router.get('/count-languages', async (req, res) => {
    let result = await knex('log').select(knex.raw('count(distinct language_id) as count'));
    console.log(result)
    res.send(result[0]);
})

module.exports = router;