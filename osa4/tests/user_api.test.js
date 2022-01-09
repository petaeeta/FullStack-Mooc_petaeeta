const bcrypt = require('bcrypt')
const supertest = require('supertest')
const User = require('../models/user')
const app = require('../app')
const api = supertest(app)
const logger = require('../utils/logger')

describe('Database has one prior user', () => {

    beforeEach(async () => {
        await User.deleteMany({})
        const hash = await bcrypt.hash('salasana', 10)
        const user = new User({ username: 'ExampleUserName', name: 'ExampleName', passwordHash: hash})
        await user.save()
    })
    
    test('Addition of a valid user', async () => {
        const newUser = {
            username: 'Ciri',
            name: 'Cirilla Fiona Elen Riannon',
            password: 'axii'
        }
        await api.post('/api/users')
        .send(newUser)
        .expect(200)
        .expect('Content-Type', /application\/json/)

        let Db = await User.find({})
        Db = Db.map(user => user.toJSON())
        expect(Db).toHaveLength(2)
        expect(Db.map(user => user.username)).toContain(newUser.username)

    })

    test('Addition of an invalid user', async () => {
        const newUser = {
            username: 'Ciri',
            name: 'Cirilla Fiona Elen Riannon',
            password: 'axi'
        }
        await api.post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

        let Db = await User.find({})
        Db = Db.map(user => user.toJSON())
        expect(Db).toHaveLength(1)
        expect(Db.map(user => user.username)).not.toContain(newUser.username)

    })
})

afterAll( async () => {
    await User.deleteMany
} )