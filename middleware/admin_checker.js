const isAdmin = (req, res, next) => {
    if (req.user.id == 9 && req.user.username == 'ahmadibnrachid') {
        next();
    } else {
        res.send(405)
    }
}

module.exports = {
    isAdmin
}