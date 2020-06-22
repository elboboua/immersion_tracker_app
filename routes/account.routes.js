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
    }
});
let upload = multer({storage: storage});


router.get('/create-username', async (req, res) => {
    res.render('create-username');
})

router.post('/upload-avatar', upload.single('avatar'), async (req, res) => {
    if (!req.file) {
        return res.render('upload-avatar', {message: "There has been a problem uploading the file. Please try again."})
      } else {
        let result = await knex('user').where({id: req.user.id}).update({avatar_name: req.file.filename});
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

router.get('/try-username/:username', async (req,res) => {    
    let result = await knex('user').where({username: req.params.username})
    if (result.length > 0) {
        res.sendStatus(409)
    } else {
        res.sendStatus(200)
    }
})

router.get('/update-username/:username', async (req,res) => {    
    let result = await knex('user').update({username: req.params.username}).where({id: req.user.id})
    if (result != undefined) {
        res.redirect('/')
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


module.exports = router;