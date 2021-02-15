export const initialVideoState: VideoState = {
    paginatedVideos: null,
    loading: false,
    error: null,
    videoPaginationFilter: {
        limit: 15,
        sortBy: 'id',
        sortOrder: 'DESC',
        page: 1
    }
}

export const videoReducer = (state: VideoState, action: VideoActions): VideoState => {
    switch ( action.type ) {
        case 'FETCH_VIDEOS_REQUEST':
            return {
                ...state,
                loading: true
            }

        case 'FETCH_VIDEOS_SUCCESS':
            return {
                ...state,
                loading: false,
                paginatedVideos: action.payload.paginatedVideos,
                videoPaginationFilter: action.payload.paginationFilter
            }

        case 'FETCH_VIDEOS_ERROR':
            return {
                ...state,
                loading: false,
                error: action.error
            }

        case 'FETCH_VIDEO_REQUEST':
            return {
                ...state,
                loading: true
            }

        case 'FETCH_VIDEO_SUCCESS':
            return {
                ...state,
                loading: false
            }

        case 'FETCH_VIDEO_ERROR':
            return {
                ...state,
                loading: false,
                error: action.error
            }
    }
}

export type VideoActions = 
    | FETCH_VIDEOS_REQUEST
    | FETCH_VIDEOS_SUCCESS
    | FETCH_VIDEOS_ERROR
    | FETCH_VIDEO_REQUEST
    | FETCH_VIDEO_SUCCESS
    | FETCH_VIDEO_ERROR

export type VideoState = {
    paginatedVideos: PaginatedVideo | null
    videoPaginationFilter: VideoPaginationFilter
    loading: boolean
    error: null|object,
}

export type PaginatedVideo = {
    limit: number
    page: number
    rows: Video[]
    count: number
    lastPage: number|null
    currentPage: number
    from: number|null
    perPage: number
    to: number|null
}

export type Video = {
    id: number
    name: string
    price: number
    size: number
    createdAt: string
    updatedAt: string
}

export type VideoPaginationFilter = {
    page: number
    sortOrder: 'ASC'|'DESC'
    sortBy: 'id'|'name'|'createdAt'|'updatedAt'|'price'|'size'
    limit: number
}

type FETCH_VIDEOS_REQUEST = { type: 'FETCH_VIDEOS_REQUEST' };
type FETCH_VIDEOS_SUCCESS = { type: 'FETCH_VIDEOS_SUCCESS', payload: { 
    paginatedVideos: PaginatedVideo, paginationFilter: VideoPaginationFilter 
} };
type FETCH_VIDEOS_ERROR = { type: 'FETCH_VIDEOS_ERROR', error: object };
type FETCH_VIDEO_REQUEST = { type: 'FETCH_VIDEO_REQUEST' };
type FETCH_VIDEO_SUCCESS = { type: 'FETCH_VIDEO_SUCCESS' };
type FETCH_VIDEO_ERROR = { type: 'FETCH_VIDEO_ERROR', error: object };