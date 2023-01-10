import React from 'react';
import MyInp from '../Components/UI/input/MyInp';
import MyButton from '../Components/UI/button/MyButton';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Auth = () => {
    const {isAuth, setIsAuth} = useAuth();

    const navigate = useNavigate();

    const login = event => {
        event.preventDefault();
        setIsAuth(true);
        localStorage.setItem('auth', true);        
        navigate('/posts');
    }
    return (
        <div style={{maxWidth: '800px', margin: '0 auto'}}>
            <h1>Авторизация</h1>
            <form onSubmit={login}>
                <MyInp type="text" placeholder="Введите никнейм" />
                <MyInp type="password" placeholder="Введите пароль" />
                <MyButton>Авторизоваться</MyButton>
            </form>
        </div>
    );
}

export default Auth;