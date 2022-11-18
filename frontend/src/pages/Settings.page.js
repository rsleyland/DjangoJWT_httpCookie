import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserProfile } from '../redux/actions/userActions.js';
import { LoadingOverlay } from '../components/LoadingOverlay.js';
import { Button, Container, Col, Row, Stack } from "react-bootstrap";
import { Header } from '../components/navigation/Header.js';
import { InputWithIcon } from '../components/InputWithIcon.js'


const Settings = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;
    const userProfile = useSelector(state => state.userProfile);
    const { profileInfo, loading, error } = userProfile;
    const [passwordToggle, setPasswordToggle] = useState(true);
    const [oldPasswordToggle, setOldPasswordToggle] = useState(true);
    const [passwordConfirmToggle, setPasswordConfirmToggle] = useState(true);

    const [inputErrors, setInputErrors] = useState({
        email: false,
        password: false,
        password_confirm: false,
        old_password: false,
        first_name: false,
        last_name: false,
        phone: false,
        address: false,
        city: false,
        state: false,
        zip_code: false,
        country: false
    });
    const [inputValues, setInputValues] = useState({
        email: "",
        password: "",
        password_confirm: "",
        old_password: "",
        first_name: "",
        last_name: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        zip_code: "",
        country: ""
    });

    useEffect(() => {
        if (!userInfo) return navigate('/login');
        setInputValues((prev) => ({
            email: userInfo.email,
            first_name: userInfo.first_name,
            last_name: userInfo.last_name
        }));
        dispatch(getUserProfile());
    }, [userInfo, navigate]);

    useEffect(() => {
        if (error) {
            console.log(error);
        }
    }, [error]);

    useEffect(() => {
        if (profileInfo) {
            setInputValues((prev) => ({
                ...prev,
                phone: profileInfo.phone,
                address: profileInfo.address,
                city: profileInfo.city,
                state: profileInfo.state,
                zip_code: profileInfo.zip_code,
                country: profileInfo.country
            }));
        }
    }, [profileInfo]);


    return (
        <Container fluid className="bg-dark min-vh-100">
            <Header />
            <LoadingOverlay loading={loading} />
            <h2 className="text-white ps-3 pt-3">Settings</h2>
            <Row className="justify-content-center">
                <Col xs={11} lg={6}>
                    {userInfo && profileInfo && <>
                        <h4 className='text-white mt-3'>Update user details</h4>
                        <InputWithIcon
                            icon="fas fa-envelope"
                            name="email"
                            placeholder="Email"
                            setInputValues={setInputValues}
                            type="email"
                            value={inputValues.email || ""}
                            error={inputErrors.email}
                            autoFocus={true}
                        />
                        <Stack direction="horizontal">
                            <InputWithIcon
                                icon="fas fa-user"
                                name="first-name"
                                placeholder="First Name"
                                setInputValues={setInputValues}
                                value={inputValues.first_name || ""}
                                type="text"
                                error={inputErrors.first_name}
                            />
                            <InputWithIcon
                                icon="fas fa-user"
                                name="last-name"
                                placeholder="Last Name"
                                value={inputValues.last_name || ""}
                                setInputValues={setInputValues}
                                type="text"
                                error={inputErrors.last_name}
                            />
                        </Stack>
                        <InputWithIcon
                            icon="fas fa-phone"
                            name="phone"
                            placeholder="Phone"
                            value={inputValues.phone || ""}
                            setInputValues={setInputValues}
                            type="text"
                            error={inputErrors.phone}
                        />
                        <Stack direction="horizontal">
                            <InputWithIcon
                                icon="fas fa-earth-americas"
                                name="address"
                                placeholder="Address"
                                value={inputValues.address || ""}
                                setInputValues={setInputValues}
                                type="text"
                                error={inputErrors.address}
                            />
                            <InputWithIcon
                                icon="fas fa-earth-americas"
                                name="city"
                                placeholder="City"
                                value={inputValues.city || ""}
                                setInputValues={setInputValues}
                                type="text"
                                error={inputErrors.city}
                            />
                        </Stack>

                        <InputWithIcon
                            icon="fas fa-earth-americas"
                            name="zip_code"
                            placeholder="Zipcode"
                            value={inputValues.zip_code || ""}
                            setInputValues={setInputValues}
                            type="text"
                            error={inputErrors.zip_code}
                        />
                        <Stack direction="horizontal">
                            <InputWithIcon
                                icon="fas fa-earth-americas"
                                name="state"
                                placeholder="State"
                                value={inputValues.state || ""}
                                setInputValues={setInputValues}
                                type="text"
                                error={inputErrors.state}
                            />
                            <InputWithIcon
                                icon="fas fa-earth-americas"
                                name="country"
                                placeholder="Country"
                                value={inputValues.country || ""}
                                setInputValues={setInputValues}
                                type="text"
                                error={inputErrors.country}
                            />
                        </Stack>

                        <Button variant="primary" className="w-100 mt-3">Update</Button>

                        <hr className="text-white mt-5" />
                        <h4 className='text-white mt-5'>Change Password</h4>

                        <InputWithIcon
                            onClick={() => setOldPasswordToggle((p) => !p)}
                            icon={"password fas " + (oldPasswordToggle ? "fa-eye" : "fa-eye-slash")}
                            name="old_password"
                            placeholder="Old Password *"
                            setInputValues={setInputValues}
                            type={oldPasswordToggle ? "password" : "text"}
                            error={inputErrors.old_password}
                        />
                        <Stack direction="horizontal">
                            <InputWithIcon
                                onClick={() => setPasswordToggle((p) => !p)}
                                icon={"password fas " + (passwordToggle ? "fa-eye" : "fa-eye-slash")}
                                name="password"
                                placeholder="Password *"
                                setInputValues={setInputValues}
                                type={passwordToggle ? "password" : "text"}
                                error={inputErrors.password}
                            />
                            <InputWithIcon
                                onClick={() => setPasswordConfirmToggle((p) => !p)}
                                name="password_confirm"
                                icon={"password fas " + (passwordConfirmToggle ? "fa-eye" : "fa-eye-slash")}
                                placeholder="Confirm Password *"
                                setInputValues={setInputValues}
                                type={passwordConfirmToggle ? "password" : "text"}
                                error={inputErrors.password_confirm}
                            />
                        </Stack>
                        <Button variant="primary" className="w-100 my-3">Update</Button>
                    </>}
                </Col>
            </Row>

        </Container>
    );
}

export { Settings };