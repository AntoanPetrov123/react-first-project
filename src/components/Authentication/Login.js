import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../storage/auth-context';
import urls from '../../storage/urls';
import useInput from '../hooks/use-input';

import classes from './AuthPage.module.css';
import ErrorHandle from './ErrorHandle';

const Login = () => {

    const authContext = useContext(AuthContext);
    const redirect = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);

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

    let formIsValid = false;

    if (enteredEmailIsValid && enteredPasswordIsValid) {
        formIsValid = true;
    }

    const submitHandler = (event) => {
        event.preventDefault();

        let formData = new FormData(event.currentTarget);

        let enteredEmail = formData.get('email');
        let enteredPassword = formData.get('password');

        console.log(formData);
        // TODO: Add validation
        setIsLoading(true);

        fetch(urls.signInAuthentication,
            {
                method: 'POST',
                body: JSON.stringify({
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
                console.log(data);
                const expirationTime = new Date(new Date().getTime() + (+data.expiresIn * 1000));
                authContext.login(data.idToken, expirationTime.toISOString(), data.localId);
                redirect('/'); //redirect after login
            })
            .catch(error => console.log(error.message));

        resetEmailInput();
        resetPasswordInput();
    };
    const emailInputClasses = emailInputHasError ? 'form-control-invalid' : 'form-control';
    const passwordInputClasses = passwordInputHasError ? 'form-control-invalid' : 'form-control';

    return (
        <section className={classes.auth}>

            <form onSubmit={submitHandler}>
                <h1>Login</h1>
                {hasError && (
                    <div className={classes['error-box']}>
                        <p className={classes.error }>{errorMessage}</p>
                    </div>
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
                <div className={classes.actions}>
                    {!isLoading && (
                        <button disabled={!formIsValid}>Login</button>
                    )}
                    {isLoading && <p>Sending request...</p>}

                    <Link className={classes.toggle} to="/register">Do not have an account?</Link>

                </div>
            </form>
        </section>);
}

export default Login;
