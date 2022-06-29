import classes from './CarItem.module.css';
import CarItemForm from './CarItemForm';
const CarItem = props => {
    const price = `$${props.price.toFixed(2)}`
    return (
        <li className={classes.car}>
            <div>
                <img src={props.imageUrl} alt="car img" className={classes.img}/>
            </div>
            <div>
                <div><h3>{props.name}</h3></div>
                <div className={classes.description}>{props.description}</div>
                <div className={classes.price}>{price}</div>
            </div>
            <div>
                <CarItemForm />
            </div>
        </li>
    );
};

export default CarItem;