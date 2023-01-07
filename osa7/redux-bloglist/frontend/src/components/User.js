import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const User = ({user}) => {
    const blogs = useSelector(state => state.blogs)
    const blogsByUser = Object.values(blogs)
        .filter(blog => 
            blog.user.username === user.username)

    if(!user) {
        return null
    } else if (blogsByUser.length === 0) {
        return(
            <div>
                <h2>{user.name}</h2>
                <h3>Added blogs</h3>
                <p>No blogs added</p>
            </div>
        )
    }
    return(
        <div style={{margin: '25px'}}>
            <h2>{user.name}</h2>
            <h3>Added blogs</h3>
            <ul>
                {blogsByUser.map(blog =>
                    <li key={blog.id}>
                        <Link to={`/blogs/${blog.id}`}>
                            {blog.title}
                        </Link>
                    </li>
                )}
            </ul>
        </div>
    )
}

export default User