import axios from 'axios';
import { Dispatch } from 'react';
import { AuthActions, User } from '../reducers/auth.reducer' 

const API_BASE_URI = 'http://localhost:5000';

/**
 * Logs out user.
 * @param dispatch 
 */
export const logout = async (dispatch: Dispatch<AuthActions>) => {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('authToken');
    delete axios.defaults.headers.common["Authorization"];
}

/**
 * Logs in user.
 * @param dispatch 
 * @param credential 
 */
export const login = async (dispatch: Dispatch<AuthActions>, credential: { email: string, password: string }) => {
    dispatch({ type: 'LOGIN_REQUEST' });

    try {
        const loginAPI = `${API_BASE_URI}/auth/login`

        const loginResponse = await axios.post(loginAPI, {
            email: credential.email, password: credential.password
        });

        const { token, user }: { token: string, user: User } = loginResponse.data.data;

        dispatch({type: 'LOGIN_SUCCESS', payload: { token, user } });

        localStorage.setItem('authToken', token);

        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    } catch (error) {
        dispatch({type: 'LOGIN_ERROR', error: error.response.data });
        throw error;
    }
}

/**
 * Fetches profile.
 * @param dispatch 
 * @param credential 
 */
export const fetchProfile = async (dispatch: Dispatch<AuthActions>) => {
    dispatch({ type: 'FETCH_PROFILE_REQUEST' });

    try {
        const profileFetchAPI = `${API_BASE_URI}/auth/profile`

        const fetchProfileResponse = await axios.get(profileFetchAPI);

        const { user }: { user: User } = fetchProfileResponse.data.data;

        dispatch({type: 'FETCH_PROFILE_SUCCESS', payload: { user } });

    } catch (error) {
        dispatch({type: 'FETCH_PROFILE_ERROR', error: error.response.data });
        throw error;
    }
}