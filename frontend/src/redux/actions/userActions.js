import {
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_IN_STORAGE,
    USER_REGISTER_REQUEST,
    USER_REGISTER_FAIL,
    USER_REGISTER_SUCCESS,
    USER_RESET_PASSWORD_EMAIL_REQUEST,
    USER_RESET_PASSWORD_EMAIL_SUCCESS,
    USER_RESET_PASSWORD_EMAIL_FAIL,
    USER_RESET_PASSWORD_CHANGE_REQUEST,
    USER_RESET_PASSWORD_CHANGE_SUCCESS,
    USER_RESET_PASSWORD_CHANGE_FAIL,
} from "../constants/userConstants";
import axios from 'axios';


const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: USER_LOGIN_REQUEST });

        const { data } = await axios.post('/api/account/login/', { email, password });

        dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

        localStorage.setItem(USER_IN_STORAGE, JSON.stringify(data));

    } catch (error) {
        dispatch({ type: USER_LOGIN_FAIL, payload: error?.response?.data });
    }
}

const register = (email, password, first_name, last_name = '',) => async (dispatch) => {
    try {
        dispatch({ type: USER_REGISTER_REQUEST });

        const { data } = await axios.post('/api/account/register/', { email, password, first_name, last_name });
        
        dispatch({ type: USER_REGISTER_SUCCESS });

    }
    catch (error) {
        dispatch({ type: USER_REGISTER_FAIL, payload: error?.response?.data });
    }
}

const logout = () => async (dispatch) => {
    localStorage.removeItem(USER_IN_STORAGE);
    await axios.post('/api/account/logout/');
    dispatch({ type: USER_LOGOUT });
}

const resetPasswordEmail = (email) => async (dispatch) => {
    try {
        dispatch({ type: USER_RESET_PASSWORD_EMAIL_REQUEST });

        await axios.post('/api/account/reset-password/', { email });

        dispatch({ type: USER_RESET_PASSWORD_EMAIL_SUCCESS });

    }
    catch (error) {
        dispatch({ type: USER_RESET_PASSWORD_EMAIL_FAIL, payload: error?.response?.data });
    }
}

const resetPasswordChange = (email, code, password) => async (dispatch) => {
    try {
        dispatch({ type: USER_RESET_PASSWORD_CHANGE_REQUEST });

        await axios.post(`/api/account/reset-password/${code}/`, { email, password });

        dispatch({ type: USER_RESET_PASSWORD_CHANGE_SUCCESS });

    }
    catch (error) {
        dispatch({ type: USER_RESET_PASSWORD_CHANGE_FAIL, payload: error?.response?.data });
    }
}


export { login, register, logout, resetPasswordEmail, resetPasswordChange };