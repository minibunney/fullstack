const supertest = require('supertest')
const mongoose = require('mongoose')
const listHelper = require('../utils/list_helper')
const jwtHelper = require('../utils/jwt_helper')
const app = require('../app')
const logger = require('../utils/logger')
const api = supertest(app)

const Blog = require('../models/blog')


beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(listHelper.blogs[0])
    await blogObject.save()
    blogObject = new Blog(listHelper.blogs[1])
    await blogObject.save()
})

//4.5
describe('likes', () => {
    test('returns correctly blog with most likes', async () => {
        const blogs = listHelper.blogs
        const result = listHelper.favoriteBlog(blogs)
        await expect(result).toEqual(listHelper.mostLikedBlog)
    })
})
//4.6
describe('most blogs', () => {
    test('by author', async () => {
        const result = listHelper.mostBlogs(listHelper.blogs)
        await expect(result).toEqual(listHelper.mostBlogsObject)
    })
})
//4.7
describe('author with', () => {
    test('most likes', async () => {
        const result = listHelper.mostLikes(listHelper.blogs)
        await expect(result).toEqual(listHelper.mostLikesObject)
    })
})
//4.8
describe('test database has after setup', () => {
    test('correct amount of blogs', async () => {
        const response = await api.get('/api/blogs').set(jwtHelper.loginVilleAuthToken())
        //logger.info('blogilist.api.test.correct amount of blogs.response', response)
        expect(response.body).toHaveLength(2)
    })
})
//4.9
describe('the property id', () => {
    test('exists in blogs first answer', async () => {
        //logger.info('blogilist.api.test.jwtHelper.loginVilleAuthHeader', jwtHelper.loginVilleAuthToken())
        //const response = await api.get('/api/blogs').set(jwtHelper.loginVilleAuthHeader)
        const response = await api.get('/api/blogs').set(jwtHelper.loginVilleAuthToken())
        //logger.info('blogilist.api.test.response', response.body)
        expect(response.body[0].id).toBeDefined()
    })
})
//4.10
describe('adding a blog', () => {
    test('with post succeeds and adds a blog to blogs', async () => {
        const blogsBeforeLenght = await (await api.get('/api/blogs').set(jwtHelper.loginVilleAuthToken())).body.length
        logger.info('blogilist.api.test.with post succeeds and adds a blog to blogs.blogsBeforeLenght', blogsBeforeLenght)
        const newBlogPost = {
            title: 'testTitle',
            author: 'testAuthor',
            url: 'testUrl',
            likes: 1337
        }



        //const postTestBlogResponse = 
        await api
            .post('/api/blogs')
            .set(jwtHelper.loginVilleAuthToken())
            .send(newBlogPost)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        //logger.info("blogilist.api.test.with post succeeds and adds a blog to blogs.postTestBlogResponse", postTestBlogResponse)

        const response = await api.get('/api/blogs').set(jwtHelper.loginVilleAuthToken())
        //logger.info('blogilist.api.test.with post succeeds and adds a blog to blogs.response', response.body)
        const titleContents = response.body.map(r => r.title)
        //logger.info('blogilist.api.test.with post succeeds and adds a blog to blogs.titleContents', titleContents)
        //logger.info('blogilist.api.test.with post succeeds and adds a blog to blogs.titleContents.length', titleContents.length)
        expect(titleContents).toContain('testTitle')
        expect(titleContents).toHaveLength(blogsBeforeLenght + 1)
    })
    //4.11
    test('without likes sets added blogs likes to 0', async () => {
        const newBlogPost = {
            title: 'testLikes',
            author: 'testAuthor',
            url: 'testUrl'
        }
        const addBlog = await api
            .post('/api/blogs')
            .set(jwtHelper.loginVilleAuthToken())
            .send(newBlogPost)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        //logger.info('blogilist.api.test.adding a blog without likes sets added blogs likes to 0.addBlog', addBlog)
        const response = await api.get('/api/blogs').set(jwtHelper.loginVilleAuthToken())
        //logger.info('blogilist.api.test.adding a blog without likes sets added blogs likes to 0.response.body', response.body)
        const likes = response.body.find(blog => blog.title === 'testLikes')
        //logger.info('blogilist.api.test.adding a blog without likes sets added blogs likes to 0.likes', likes)

        expect(likes.likes).toBe(0)

    })
    test('without token returns 401', async () => {
        const newBlogPost = {
            title: 'testLikes',
            author: 'testAuthor',
            url: 'testUrl'
        }
        await api
            .post('/api/blogs')
            .send(newBlogPost)
            .expect(401)
    })
})
//4.12
describe('empty title and or empty url returns error 400', () => {
    test('empty title returns 400', async () => {
        const newBlogNoTitle = {
            author: 'testAuthor',
            url: 'testUrl'
        }
        await api
            .post('/api/blogs')
            .set(jwtHelper.loginVilleAuthToken())
            .send(newBlogNoTitle)
            .expect(400)
    })
    test('empty url returns 400', async () => {
        const newBlogNoUrl = {
            title: 'testLikes',
            author: 'testAuthor',
        }
        await api
            .post('/api/blogs')
            .set(jwtHelper.loginVilleAuthToken())
            .send(newBlogNoUrl)
            .expect(400)
    })
})
//4.13
describe('deletion of blogs', () => {
    test('is possible', async () => {
        const newBlogToDelete = {
            title: 'deleteMe',
            author: 'testAuthor',
            url: 'testUrl'
        }
        await api
            .post('/api/blogs')
            .set(jwtHelper.loginVilleAuthToken())
            .send(newBlogToDelete)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        const response = await (await api.get('/api/blogs').set(jwtHelper.loginVilleAuthToken())).body.find(blog => blog.title === 'deleteMe')
        await api
            .delete(`/api/blogs/${response.id}`)
            .set(jwtHelper.loginVilleAuthToken())
            .send()
            .expect(204)
    })
})
//4.14
describe('editing of blogs', () => {
    test('is possible', async () => {
        const newBlogToEdit = {
            title: 'editMe',
            author: 'testAuthor',
            url: 'testUrl'
        }
        const newLikes = {
            likes: 1337
        }
        await api
            .post('/api/blogs')
            .set(jwtHelper.loginVilleAuthToken())
            .send(newBlogToEdit)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        const response = await (await api.get('/api/blogs').set(jwtHelper.loginVilleAuthToken())).body.find(blog => blog.title === 'editMe')
        const putResult = await api
            .put(`/api/blogs/${response.id}`)
            .set(jwtHelper.loginVilleAuthToken())
            .send(newLikes)
            .expect(200)
        expect(putResult.body).toEqual(
            expect.objectContaining(
                {
                    id: expect.any(String),
                    title: 'editMe',
                    url: 'testUrl',
                    likes: 1337,
                    user: '64c982c350d0acd263a57489'
                })
        )

    })
})
afterAll(async () => {
    await mongoose.connection.close()
})