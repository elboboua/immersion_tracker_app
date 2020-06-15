const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
});

router.get('/createLog', (req, res) => {
    res.render('createLog')
});
router.get('/getLogs', (req,res) => {
    res.render('getLogs')
})
router.get('/analytics', (req, res) => {
    res.render('analytics')
})
router.get('/analyticsMonth', (req, res) => {
    res.render('analyticsMonth')
})
router.get('/analyticsYear', (req, res) => {
    res.render('analyticsYear')
})
router.get('/graphs', (req, res) => {
    res.render('graphs')
})


module.exports = router;