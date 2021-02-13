import React from 'react';
import './App.css';
import { AuthContextProvider } from './contexts/auth.context';
import AppRoutes from './routes/index';

function App() {

  return (
    <div className="App">
      <AuthContextProvider>
        <AppRoutes/>
      </AuthContextProvider>
    </div>
  );
}

export default App;
