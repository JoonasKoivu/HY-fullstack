import BlogForm from "./BlogForm";
import Blogs from "./Blogs";
import { Container } from "react-bootstrap";

const Home = () => {
    return (
        <Container>
            <BlogForm />
            <Blogs />
        </Container>
    )
}

export default Home