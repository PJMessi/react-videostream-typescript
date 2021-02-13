import { BrowserRouter as Router, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Login from '../pages/login/Login';
import Dashboard from '../pages/dashboard/Dashboard';
import PublicRoute from './PublicRoute';

const AppRoutes = () => {
    return <>
        <Router>
            <Switch>
                <PublicRoute path="/login" exact >
                    <Login/>
                </PublicRoute>

                <PrivateRoute path="/" exact >
                    <Dashboard/>
                </PrivateRoute>
            </Switch>
        </Router>
    </>
}

export default AppRoutes;