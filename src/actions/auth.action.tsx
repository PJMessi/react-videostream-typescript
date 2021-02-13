import axios from 'axios';
import { Dispatch } from 'react';
import { AuthActions, User } from '../reducers/auth.reducer' 

const API_BASE_URI = 'http://localhost:5000';

/**
 * Calls API to login user.
 * If success: dispatches LOGIN_SUCCESS with user and token data | Saves token in local storage | sets
 *      default axios header.
 * If error: dispatches LOGIN_ERROR with error data | throws error.
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