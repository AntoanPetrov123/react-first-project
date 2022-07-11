import { useState } from 'react';
import { Link } from 'react-router-dom';

import classes from './AuthPage.module.css';

const Register = () => {

    const [isLoading, setIsLoading] = useState(false);

    const submitHandler = (event) => {
        event.preventDefault();

        let formData = new FormData(event.currentTarget);
        let enteredUsername = formData.get('username');
        let enteredEmail = formData.get('email');
        let enteredPassword = formData.get('password');
        let enteredRePassword = formData.get('rePassword');
        console.log(enteredUsername, enteredEmail, enteredPassword, enteredRePassword);

        // TODO: Add validation
        setIsLoading(true);
        let url;
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCCPh4cwZaL0tHRX8P91m5cRQ5DJhklFbc';

        fetch(url,
            {
                method: 'POST',
                body: JSON.stringify({
                    // username: enteredUsername,
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
                        let errorMessage = 'Authentication failed';
                        if (data && data.error && data.error.message) {
                            errorMessage = data.error.message;
                        }
                        // alert(errorMessage);
                        throw new Error(errorMessage);
                    });
                }
            })
            .then(data => {
                console.log(data);
            })
            .catch(error => alert(error.message));
    };


    return (
        <section className={classes.auth}>
            <h1>Create an account</h1>
            <form onSubmit={submitHandler}>
                <div className={classes.control}>
                    <label htmlFor='username'>Username</label>
                    <input type='text' name='username' id='username' placeholder='John' required />
                </div>
                <div className={classes.control}>
                    <label htmlFor='email'>Email</label>
                    <input type='email' name='email' id='email' placeholder='john@gmail.com' required />
                </div>
                <div className={classes.control}>
                    <label htmlFor='password'>Password</label>
                    <input type='password' name='password' id='password' placeholder='*****' required />
                </div>
                <div className={classes.control}>
                    <label htmlFor='rePassword'>Repeat Password</label>
                    <input type='password' name='rePassword' id='rePassword' placeholder='*****' required />
                </div>
                <div className={classes.actions}>

                    {!isLoading && (
                        <button>Sign up</button>
                    )}
                    {isLoading && <p>Sending request...</p>}

                    <Link className={classes.toggle} to="/login"> Already have an account?</Link>

                </div>
            </form>
        </section>
    );
};

export default Register;