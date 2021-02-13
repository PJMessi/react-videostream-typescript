import { FC } from 'react';
import { Route, RouteComponentProps, RouteProps } from 'react-router-dom';
import AuthLayout from '../components/layouts/auth.layout';

type PublicRouteProp = { component: FC<RouteComponentProps>} & RouteProps

const PublicRoute = ({ component: Component, ...rest }: PublicRouteProp) => {
    return <>
        <AuthLayout>
            <Route {...rest} 
                render={
                    (routeProps) => {
                        return <Component {...routeProps} />
                    }
                }
            />
        </AuthLayout>
    </>
}

export default PublicRoute;