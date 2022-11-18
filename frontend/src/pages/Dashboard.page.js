import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/actions/userActions";


const Dashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if (!userInfo) navigate('/login');
    }, [userInfo]);

    return (
        <div>
        <h1>Dashboard</h1>
        <p>Welcome </p>
        <Button onClick={() =>dispatch(logout())}>Logout</Button>
        </div>
    );
    }

export { Dashboard };