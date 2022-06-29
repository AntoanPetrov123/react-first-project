import { Fragment } from 'react';

import HeaderCartButton from './HeaderCartButton';
import backgroundImage from '../../assets/cars-background.png';
import classes from './Header.module.css';

const Header = props => {
    return <Fragment>
        <header className={classes.header}>
            <h1 className={classes.head}>Change Your Car</h1>
            <HeaderCartButton onClick={props.onShowCart} />
        </header>
        <div className={classes['main-image']}>
            <img src={backgroundImage} alt='background cars' />
        </div>
    </Fragment>;
};

export default Header;