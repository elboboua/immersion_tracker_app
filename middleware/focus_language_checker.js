const knex = require('../config/KnexConnection');

const hasFocusLang = async (req, res, next) => {
    let result = await knex('user').select('focus_language_id').where({id: req.user.id});
    console.log(result)
    if (result[0].focus_language_id == null) {
        res.redirect('/account/add-focus-language')
    } else {
        next();
    }
}

module.exports = {
    hasFocusLang, 
}