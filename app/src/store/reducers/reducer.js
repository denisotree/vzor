import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    token: null,
    username: null,
    error: null,
    loading: false,
    currentUser: {},
    videoData: [],
    searchQuery: null
};


const authStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true
    });
};

const authSuccess = (state, action) => {
    return updateObject(state, {
        token: action.token,
        username: action.username,
        error: null,
        loading: false,
    });
};

const authFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};

const authLogout = (state, action) => {
    return updateObject(state, {
        token: null,
        username: null,
        currentUser: []
    });
};

const authUpdateData = (state, action) => {
    return updateObject(state, {
        currentUser: action.currentUser
    })
};

const fetchVideoData = (state, action) => {
    return updateObject(state, {
        videoData: action.videoData
    })
};

const searchRequest = (state, action) => {
    return updateObject(state, {
        searchQuery: action.searchQuery
    })
};

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return authStart(state, action);
        case actionTypes.AUTH_SUCCESS:
            return authSuccess(state, action);
        case actionTypes.AUTH_FAIL:
            return authFail(state, action);
        case actionTypes.AUTH_LOGUT:
            return authLogout(state, action);
        case actionTypes.AUTH_UPDATE:
            return authUpdateData(state, action);
        case actionTypes.VIDEO_FETCH:
            return fetchVideoData(state, action);
        case actionTypes.SEARCH_REQUEST:
            return searchRequest(state, action);
        default:
            return state;
    }
};


export default reducer;