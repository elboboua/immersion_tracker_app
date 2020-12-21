const router = require('express').Router();
const passport = require('passport');
const knex = require('../config/KnexConnection');


router.get('/login', (req, res) => {
    res.render('signup');
})


// regular authentication routes
router.post('/signin', passport.authenticate('local', { failureRedirect: '/login'}), async (req, res) => {
    res.redirect('/');
})

router.post('/signup', (req, res) => {

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
