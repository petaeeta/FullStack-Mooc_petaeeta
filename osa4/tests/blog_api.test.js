const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const bcrypt = require('bcrypt')
const Blog = require('../models/blog')
const User = require('../models/user')
const material = require('./blogMaterial')
const logger = require('../utils/logger')
const jwt = require('jsonwebtoken')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})
  const user = { 
    username: 'ExampleUserName', 
    name: 'ExampleName',
    password: 'salasana'
  }
  await api.post('/api/users').send(user)
  const newUser = {
    username: 'Ciri',
    name: 'Cirilla Fiona Elen Riannon',
    password: 'axii'
  }
  await api.post('/api/users').send(newUser)
  await Blog.insertMany(material.blogs)
})

describe('fetching blogs from database', () => {

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
      const currentDb = await material.blogsInDb()
      expect(currentDb).toHaveLength(material.blogs.length)
  })
  
  test('blogs are identified by an id-number', async () => {
    const res = await api.get('/api/blogs')
    res.body.forEach((blog) => expect(blog.id).toBeDefined())
  })

})

describe('Addition of a blog', () => {
  

  const profile = {
    username: 'Ciri',
    password: 'axii'
  }
  const token = jwt.sign(profile, process.env.SECRET)


  test('a valid blog can be added', async () => {
    const newBlog = {
      title: "My story as a PHP-victim",
      author: "The Folk",
      url: "http://examplesite",
      likes: 5
    }
  
    await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    const blogsInDb = await material.blogsInDb()
    expect(blogsInDb).toHaveLength(material.blogs.length + 1)
  
    const titles = blogsInDb.map(n => n.title)
    expect(titles).toContain(newBlog.title)
  }, 30000)
  
  test('a blog without likes will resolve likes to be 0', async () => {
    const newBlog = {
      title: "My story as a PHP-victim",
      author: "fkn everyone",
      url: "http://examplesite"
    }

    await api.post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  
    const addedBlog = await Blog.find({ title: newBlog.title })
    expect(addedBlog[0].likes).toBe(0)
  })
  
  test('a blog without title or url will not get added', async () => {
    const newBlog = {
      author: "The Folk",
      likes: 5
  
    }
  
    await api.post('/api/blogs')
    .send(newBlog)
    .set('Authorization', `bearer ${token}`)
    .expect(400)
  })
})

describe('modifying an existing blog', () => {
  const profile = {
    username: 'Ciri',
    password: 'axii'
  }
  const token = jwt.sign(profile, process.env.SECRET)

  test('changing the likes of a post', async () => {
    const modBlog = await Blog.findOne({ title: material.blogs[0].title})
    logger.info(modBlog)
    expect(modBlog.likes).toBe( material.blogs[0].likes)

    const newLikes = {
      likes: modBlog.likes + 1
    }

    await api.put(`/api/blogs/${modBlog._id}`)
    .send(newLikes)
    .expect(200)
    .expect('Content-Type', /application\/json/)

    const updatedBlog = await Blog.findOne({ title: modBlog.title})
    expect(updatedBlog.likes).toBe( modBlog.likes + 1)
  })

  test('deletion of a blog', async () => {
    const newBlog = {
      title: "My story as a PHP-victim",
      author: "The Folk",
      url: "http://examplesite",
      likes: 5
    }

    const initialAmount = (await material.blogsInDb()).length
    console.log(initialAmount)
  
    const blog = await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    const foundBlog = await Blog.findById( blog.body.id)
    expect(foundBlog.title).toEqual(newBlog.title)

    expect((await material.blogsInDb()).length).toBe(initialAmount + 1)

    await api
    .delete(`/api/blogs/${blog.body.id}`)
    .set('Authorization', `bearer ${token}`)
    .expect(204)
    expect((await material.blogsInDb()).length).toBe(initialAmount)
    expect((await material.blogsInDb()).map(n => n.title)).not.toContain(newBlog.title)
  })
})



afterAll(() => {
  mongoose.connection.close()
})