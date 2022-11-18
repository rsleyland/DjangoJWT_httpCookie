import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { userLoginReducer, userRegisterReducer, userResetPasswordEmailReducer, userResetPasswordChangeReducer } from './reducers/userReducer.js';
import thunk from 'redux-thunk';
import { USER_IN_STORAGE } from './constants/userConstants.js';


const reducer = combineReducers({
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userResetPasswordEmail: userResetPasswordEmailReducer,
    userResetPasswordChange: userResetPasswordChangeReducer,

});

const initialState = {
    userLogin: {userInfo: localStorage.getItem(USER_IN_STORAGE)? JSON.parse(localStorage.getItem(USER_IN_STORAGE)): null,
    },
};

const store = configureStore({
    reducer: reducer,
    middleware: (gDM) => gDM().concat(thunk),
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState: initialState,
});

export { store };