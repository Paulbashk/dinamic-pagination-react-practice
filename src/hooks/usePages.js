import { useMemo } from "react/cjs/react.development";

// Хук для получения кол-ва страниц в массиве при изменении общего числа постов или страниц
export const useGetPages = (limit, totalPages, callback) => {
    const pagesArray = useMemo(() => {
        return callback(totalPages);
      }, [limit, totalPages]);  
      
    return pagesArray;
}