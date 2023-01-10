import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';

const Navbar = () => {
  const {isAuth, setIsAuth} = useAuth();

  let navigate = useNavigate();

  const logout = event => {
    event.preventDefault();
    setIsAuth(false);
    localStorage.removeItem('auth', false);    
    navigate('/auth');
  }

  const elements = (
    <div className='navbar'>
      <nav>
        <ul>
          <li><Link to="/about">About</Link></li> 
          {isAuth 
            ? [
              <li><Link to="/posts">Posts</Link></li>,
              <li><a href="/" onClick={logout}>Выйти</a></li>
            ]
            : <li><Link to="/auth">Auth</Link></li>
          }         
        </ul>
      </nav>
    </div>        
  );

  useEffect(() => elements, [isAuth]);

  return elements;
}

export default Navbar;