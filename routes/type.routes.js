const router = require('express').Router();
const knex = require('../config/KnexConnection');

router.get('/', async (req, res) => {
    let result = await knex('type');
    result = JSON.stringify(result);
    res.send(result);
})


module.exports = router;