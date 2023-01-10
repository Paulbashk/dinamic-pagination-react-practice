import React from 'react';

const MySelect = ({options, defaultValue, value, callback}) => {

    return (
        <select
            value={value}
            onChange={event => callback(event.target.value)}
        >
            <option value="" disabled={true}>{defaultValue}</option>
            {options.map(option =>
                <option key={option.value} value={option.value}>
                    {option.name}
                </option>
            )}
        </select>
    );
}

export default MySelect;