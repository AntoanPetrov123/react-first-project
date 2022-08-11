import { useEffect, useState } from "react";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import urls from "../../../storage/urls";
import ErrorHandle from "../../Authentication/ErrorHandle";
import useInput from "../../hooks/use-input";

import classes from './EditCarPostForm.module.css';
const EditCarPostForm = (props) => {

    const params = useParams();
    const [cars, setCars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [hasError, setHasError] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);

    const location = useLocation();
    const postData = location.state;
    console.log(postData);

    const redirect = useNavigate();



    console.log(props, 'props');
    useEffect(() => {
        const fetchCars = async () => {
            const response = await fetch('https://change-your-car-react-default-rtdb.firebaseio.com/cars.json');

            if (!response.ok) {
                throw new Error('Somthing is wrong!');
            }
            const responseData = response.json();

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

    // const {
    //     value: enteredName,
    //     isValid: enteredNameIsValid,
    //     hasError: nameInputHasError,
    //     valueChangeHandler: nameChangeHandler,
    //     inputBlurHandler: nameBlurHandler,
    //     resetForm: resetNameInput
    // } = useInput(value => (value.trim() !== '' && value.trim().length > 2));

    // const {
    //     value: enteredImageUrl,
    //     isValid: enteredUrlIsValid,
    //     hasError: urlInputHasError,
    //     valueChangeHandler: urlChangeHandler,
    //     inputBlurHandler: urlBlurHandler,
    //     resetForm: resetUrlInput
    // } = useInput(value => (value.trim() !== '' && /^(http|https):\/\/.{0,}$/.test(value)));

    // const {
    //     value: enteredDescription,
    //     isValid: enteredDescriptionIsValid,
    //     hasError: descriptionInputHasError,
    //     valueChangeHandler: descriptionChangeHandler,
    //     inputBlurHandler: descriptionBlurHandler,
    //     resetForm: resetDescriptionInput
    // } = useInput(value => (value.trim() !== '' && (value.trim().length >= 10 && value.trim().length <= 300)));

    // const {
    //     value: enteredPrice,
    //     isValid: enteredPriceIsValid,
    //     hasError: priceInputHasError,
    //     valueChangeHandler: priceChangeHandler,
    //     inputBlurHandler: priceBlurHandler,
    //     resetForm: resetPriceInput
    // } = useInput(value => value.trim() !== '');

    // let formIsValid = false;

    // if (enteredNameIsValid && enteredUrlIsValid && enteredDescriptionIsValid && enteredPriceIsValid) {
    //     formIsValid = true;
    // }
    const url = urls.cars + `/${postData._id}`;
    console.log(url, 'url');

    function submitEditFormHandler(event) {
        event.preventDefault();
        console.log('Editing complete');
        // resetNameInput();
        // resetUrlInput();
        // resetDescriptionInput();
        // resetPriceInput();
        let formData = new FormData(event.currentTarget);
        let brnad = formData.get('name');
        let image = formData.get('image');
        let description = formData.get('description');
        let price = formData.get('price');

        console.log(formData, 'form data');

        const url = `https://change-your-car-react-default-rtdb.firebaseio.com/cars/${postData._id}.json`;
        console.log(url, 'url');
        fetch(url,
            {
                method: 'PUT',
                body: JSON.stringify({
                    name: brnad,
                    imageUrl: image,
                    description: description,
                    price: price,
                }),
                headers: {
                    'Content-Type': 'application/json'
                },
            }
        ).then(result => {
            console.log(result, 'result');
            redirect('/profile');
        }).catch(errorMessage => console.log(setErrorMessage(errorMessage)));


    }


    // const postData = cars.find(car => car.id === params.id);

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
    // // console.log(post);

    // const nameInputClasses = nameInputHasError ? 'form-control-invalid' : 'form-control';
    // const urlInputClasses = urlInputHasError ? 'form-control-invalid' : 'form-control';
    // const descriptionInputClasses = descriptionInputHasError ? 'form-control-invalid' : 'form-control';
    // const priceInputClasses = priceInputHasError ? 'form-control-invalid' : 'form-control';

    if (!postData) {
        return (
            <p>Not found!</p>
        );
    }
    return (
        <section className={classes.auth}>
            <h1>Edit your {postData.name}</h1>
            {hasError && (
                <div className={classes['error-box']}>
                    <p className={classes.error}>{errorMessage}</p>
                </div>
            )}

            <form onSubmit={submitEditFormHandler}>
                {/* <div className={classes[nameInputClasses]}> */}
                <div>
                    <label htmlFor='name'>Car Brand</label>
                    <input
                        type='text'
                        name='name'
                        id='name'
                        // onChange={nameChangeHandler}
                        // onBlur={nameBlurHandler}
                        placeholder={postData.name}
                        defaultValue={postData.name}
                        required />
                </div>
                {/* {nameInputHasError && ( 
                <p className={classes['error-text']}>Name is not valid!</p>
                )} 
                <div className={classes[urlInputClasses]}> */}
                <div>
                    <label htmlFor='image'>Car Photo</label>
                    <input
                        type='text'
                        name='image'
                        id='image'
                        // onChange={urlChangeHandler}
                        // onBlur={urlBlurHandler}
                        placeholder='http://...'
                        defaultValue={postData.imageUrl}
                        required />
                </div>
                {/* {urlInputHasError && (
                    <p className={classes['error-text']}>Image url is not valid!</p>
                )} */}
                <div>
                    {/* <div className={classes[descriptionInputClasses]}> */}
                    <label htmlFor='description'>Car Description</label>
                    <textarea
                        type='text'
                        name='description'
                        id='description'
                        rows='4'
                        // onChange={descriptionChangeHandler}
                        // onBlur={descriptionBlurHandler}
                        placeholder='Brand new; Color: red; Year: 2018...'
                        defaultValue={postData.description}
                        required ></textarea>
                </div>
                {/* {descriptionInputHasError && (
                    <p className={classes['error-text']}>Description is not valid!</p>
                )} */}
                {/* <div className={classes[priceInputClasses]}> */}
                <div>
                    <label htmlFor='price'>Car Price</label>
                    <input
                        type='number'
                        name='price'
                        id='price'
                        step="0.01"
                        min={0}
                        // onChange={priceChangeHandler}
                        // onBlur={priceBlurHandler}
                        placeholder='8888.88'
                        defaultValue={+postData.price}
                        required />
                </div>
                {/* {priceInputHasError && (
                    <p className={classes['error-text']}>Price is not valid!</p>
                )} */}
                <div className={classes.actions}>

                    {!isLoading && <button type="submit" >Submit</button>}
                    {isLoading && <p>Sending request...</p>}

                    <Link className={classes.toggle} to="/profile">Back to profile page</Link>
                </div>
            </form>
        </section>
    );
};

export default EditCarPostForm;