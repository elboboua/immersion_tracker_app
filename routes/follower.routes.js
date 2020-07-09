const router = require('express').Router();
const knex = require('../config/KnexConnection');

router.get('/', async (req, res) => {

    if (req.user) {
        let following = await knex('follower')
        .select(knex.raw('count(*) as count'))
        .where('followed_id', '=', req.user.id);

        let followers = await knex('follower')
        .select(knex.raw('count(*) as count'))
        .where('follower_id', '=', req.user.id);

        res.send({
            following: following[0].count,
            followers: followers[0].count,
        })
    } else {
        res.sendStatus(404);
    }

})


module.exports = router;