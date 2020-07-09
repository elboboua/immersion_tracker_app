const router = require('express').Router();
const knex = require('../config/KnexConnection');

router.get('/', async (req, res) => {
    if (req.user) {
        let following = await knex('follower')
        .select(knex.raw('count(*) as count'))
        .where('follower_id', '=', req.user.id);

        let followers = await knex('follower')
        .select(knex.raw('count(*) as count'))
        .where('followed_id', '=', req.user.id);

        res.send({
            following: following[0].count,
            followers: followers[0].count,
        })
    } else {
        res.sendStatus(405);
    }
})

router.get('/get-users', async (req, res) => {
    let following_id = await knex('follower')
    .select('followed_id')
    .where('follower_id', '=', req.user.id)
    following_id = following_id.map(element => element.followed_id)

    let follower_id = await knex('follower')
    .select('follower_id')
    .where('followed_id', '=', req.user.id)
    follower_id = follower_id.map(element => element.follower_id)

    let following = await knex('user')
    .select('username')
    .select('avatar_name')
    .whereIn('id', following_id)

    let followers = await knex('user')
    .select('username')
    .select('avatar_name')
    .whereIn('id', follower_id)


    res.send({
        following,
        followers
    })
})

router.get('/:username', async (req, res) => {
        let result = await knex('user').select('id').where({username: req.params.username});
        let id = result[0].id

        let following = await knex('follower')
        .select(knex.raw('count(*) as count'))
        .where('follower_id', '=', id);

        let followers = await knex('follower')
        .select(knex.raw('count(*) as count'))
        .where('followed_id', '=', id);

        res.send({
            following: following[0].count,
            followers: followers[0].count,
        })
})

router.get('/follows/:username', async (req, res) => {
    if (req.user) {
        let id = await knex('user').select('id').where({username: req.params.username});
        id = id[0].id;

        let result = await knex('follower')
        .select(knex.raw('count(*) as count'))
        .where('followed_id', '=', id)
        .andWhere('follower_id', '=', req.user.id);
        res.send(result);
    } else {
        res.sendStatus(405)
    }
})

router.get('/toggle-follow/:username', async (req, res) => {
    if (req.user) {
        let id = await knex('user').select('id').where({username: req.params.username});
        id = id[0].id

        let check = await knex('follower')
        .select(knex.raw('count(*) as count'))
        .where('followed_id', '=', id)
        .andWhere('follower_id', '=', req.user.id);
        if (check[0].count == 0) {
            let result = await knex('follower')
            .insert({
                followed_id: id,
                follower_id: req.user.id,
            })
        } else {
            let result = await knex('follower')
            .del()
            .where('followed_id', '=', id)
            .andWhere('follower_id', '=', req.user.id);
        }
        res.sendStatus(200)
    } else {
        res.sendStatus(405)
    }
})


module.exports = router;