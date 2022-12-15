const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
    title: 'first blog post',
    author: 'Joonas',
    url: 'imagenary.urlosoite',
    likes: 28
    },
    {
        title: 'Second post',
        author: 'Joonas',
        url: 'stillImagenary.url',
        likes: 69
    },
    {
        title: 'third and last post',
        author: 'Joonas',
        url: 'somehowitisstillImagenary.website',
        likes: 420
    },
]

const initialUsers = [
  {
    "username": "Joonas",
    "name": "Joonas",
    "password": "salis"
}
]

const nonExistingId = async () => {
    const blog = new Blog({title: 'Oke on based tohelo',
        author: 'Make',
        url: 'www.kakkapaa.based',
        likes: 3})
    await blog.save()
    await blog.remove()
  
    return blog._id.toString()
  }
  
  const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
  }

  const blogById = async (id) => {
    const blog = await Blog.findById(id)
    return blog.map(blog => blog.toJSON())
  }

  const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
  } 

module.exports = {
    initialBlogs, initialUsers, nonExistingId, blogsInDb, blogById, usersInDb
  }