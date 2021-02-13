import { FC } from 'react';
import { Route, RouteComponentProps, RouteProps } from 'react-router-dom';
import AuthLayout from '../components/layouts/auth.layout';

// type PublicRouteProp = { component: FC<RouteComponentProps>} & RouteProps
type PublicRouteProp = { children: JSX.Element } & RouteProps

const PublicRoute = ({ children, ...rest }: PublicRouteProp) => {
    return <>
        <AuthLayout>
            <Route {...rest}>
                {children}
            </Route>
        </AuthLayout>
    </>
}

export default PublicRoute;