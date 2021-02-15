import { BrowserRouter as Router, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Login from '../pages/login/Login';
import Dashboard from '../pages/dashboard/Dashboard';
import PublicRoute from './PublicRoute';
import Video from '../pages/video/Video';

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

                <PrivateRoute path="/videos/:videoId" exact >
                    <Video/>
                </PrivateRoute>
            </Switch>
        </Router>
    </>
}

export default AppRoutes;