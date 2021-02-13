import { FC } from "react";
import { Redirect, Route, RouteComponentProps, RouteProps } from "react-router-dom";
import { useAuthContext } from "../contexts/auth.context";

type PrivateRouteProps = { component: FC<RouteComponentProps>} & RouteProps

const PrivateRoute = ({ component: Component, ...rest }: PrivateRouteProps) => {

    const { authState } = useAuthContext();
    
    return (
        <Route {...rest}
            render={
                (routeProps) => {
                    if (authState.user) return <Component {...routeProps} />
                    return <Redirect to={{ pathname: '/login', state: { from: routeProps.location } }}/>
                }
            }
        />
    )
};

export default PrivateRoute;