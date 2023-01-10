import { useRef, useEffect } from 'react';

// Хук для динамической пагинации с использованием Observer
export const useObserver = (ref, canLoad, isPreloader, callback) => {
    // Переменная отлавливает Observer элемент, отвечающий за работу динамической пагинации    
    const observer = useRef();

    useEffect(() => {
        // Если запущен прелоадер, завершаем процесс
        if(isPreloader) return;
        // Если текущий обсервер существует, то отключаем его
        // Необходимо во избежании создания множества observer (цикличности)
        if(observer.current) observer.current.disconnect();
    
        // Функция, которая запустится при достижении элементом зоны видимости
        let cb = function(entries, observer) {
          // entries - элемент, за которым идет слежка
          // isIntersecting - вернет true, когда элемент будет находится в зоне видимости
          if(entries[0].isIntersecting && canLoad) {
            callback();
          }
        }
    
        // Observer - позволяет следить за элементом
        // Когда элемент достигает зоны видимости, срабатывает callback функция
        observer.current = new IntersectionObserver(cb);
        // Определяет, за каким элементом будет вестись слежка
        observer.current.observe(ref.current);
      }, [isPreloader]);    
}