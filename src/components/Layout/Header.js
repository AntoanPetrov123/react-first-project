import { Fragment, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import HeaderCartButton from './HeaderCartButton';
import backgroundImage from '../../assets/cars-background.png';
import AuthContext from '../../storage/auth-context';
import classes from './Header.module.css';

const Header = props => {

    const redirect = useNavigate();

    const authContext = useContext(AuthContext);

    const isLoggedIn = authContext.isLoggedIn;
    console.log(isLoggedIn, 'logging');

    const logoutHandler = () => {
        authContext.logout();
        redirect('/login');
    };

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
                    {isLoggedIn && <li className={classes['nav-link']}>
                        <NavLink className={({ isActive }) => (isActive ? classes.active : null)}  to="/create-post">Post</NavLink>
                    </li>}
                    {isLoggedIn && <li className={classes['nav-link']}>
                        <NavLink className={({ isActive }) => (isActive ? classes.active : null)}  to="/profile">Profile</NavLink>
                    </li>}
                    {!isLoggedIn && <li className={classes['nav-link']}>
                        <NavLink className={({ isActive }) => (isActive ? classes.active : null)}  to="/login">Login</NavLink>
                    </li>}
                    {!isLoggedIn && <li className={classes['nav-link']}>
                        <NavLink className={({ isActive }) => (isActive ? classes.active : null)}  to="/register">Register</NavLink>
                    </li>}
                    {isLoggedIn && <li className={classes['nav-link']}>
                        <button className={classes['logout-btn']}  onClick={logoutHandler}>Logout</button>
                    </li>}
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