import { Link } from 'react-router-dom';
import classes from './NotFound.module.css';

const NotFound = () => {

    return (
        <div className={classes.centered}>
            <p>Page Not Found!</p>
            <Link className={classes["go-home"]} to="/">Go home!</Link>
        </div>
    );
};

export default NotFound;
