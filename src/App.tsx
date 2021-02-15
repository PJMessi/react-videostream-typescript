import React from 'react';
import './App.css';
import { AuthContextProvider } from './contexts/auth.context';
import { VideoContextProvider } from './contexts/video.context';
import AppRoutes from './routes/index';

function App() {

  return (
    <div className="App" style={{margin: "2rem"}}>
      <AuthContextProvider>
        <VideoContextProvider>
          <AppRoutes />
        </VideoContextProvider>
      </AuthContextProvider>
    </div>
  );
}

export default App;
