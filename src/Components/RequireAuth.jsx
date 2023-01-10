import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

// Компонент Авторизации маршрутизации
const RequireAuth = ({children}) => {
    let auth = useAuth();
    let location = useLocation();

    if(!auth.isAuth) {
        return <Navigate to="/auth" state={{ from: location }} replace />;
    }

    return children;
}

export default RequireAuth;