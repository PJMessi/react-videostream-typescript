import { APIError } from "../reducerTyptes";

export type VideoActions =
  | FetchVideosRequest
  | FetchVideosSuccess
  | FetchVideosError
  | FetchVideoRequest
  | FetchVideoSuccess
  | FetchVideoError;

export type VideoState = {
  paginatedVideos: PaginatedVideo | null;
  videoPaginationFilter: VideoPaginationFilter;
  loading: boolean;
  error: null | APIError | FetchVideosValidationError;
};

export type PaginatedVideo = {
  limit: number;
  page: number;
  rows: Video[];
  count: number;
  lastPage: number | null;
  currentPage: number;
  from: number | null;
  perPage: number;
  to: number | null;
};

export type Video = {
  id: number;
  name: string;
  price: number;
  size: number;
  createdAt: string;
  updatedAt: string;
};

export type VideoPaginationFilter = {
  page: number;
  sortOrder: "ASC" | "DESC";
  sortBy: "id" | "name" | "createdAt" | "updatedAt" | "price" | "size";
  limit: number;
};

type FetchVideosRequest = { type: "FetchVideosRequest" };
type FetchVideosSuccess = {
  type: "FetchVideosSuccess";
  payload: {
    paginatedVideos: PaginatedVideo;
    paginationFilter: VideoPaginationFilter;
  };
};
type FetchVideosError = {
  type: "FetchVideosError";
  error: APIError | FetchVideosValidationError;
};
type FetchVideoRequest = { type: "FetchVideoRequest" };
type FetchVideoSuccess = { type: "FetchVideoSuccess" };
type FetchVideoError = { type: "FetchVideoError"; error: APIError };

export type FetchVideosValidationError = {
  __typename: "FetchVideosValidationError";
  message: string;
  errors: {
    limit?: string[];
    page?: string[];
    sortOrder?: string[];
    sortBy?: string[];
  };
};
