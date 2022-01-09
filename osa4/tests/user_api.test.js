const bcrypt = require('bcrypt')
const supertest = require('supertest')
const User = require('../models/user')
const app = require('../app')
const api = supertest(app)
const logger = require('../utils/logger')

describe('Database has one prior user', () => {

    beforeEach(async () => {
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
    })
    
    test('Addition of a valid user', async () => {
        const newUser = {
            username: 'Kakex',
            name: 'Kalle Kerttula',
            password: 'pwned'
        }
        await api.post('/api/users')
        .send(newUser)
        .expect(200)
        .expect('Content-Type', /application\/json/)

        let Db = await User.find({})
        Db = Db.map(user => user.toJSON())
        expect(Db).toHaveLength(3)
        expect(Db.map(user => user.username)).toContain(newUser.username)

    })

    test('Addition of an invalid user', async () => {
        const newUser = {
            username: 'The White Wolf',
            name: 'Geralt Of Rivia',
            password: 'axi'
        }
        await api.post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

        let Db = await User.find({})
        Db = Db.map(user => user.toJSON())
        expect(Db).toHaveLength(2)
        expect(Db.map(user => user.username)).not.toContain(newUser.username)
    })

    test('Addition of an otherwise valid user with a duplicate name', async () => {
        const duplicateUser = {
            username: 'Ciri',
            name: 'Swallow',
            password: 'axii'
        }
        await api.post('/api/users')
        .send(duplicateUser)
        .expect(400)
    })
})

afterAll( async () => {
    await User.deleteMany
} )