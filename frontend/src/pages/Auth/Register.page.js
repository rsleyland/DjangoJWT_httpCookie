import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { register } from "../../redux/actions/userActions";
import { Form, Container, Col, Button, Stack } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { LoadingOverlay } from "../../components/LoadingOverlay.js";
import { LinkContainer } from 'react-router-bootstrap';

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userRegister = useSelector(state => state.userRegister);
    const { success, loading, error } = userRegister;

    useEffect(() => {
        if (success) {
            dispatch({ type: 'USER_REGISTER_CLEAR' });
            navigate('/login');
        }
    }, [success]);

    useEffect(() => {
        if (error) console.log(error);
    }, [error]);

    const handleSubmit = (e) => {
        e.preventDefault();
        let first_name = e.target?.first_name?.value;
        let last_name = e.target?.last_name?.value;
        let email = e.target?.email?.value;
        let password = e.target?.password?.value;
        let passwordConfirm = e.target?.passwordConfirm?.value;
        if (!email || !password || !passwordConfirm || !first_name) return;
        if (email.length > 0 && password.length > 0 && passwordConfirm.length > 0 && first_name.length > 0 && password === passwordConfirm) {
            dispatch(register(email, password, first_name, last_name));
        }
    }

    return (
        <Container fluid className="d-flex bg-dark min-vh-100 justify-content-center align-items-center">
            <LoadingOverlay isLoading={loading} />
            <Container className="d-flex justify-content-center">
                <Col xs={12} md={8} lg={6} xl={5} className="bg-light rounded p-4">
                    <h3 className="mb-3">Register</h3>
                    <Form onSubmit={handleSubmit}>
                        <Stack direction="horizontal" className="justify-content-between my-2">
                            <Form.Group controlId="first_name" className="me-2 w-100">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter first name" />
                            </Form.Group>
                            <Form.Group controlId="last_name" className="ms-2 w-100">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter second name" />
                            </Form.Group>
                        </Stack>
                        <Form.Group controlId="email" className="mt-2">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                        </Form.Group>
                        <Stack direction="horizontal" className="justify-content-between my-2">
                            <Form.Group controlId="password" className="me-2 w-100">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" />
                            </Form.Group>
                            <Form.Group controlId="passwordConfirm" className="ms-2 w-100">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control type="password" placeholder="Confirm Password" />
                            </Form.Group>
                        </Stack>
                        <Stack direction="horizontal" className="justify-content-center my-3">
                            <Button type="submit" className="w-50">Register</Button>
                        </Stack>
                        <Stack direction="horizontal" className="justify-content-between my-3">
                            <LinkContainer to="/login" role={'button'}>
                                <small>Already have an account? Login</small>
                            </LinkContainer>
                        </Stack>
                    </Form>
                </Col>
            </Container>
        </Container>
    );

}

export { Register };