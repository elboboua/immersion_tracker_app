const router = require('express').Router();
const knex = require('../config/KnexConnection');

router.get('/', async (req, res) => {
    let result = await knex('language').orderBy('name', 'asc');
    res.send(result);
})

router.get('/get-saved-languages', async (req, res) => {
    let result = await knex('language')
    .select(knex.raw('distinct(language.id), language.name'))
    .join('log', 'log.language_id', 'language.id')
    .join('user', 'log.user_id', 'user.id')
    .where('user.id', '=', req.user.id)
    .andWhere('log.deleted', '=', 0)
    .orderBy('language.name');

    result = result.concat(await knex('language').orderBy('name', 'asc'));

    res.send(result);

})


module.exports = router;