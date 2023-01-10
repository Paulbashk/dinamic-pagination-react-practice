import React from 'react';
import MySelect from './UI/select/MySelect';
import MyInp from './UI/input/MyInp';

const PostFilter = ({filter, setFilter}) => {

    return (
        <div>
          <MyInp 
            type="text"
            placeholder="Поиск"
            value={filter.query}
            onChange={event => setFilter({...filter, query: event.target.value})}
          />
          <MySelect
            value = {filter.sort}
            callback={selectedSort => setFilter({...filter, sort: selectedSort})}
            defaultValue="Сортировка по"
            options={[
              {value: 'title', name: 'По названию'},
              {value: 'body', name: 'По описанию'}
            ]}
          />
        </div>        
    );
}

export default PostFilter;