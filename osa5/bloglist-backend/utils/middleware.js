const logger = require('./logger')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const tokenExtractor = (request, response, next) => {
    const authorization = request.get('Authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      request.token = authorization.substring(7)
    }
    next()
}

const userExtractor = async (request, response, next) => {

    try {
        token = request.token
        let decodedToken = jwt.verify(token, process.env.SECRET)
        request.user = await User.findOne({ username: decodedToken.username})
    }
    catch(error) {
        next(error)
    }
    next()
}

const reqLogger = (request, response, next) => {
    logger.info('Method:', request.method)
    logger.info('Path:  ', request.path)
    logger.info('Body:  ', request.body)
    logger.info('---')
    next()
}

const unknown = (request, response, next) => {
    response.status(404).send({
        error: 'unknown endpoint'
    })
    next()
}

const errorHandler = (error, request, response, next) => {
    logger.error(error.message)
    
    switch(error.name) {
        case 'JsonWebTokenError':
        case 'TokenExpiredError':
            return response
            .status(401)
            .json({
                error: 'token missing, invalid or expired.'
            })
        case 'CastError':
            return response
            .status(400)
            .send({
                error: 'malformatted id'
            })
        case 'ValidationError':
            return response
            .status(400)
            .json({ 
                error: error.message 
            })
        default:
            break;
    }
    next(error)
}

module.exports = {
    reqLogger,
    unknown,
    errorHandler,
    tokenExtractor,
    userExtractor
}