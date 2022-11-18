import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { resetPasswordEmail } from "../../redux/actions/userActions";
import { Form, Container, Col, Button, Stack } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { LoadingOverlay } from "../../components/LoadingOverlay.js";
import { LinkContainer } from 'react-router-bootstrap';

const PasswordResetRequest = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;
    const userResetPasswordEmail = useSelector(state => state.userResetPasswordEmail);
    const { success, loading, error } = userResetPasswordEmail;

    useEffect(() => {
        if (userInfo) navigate('/dashboard');
    }, [userInfo]);

    useEffect(() => {
        if (error) console.log(error);
    }, [error]);

    useEffect(() => {
        if (success) console.log("SUCCESS - email sent");
    }, [success]);


    const handleSubmit = (e) => {
        e.preventDefault();
        let email = e.target?.email?.value;
        if (!email) return;
        if (email.length > 0) {
            dispatch(resetPasswordEmail(email));
        }
    }

    return (
        <Container fluid className="d-flex bg-dark min-vh-100 justify-content-center align-items-center">
            <LoadingOverlay isLoading={loading} />
            <Container className="d-flex justify-content-center">
                <Col xs={12} md={8} lg={6} xl={5} className="bg-light rounded p-4">
                    <h3 className="mb-3">Password Reset</h3>
                    {success ? <><p>You will receive an email shortly.</p><hr/><p>Please click the link in the email to reset your password.</p></>:
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                        </Form.Group>
                        <Stack direction="horizontal" className="justify-content-center my-3 mt-4">
                            <Button type="submit" className="w-50">Submit</Button>
                        </Stack>
                        <Stack direction="horizontal" className="justify-content-start my-2 mt-4">
                            <LinkContainer to="/login" role={'button'}>
                                <small>Back to Login</small>
                            </LinkContainer>
                        </Stack>
                    </Form>}
                </Col>
            </Container>
        </Container>
    )
}
        
export { PasswordResetRequest };