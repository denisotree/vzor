import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
};

export const authSuccess = (token, username) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        username: username
    }
};

export const authFail = error => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
};

export const logout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('token');
    return {
        type: actionTypes.AUTH_LOGUT
    }
};

export const authUpdate = userData => {
    return {
        type: actionTypes.AUTH_UPDATE,
        currentUser: userData
    }
};

export const checkAuthTimeout = expirationTime => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000)
    }
};

export const getCurrentUserData = () => {
    return dispatch => {
        const currentUserName = localStorage.getItem('username');
        if (currentUserName) {
            axios.get(`${window.location.protocol}//${window.location.hostname}:8000/api/v1/authors/${currentUserName}/`)
                .then(res => {
                        const userData = res.data;
                        dispatch(authUpdate(userData));
                    }
                );
        }
    }
};

export const authLogin = (username, password) => {
    return dispatch => {
        dispatch(authStart());
        axios.post(`${window.location.protocol}//${window.location.hostname}:8000/rest-auth/login/`, {
            username: username,
            password: password
        })
            .then(res => {
                const token = res.data.key;
                const expirationDate = new Date(new Date().getTime() + 3600 * 1000 * 12);
                localStorage.setItem('token', token);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('username', username);
                dispatch(authSuccess(token, username));
                dispatch(checkAuthTimeout(3600 * 12));
                dispatch(getCurrentUserData());
            })
            .catch(error => {
                dispatch(authFail(error))
            })
    }
};


export const authSignup = (username, first_name, second_name, password1, password2, email, phone) => {
    return dispatch => {
        dispatch(authStart());
        axios.post(`${window.location.protocol}//${window.location.hostname}:8000/rest-auth/registration/`, {
            username: username,
            email: email,
            phone: phone,
            first_name: first_name,
            second_name: second_name,
            password1: password1,
            password2: password2
        })
            .then(res => {
                const token = res.data.key;
                const expirationDate = new Date(new Date().getTime() + 3600 * 1000 * 12);
                localStorage.setItem('token', token);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('username', username);
                dispatch(authSuccess(token, username));
                dispatch(checkAuthTimeout(3600 * 12));
                dispatch(getCurrentUserData());
            })
            .catch(error => {
                dispatch(authFail(error))
            })
    }
};


export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('username');
        if (token === undefined || token === null) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                dispatch(authSuccess(token, username));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
            }
        }
    }
};