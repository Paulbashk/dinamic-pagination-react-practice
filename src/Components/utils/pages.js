// Функция получает общее кол-во страниц постов
// Формула: общее число постов делим на лимит постов для каждой страницы постов и округляем (100/10=10)
export const getPageCount = (totalCount, limit) => {
    return Math.ceil(totalCount / limit);
}

// Функция подсчета страниц пагинации
// Создает массив из номеров каждой страницы
// Например: страниц 10 Значит массив [1, 2, 3, 4..., 10]
export const getPagesArray = (totalPages) => {
    let result = [];

    for(let i = 0; i < totalPages; i++) {
        result.push(i + 1);
    }

    return result;
}