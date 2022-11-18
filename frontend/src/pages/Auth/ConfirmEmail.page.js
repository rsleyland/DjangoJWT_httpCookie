import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";


const ConfirmEmail = () => {
    const { code } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (code) {
            axios.post(`/api/account/confirm-email/${code}/`).then((response) => {
                console.log(response);
                setTimeout(() => {
                    navigate('/login');
                }, 3000);
            })
                .catch((error) => {
                    console.log(error.response);
                });
        }
    }, [code]);


    return (
        <div>
            <h3>Your email address is now confirmed.</h3>
            <p>You will be redirected to the login page in 3 seconds.</p>
        </div>
    );
}

export { ConfirmEmail };