import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import './App.css';
import Login from './pages/login/Login';
import Dashboard from './pages/dashboard/Dashboard';
import PrivateRoute from './routes/PrivateRoute';
import { AuthContextProvider } from './contexts/auth.context';

function App() {

  return (
    <div className="App">
      <AuthContextProvider>
        <Router>
          <Switch>

            <Route path="/login" exact>
              <Login/>
            </Route>

            <PrivateRoute path="/" exact component={Dashboard} />

          </Switch>
        </Router>
      </AuthContextProvider>

    </div>
  );
}

export default App;
