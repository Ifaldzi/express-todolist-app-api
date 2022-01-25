const jwt = require('jsonwebtoken')
const {CustomError} = require('../errors/CustomError')

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer')) {
        throw new CustomError('No token provided', 401)
    }

    const authToken = authHeader.split(' ')[1]

    try {
        const decoded = jwt.verify(authToken, process.env.JWT_SECRET)
        req.user = { id: decoded.userID}
        next()
    } catch (error) {
        throw new CustomError('Unauthorized', 401)
    }

}

module.exports = authMiddleware