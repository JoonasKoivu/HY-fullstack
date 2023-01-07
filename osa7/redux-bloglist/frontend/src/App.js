import { useEffect, useState } from "react";
import { Routes, Route, useMatch } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";

import Blogs, {Blog} from "./components/Blogs";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification.js";
import Users from "./components/Users";
import User from "./components/User";
import Home from "./components/Home";

import { initializeBlogs } from "./reducers/blogReducer";
import userService from "./services/user";
import Navigation from "./components/Navbar";

const App = () => {
    if(window.localStorage.getItem('loggedBlogappUser')) {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        const user = JSON.parse(loggedUserJSON)
        userService.setUser(user)
    }
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const blogs = useSelector((state) => state.blogs);
    const [users, setUsers] = useState([])

    useEffect(() => {
        dispatch(initializeBlogs())
    }, [dispatch])

    useEffect(() => {
        userService.getAll().then(users => setUsers(users))
    }, [blogs])

    const matchBlog = useMatch('/blogs/:id')
    const blog = matchBlog ? blogs.find(blog => blog.id === matchBlog.params.id) : null

    const matchUser = useMatch('/users/:id')
    const userById = matchUser ? users.find(user => user.id === matchUser.params.id) : null

    if(user === null) {
        return(
            <div className="container">
                <Notification />
                <LoginForm />
            </div>
        )
    } else {
        return (
        <div>
            <Navigation />
            <Notification />
            <Routes>
                <Route path="/" element={<Home users={users}/>} />
                <Route path="/blogs" element={<Blogs />} />
                <Route path="/users" element={<Users users={users} />} />
                <Route path="/users/:id" element={<User user={userById} />} />
                <Route path="/blogs/:id" element={<Blog blog={blog} user={user} />} />
            </Routes>
        </div>
        )
    }
}

export default App;