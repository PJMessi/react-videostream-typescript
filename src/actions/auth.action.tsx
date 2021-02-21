import axios from "axios";
import { Dispatch } from "react";
import { AuthActions, User } from "../reducers/auth/authReducerTypes";

const API_BASE_URI = "http://localhost:5000";

/**
 * Logs out user.
 * @param dispatch
 */
export const logout = (dispatch: Dispatch<AuthActions>): void => {
  dispatch({ type: "Logout" });
  localStorage.removeItem("authToken");
  delete axios.defaults.headers.common.Authorization;
};

/**
 * Logs in user.
 * @param dispatch
 * @param credential
 */
export const login = async (
  dispatch: Dispatch<AuthActions>,
  credential: { email: string; password: string }
): Promise<void> => {
  dispatch({ type: "LoginRequest" });

  try {
    const loginAPI = `${API_BASE_URI}/auth/login`;
    const loginResponse = await axios.post(loginAPI, credential);

    const {
      token,
      user,
    }: { token: string; user: User } = loginResponse.data.data;
    dispatch({ type: "LoginSuccess", payload: { token, user } });

    localStorage.setItem("authToken", token);
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  } catch (error) {
    dispatch({ type: "LoginError", error: error.response.data });
    throw error;
  }
};

/**
 * Fetches profile.
 * @param dispatch
 * @param credential
 */
export const fetchProfile = async (
  dispatch: Dispatch<AuthActions>
): Promise<void> => {
  dispatch({ type: "FetchProfileRequest" });

  try {
    const profileFetchAPI = `${API_BASE_URI}/auth/profile`;
    const fetchProfileResponse = await axios.get(profileFetchAPI);

    const { user }: { user: User } = fetchProfileResponse.data.data;
    dispatch({ type: "FetchProfileSuccess", payload: { user } });
  } catch (error) {
    dispatch({ type: "FetchProfileError", error: error.response.data });
    throw error;
  }
};

type RegisterData = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

/**
 * Registers user.
 * @param dispatch
 * @param registerData
 */
export const register = async (
  dispatch: Dispatch<AuthActions>,
  registerData: RegisterData
): Promise<void> => {
  dispatch({ type: "RegisterRequest" });

  try {
    const registerAPI = `${API_BASE_URI}/auth/register`;
    const registerResponse = await axios.post(registerAPI, registerData);

    const {
      token,
      user,
    }: { token: string; user: User } = registerResponse.data.data;
    dispatch({ type: "RegisterSuccess", payload: { token, user } });

    localStorage.setItem("authToken", token);
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  } catch (error) {
    dispatch({ type: "RegisterError", error: error.response.data });
    throw error;
  }
};
