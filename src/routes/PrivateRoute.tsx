import { FC } from "react";
import { Redirect, Route, RouteComponentProps, RouteProps } from "react-router-dom";
import { useAuthContext } from "../contexts/auth.context";
import MainLayout from '../components/layouts/main.layout';

// type PrivateRouteProps = { component: FC<RouteComponentProps>} & RouteProps
type PrivateRouteProps = { component: () => JSX.Element} & RouteProps

const PrivateRoute = ({ component: Component, ...rest }: PrivateRouteProps) => {

    const { authState } = useAuthContext();
    
    return (
        <Route {...rest}
            render={
                (routeProps) => {
                    if (authState.user) {
                        return <MainLayout>
                            <Component {...routeProps} />
                        </MainLayout>
                    }
                    return <Redirect to={{ pathname: '/login', state: { from: routeProps.location } }}/>
                }
            }
        />
    )
};

export default PrivateRoute;