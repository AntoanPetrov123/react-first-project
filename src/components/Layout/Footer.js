import { Link } from 'react-router-dom';

import classes from './Footer.module.css'

const Footer = () => {
    return (
        <footer>
            <div class={classes.footer}>
                <section class={classes['footer-section']}>
                    <h4 class={classes['footer-header']}>Pages</h4>
                    <ul>
                        <li>
                            <Link to="/cars-catalog">Catalog</Link>
                        </li>
                        <li>
                            <Link to="/add-post">Add Car Advertisement</Link>
                        </li>
                    </ul>
                </section>
                <section class={classes['footer-section']}>
                    <h4 class={classes['footer-header']} >Contacts</h4>
                    <ul>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/map">Where to Find us</Link></li>
                    </ul>
                </section>
            </div>
            <div class={classes.footer}>
                <p>All rights reserved to Antoan Petrov &copy;</p>
            </div>
        </footer>
    );
};

export default Footer;