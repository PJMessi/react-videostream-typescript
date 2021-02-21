import { createContext, useContext, useReducer } from "react";
import { initialAuthState, authReducer } from "../reducers/auth/auth.reducer";
import { AuthActions } from "../reducers/auth/authReducerTypes";

const AuthContext = createContext<AuthContextType>({
  authState: initialAuthState,
  authDispatch: () => {},
});

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  // if (context === undefined) throw new Error('This component is not wrapped with Auth Context.');
  return context;
};

export const AuthContextProvider = ({
  children,
}: {
  children: JSX.Element;
}): JSX.Element => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  return (
    <AuthContext.Provider value={{ authState: state, authDispatch: dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

type AuthContextType = {
  authState: typeof initialAuthState;
  authDispatch: (action: AuthActions) => void;
};
