import React from 'react';
import { useReducer } from 'react/cjs/react.development';
import MyButton from './UI/button/MyButton';
import MyInp from './UI/input/MyInp';

const ReducerCounter = () => {
    // Начальное значение состояния
    const initialState = {count: 0, string: 'Куку епта'};

    // Функция организующая методы состояния
    function reducer(state, action) {
        // Некий конструктор для объявления функций для работы с состоянием
        switch(action.type) {
            case 'increment': return { ...state, count: state.count + 1 };
            case 'decrement': return { ...state, count: state.count - 1 };
            case 'updateString': return { ...state, [action.keyName]: action.payload };
            default: throw new Error();
        }
    }

    // Объявление состояния
    // state - переменная, в которой хранятся значения. Например: state.count
    // dispatch - метод, который вызывает созданную функцию конструктором reducer. Пример: dispatch({type: 'decrement'})
    const [state, dispatch] = useReducer(reducer, initialState);
    // Возможен третий аргумент - init. Принимает функцию, используется для ленивой инициализации.
    // Ленивая инициализация - состояние во время начального рендеринга.

    return (
        <div style={{marginTop: '30px'}}>
            Count: {state.count},
            <br/>
            <MyButton onClick={() => dispatch({type: 'decrement'})}>Убавить</MyButton>
            <br/>
            <MyButton onClick={() => dispatch({type: 'increment'})}>Добавить</MyButton>
            <br/>
            <br/>
            String: {state.string},
            <br/>
            <MyInp 
                type="text" 
                placeholder="Введите значение" 
                value={state.string}
                onChange={event => dispatch({type: 'updateString', keyName: 'string', payload: event.currentTarget.value})}
            />
        </div>
    );
}

export default ReducerCounter;
