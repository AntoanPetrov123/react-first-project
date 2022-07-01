import { useContext, useEffect, useState } from 'react';

import CartIcon from "../Cart/CartIcon";
import CartContext from '../../storage/cart-context';
import classes from './HeaderCartButton.module.css';
const HeaderCartButton = props => {

    const [btnHighlight, setBtnHighlight] = useState(false);
    const cartContext = useContext(CartContext);

    const numberOfCartItems = cartContext.items.length;

    const btnClasses = `${classes.button} ${btnHighlight ? classes.bump : ''}`;

    useEffect(() => {
        if (cartContext.items.length === 0) {
            return;
        }
        setBtnHighlight(true);

        const timer = setTimeout(() => {
            setBtnHighlight(false);
        }, 300);

        //clean up function 
        return () => {
            clearTimeout(timer);
        };
    }, [cartContext.items]);

    return (
        <button className={btnClasses} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>Cart</span>
            <span className={classes.badge}>
                {numberOfCartItems}
            </span>
        </button>)
};

export default HeaderCartButton;