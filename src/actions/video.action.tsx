import axios from 'axios';
import { Dispatch } from 'react';
import { VideoPaginationFilter, VideoActions, PaginatedVideo, Video } from '../reducers/video.reducer';

const API_BASE_URI = 'http://localhost:5000';

export const fetchVideos = async (dispatch: Dispatch<VideoActions>, paginationFilter: VideoPaginationFilter ) => {
    dispatch({ type: 'FETCH_VIDEOS_REQUEST' });
    try {
        const fetchVideosAPI = `${API_BASE_URI}/videos`;

        const fetchVideosResponse = await axios.get(fetchVideosAPI, {
            params: paginationFilter
        });

        const paginatedVideos: PaginatedVideo = fetchVideosResponse.data.data;

        dispatch({type: 'FETCH_VIDEOS_SUCCESS', payload: { paginatedVideos, paginationFilter } });

    } catch (error) {
        dispatch({type: 'FETCH_VIDEOS_ERROR', error: error.response.data });
        throw error;
    }
}

export const fetchVideo = async (dispatch: Dispatch<VideoActions>, videoId: string|number ) => {
    dispatch({ type: 'FETCH_VIDEO_REQUEST' });
    try {
        const fetchVideosAPI = `${API_BASE_URI}/videos/${videoId}`;

        const fetchVideosResponse = await axios.get(fetchVideosAPI);

        const video: Video = fetchVideosResponse.data.data.video;

        dispatch({ type: 'FETCH_VIDEO_SUCCESS' });

        return video;

    } catch (error) {
        dispatch({ type: 'FETCH_VIDEO_ERROR', error: error.response.data });
        throw error;
    }
}