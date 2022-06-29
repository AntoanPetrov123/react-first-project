import { useContext } from 'react';

import CartIcon from "../Cart/CartIcon";
import CartContext from '../../storage/cart-context';
import classes from './HeaderCartButton.module.css';
const HeaderCartButton = props => {

    const cartContext = useContext(CartContext);

    const numberOfCartItems = cartContext.items.length;

    return (
        <button className={classes.button} onClick={props.onClick}>
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