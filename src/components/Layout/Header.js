import { Fragment } from 'react';
import { Link } from 'react-router-dom';

import HeaderCartButton from './HeaderCartButton';
import backgroundImage from '../../assets/cars-background.png';
import classes from './Header.module.css';

const Header = props => {
    return (
        <Fragment>
            <header className={classes.header}>
                <h1 className={classes.head}>Change Your Car</h1>
                <ul className={classes['nav-list']}>
                    <li className={classes['nav-link']}>
                        <Link to="/">Home</Link>
                    </li>
                    <li className={classes['nav-link']}>
                        <Link to="/cars-catalog">Catalog</Link>
                    </li>
                    <li className={classes['nav-link']}>
                        <Link to="/create-post">Post</Link>
                    </li>
                    <li className={classes['nav-link']}>
                        <Link to="/profile">Profile</Link>
                    </li>
                    <li className={classes['nav-link']}>
                        <Link to="/auth">Login</Link>
                    </li>
                    <li className={classes['nav-link']}>
                        <Link to="/">Logout</Link>
                    </li>
                </ul>
                <HeaderCartButton onClick={props.onShowCart} />
            </header>
            <div className={classes['main-image']}>
                <img src={backgroundImage} alt='background cars' />
            </div>
        </Fragment>
    );
};

export default Header;