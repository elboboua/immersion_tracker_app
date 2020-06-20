const router = require('express').Router();
const knex = require('../config/KnexConnection');

router.get('/create-username', async (req, res) => {
    res.render('create-username');
})

router.get('/try-username/:username', async (req,res) => {    
    let result = await knex('user').where({username: req.params.username})
    if (result.length > 0) {
        res.sendStatus(409)
    } else {
        res.sendStatus(200)
    }
})

router.get('/update-username/:username', async (req,res) => {    
    let result = await knex('user').update({username: req.params.username}).where({id: req.user.id})
    if (result != undefined) {
        res.redirect('/')
    }
})

router.get('/get-dashboard-info', async (req, res) => {
    let loggedHours = await knex('log').select(knex.raw('sum(time) as time')).where({user_id: req.user.id}).andWhere('deleted', '=', 0)
    loggedHours = (loggedHours[0].time)
    res.send({
        username: req.user.username,
        loggedHours
    });
})


module.exports = router;