import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks'
import { voteBlog, deleteBlog, commentBlog } from '../reducers/blogReducer'
import { createNotification } from '../reducers/notificationReducer'
import { Table, Button, Form, FloatingLabel } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useState } from 'react'

export const Blog = ({ blog, user }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const comment = useField('text')
  const {reset: resetComment, ...inputComment} = comment
  const [validated, setValidated] = useState(false);

  const handleLike = () => {
    dispatch(voteBlog(blog))
    dispatch(createNotification(`You voted for ${blog.title}`, 5))
  }

  const handleRemove = async () => {
    navigate('/')
    dispatch(deleteBlog(blog))
    dispatch(createNotification(`You removed ${blog.title}`, 5, 'alert'))
  }

  const handleComment = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      return(
        dispatch(createNotification(`Comment cannot be empty`, 5, 'alert'))
      )
    } else {
      event.preventDefault();
      dispatch(commentBlog(blog, comment.value))
      resetComment()
      setValidated(false);
      dispatch(createNotification(`You commented on ${blog.title}`, 5))
    }
  }

  const confirm = (event) => {
    event.preventDefault()
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      handleRemove()
    }
  }

  return (
    <div style={{margin: '25px'}}>
      <h3>{blog.title}</h3>
      <a href={`${blog.url}`} style={{ pointerEvents: 'none'}}>{blog.url}</a>
      <div>
        {blog.likes} likes
        <Button onClick={handleLike}>like</Button>
      </div>
      <div>
        added by {blog.user.username}
        {blog.user.username === user.username 
          ? 
            <Button variant='danger' onClick={confirm}>Remove</Button>
          : 
          <></>
        }
      </div>
      <h3>Comments</h3>
      <Form noValidate validated={validated} onSubmit={handleComment}>
        <FloatingLabel className="sm-1" controlId="formBasicComment" label="Comment" style={{marginInline: '20px', marginTop: '5px'}}>
          <Form.Control required type="text" placeholder="Comment" {...inputComment} />
        </FloatingLabel>
        <Button variant="primary" type="submit"  style={{marginInline: '20px', marginBlock: '5px'}}>
          Submit
        </Button>
      </Form>
      <ul>
        {blog.comments.map((comment, i) =>
          <li key={i}>{comment}</li>
        )}
      </ul>
    </div>
  )
}

const Blogs = () => {
  const blogs = useSelector(state => state.blogs)

  return (
    <Table striped style={{ margin: '20px' }}>
      <thead>
        <tr>
          <th>Blog posts</th>
          <th>Author</th>
        </tr>
      </thead>
      <tbody>
        {blogs.map(blog =>
          <tr key={blog.id}>
            <td >
              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </td>
            <td>{blog.author}</td>
          </tr>
        )}
      </tbody>
    </Table>
  )
}

export default Blogs