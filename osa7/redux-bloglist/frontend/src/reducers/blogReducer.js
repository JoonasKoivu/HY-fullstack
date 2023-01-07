import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { createNotification } from './notificationReducer'

const blogSlice = createSlice ({
    name: 'blogs',
    initialState: [],
    reducers: {
        appendBlog(state, action) {
            const blog = action.payload
            state.push(blog)
        },
        setBlogs(state, action) {
            return action.payload
        },
        sortBlogs(state, action) {
            return state.sort((a, b) => b.likes - a.likes)
        },
        remove(state, action) {
            const blogToUpdate = action.payload
            return state.filter(blog => blogToUpdate.id !== blog.id)
        },
        updateBlog(state, action) {
            const blogToUpdate = action.payload
            return state.map(blog => 
                blog.id === blogToUpdate.id ? blogToUpdate : blog).sort((a, b) => b.likes - a.likes)
        }

    }
})

export const createBlog = (blog) => {
    blog.likes = 0
    return async dispatch => {
        blogService.create(blog)
        .then(newBlog => {
            dispatch(appendBlog(newBlog))
        }).catch(error => {
            dispatch(createNotification("Something went wrong while creating a new post, make sure all fields are filled", 5, "alert"))
        })
    }
}

export const voteBlog = (blog) => {
    const newObject = {
      ...blog,
      likes: (blog.likes||0) + 1,
      id: blog.id,
      user: blog.user.id
    }
    return async dispatch => {
      const updatedBlog = await blogService.update(blog.id, newObject)
      dispatch(updateBlog(updatedBlog))     
    }
}

export const commentBlog = (blog, com) => {
    const newObject = {
        ...blog,
        comments: blog.comments.concat(com)
    }
    return async dispatch => {
        const updatedBlog = await blogService.comment(newObject)
        dispatch(updateBlog(updatedBlog))
    }
}

export const deleteBlog = (blog) => {
    return async dispatch => {
        await blogService.remove(blog.id)
        dispatch(remove(blog))
    }
}

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch(setBlogs(blogs))
        dispatch(sortBlogs())
    }
}
export const {appendBlog, setBlogs, remove, sortBlogs, updateBlog} = blogSlice.actions
export default blogSlice.reducer