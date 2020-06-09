const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const Keys = require('./keys');
const User = require('../models/user.model');
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