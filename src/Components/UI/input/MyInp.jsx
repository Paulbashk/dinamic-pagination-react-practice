import React from 'react';
import classes from './MyInp.module.css';

/* Способ получения данных из не управляемого Input (компонента) */
/* 
const MyInp = React.forwardRef((props, ref) => {
    return (
        <input ref={ref} className={classes.myInp} {...props}/>
    );
});
*/

const MyInp = (props) => {
    return (
        <input className={classes.myInp} {...props}/>
    );
};

export default MyInp;