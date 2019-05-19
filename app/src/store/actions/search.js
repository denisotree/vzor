import * as actionTypes from './actionTypes';

export const updateSearchRequest = searchQuery => {
    return {
        type: actionTypes.SEARCH_REQUEST,
        searchQuery: searchQuery
    }
};