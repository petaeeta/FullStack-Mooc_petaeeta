const bcrypt = require('bcrypt')
const { urlencoded } = require('express')
const Blog = require('../models/blog')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    const users = await User
    .find({})
    .populate('blogs', { url: 1, title: 1, author: 1, id: 1 })
    response.json(users)
})

usersRouter.post('/', async (request, response) => {
    const body = request.body

    if (body.password.length < 4){
        return response.status(400).json({
            error: 'Password should be longer than 3 characters.'
        })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)
    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash: passwordHash,
    })

    const blog = await Blog.findById(body.blogId)
    user.blogs = blog === null ? [] : blog
    const savedUser = await user.save()
    response.json(savedUser)
})

module.exports = usersRouter