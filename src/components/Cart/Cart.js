import { useContext } from 'react';

import Modal from '../UI/Modal';
import CartContext from '../../storage/cart-context';
import CartItem from './CartItem';
import classes from './Cart.module.css';



const Cart = props => {

    const cartContext = useContext(CartContext);

    const total = cartContext.totalAmount.toFixed(2);
    const totalAmount = `$${total}`;
    const emptyCartAmount = (0).toFixed(2);
    const hasItems = cartContext.items.length > 0;

    const removeItemFromCartHandler = id => {
        cartContext.removeItem(id);
    };

    const cartItems = <ul className={classes['cart-items']}>{
        cartContext.items.map(item => (
            <CartItem
                key={item.id}
                name={item.name}
                price={item.price}
                onRemoveFromCart={removeItemFromCartHandler.bind(null, item.id)}
            />
        ))}
    </ul>;

    return (
        <Modal onHideCart={props.onHideCart}>
            {cartItems}
            <div className={classes.total}>
                <span>Total price: </span>
                <span>{hasItems ? totalAmount : emptyCartAmount}</span>
            </div>
            <div className={classes.actions}>
                <button className={classes['button--alt']} onClick={props.onHideCart}>Close</button>
                {hasItems && <button className={classes.button}>Order</button>}
            </div>
        </Modal>
    );
};

export default Cart;