import { useContext } from 'react';

import CartContext from '../../../storage/cart-context';
import CarItemForm from './CarItemForm';
import classes from './CarItem.module.css';
import { Link } from 'react-router-dom';

const CarItem = props => {
    const cartContext = useContext(CartContext);

    const price = `$${props.price.toFixed(2)}`

    const addToCartHandler = (amount) => {
        cartContext.addItem({
            id: props.id,
            name: props.name,
            amount: amount,
            price: props.price,
        });
    };
    return (
        <li className={classes.car}>
            <div>
                <img src={props.imageUrl} alt="car img" className={classes.img} />
            </div>
            <div>
                <div><h3>{props.name}</h3></div>
                <div className={classes.description}>{props.description}</div>
                <div className={classes.price}>{price}</div>
            </div>
            <div className={classes['details-btn']}>
                    <Link to={`/details/${props.id}`}>Details</Link>
            </div>
            <div>
                <CarItemForm onAddToCart={addToCartHandler} />
            </div>
        </li>
    );
};

export default CarItem;