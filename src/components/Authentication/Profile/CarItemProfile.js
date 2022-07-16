import { Link } from 'react-router-dom';
import classes from './CarItemProfile.module.css';
const CarItemProfile = props => {

    const price = `$${+props.price}`

    console.log(props, 'props');

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
                    <Link to={`/edit/${props.id}`}>Edit</Link>
            </div>
            <div>
                <button  className={classes['delete-btn']}>Delete</button>
            </div>
        </li>
    );
};

export default CarItemProfile;