require('dotenv').config();
require('./config/passport-setup');

const express = require('express');
const app = express();
const passport = require('passport');
const PORT = process.env.PORT || 3000;
const cookieSession = require('cookie-session');
const keys = require('./config/keys');
const hbs = require('express-handlebars');

const authRoutes = require('./routes/auth.routes');
const logRoutes = require('./routes/log.routes');
const languageRoutes = require('./routes/language.routes');
const typeRoutes = require('./routes/type.routes');

const {isAuthorized} = require('./middleware/authchecker');

app.use(cookieSession({
    keys: keys.sessionKeys,
    resave: false,
    saveUninitialized: false,
}))
app.use(passport.initialize());
app.use(passport.session())
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.set('view engine', 'hbs');
app.engine('hbs', hbs({
    extname: 'hbs',
}))

app.get('/', (req, res) => {

    res.send('<h1>Hello World!</h1>')

});

app.get('/createLog', (req, res) => {
    res.render('createLog')
});
app.get('/getLogs', (req,res) => {
    res.render('getLogs')
})

app.use('/auth', authRoutes);
app.use('/log', isAuthorized, logRoutes);
app.use('/language', isAuthorized, languageRoutes);
app.use('/type', isAuthorized, typeRoutes);


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}.`)
})



