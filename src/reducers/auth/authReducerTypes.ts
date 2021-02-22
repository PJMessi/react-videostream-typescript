import { APIError } from "../reducerTyptes";

export type LoginValidationError = {
  __typename: "LoginValidationError";
  message: string;
  errors: {
    email?: string[];
    password?: string[];
  };
};

export type RegisterValidationError = {
  __typename: "RegisterValidationError";
  message: string;
  errors: {
    email?: string[];
    password?: string[];
    password_confirmation?: string[];
    name?: string[];
  };
};

export type AuthState = {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: null | RegisterValidationError | APIError | LoginValidationError;
};

export type User = {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

export type AuthActions =
  | LoginRequest
  | LoginSuccess
  | LoginError
  | Logout
  | FetchProfileRequest
  | FetchProfileSuccess
  | FetchProfileError
  | RegisterRequest
  | RegisterSuccess
  | RegisterError;

type LoginRequest = { type: "LoginRequest" };
type LoginSuccess = {
  type: "LoginSuccess";
  payload: { token: string; user: User };
};
type LoginError = {
  type: "LoginError";
  error: APIError | LoginValidationError;
};
type Logout = { type: "Logout" };
type FetchProfileRequest = { type: "FetchProfileRequest" };
type FetchProfileSuccess = {
  type: "FetchProfileSuccess";
  payload: { user: User };
};
type FetchProfileError = { type: "FetchProfileError"; error: APIError };
type RegisterRequest = { type: "RegisterRequest" };
type RegisterSuccess = {
  type: "RegisterSuccess";
  payload: { token: string; user: User };
};
type RegisterError = {
  type: "RegisterError";
  error: APIError | RegisterValidationError;
};
