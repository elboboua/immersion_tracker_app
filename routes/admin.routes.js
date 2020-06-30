const router = require('express').Router();

router.get('/', (req, res) => {
    res.send({
        message: 'admin route is up'
    })
})

module.exports = router;