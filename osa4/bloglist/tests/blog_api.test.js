const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const { response } = require('express')

describe('Testing the blogApp functionality thoroughly', () => {
    // User used to make requests
    const testUser = {
        username: 'testUser',
        name: 'test user',
        password: 'password'
    }
    beforeEach(async () => {
        //delete existing users and blogs from test database
        await Blog.deleteMany({})
        await User.deleteMany({})
        // hash the users password
        const passwordHash = await bcrypt.hash(testUser.password, 10)
        testUser.passwordHash = passwordHash

        // add new user into the database
        const user = new User({ username: 'testUser', name:'test user', passwordHash })
        const savedUser = await user.save()

        // save the id of the added user into the testUser object
        testUser.id = savedUser._id
    })
    describe('Creating users to a database', () => {
        test('Creating a new user with too short username fails with proper status and error message', async () => {
            const faultyUser = {
                username: 'iv',
                name: 'tooShort',
                password: 'test'
            }
            const result = await api
                .post('/api/users')
                .send(faultyUser)
                .expect(400)
                .expect('Content-Type', /application\/json/)
            
            expect(result.body.error).toContain('is shorter than the minimum allowed length (3).')
        })
        test('Creating a new user with already existing name fails with proper status and error message', async () => {
            const faultyUser = {
                username: 'testUser',
                name: 'not unique',
                password: 'test'
            }
            const result = await api
                .post('/api/users')
                .send(faultyUser)
                .expect(400)
                .expect('Content-Type', /application\/json/)
            
            expect(result.body.error).toContain('User validation failed: username: username must be unique')
        })
        
        test('Creating a new user succeeds with valid input', async () => {
            const newUser = {
                username: 'Joonas',
                name: 'Joonas',
                password: 'salasana'
            }
            const usersAtStart = await helper.usersInDb()
            await api
                .post('/api/users')
                .send(newUser)
                .expect(201)
                .expect('Content-Type', /application\/json/)
            
            const usersAtEnd = await helper.usersInDb()
            expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
        })
    })
    describe('Logging users in', () => {
        test('Logging in as a user works with valid input', async () => {
            const login = {
                username: testUser.username,
                password: testUser.password,
            }
            const result = await api
                .post('/api/login')
                .send(login)
                .expect(200)
            testUser.token = result.body.token
        })
        
        test('Logging in fails with invalid input resulting in proper statuscode and error message', async () => {
            const result = await api
            .post('/api/login')
            .send({
                "username": "faulty",
                "password": "alsoFaulty"
            })
            .expect(401)
            .expect('Content-Type', /application\/json/)
            
            expect(result.body.error).toContain('invalid username or password')
        })
    })
    describe('Creating new blogs', () => {
        beforeEach(async () => {
            // login to get a token
            const login = {
                username: testUser.username,
                password: testUser.password,
            }
            const result = await api
            .post('/api/login')
            .send(login)
            .expect(200)
            // save authorization token into testUser
            testUser.token = result.body.token  
        })
        const newBlog = {
            "title": "token testi",
            "author": "Random author",
            "url": "www.token.org",
            "likes": 1,
            "userId": testUser.id
        }

        test('Creating a blog works with valid authentication', async () => {
            const blogsBefore = await helper.blogsInDb() 
            const auth = 'bearer ' + testUser.token
            await api
                .post('/api/blogs')
                .set('Authorization', auth)
                .send(newBlog)
                .expect(201)
                .expect('Content-Type', /application\/json/)
            const blogsAfter = await helper.blogsInDb()
            expect(blogsAfter).toHaveLength(blogsBefore.length + 1)
        })   

        test('Creating a blog fails with invalid input', async () => {
            const auth = 'bearer ' + testUser.token
            const result = await api
                .post('/api/blogs')
                .set('Authorization', auth)
                .send({
                    'title':'empty url',
                    'author':'joku',
                    'likes':2,
                    'user':testUser.id
                })
                .expect(400)
                .expect('Content-Type', /application\/json/)
            expect(result.body.error).toContain('Blog validation failed')
        })
        
        /*
    })
    describe('Deleting existing blogs', () => {                
        test('Deleting a blog does not work without correct authorizationcons', async () => {
        })
        
        test('Deleting a blog succeeds with correct credentials', async () => {
        })
        */
    })
})

afterAll(() => {
    mongoose.connection.close()
}) 