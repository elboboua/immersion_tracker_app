const router = require('express').Router();
const passport = require('passport');
const jwt = require('jsonwebtoken')


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
    console.log(req.user)

    let token = jwt.sign({user: req.user}, 'randomnums')

    res.redirect(`exp://10.0.0.236:19000?authToken=${token}`);
})

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/auth/login')
})


module.exports = router;
