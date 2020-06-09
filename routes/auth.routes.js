const router = require('express').Router();
const passport = require('passport');


router.get('/login', (req, res) => {
    res.json({message: 'These routes are working.'});
})

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
    res.json({message: 'These routes are working.'});
})


module.exports = router;
