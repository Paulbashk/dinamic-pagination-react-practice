import React, {useState} from 'react';

function Input () {
    const [value, setValue] = useState('Значение');

    return (
        <div>
            <h2>Значение поля: {value == '' ? 'Поле пустое' : value}</h2>
            <input 
                type="text" 
                value={value} onChange={event => 
                setValue(event.target.value)}
            />
        </div>
    );
}

export default Input;