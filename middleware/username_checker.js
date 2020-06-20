const hasUsername = (req, res, next) => {
    if (req.user.username == null) {
        res.redirect('/account/create-username')
    } else {
        next();
    }
}

module.exports = {
    hasUsername, 
}