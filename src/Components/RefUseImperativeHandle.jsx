import React, { forwardRef, createRef, useRef, useImperativeHandle } from 'react';
import { useState } from 'react/cjs/react.development';

const RefUseImperativeHandle = () => {
    // forwardRef - создает React компонент, который перенаправляет атрибуты ref, props вниз по дереву
    const FancyInput = forwardRef((props, ref) => {
        const inputRef = useRef(); // ref для кнопки

        const [value, setValue] = useState('');

        // useImperativeHandle - создает методы для дочернего DOM узла, привязывает к ref родительского
        // Тем самым, используя компонент FancyInput, можно вызывать методы, связанные с дочернем ref данного компонента
        useImperativeHandle(ref, () => ({
            getValue: () => {
                console.log(`Значение Ref input поля: ${value}`);
            }
        }));

        return <input 
            ref={inputRef} 
            value={value}
            onChange={e => setValue(e.currentTarget.value)}
            {...props} 
        />
    });

    const testInputRefComponent = createRef();
    
    // Вызов функции input из вне testInputRefComponent.current.getValue()
    // Работает только при рендеринге элементов
    return (
        <div style={{marginTop: '30px'}}>
            <FancyInput ref={testInputRefComponent} placeholder='Кликни и смотри консоль' onClick={() => testInputRefComponent.current.getValue()} />
        </div>
    );
}

export default RefUseImperativeHandle;