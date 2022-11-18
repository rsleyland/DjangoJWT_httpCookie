import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    USER_REGISTER_REQUEST,
    USER_REGISTER_FAIL,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_CLEAR,
    USER_RESET_PASSWORD_EMAIL_REQUEST,
    USER_RESET_PASSWORD_EMAIL_SUCCESS,
    USER_RESET_PASSWORD_EMAIL_FAIL,
    USER_RESET_PASSWORD_CHANGE_SUCCESS,
    USER_RESET_PASSWORD_CHANGE_FAIL,
    USER_RESET_PASSWORD_CHANGE_REQUEST,

} from '../constants/userConstants';

const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return { loading: true };
        case USER_LOGIN_SUCCESS:
            return { loading: false, userInfo: action.payload };
        case USER_LOGIN_FAIL:
            return { loading: false, error: action.payload };
        case USER_LOGOUT:
            return {};
        default:
            return state;
    }
}

const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return { loading: true };
        case USER_REGISTER_SUCCESS:
            return { loading: false, success: true };
        case USER_REGISTER_FAIL:
            return { loading: false, error: action.payload };
        case USER_REGISTER_CLEAR:
            return {};
        default:
            return state;
    }
}

const userResetPasswordEmailReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_RESET_PASSWORD_EMAIL_REQUEST:
            return { loading: true };
        
        case USER_RESET_PASSWORD_EMAIL_SUCCESS:
            return { loading: false, success: true };
        
        case USER_RESET_PASSWORD_EMAIL_FAIL:
            return { loading: false, success: false, error: action.payload };
        
        default:
            return state;
    }
}

const userResetPasswordChangeReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_RESET_PASSWORD_CHANGE_REQUEST:
            return { loading: true };
        
        case USER_RESET_PASSWORD_CHANGE_SUCCESS:
            return { loading: false, success: true };

        case USER_RESET_PASSWORD_CHANGE_FAIL:
            return { loading: false, success: false, error: action.payload };
        
        default:
            return state;
    }
}



export { userLoginReducer, userRegisterReducer, userResetPasswordEmailReducer, userResetPasswordChangeReducer };