import * as actionTypes from './actionTypes';
import axios from 'axios';

export const updateVideoData = videoData => {
    return {
        type: actionTypes.VIDEO_FETCH,
        videoData: videoData
    }
};

export const fetchVideos = (params) => {
    return dispatch => {
        axios.get(`${window.location.protocol}//${window.location.hostname}:8000/api/v1/video/`, {
            params: params
        })
            .then(res => {
                dispatch(updateVideoData(res.data));
            });
    }
};

export const fetchVideo = (video, params) => {
    return dispatch => {
        axios.get(`${window.location.protocol}//${window.location.hostname}:8000/api/v1/video/${video}`, {
            params: params
        })
            .then(res => {
                const videoData = res.data;
                dispatch(updateVideoData(videoData));
            });
    }
};