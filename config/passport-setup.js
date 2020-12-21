const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const LocalStrategy = require('passport-local');
const Keys = require('./keys');
const User = require('../models/user.model');
const knex = require('../config/KnexConnection');
// TODO add knex to this file

passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser(async (id, done) => {
    let user = new User();
    await user.createFromID(id);
    done(null, user);
})


passport.use(new GoogleStrategy({
        clientID: Keys.google.clientID,
        clientSecret: Keys.google.clientSecret,
        callbackURL: Keys.google.callbackURL,
    }, async (accessToken, refreshToken, profile, done) => {

        // create user and check if they are in the db.
        let user = new User(profile.displayName, profile._json.email, profile.id);
        await user.validateOrCreate();

        done(null, user);
    })
);

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    },
    async function(email, password, done) {
        const result =  await knex('user').where({email}).andWhere({password}); 
        let user = result[0];
        console.log(user)
        if (user === undefined || user.length == 0) {
            return done(null, false)
        } else {
            return done(null, user)
        } 
    
    }
));