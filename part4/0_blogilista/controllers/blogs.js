const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')
const Blog = require('../models/blog')
const User = require('../models/user')
const logger = require('../utils/logger')

blogsRouter.get('/', async (request, response) => {
    const blogsRouter = await Blog
        .find({})
        .populate('user', { username: 1, name: 1 })
    response.json(blogsRouter)

})

blogsRouter.patch('/', async (request, response) => {
    return response.status(218).json({ motherfucking: 'teapot' })
})

blogsRouter.post('/', async (request, response) => {
    //logger.info("blogs.request", request)
    const body = request.body

    //logger.info("blogs.request.user", request.user)
    const user = await request.user

    if (body.title === undefined) {
        return response.status(400).json({ error: 'title missing' })
    }
    if (body.url === undefined) {
        return response.status(400).json({ error: 'url missing' })
    }

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes === undefined ? 0 : body.likes,
        user: user._id
    })
    await blog.save()
    const userModel = await User.findById(user._id)
    userModel.blogs = userModel.blogs.concat(blog._id)
    await userModel.save()
    response.status(201).json(blog)
})
blogsRouter.put('/:id', async (request, response, next) => {
    const body = request.body
    const blog = {
        likes: body.likes
    }
    Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
        .then(updatedBlog => {
            response.json(updatedBlog)
        })
        .catch(error => next(error))
})
blogsRouter.delete('/:id', async (request, response) => {
    const user = request.user
    const blogToDelete = await Blog.findById(request.params.id)
    if (!user || !blogToDelete) {
        response.status(404).json({ error: 'user or blog not found' })
    }

    //logger.info("blogsRouter.delete.user", user)
    //logger.info("blogsRouter.delete.blogToDelete", blogToDelete)

    if ((user._id && blogToDelete.user) && user._id.toString() === blogToDelete.user.toString()) {
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
    } else { response.status(401).json({ error: 'Blog not owned by deleter or other error' }) }
})


module.exports = blogsRouter