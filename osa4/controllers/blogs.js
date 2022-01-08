const blogsRouter = require('express').Router()
const { update } = require('../models/blogs')
const Blog = require('../models/blogs')
const logger = require('../utils/logger')

blogsRouter.get('', async (request, response) => {
    const blogs = await Blog.find({})
        logger.info('Responded to a GET from IP: ', request.ip)
        response.json(blogs)
})
  
blogsRouter.post('', (request, response, next) => {
    const blog = new Blog(request.body)
    if (!blog.hasOwnProperty('likes')){
      blog.likes = 0
    }
  
    blog
      .save()
      .then(result => {
        logger.info('Server responds with: ', result)
        response.status(201).json(result)
      })
      .catch(error => {
        if (!blog.title || !blog.url){
          response.status(400).end()
        }
        next(error)
      })
})

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body

    const updatedBlog = {
      likes: body.likes
    }

    const newBlog = await Blog.findByIdAndUpdate(request.params.id, updatedBlog, {new: true})
    logger.info('Blog was updated: ', newBlog)
    response.json(newBlog.toJSON())
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

module.exports = blogsRouter