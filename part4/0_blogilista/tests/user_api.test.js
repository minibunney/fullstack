const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const logger = require('../utils/logger')
const userHelper = require('../utils/user_helper')
const User = require('../models/user')

const api = supertest(app)

logger.info(userHelper.userObject)
debugger

beforeEach(async () => {
    await User.deleteMany({})
    let userObject = new User(userHelper.startUsers[0])
    await userObject.save()
    userObject = new User(userHelper.startUsers[1])
    await userObject.save()
    //logger.info("user_api.test.delete and insert all")
})

describe('usernames', () => {
    test('need to be unique and error returns 400', async () => {
        const newUser = {
            username: 'kalle',
            name: 'Kalle',
            password: 'test'
        }
        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
    })
    test('empty usernames are not accepted and error returns 400', async () => {
        const newUser = {
            username: '',
            name: 'test',
            password: 'test'
        }
        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
    })
    test('usernames shorter than 3 characters are not accepted and error returns 400', async () => {
        const newUser = {
            username: 'te',
            name: 'test',
            password: 'test'
        }
        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
    })
})
describe('passwords', () => {
    test('empty passwords are not accepted and error returns 400', async () => {
        const newUser = {
            username: 'test',
            name: 'test',
            password: ''
        }
        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
    })
    test('passwords shorter than 3 characters are not accepted and error returns 400', async () => {
        const newUser = {
            username: 'test',
            name: 'test',
            password: 'st'
        }
        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
    })
})
describe('creating new user', () => {
    test('is possible and returns 201', async () => {
        const newUser = {
            username: 'newtestuser',
            name: 'newTestUser',
            password: 'test'
        }
        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)
    })
})
afterAll(async () => {
    await mongoose.connection.close()
})