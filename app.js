require('dotenv').config();
require('./config/passport-setup');

const express = require('express');
const passport = require('passport');
const PORT = process.env.PORT || 3000;
const cookieSession = require('cookie-session');
const keys = require('./config/keys');
const hbs = require('express-handlebars');
const cors = require('cors')

const authRoutes = require('./routes/auth.routes');
const logRoutes = require('./routes/log.routes');
const languageRoutes = require('./routes/language.routes');
const typeRoutes = require('./routes/type.routes');
const staticRoutes = require('./routes/static.routes');
const accountRoutes = require('./routes/account.routes');

const {isAuthorized} = require('./middleware/authchecker');
const {hasUsername} = require('./middleware/username_checker');

const app = express();

app.use(cookieSession({
    keys: keys.sessionKeys,
    resave: false,
    saveUninitialized: false,
}))
app.use(passport.initialize());
app.use(passport.session())
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors())
app.use(express.static('public'))

app.set('view engine', 'hbs');
app.engine('hbs', hbs({
    extname: 'hbs',
    partialsDir: __dirname + '/views/partials/'
}))


app.use('/auth', authRoutes);
app.use('/account', isAuthorized, accountRoutes);
app.use(isAuthorized, hasUsername, staticRoutes);
app.use('/log', isAuthorized, logRoutes);
app.use('/language', isAuthorized, languageRoutes);
app.use('/type', isAuthorized, typeRoutes);


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}.`)
})



