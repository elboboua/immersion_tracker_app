const router = require('express').Router();
const passport = require('passport');
const knex = require('../config/KnexConnection');
const bcrypt = require('bcrypt');
const {signupSchema} = require('../helperFunctions.js/validation');



router.get('/login', (req, res) => {
    res.render('signup');
})


// regular authentication routes
router.post('/signin', passport.authenticate('local', { failureRedirect: '/login', successRedirect: '/'}))

router.post('/signup', async (req, res, next) => {

    //Validate the data
    const {error} = signupSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // check if user is already in db
    const result = await knex('user').where({email: req.body.email});

    // user exists so send error
    if (result.length > 0) return res.status(400).send('Email already exists')

    // create hash and store in db
    bcrypt.hash(req.body.password, 10, async function(err, hash){
        const result = await knex('user').insert({email: req.body.email, password: hash});
        passport.authenticate('local')(req, res, function(){
            res.redirect('/')
        })
    });
  
})

// google authentication routes
router.get('/google', passport.authenticate('google',
    {
        scope: ['profile', 'email'],
        prompt: 'select_account',
    })
);

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.redirect('/');
})

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/auth/login')
})


module.exports = router;
