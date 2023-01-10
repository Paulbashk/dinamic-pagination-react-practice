import React, {useMemo} from "react";

// Кастомный хук. Сортирует посты
// Принимает массив постов и тип сортировки
export const useSortedPosts = (posts, sort) => {
    // useMemo - используется для оптимизации за счет кэширования (мемоизация). Позволяет производить меньше вычислений при изменениях.
    // useMemo(callback, deps) - следит за изменением [deps] данных, при их изменении, вызывает callback
    // callback воспроизводит вычисления, и возвращает необходимые данные, дополнительно кэшируя их
    // В нашем случае, при выборе типа сортировки или при изменении массива с постами, воспроизводятся вычисления сортировки, описанные выше
    // Полученные данные возвращаюся в sortedPosts и кэшируются
    const sortedPosts = useMemo(() => {
        return sort 
            ? [...posts].sort((a, b) => a[sort].localeCompare(b[sort])) 
            : posts;   
    }, [sort, posts]);
    
    return sortedPosts;
}

// Фильтрует и сортирует посты
// Принимает массив постов, тип сортировки и поисковой запрос
export const usePosts = (posts, sort, query) => {
    const sortedPosts = useSortedPosts(posts, sort);

    // Функция осуществляет слежку изменений переменных (при осуществлении поиска)
    // sortedAndSearchedPosts - содержит отфильтрованный и отсортированный массив постов
    // sortedAndSearchedPosts - вызовется в PostList->PostItem для отрисовки необходимых постов
    const sortedAndSearchedPosts = useMemo(() => {
        return sortedPosts.filter(post => post.title.toLowerCase().includes(query)) // Фильтрует по слову/символу
    }, [query, sortedPosts]);   
    
    return sortedAndSearchedPosts;
}