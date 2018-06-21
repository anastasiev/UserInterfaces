import {
    CHANGE_LOGIN_SCREENS,
    HIDE_ERROR_LOGIN, HIDE_LOGIN_SPINNER, LOGIN, SHOW_ERROR_LOGIN, SHOW_LOGIN_FORM, SHOW_LOGIN_SPINNER,
    SHOW_SIGNUP_FORM,
    SIGNUP
} from "./types";

export const showError = (errorMessage) => ({
    type: SHOW_ERROR_LOGIN,
    payload: errorMessage
});
export const hideError = () => ({
    type: HIDE_ERROR_LOGIN
});
export const showLoginForm = () => ({
    type: SHOW_LOGIN_FORM
});
export const showSignupForm = () => ({
    type: SHOW_SIGNUP_FORM
});
export const login = (loginData) => ({
    type: LOGIN,
    payload: loginData
});
export const signup = (signupData) => ({
    type: SIGNUP,
    payload: signupData
});
export const showLoginSpinner = () => ({
    type: SHOW_LOGIN_SPINNER
});
export const hideLoginSpinner = () => ({
    type: HIDE_LOGIN_SPINNER
});
export const changeScreens = () => ({
    type: CHANGE_LOGIN_SCREENS
});
