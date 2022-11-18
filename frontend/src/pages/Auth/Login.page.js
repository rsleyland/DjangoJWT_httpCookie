import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { login } from "../../redux/actions/userActions";
import { Form, Container, Col, Button, Stack } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { LoadingOverlay } from "../../components/LoadingOverlay.js";
import { LinkContainer } from 'react-router-bootstrap';



const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo, loading, error } = userLogin;

    useEffect(() => {
        if (userInfo) navigate('/dashboard');
    }, [userInfo]);

    useEffect(() => {
        if (error) console.log(error);
    }, [error]);


    const handleSubmit = (e) => {
        e.preventDefault();
        let email = e.target?.email?.value;
        let password = e.target?.password?.value;
        if (!email || !password) return;
        if (email.length > 0 && password.length > 0) {
            dispatch(login(email, password));
        }
    }

    return (
        <Container fluid className="d-flex bg-dark min-vh-100 justify-content-center align-items-center">
            <LoadingOverlay isLoading={loading} />
            <Container className="d-flex justify-content-center">
                <Col xs={12} md={8} lg={6} xl={5} className="bg-light rounded p-4">
                    <h3 className="mb-3">Login</h3>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                        </Form.Group>
                        <Form.Group controlId="password" className="mt-2">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                        <Stack direction="horizontal" className="justify-content-center my-3">
                            <Button type="submit" className="w-50">Login</Button>
                        </Stack>
                        <Stack direction="horizontal" className="justify-content-between my-3">
                            <LinkContainer to="/register" role={'button'}>
                                <small>Don't have an account? Register</small>
                            </LinkContainer>
                            <LinkContainer to="/reset-password" role={'button'}>
                                <small>Forgot password?</small>
                            </LinkContainer>
                        </Stack>
                    </Form>
                </Col>
            </Container>


        </Container>
    )
}

export { Login }