const router = require('express').Router();
const logModels = require('../models/log.models');

// get all logs for a user
router.get('/getAllLogs', async (req, res) => {
    let result = await logModels.getAllLogsByID(req.user.id);
    res.send(result);
})

router.get('/getAllLogsWithLanguages', async (req, res) => {
    let result = await logModels.getAllLogsJoinLanguage(req.user.id);
    res.send(result);
})

router.get('/getLogsDate', async (req, res) => {
    let result = await logModels.getLogsDateByID(req.user.id);
    res.send(result);
})

// create a new log
router.post('/create', async (req, res) => {
    await logModels.insertLog(req.body, req.user);
    res.redirect('/')
})

router.post('/delete', async (req, res) => {
    let result = await logModels.deleteLog(req.body);
    let status;
    if (result > 0) {
        status = 200;
    } else {
        status = 404;
    }
    res.sendStatus(status);
})

router.post('/getLastWeek', async (req, res) => {
    let result = await logModels.getLastWeek(req.body, req.user);
    res.send(result);
})

router.post('/getLastMonth', async (req, res) => {

    let result = await logModels.getLastMonth(req.body, req.user)
    res.send(result);

})

router.post('/getLastYear', async (req, res) => {
    let result = await logModels.getLastYear(req.body, req.user);
    res.send(result);
})

router.post('/getAllTime', async (req, res) => {
    let result = await logModels.getAllTime(req.body, req.user);
    res.send(result);
})


module.exports = router