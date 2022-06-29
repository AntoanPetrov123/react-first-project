import classes from './CarsSummary.module.css';

const CarsSummary = () => {
    return (
        <section className={classes.summary}>
            <h2>This is a place where you can sell or buy cars</h2>
            <p>
                Here you can find brand new or second hand cars.
            </p>
            <p>
                This site is new, and we will be happy if you share it with friend!
            </p>
        </section>
    );
};

export default CarsSummary;