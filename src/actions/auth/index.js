import {
    CHECK_AUTH, FETCH_CURRENT_USER,
    INVALIDATE_AUTH, SET_AUTH, SET_COOKIE, SET_USER
} from "./types";

export const checkAuthentication = () => ({
    type: CHECK_AUTH
});
export const invalidateAuthentication = () => ({
    type: INVALIDATE_AUTH
});
export const setCookie = (cookie) => ({
    type: SET_COOKIE,
    payload: cookie
});

export const setAuth = (data) => ({
    type: SET_AUTH,
    payload: data
});
export const setUser = (userData) => ({
    type: SET_USER,
    payload: userData
});
export const fetchCurrentUser = () => ({
    type: FETCH_CURRENT_USER,
});