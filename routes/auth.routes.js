const router = require('express').Router();
const passport = require('passport');


router.get('/login', (req, res) => {
    res.render('signup');
})

router.get('/google', passport.authenticate('google',
    {
        scope: ['profile', 'email'],
        prompt: 'select_account',
    })
);

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    console.log(req)
    res.redirect('/');
})

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/auth/login')
})


module.exports = router;
