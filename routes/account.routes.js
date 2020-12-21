const router = require('express').Router();
const knex = require('../config/KnexConnection');
const multer = require('multer');


// multer is for storing files on the hd
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/imgs/avatars')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname)
    },
    
});
let upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        if (file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg') {
            cb(null, true);
        } else {
            req.fileValidationError = 'wrong file type!';
            return cb(null, false, new Error('wrong file type!'));
        }
    },
    limits: {
        fileSize: 1000000
    }
});


router.get('/create-username', async (req, res) => {
    res.render('create-username');
})

router.post('/upload-avatar', upload.single('avatar'), async (req, res) => {
    if (!req.file) {
        return res.render('upload-avatar', {message: "There has been a problem uploading the file. Please try again."})
      } else {
        await knex('user').where({id: req.user.id}).update({avatar_name: req.file.filename});
        return res.redirect('/')
        
      }
})

router.get('/avatar', async (req, res) => {
    let result = await knex('user').select('avatar_name').where({id: req.user.id});
    res.json({avatar_name: result[0].avatar_name})
})

router.get('/upload-avatar', (req, res) => {
    res.render('upload-avatar')
})

router.post('/try-username/', async (req,res) => {    
    let result = await knex('user').where({username: req.body.username})
    console.log(result)
    if (result.length > 0) {
        res.sendStatus(409)
    } else {
        res.sendStatus(200)
    }
})

router.get('/update-username', async (req,res) => {
    let check = /^[a-zA-Z0-9]+$/.test(req.query.username);
    if (check) {
        let result = await knex('user').update({username: req.query.username}).where({id: req.user.id})
        if (result != undefined) {
            res.redirect('/')
        }
    } else {
        res.render('create-username', {message: 'There was an error submitting your username. Please try again.'})
    } 
})

router.get('/get-dashboard-info', async (req, res) => {
    let loggedHours = await knex('log').select(knex.raw('sum(time) as time')).where({user_id: req.user.id}).andWhere('deleted', '=', 0)
    loggedHours = (loggedHours[0].time)
    res.send({
        username: req.user.username,
        loggedHours
    });
})

router.get('/get-focus-language', async (req, res) => {
    let result = await knex('user').select('focus_language_id').where({id: req.user.id});
    res.send(result);
})

router.get('/add-focus-language', (req, res) => {
    res.render('add-focus-language');
})

router.get('/get-private', async (req,res) => {
    let result = await knex('user').select('private').where({id: req.user.id});
    res.json({
        private: result[0].private
    })    
})

router.get('/toggle-private', async (req, res) => {
    let result = await knex('user').select('private').where({id: req.user.id});
    if (result[0].private === 0) {
        await knex('user').update({private: 1}).where({id: req.user.id});
    } else {
        await knex('user').update({private: 0}).where({id: req.user.id});
    }
    res.send(200);
})

router.post('/set-focus-language', async (req, res) => {
    await knex('user')
    .update({focus_language_id: req.body.language_id})
    .where({id: req.user.id});
    res.redirect('/')
})


module.exports = router;