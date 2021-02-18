import { Redirect, Route, RouteProps } from "react-router-dom";
import { useAuthContext } from "../contexts/auth.context";
import MainLayout from '../components/layouts/main.layout';
import { useEffect } from "react";
import axios from 'axios';
import { fetchProfile } from '../actions/auth.action';

type PrivateRouteProps = { children: JSX.Element} & RouteProps

const PrivateRoute = ({ children, ...rest }: PrivateRouteProps) => {

    const { authState } = useAuthContext();

    useAuthInitialization();
    
    if (authState.token === null) {
        return <>     
            <Route {...rest}
                render={
                    (routeProps) => {
                        return <Redirect to={{ pathname: '/login', state: { from: routeProps.location } }}/>
                    }
                }
            />
        </>
    }

    return <>
        <Route {...rest} >
            <MainLayout>
                {children}
            </MainLayout>
        </Route>
    </>
};

export default PrivateRoute;

const useAuthInitialization = () => {
    const { authState, authDispatch } = useAuthContext();
    if (authState.token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${authState.token}`;
    }

    useEffect(() => {
        if (authState.token && authState.user === null) {
            fetchProfile(authDispatch);
        }
    }, [])
}