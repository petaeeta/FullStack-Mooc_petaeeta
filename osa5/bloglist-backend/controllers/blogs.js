const blogsRouter = require('express').Router()
const { update } = require('../models/blog')
const Blog = require('../models/blog')
const User = require('../models/user')
const logger = require('../utils/logger')
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')

blogsRouter.get('', async (request, response) => {
    const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1, id: 1})
        response.json(blogs)
})
  
blogsRouter.post('/', middleware.userExtractor, async (request, response, next) => {
    const body = request.body
    const token = request.token
    const user = request.user
    logger.info(request.token)

    if(!token || !user._id){
      return response.status(401).json({
        error: 'token missing or invalid'
      })
    }
    const blog = new Blog(body)
    if (!blog.hasOwnProperty('likes')){
      blog.likes = 0
    }
    logger.info(blog)
    blog.user = user._id
  
    blog
      .save()
      .then(async result => {
        logger.info('Server responds with: ', result)
        user.blogs.push(result._id.toString())
        logger.info(user.blogs.length)
        await User.findByIdAndUpdate(user._id, user)
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

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response, next) => {
  const token = request.token
  const user = request.user
  const blog = await Blog.findById(request.params.id)

  if (user.id === blog.user.toString()){
    await Blog.findByIdAndRemove(request.params.id)
    logger.info(user.blogs)
    user.blogs = user.blogs.filter(blog => blog.toString() !== request.params.id)
    logger.info(user.blogs)
    await User.findByIdAndUpdate(user.id, user)
    return response.status(204).end()
  }
  response.status(401).json({
    error: "Invalid token"
  })
})

module.exports = blogsRouter