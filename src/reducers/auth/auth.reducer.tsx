import { AuthActions, AuthState } from "./authReducerTypes";

export const initialAuthState: AuthState = {
  user: null,
  token: localStorage.getItem("authToken") || null,
  loading: false,
  error: null,
};

export const authReducer = (
  state: AuthState,
  action: AuthActions
): AuthState => {
  switch (action.type) {
    case "LoginRequest":
      return {
        ...state,
        loading: true,
      };

    case "LoginSuccess":
      return {
        ...state,
        loading: false,
        token: action.payload.token,
        user: action.payload.user,
      };

    case "LoginError":
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case "Logout":
      return {
        ...state,
        loading: false,
        user: null,
        token: null,
      };

    case "FetchProfileRequest":
      return {
        ...state,
        loading: true,
      };

    case "FetchProfileSuccess":
      return {
        ...state,
        loading: false,
        user: action.payload.user,
      };

    case "FetchProfileError":
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case "RegisterRequest":
      return {
        ...state,
        loading: true,
      };

    case "RegisterSuccess":
      return {
        ...state,
        loading: false,
        token: action.payload.token,
        user: action.payload.user,
      };

    case "RegisterError":
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
};
