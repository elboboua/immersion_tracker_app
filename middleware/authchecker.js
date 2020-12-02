const jwt = require('jsonwebtoken')

const isAuthorized = (req, res, next) => {
    const token = req.header('auth-token');
    
    console.log(token)

    if (!token) return res.status(401).send('access denied')

    try {
        const verified = jwt.verify(token, 'randomnums')
        console.log(verified.user)
        req.user = verified.user;
        console.log(req.user)
        next()
    } catch {
        res.status(400).send('Invalid Token')
    }
}

module.exports = {
    isAuthorized, 
}