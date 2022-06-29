import classes from './CarItemForm.module.css';
const CarItemForm = props => {
    return (
        <form className={classes.form}>
            <button>+ Add</button>
        </form>
    )
};

export default CarItemForm;