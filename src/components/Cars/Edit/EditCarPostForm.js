import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useInput from "../../hooks/use-input";

import classes from './EditCarPostForm.module.css';
const EditCarPostForm = (props) => {

    const params = useParams();
    const [cars, setCars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCars = async () => {
            const response = await fetch('https://change-your-car-react-default-rtdb.firebaseio.com/cars.json');

            if (!response.ok) {
                throw new Error('Somthing is wrong!');
            }
            const responseData = await response.json();

            const loadedCars = [];

            for (const key in responseData) {
                loadedCars.push({
                    id: key,
                    name: responseData[key].name,
                    description: responseData[key].description,
                    imageUrl: responseData[key].imageUrl,
                    price: responseData[key].price,
                });
            }
            // console.log(loadedCars);
            setCars(loadedCars);
            setIsLoading(false);
        };

        //chech if we have any errors
        fetchCars().catch((err) => {
            setIsLoading(false);
            setError(err.message);
        });

    }, []);

    // const [errorMessage, setErrorMessage] = useState(false);

    const {
        value: enteredName,
        isValid: enteredNameIsValid,
        hasError: nameInputHasError,
        valueChangeHandler: nameChangeHandler,
        inputBlurHandler: nameBlurHandler,
        resetForm: resetNameInput
    } = useInput(value => (value.trim() !== '' && value.trim().length > 2));

    const {
        value: enteredImageUrl,
        isValid: enteredUrlIsValid,
        hasError: urlInputHasError,
        valueChangeHandler: urlChangeHandler,
        inputBlurHandler: urlBlurHandler,
        resetForm: resetUrlInput
    } = useInput(value => (value.trim() !== '' && /^(http|https):\/\/.{0,}$/.test(value)));

    const {
        value: enteredDescription,
        isValid: enteredDescriptionIsValid,
        hasError: descriptionInputHasError,
        valueChangeHandler: descriptionChangeHandler,
        inputBlurHandler: descriptionBlurHandler,
        resetForm: resetDescriptionInput
    } = useInput(value => (value.trim() !== '' && (value.trim().length >= 10 && value.trim().length <= 300)));

    const {
        value: enteredPrice,
        isValid: enteredPriceIsValid,
        hasError: priceInputHasError,
        valueChangeHandler: priceChangeHandler,
        inputBlurHandler: priceBlurHandler,
        resetForm: resetPriceInput
    } = useInput(value => value.trim() !== '');

    let formIsValid = false;

    if (enteredNameIsValid && enteredUrlIsValid && enteredDescriptionIsValid && enteredPriceIsValid) {
        formIsValid = true;
    }

    function submitEditFormHandler(event) {
        console.log('Editing complete');
        resetNameInput();
        resetUrlInput();
        resetDescriptionInput();
        resetPriceInput();
    }



    if (isLoading) {
        return (
            <div className={classes['spinner-container']} >
                <div className={classes["loading-spinner"]}>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <section className={classes['cars-error-box']}>
                <p className={classes['cars-error']}>{error}</p>
            </section>
        );
    }

    // console.log(cars);
    // console.log(params.id);
    const post = cars.find(car => car.id === params.id);
    // console.log(post);

    if (!post) {
        return (
            <p>Not found!</p>
        );
    }
    const nameInputClasses = nameInputHasError ? 'form-control-invalid' : 'form-control';
    const urlInputClasses = urlInputHasError ? 'form-control-invalid' : 'form-control';
    const descriptionInputClasses = descriptionInputHasError ? 'form-control-invalid' : 'form-control';
    const priceInputClasses = priceInputHasError ? 'form-control-invalid' : 'form-control';

    return (
        <section className={classes.auth}>
            <h1>Edit your {post.name}</h1>
            {/* {hasError && (
                <div className={classes['error-box']}>
                    <p className={classes.error}>{errorMessage}</p>
                </div>
            )} */}

            <form method="POST" onSubmit={submitEditFormHandler}>
                <div className={classes[nameInputClasses]}>
                    <label htmlFor='name'>Car Brand</label>
                    <input
                        type='text'
                        name='name'
                        id='name'
                        onChange={nameChangeHandler}
                        onBlur={nameBlurHandler}
                        placeholder={post.name}
                        defaultValue={enteredName}
                        required />
                </div>
                {nameInputHasError && (
                    <p className={classes['error-text']}>Name is not valid!</p>
                )}
                <div className={classes[urlInputClasses]}>
                    <label htmlFor='image'>Car Photo</label>
                    <input
                        type='text'
                        name='image'
                        id='image'
                        onChange={urlChangeHandler}
                        onBlur={urlBlurHandler}
                        placeholder='http://...'
                        defaultValue={enteredImageUrl}
                        required />
                </div>
                {urlInputHasError && (
                    <p className={classes['error-text']}>Image url is not valid!</p>
                )}
                <div className={classes[descriptionInputClasses]}>
                    <label htmlFor='description'>Car Description</label>
                    <textarea
                        type='text'
                        name='description'
                        id='description'
                        rows='4'
                        onChange={descriptionChangeHandler}
                        onBlur={descriptionBlurHandler}
                        placeholder='Brand new; Color: red; Year: 2018...'
                        defaultValue={enteredDescription}
                        required ></textarea>
                </div>
                {descriptionInputHasError && (
                    <p className={classes['error-text']}>Description is not valid!</p>
                )}
                <div className={classes[priceInputClasses]}>
                    <label htmlFor='price'>Car Price</label>
                    <input
                        type='number'
                        name='price'
                        id='price'
                        step="0.01"
                        min={0}
                        onChange={priceChangeHandler}
                        onBlur={priceBlurHandler}
                        placeholder='8888.88'
                        defaultValue={enteredPrice}
                        required />
                </div>
                {priceInputHasError && (
                    <p className={classes['error-text']}>Price is not valid!</p>
                )}
                <div className={classes.actions}>

                    {!isLoading && <button disabled={!formIsValid} >Submit</button>}
                    {isLoading && <p>Sending request...</p>}

                    <Link className={classes.toggle} to="/profile">Back to profile page</Link>
                </div>
            </form>
        </section>
    );
};

export default EditCarPostForm;