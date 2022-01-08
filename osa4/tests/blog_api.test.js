const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blogs')
const material = require('./blogMaterial')
const logger = require('../utils/logger')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
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
  
  test('a valid blog can be added', async () => {
    const newBlog = {
      title: "My story as a PHP-victim",
      author: "The Folk",
      url: "http://examplesite",
      likes: 5
  
    }
  
    await api.post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  
    const blogsInDb = await material.blogsInDb()
    expect(blogsInDb).toHaveLength(material.blogs.length + 1)
  
    const titles = blogsInDb.map(n => n.title)
    expect(titles).toContain(newBlog.title)
  })
  
  test('a blog without likes will resolve likes to be 0', async () => {
    const newBlog = {
      title: "My story as a PHP-victim",
      author: "The Folk",
      url: "http://examplesite"
  
    }
  
    await api.post('/api/blogs')
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
    .expect(400)
  })
})

describe('modifying an existing blog', () => {
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

  test('deletion of a post', async () => {
    const initialBlog = await Blog.findOne({title: material.blogs[0].title})

    await api.delete(`/api/blogs/${initialBlog._id}`).expect(204)
    const updatedBlogs = await material.blogsInDb()

    expect(updatedBlogs).toHaveLength(
      material.blogs.length - 1
    )

    expect(updatedBlogs.map(n => n.title)).not.toContain(initialBlog.title)
  })
})



afterAll(() => {
  mongoose.connection.close()
})