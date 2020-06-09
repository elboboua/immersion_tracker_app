require('dotenv').config();
require('./config/passport-setup');

const express = require('express');
const app = express();
const passport = require('passport');
const PORT = process.env.PORT || 3000;
const authRoutes = require('./routes/auth.routes');
const cookieSession = require('cookie-session');
const keys = require('./config/keys');

app.use(cookieSession({
    keys: keys.sessionKeys,
    resave: false,
    saveUninitialized: false,
}))
app.use(passport.initialize());
app.use(passport.session())
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/', (req, res) => {

    res.send('<h1>Hello World!</h1>')

});

app.use('/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}.`)
})



