const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
      .find({})
      .populate('user', {username: 1, name: 1})
    const sorted = blogs.sort((a, b) => { return b.likes - a.likes })
    response.json(sorted)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
    if(blog){
      response.json(blog)
    } else {
      response.status(404).end()
    }
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if(!request.token || !decodedToken.id) {
      return response.status(401).json({
         error: 'token missing or invalid'
      })
  }

  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0,
        user: user._id
  })
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  const blogToDelete = await Blog.findById(request.params.id)
  if(!request.token || !decodedToken || decodedToken.id !== blogToDelete.user.toString()){
    return response.status(401).json({error: 'token is missing or invalid'})
  } else {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
  }
})

blogsRouter.put('/:id', async (request, response) => {
  console.log("request.body: ",request.body)
  const blog = request.body

  const updated = await Blog.findByIdAndUpdate(request.params.id, {likes: blog.likes}, {new: true})
  console.log("updated: ", updated)
  response.json(updated.toJSON)
})

module.exports = blogsRouter