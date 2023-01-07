import { useField } from "../hooks/index";
import { useDispatch } from "react-redux";
import { login } from "../reducers/userReducer";
import { createNotification } from "../reducers/notificationReducer";
import loginService from "../services/login";
import {Form, Button, Card, Container, Row, Col} from 'react-bootstrap';

const LoginForm = () => {
    const dispatch = useDispatch();
    const username = useField("text");
    const password = useField("password");
    
    const {reset: resetUsername, ...inputUsername} = username
    const {reset: resetPassword, ...inputPassword} = password

    const handleLogin = async (event) => {
        try {
            event.preventDefault();
            const user = await loginService.login({
                username: username.value,
                password: password.value
            })
 
            dispatch(login(user))
            resetUsername()
            resetPassword()
            dispatch(createNotification(`Welcome ${username.value}`, 5))
        }
        catch (error) {
            const type = "alert"
            dispatch(createNotification('Wrong username or password', 5, type))
        }
    };

    return (
        <Container className="d-flex align-items-center justify-content-center" style={{height: '100vh'}}>
            <Row>
                <Col>        
                    <Card style={{ width: '50vw', margin: 'auto'}}>
                    <Card.Header as="h3">Login</Card.Header>
                    <Form>
                        <Form.Group className="mb-4" controlId="formBasicUsername" style={{margin: '20px'}}>
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Enter username" {...inputUsername} />
                        </Form.Group>
                        <Form.Group className="mb-4" controlId="formBasicPassword" style={{margin: '20px'}}>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" {...inputPassword} />
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={handleLogin} style={{margin: '20px'}}>
                            Submit
                        </Button>
                    </Form>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default LoginForm;