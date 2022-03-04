const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token

    if (authHeader) {
        const token = authHeader.split(" ")[1]
        jwt.verify(token, process.env.JWT_SECRET_KEY, (error, user) => {
            if (error) res.status(403).send({ error: 'Token is invalid' })

            req.user = user
            next()
        })
    } else {
        return res.status(401).send({ error: 'Please Authenticate correctly' })
    }
}

const verifyTokenAndAuthorization = (req, res, next ) => {
    verifyToken(req, res, () => {
        if(req.user.id === req.params.id || req.user.isAdmin) {
            next()
        }else{
            res.status(403).send({error: 'You are not authorized'})
        }
    })
}

module.exports = {
    verifyToken,
    verifyTokenAndAuthorization
}