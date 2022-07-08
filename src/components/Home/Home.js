import classes from './Home.module.css';
const Home = () => {
    return (
        <section className={classes.home}>
            <h1 className={classes.header}>Welcome <span className={classes.accent}>to Our site</span></h1>
            <div className={classes.dividers}>
                <hr className={classes['divider-one']} />
                <hr className={classes['divider-two']} />
            </div>
            <p className={classes.text}>
                Here you can find brand new or second hand cars.
                This site is new, and we will be happy if you share it with friend!
            </p>
        </section>
    );
};

export default Home;