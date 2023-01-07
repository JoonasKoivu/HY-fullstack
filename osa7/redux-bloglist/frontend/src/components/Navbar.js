import {LinkContainer} from 'react-router-bootstrap'
import { Navbar, Nav, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {logout } from "../reducers/userReducer";

const Navigation = () => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)
    return (
        <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect sticky="top">
            <LinkContainer to="/">
                <Navbar.Brand>B-B-BB-Blogs forrr dayssssss</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <LinkContainer to="/blogs">
                        <Nav.Link>Blogs</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/users">
                        <Nav.Link>Users</Nav.Link>
                    </LinkContainer>
                </Nav>
                    <Navbar.Text color="White" >Logged in as {user.name}</Navbar.Text>
                    <Button style={{marginInline: '10px'}} onClick={() => dispatch(logout())}>Logout</Button>

            </Navbar.Collapse>
        </Navbar>
    )
}

export default Navigation