import { useRef } from 'react';

import classes from './CarItemForm.module.css';
const CarItemForm = props => {
    const amountRef = useRef();
    
    const submitHandler = event => {
        event.preventDefault();

        const amount = 1;
        props.onAddToCart(amount);
    };

    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <button ref={amountRef}>+ Add</button>
        </form>
    )
};

export default CarItemForm;