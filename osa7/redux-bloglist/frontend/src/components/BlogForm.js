import { useField } from "../hooks"
import { useDispatch } from "react-redux"
import { createBlog } from "../reducers/blogReducer"
import {Form, Button, Card, FloatingLabel} from 'react-bootstrap';

const BlogForm = () => {
    const dispatch = useDispatch()
    const title = useField("text")
    const author = useField("text")
    const url = useField("text")

    const {reset: resetTitle, ...inputTitle} = title
    const {reset: resetAuthor, ...inputAuthor} = author
    const {reset: resetUrl, ...inputUrl} = url

    const handleCreate = (event) => {
        event.preventDefault()
        resetTitle()
        resetAuthor()
        resetUrl()
        const blogObject = {
            title: title.value,
            author: author.value,
            url: url.value
        }
        dispatch(createBlog(blogObject))
    }

    return (
        <>
        <Card style={{margin: '20px'}}>
            <Card.Header as="h3">Add a new blog</Card.Header>
            <Form>
                <FloatingLabel className="sm-1" controlId="formBasicTitle" label="Title" style={{marginInline: '20px', marginTop: '5px'}}>
                    <Form.Control type="text" placeholder="Title" {...inputTitle} />
                </FloatingLabel>
                <FloatingLabel className="sm-1" controlId="formBasicAuthor" label="Author" style={{marginInline: '20px', marginTop: '5px'}}>
                    <Form.Control type="text" placeholder="Author" {...inputAuthor} />
                </FloatingLabel>
                <FloatingLabel className="sm-1" controlId="formBasicUrl" label="Url" style={{marginInline: '20px', marginTop: '5px'}}>
                    <Form.Control type="text" placeholder="Url" {...inputUrl} />
                </FloatingLabel>
                <Button variant="primary" type="submit" onClick={handleCreate} style={{marginInline: '20px', marginBlock: '5px'}}>
                    Submit
                </Button>
            </Form>
        </Card>
        </>
    )
}

export default BlogForm