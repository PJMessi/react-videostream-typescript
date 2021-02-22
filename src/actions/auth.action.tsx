import axios from "axios";
import { Dispatch } from "react";
import {
  AuthActions,
  User,
  LoginValidationError,
  RegisterValidationError,
} from "../reducers/auth/authReducerTypes";
import { APIError } from "../reducers/reducerTyptes";

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
    const errorData: APIError | LoginValidationError = {
      message: error.response.data.message,
      errors: error.response.data.errors,
    };
    dispatch({ type: "LoginError", error: errorData });
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
    const errorData: APIError = {
      message: error.response.data.message,
    };
    dispatch({ type: "FetchProfileError", error: errorData });
    throw error;
  }
};

type RegisterData = {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
};

/**
 * Registers user.
 * @param dispatch
 * @param registerData
 */
export const registerUser = async (
  dispatch: Dispatch<AuthActions>,
  registerData: RegisterData
): Promise<void> => {
  dispatch({ type: "RegisterRequest" });

  try {
    const registerAPI = `${API_BASE_URI}/auth/register`;
    const registerResponse = await axios.post(registerAPI, {
      name: registerData.name,
      email: registerData.email,
      password: registerData.password,
      password_confirmation: registerData.passwordConfirmation,
    });

    const {
      token,
      user,
    }: { token: string; user: User } = registerResponse.data.data;
    dispatch({ type: "RegisterSuccess", payload: { token, user } });

    localStorage.setItem("authToken", token);
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  } catch (error) {
    const errorData: APIError | RegisterValidationError = {
      message: error.response.data.message,
      errors: error.response.data.errors,
    };
    dispatch({ type: "RegisterError", error: errorData });
    throw error;
  }
};
