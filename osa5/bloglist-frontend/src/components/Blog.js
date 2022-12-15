/* eslint-disable no-unused-vars */
import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleLike, removeBlog, username }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  // eslint-disable-next-line no-constant-condition
  const [showLarge, setShowLarge] = useState(false ? true : false)

  const toggleVisibility = () => {
    setShowLarge(!showLarge)
  }
  const addLike = (event) => {
    event.preventDefault()

    const blogObject = {
      user: blog.user.id,
      name: blog.user.name,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    }
    const id = blog.id

    handleLike({ id, blogObject })
  }

  const deleteBlog = () => {
    removeBlog(blog)
  }
  const confirm = (event) => {
    event.preventDefault()
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author}`)){
      deleteBlog()
    }
  }

  if(showLarge){
    return (
      // Large view of blog post
      <div style={blogStyle} className='blog'>
        <div>
          <div id='titleAndAuthor'>
            {blog.title}, by - {blog.author}
          </div>
          <div id='Url'>
            {blog.url}
          </div>
          <div id='Likes'>
                Likes: {blog.likes}
            <button id='LikeButton' onClick={addLike}>Like</button>
          </div>
          <div id='Username'>
            {blog.user.username}
          </div>
        </div>
        <button id='Hide' onClick={toggleVisibility}>Hide</button>
        {blog.user.username === username
          ?
          <div>
            <button
              onClick={confirm}
              style={{ backgroundColor: 'red', color: 'white', marginTop: 5 }}
            >
                  Remove
            </button>
          </div>
          :
          <br/>
        }
      </div>
    )
  } else {
    return (
      // small vies of blog post
      <div style={blogStyle} className='blog'>
        <div id='Title'>
          {blog.title}
        </div>
        <div id='Author'>
          by - {blog.author}
        </div>
        <button id='View' onClick={toggleVisibility}>View</button>
      </div>
    )
  }
}
Blog.propTypes = {
  /*
  blog: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  */
}

export default Blog