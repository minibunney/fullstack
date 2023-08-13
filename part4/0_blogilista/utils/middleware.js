const logger = require('../utils/logger')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const errorHandler = (error, request, response, next) => {
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    } else if (error === 'Token is empty or other token error') {
        return response.status(401).json({ error: error })
    } else if (error.name === 'JsonWebTokenError') {
        return response.status(401).json({ error: error.message })
    }
    else {
        //logger.error("errorHandler.error.message", error.message)
        //logger.info("errorHandler.error", error)
        //logger.info("errorHandler.error.request", request)
        //logger.info("errorHandler.error", error)
    }
    next(error)
}
const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
        return authorization.replace('Bearer ', '')
    }
    throw 'Token is empty or other token error'
    next()
}
const userExtractor = async (request, response, next) => {
    //logger.info("middleware.userExtractor", request)

    const decodedToken = jwt.verify(tokenExtractor(request), process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid' })
    }
    const user = await User.findById(decodedToken.id)
    //logger.info("middleware.userExtractor.decodedToken", decodedToken)
    //logger.info("middleware.userExtractor.user", user)
    request.user = user
    next()
}
module.exports = { errorHandler, tokenExtractor, userExtractor }