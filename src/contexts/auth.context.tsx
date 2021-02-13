import { createContext, useContext, useReducer } from "react";
import { initialAuthState, authReducer, AuthActions } from '../reducers/auth.reducer';

const AuthContext = createContext<{
    authState: typeof initialAuthState;
    authDispatch: (action: AuthActions) => void;
}>({
    authState: initialAuthState,
    authDispatch: () => { }
});

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    // if (context === undefined) throw new Error('This component is not wrapped with Auth Context.');
    return context;
}

type AuthContextProviderProp = {
    children: JSX.Element
}

export const AuthContextProvider = ({ children }: AuthContextProviderProp) => {
    const [state, dispatch] = useReducer(authReducer, initialAuthState);

    return <AuthContext.Provider value={{ authState: state, authDispatch: dispatch }}>
        {children}
    </AuthContext.Provider>
}