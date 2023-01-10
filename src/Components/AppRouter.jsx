import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Navbar from '../Components/UI/Navbar/Navar';
import About from '../pages/About';
import NoMatch from '../pages/NoMatch';
import PostIdPage from '../pages/PostIdPage';
import Posts from '../pages/Posts';
import Auth from '../pages/Auth';
import Loader from './UI/Loader/Loader';
import { useAuth } from '../hooks/useAuth';
import RequireAuth from './RequireAuth';
import { Navigate } from 'react-router-dom';

function AppRouter () {
  const {isAuth, isLoading} = useAuth();

  if(isLoading) {
    return <Loader/>;
  } 

  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/posts">
          <Route index element={ 
            <RequireAuth>
              <Posts /> 
            </RequireAuth>
          } />          
          <Route path=":id" element={ 
            <RequireAuth>
              <PostIdPage /> 
            </RequireAuth>
          } /> 
        </Route>           
        <Route path="/auth" element= { isAuth ? <Navigate to="/posts" /> : < Auth /> } />
        <Route path="*" element={ <NoMatch /> } />           
      </Routes>        
    </BrowserRouter>
  );
}

export default AppRouter;