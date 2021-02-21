import { VideoActions, VideoState } from "./videoReducerTypes";

export const initialVideoState: VideoState = {
  paginatedVideos: null,
  loading: false,
  error: null,
  videoPaginationFilter: {
    limit: 15,
    sortBy: "id",
    sortOrder: "DESC",
    page: 1,
  },
};

export const videoReducer = (
  state: VideoState,
  action: VideoActions
): VideoState => {
  switch (action.type) {
    case "FetchVideosRequest":
      return {
        ...state,
        loading: true,
      };

    case "FetchVideosSuccess":
      return {
        ...state,
        loading: false,
        paginatedVideos: action.payload.paginatedVideos,
        videoPaginationFilter: action.payload.paginationFilter,
      };

    case "FetchVideosError":
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case "FetchVideoRequest":
      return {
        ...state,
        loading: true,
      };

    case "FetchVideoSuccess":
      return {
        ...state,
        loading: false,
      };

    case "FetchVideoError":
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
};
