import { useState } from 'react/cjs/react.development';

// Функция обработки ошибок + вызов preloader
export const useFetching = (callback) => {
    const [isLoading, setIsLoading] = useState(false); // Отображение прелоадера
    const [error, setError] = useState(''); // Ошибка

    // Функция обработки запроса
    const fetching = async (...args) => {
        try {
            setIsLoading(true); 
            await callback(...args); // Вызов функции запроса
        } catch (e) {
            setError(e.message);
        } finally {
            setIsLoading(false);
        }
    }

    return [fetching, isLoading, error];
}