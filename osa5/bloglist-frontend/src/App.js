/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import ErrorNotification from './components/ErrorNotification'

import loginService from './services/login'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [errorMessage, setErrorMessage] = useState(null)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    blogService.getAll()
      .then(blogs => {
        setBlogs( blogs )
      }
      )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.clear()
    setUser(null)
  }

  const logoutButton = () => (
    <form onSubmit={handleLogout}>
      <button type="submit">Logout</button>
    </form>
  )

  const blogFormRef = useRef()
  const loginFormRef = useRef()

  const loginUser = async ({ username, password }) => {
    try{
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        let filledUser = returnedBlog
        filledUser.user = user
        setMessage(`Added a new blog: ${blogObject.title} by -${blogObject.author}`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
        setBlogs(blogs.concat(filledUser))
      })
  }
  const handleLike = ({ id, blogObject }) => {
    blogService
      .update(id, blogObject)
      .then(() => {
        setBlogs(blogs.map(blog => blog.id !== id ? blog : { ...blog, likes: blogObject.likes }))
      })
  }

  const removeBlog = (blogObject) => {
    try{
      blogService
        .remove(blogObject.id)
        .then(() => {
          console.log(`${blogObject.title} deleted`)
          setBlogs(blogs.filter(blog => blog.id !== blogObject.id))
          setMessage(`Deleted ${blogObject.title}`)
          setTimeout(() => {
            setMessage(null)
          }, 3500)
        })
    }
    catch (error) {
      setMessage(`Could not remove blog ${blogObject.title}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)}
  }

  return (
    <div>
      <h1>BB-B-B-Blogs for days</h1>
      <ErrorNotification message={errorMessage} />
      <Notification message={ message } />

      {user === null ?
        <Togglable buttonLabel="Press to log in" ref={loginFormRef}>
          <LoginForm loginUser={loginUser}/>
        </Togglable> :
        <div>
          <section className="userbanner">
            <p className="user">Logged in as {user.name}</p>
            {logoutButton()}
          </section>
          <Togglable buttonLabel="add new blog" ref={blogFormRef}>
            <BlogForm createBlog={addBlog}/>
          </Togglable>
          <h3>List of blogs</h3>
          {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
            <Blog key={blog.id} blog={blog} removeBlog={removeBlog} handleLike={handleLike} username={user.username}/>
          )}
        </div>
      }
    </div>
  )
}

export default App
