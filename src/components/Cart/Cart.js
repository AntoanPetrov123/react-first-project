import Modal from '../UI/Modal';
import classes from './Cart.module.css';


const Cart = props => {
    const cartItems = <ul className={classes['cart-items']}>{[
        {
            id: 'car1',
            name: 'Mercedes',
            description: 'Brand New Model 2022 CLS 8.0 BTurbo',
            imageUrl: 'https://www.drivearabia.com/app/uploads/2021/04/mercedes-amg-cls-53-2021-4.jpg',
            price: 153000.00,
        }
    ].map(item => <li>{item.name}</li>)}</ul>;

    return (
        <Modal>
            {cartItems}
            <div className={classes.total}>
                <span>Total price: </span>
                <span>$35400.00</span>
            </div>
            <div className={classes.actions}>
                <button className={classes['button--alt']}>Close</button>
                <button className={classes.button}>Order</button>
            </div>
        </Modal>
    );
};

export default Cart;