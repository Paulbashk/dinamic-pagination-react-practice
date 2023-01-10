import React from 'react';
import ReducerCounter from '../Components/ReducerCounter';
import RefUseImperativeHandle from '../Components/RefUseImperativeHandle';

const About = () => {
    return (
        <div className='paget'>
            <h1>
                Это приложение создано
            </h1>
            <ReducerCounter />
            <RefUseImperativeHandle />
        </div>
    );
}

export default About;