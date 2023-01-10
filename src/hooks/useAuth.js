import  React from 'react';
import { AuthContext } from '../context';

// Функция возвращает контекст данных авторизации
export const useAuth = () => {
    return React.useContext(AuthContext);
}