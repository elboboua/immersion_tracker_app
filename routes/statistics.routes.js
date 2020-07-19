const router = require('express').Router();
const knex = require('../config/KnexConnection');

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

router.get('/get-basic-stats/:language_id', (req, res) => {
    // get all hours logged

    // get start date

    // get average per day
})


module.exports = router;