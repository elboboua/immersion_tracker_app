const router = require('express').Router();

router.get('/stats', (req, res) => {
    res.render('new-stats', {
        layout: 'logged-in'
    })
});
router.get('/settings', (req, res) => {
    res.render('settings', {
        layout: 'logged-in'
    })
});
router.get('/getLogs', (req,res) => {
    res.render('getLogs', {
        layout: 'logged-in'
    })
})
router.get('/', (req, res) => {
    res.render('homepage', {
        layout: 'logged-in'
    })
});
router.get('/community', (req, res) => {
    res.render('community', {
        layout: 'logged-in'
    })
});

router.get('/followers-following', (req, res) => {
    res.render('followers-following', {
        layout: 'logged-in'
    })
});


module.exports = router;