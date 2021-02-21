import axios from "axios";
import { Dispatch } from "react";
import {
  VideoPaginationFilter,
  VideoActions,
  PaginatedVideo,
  Video,
} from "../reducers/video/videoReducerTypes";

const API_BASE_URI = "http://localhost:5000";

export const fetchVideos = async (
  dispatch: Dispatch<VideoActions>,
  paginationFilter: VideoPaginationFilter
): Promise<void> => {
  dispatch({ type: "FetchVideosRequest" });
  try {
    const fetchVideosAPI = `${API_BASE_URI}/videos`;

    const fetchVideosResponse = await axios.get(fetchVideosAPI, {
      params: paginationFilter,
    });

    const paginatedVideos: PaginatedVideo = fetchVideosResponse.data.data;

    dispatch({
      type: "FetchVideosSuccess",
      payload: { paginatedVideos, paginationFilter },
    });
  } catch (error) {
    dispatch({ type: "FetchVideosError", error: error.response.data });
    throw error;
  }
};

export const fetchVideo = async (
  dispatch: Dispatch<VideoActions>,
  videoId: string | number
): Promise<Video> => {
  dispatch({ type: "FetchVideoRequest" });
  try {
    const fetchVideosAPI = `${API_BASE_URI}/videos/${videoId}`;
    const fetchVideosResponse = await axios.get(fetchVideosAPI);

    const { video }: { video: Video } = fetchVideosResponse.data.data;

    dispatch({ type: "FetchVideoSuccess" });

    return video;
  } catch (error) {
    dispatch({ type: "FetchVideoError", error: error.response.data });
    throw error;
  }
};
