import { Fragment } from 'react';
import { NavLink } from 'react-router-dom';

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
                        <NavLink className={({ isActive }) => (isActive ? classes.active : null)}  to="/">Home</NavLink>
                    </li>
                    <li className={classes['nav-link']}>
                        <NavLink className={({ isActive }) => (isActive ? classes.active : null)}  to="/cars-catalog">Catalog</NavLink>
                    </li>
                    <li className={classes['nav-link']}>
                        <NavLink className={({ isActive }) => (isActive ? classes.active : null)}  to="/create-post">Post</NavLink>
                    </li>
                    <li className={classes['nav-link']}>
                        <NavLink className={({ isActive }) => (isActive ? classes.active : null)}  to="/profile">Profile</NavLink>
                    </li>
                    <li className={classes['nav-link']}>
                        <NavLink className={({ isActive }) => (isActive ? classes.active : null)}  to="/auth">Login</NavLink>
                    </li>
                    <li className={classes['nav-link']}>
                        <NavLink className={({ isActive }) => (isActive ? classes.active : null)}  to="/">Logout</NavLink>
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