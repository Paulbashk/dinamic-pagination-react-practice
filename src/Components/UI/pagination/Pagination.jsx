import React, {useState} from 'react';
import { useGetPages } from '../../../hooks/usePages';
import { getPagesArray } from '../../utils/pages';

// Компонент отвечающий за пагинацию
const Pagination = ({totalPages, page, changePage, limit}) => {

  // Получаем кол-во страниц в виде массива [1, 2, 3..., 10] при каждом изменении числа постов или страниц
  let pageArray = useGetPages(limit, totalPages, getPagesArray);    

    return (
        <div className='page__wrapper'>
          {pageArray.map(mapPage => 
            <span 
              onClick={() => changePage(mapPage)}
              key={mapPage} 
              className={page === mapPage ? 'page page__current' : 'page'}
            >
              {mapPage}
            </span>
          )}
        </div>
    );
}

export default Pagination;