const router = require('express').Router();

router.get('/stats', (req, res) => {
    res.render('graphs')
});
router.get('/settings', (req, res) => {
    res.render('settings')
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
router.get('/', (req, res) => {
    res.render('homepage')
});


module.exports = router;