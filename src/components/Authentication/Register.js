import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import AuthContext from '../../storage/auth-context';
import urls from '../../storage/urls';
import useInput from '../hooks/use-input';
import classes from './AuthPage.module.css';
import ErrorHandle from './ErrorHandle';

const Register = () => {

    const authContext = useContext(AuthContext);
    const redirect = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);

    const {
        value: enteredUsername,
        isValid: enteredUsernameIsValid,
        hasError: usernameInputHasError,
        valueChangeHandler: usernameChangeHandler,
        inputBlurHandler: usernameBlurHandler,
        resetForm: resetUsernameInput
    } = useInput(value => value.trim() !== '');

    const {
        value: enteredEmail,
        isValid: enteredEmailIsValid,
        hasError: emailInputHasError,
        valueChangeHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler,
        resetForm: resetEmailInput
    } = useInput(value => /^.{6,}@(gmail|abv)\.(bg|com)$/.test(value));

    const {
        value: enteredPassword,
        isValid: enteredPasswordIsValid,
        hasError: passwordInputHasError,
        valueChangeHandler: passwordChangeHandler,
        inputBlurHandler: passwordBlurHandler,
        resetForm: resetPasswordInput
    } = useInput(value => (value.trim() !== '' && value.trim().length >= 6));

    const {
        value: enteredRePassword,
        isValid: enteredRePasswordIsValid,
        hasError: rePasswordInputHasError,
        valueChangeHandler: rePasswordChangeHandler,
        inputBlurHandler: rePasswordBlurHandler,
        resetForm: resetRePasswordInput
    } = useInput(value => (
        (value.trim() !== '') &&
        (value.trim().length >= 6) &&
        (value.trim() === enteredPassword)
    ));

    let formIsValid = false;

    if (enteredUsernameIsValid && enteredEmailIsValid && enteredPasswordIsValid && enteredRePasswordIsValid) {
        formIsValid = true;
    }

    const submitHandler = (event) => {
        event.preventDefault();

        if (!enteredUsernameIsValid) {
            return;
        }


        let formData = new FormData(event.currentTarget);
        let enteredUsername = formData.get('username').trim();
        let enteredEmail = formData.get('email').trim();
        let enteredPassword = formData.get('password').trim();
        // let enteredRePassword = formData.get('rePassword').trim();

        setIsLoading(true);

        fetch(urls.signUpAuthentication,
            {
                method: 'POST',
                body: JSON.stringify({
                    username: enteredUsername,
                    email: enteredEmail,
                    password: enteredPassword,
                    returnSecureToken: true
                }),
                headers: {
                    'Content-Type': 'application/json'
                },
            }
        )
            .then(res => {
                setIsLoading(false);
                if (res.ok) {
                    return res.json();
                } else {
                    return res.json().then(data => {
                        setHasError(true);
                        setErrorMessage(ErrorHandle(data));
                        throw new Error(ErrorHandle(data));
                    });
                }
            })
            .then(data => {
                authContext.login(data.idToken);
                fetch(urls.users,
                    {
                        method: 'POST',
                        body: JSON.stringify({
                            userId: data.localId,
                            username: enteredUsername,
                            email: enteredEmail,
                            password: enteredPassword,
                            posts: [],
                        }),
                        headers: {
                            'Content-Type': 'application/json'
                        },
                    }
                )
                redirect('/login');
            })
            .catch(error => alert(error.message));

//         resetUsernameInput();
//         resetEmailInput();
//         resetPasswordInput();
//         resetRePasswordInput();
        if (usernameInputHasError) {
            resetUsernameInput();
        }
        if (emailInputHasError) {
            resetEmailInput();
        }
        if (passwordInputHasError) {
            resetPasswordInput();
        }
        if (rePasswordInputHasError) {
            resetRePasswordInput();
        }
    };

    const usernameInputClasses = usernameInputHasError ? 'form-control-invalid' : 'form-control';
    const emailInputClasses = emailInputHasError ? 'form-control-invalid' : 'form-control';
    const passwordInputClasses = passwordInputHasError ? 'form-control-invalid' : 'form-control';
    const rePasswordInputClasses = rePasswordInputHasError ? 'form-control-invalid' : 'form-control';

    return (
        <section className={classes.auth}>
            <h1>Create an account</h1>
            {hasError && (
                    <div className={classes['error-box']}>
                        <p className={classes.error }>{errorMessage}</p>
                    </div>
            )}
            <form onSubmit={submitHandler}>
                <div className={classes[usernameInputClasses]}>
                    <label htmlFor='username'>Username</label>
                    <input
                        type='text'
                        name='username'
                        id='username'
                        onChange={usernameChangeHandler}
                        onBlur={usernameBlurHandler}
                        placeholder='John'
                        defaultValue={enteredUsername}
                        required />
                </div>
                {usernameInputHasError && (
                    <p className={classes['error-text']}>Username is not valid!</p>
                )}
                <div className={classes[emailInputClasses]}>
                    <label htmlFor='email'>Email</label>
                    <input
                        type='email'
                        name='email'
                        id='email'
                        onChange={emailChangeHandler}
                        onBlur={emailBlurHandler}
                        placeholder='john@gmail.com'
                        defaultValue={enteredEmail}
                        required />
                </div>
                {emailInputHasError && (
                    <p className={classes['error-text']}>Email is not valid!</p>
                )}
                <div className={classes[passwordInputClasses]}>
                    <label htmlFor='password'>Password</label>
                    <input
                        type='password'
                        name='password'
                        id='password'
                        onChange={passwordChangeHandler}
                        onBlur={passwordBlurHandler}
                        placeholder='*****'
                        defaultValue={enteredPassword}
                        required />
                </div>
                {passwordInputHasError && (
                    <p className={classes['error-text']}>Password is invalid, it should be at least 6 characters!</p>
                )}
                <div className={classes[rePasswordInputClasses]}>
                    <label htmlFor='rePassword'>Repeat Password</label>
                    <input
                        type='password'
                        name='rePassword'
                        id='rePassword'
                        onChange={rePasswordChangeHandler}
                        onBlur={rePasswordBlurHandler}
                        placeholder='*****'
                        defaultValue={enteredRePassword}
                        required />
                </div>
                {rePasswordInputHasError && (
                    <p className={classes['error-text']}>Passwords do not match!</p>
                )}
                <div className={classes.actions}>

                    {!isLoading && (
                        <button disabled={!formIsValid}>Sign up</button>
                    )}
                    {isLoading && <p>Sending request...</p>}

                    <Link className={classes.toggle} to="/login"> Already have an account?</Link>

                </div>
            </form>
        </section>
    );
};

export default Register;
