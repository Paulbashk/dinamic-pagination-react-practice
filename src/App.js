import React, { useState, useEffect } from 'react';
import './Components/UI/app.css';
import AppRouter from './Components/AppRouter';
import { AuthContext } from './context';

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if(localStorage.getItem('auth')) {
      setIsAuth(true);
    }
    setIsLoading(false);   
  }, []);

  return (   
    <React.StrictMode>
      <AuthContext.Provider value={{
        isAuth,
        setIsAuth,
        isLoading
      }}>
        <AppRouter/>        
      </AuthContext.Provider>      
    </React.StrictMode>
  );
}

export default App;
