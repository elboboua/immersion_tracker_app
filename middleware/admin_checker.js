const isAdmin = (req, res, next) => {
    if (req.user.id == 9 && req.user.username.toLowerCase() == 'ahmadibnrachid') {
        next();
    } else {
        res.sendStatus(405)
    }
}

module.exports = {
    isAdmin
}