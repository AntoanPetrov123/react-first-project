import classes from './CartItem.module.css';

const CartItem = (props) => {
  const total = (+props.price).toFixed(2);
  const price = `$${total}`;

  return (
    <li className={classes['cart-item']}>
      <div>
        <h2>{props.name}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>{price}</span>
        </div>
      </div>
      <div className={classes.actions}>
        <button onClick={props.onRemoveFromCart}>-</button>
      </div>
    </li>
  );
};

export default CartItem;
