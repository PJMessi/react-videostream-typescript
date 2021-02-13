export const initialAuthState: AuthState = {
    user: null,
    token: null,
    loading: false,
    error: null
}

export const authReducer = (state: AuthState, action: AuthActions): AuthState => {
    switch (action.type) {
        case 'LOGIN_REQUEST':
            return {
                ...state,
                loading: true
            }

        case 'LOGIN_SUCCESS':
            return {
                ...state,
                loading: false,
                token: action.payload.token,
                user: action.payload.user
            }
            
        case 'LOGIN_ERROR':
            return {
                ...state,
                loading: false,
                error: action.error
            }
            
        case 'LOGOUT':
            return {
                ...state,
                loading: false,
                user: null,
                token: null
            }
            
        case 'FETCH_PROFILE_REQUEST':
            return {
                ...state,
                loading: true
            }
            
        case 'FETCH_PROFILE_SUCCESS':
            return {
                ...state,
                loading: false,
                user: action.payload.user
            }
            
        case 'FETCH_PROFILE_ERROR':
            return {
                ...state,
                loading: false,
                error: action.error
            }
            
    }
}

export type AuthState = {
    user: User | null
    token: string | null
    loading: boolean
    error: object | null
}

export type User = {
    id: number
    name: string
    email: string
    createdAt: string
    updatedAt: string
}

export type AuthActions = 
    | LOGIN_REQUEST
    | LOGIN_SUCCESS
    | LOGIN_ERROR
    | LOGOUT
    | FETCH_PROFILE_REQUEST
    | FETCH_PROFILE_SUCCESS
    | FETCH_PROFILE_ERROR

type LOGIN_REQUEST = { type: 'LOGIN_REQUEST' }
type LOGIN_SUCCESS = { type: 'LOGIN_SUCCESS', payload: { token: string, user: User } }
type LOGIN_ERROR = { type: 'LOGIN_ERROR', error: object }
type LOGOUT = { type: 'LOGOUT' }
type FETCH_PROFILE_REQUEST = { type: 'FETCH_PROFILE_REQUEST' }
type FETCH_PROFILE_SUCCESS = { type: 'FETCH_PROFILE_SUCCESS', payload: { user: User } }
type FETCH_PROFILE_ERROR = { type: 'FETCH_PROFILE_ERROR', error: object }
