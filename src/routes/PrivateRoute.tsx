import { FC } from "react";
import { Redirect, Route, RouteComponentProps, RouteProps } from "react-router-dom";
import { useAuthContext } from "../contexts/auth.context";
import MainLayout from '../components/layouts/main.layout';

// type PrivateRouteProps = { component: FC<RouteComponentProps>} & RouteProps
type PrivateRouteProps = { children: JSX.Element} & RouteProps

const PrivateRoute = ({ children, ...rest }: PrivateRouteProps) => {

    const { authState } = useAuthContext();
    
    if (authState.user === null) {
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