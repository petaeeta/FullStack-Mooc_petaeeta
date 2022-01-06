const blogsRouter = require('express').Router()
const Blog = require('../models/blogs')
const logger = require('../utils/logger')

blogsRouter.get('', (request, response) => {
    Blog
      .find({})
      .then(blogs => {
        logger.info('Responded to a GET from IP: ', request.ip)
        response.json(blogs)
      })
})
  
blogsRouter.post('', (request, response) => {
    const blog = new Blog(request.body)
  
    blog
      .save()
      .then(result => {
        logger.info('Server responds with: ', result)
        response.status(201).json(result)
      })
})

module.exports = blogsRouter