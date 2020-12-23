const router = require('express').Router();
const passport = require('passport');
const knex = require('../config/KnexConnection');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const {signupSchema} = require('../helperFunctions.js/validation');
const sendPasswordResetToken = require('../helperFunctions.js/sendPasswordResetToken');



router.get('/login', (req, res) => {
    res.render('signup');
})


// regular authentication routes
router.post('/signin', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
      if (err) { return next(err); }
      if (!user) { return res.render('signup', {message: 'Invalid credentials. Sign up or try again.'}); }
      req.logIn(user, function(err) {
        if (err) { return next(err); }
        return res.redirect('/');
      });
    })(req, res, next);
  })

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

// forgot password page
router.get('/forgot-password', (req, res) => {
    res.render('forgot-password')
})

// send email with password reset
router.post('/reset-password', async (req,res) => {
    // look for email in db
    const result = await knex('user').where({email: req.body.email})
    

    if (result.length === 0) {
        // if doesn't exist, let them know
        return res.render('forgot-password', {message: "This email is not in our system."})
    } else if (result[0].google_id != null) {
        // if signed up via google, let them know
        return res.render('forgot-password', {message: 'You can\'t reset a password if you signed up via google.'})
    } else {
        // delete old token if exists
        let oldPWTresult = await knex('password_token').where({user_id: result[0].id}).del();

        // create a token
        let token = crypto.randomBytes(64).toString('hex');

        // add it to reset-token table associated with user_id and with a 10 minute expiration date
        let now = new Date().valueOf();
        let tenMinutesFromNow = now + 600000;

        let newPasswordToken = {
            user_id: result[0].id,
            token: token,
            expires_at: tenMinutesFromNow,
        }

        let PWTresult = await knex('password_token').insert(newPasswordToken);

        // send to email via nodemailer
        sendPasswordResetToken(result[0], token)

        return res.render('signup', {message: 'You\'ve been sent an email with a reset link.'})
    }
    
})

// load page to reset password
router.get('/reset-password-via-email/:token', async (req, res) => {
    // search db for token: req.params.token
    let result = await knex('password_token').where({token: req.params.token})

    // if token doesn't exist, redirect to forgot-password
    if (result.length === 0) {
        return res.render('forgot-password', {message: 'No password request available. Please try again.'})
    }

    // check expiration date
    let now = new Date().valueOf();
    if (now < result[0].expires_at) {
        // if everything checks out, render a reset page with the token in a form
        return res.render('reset-password', {token: req.params.token});
    } else {
        return res.render('forgot-password', {message: 'Password reset request expired. Try sending another.'})
    }
})

// take password change request with token
router.post('/reset-password-request/:token', async (req, res) => {
    // check token again for expiration and to get id
    let result = await knex('password_token').where({token: req.params.token})

    if (result.length === 0) {
        return res.render('forgot-password', {message: 'No password request available. Please try again.'})
    }

    // check expiration date
    let now = new Date().valueOf();
    if (now < result[0].expires_at) {
        // if token valid, take password, hash it, and store it in db under user.
        bcrypt.hash(req.body.password, 10, async function(err, hash){
            const hashResult = await knex('user').update({password: hash}).where({id: result[0].user_id});
            // delete token
            await knex('password_token').where({id: result[0].id}).del();

            return res.render('signup', {message: "Password successfully changed"})
            
        });
    } else {
        return res.render('forgot-password', {message: 'Password reset request expired. Try sending another.'})
    }


    // encrypt new password in req.body.password and update db
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
