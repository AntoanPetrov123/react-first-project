import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../storage/auth-context';

import classes from './AuthPage.module.css';

const Login = () => {

    const authContext = useContext(AuthContext);
    const redirect = useNavigate();

    const [isLoading, setIsLoading] = useState(false);

    const submitHandler = (event) => {
        event.preventDefault();

        let formData = new FormData(event.currentTarget);

        let enteredEmail = formData.get('email');
        let enteredPassword = formData.get('password');

        console.log(formData);
        // TODO: Add validation
        setIsLoading(true);
        let url;
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCCPh4cwZaL0tHRX8P91m5cRQ5DJhklFbc';

        fetch(url,
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
                authContext.login(data.idToken);
                redirect('/'); //redirect after login
            })
            .catch(error => alert(error.message));
    };

    return (
        <section className={classes.auth}>
            <h1>Login</h1>
            <form onSubmit={submitHandler}>

                <div className={classes.control}>
                    <label htmlFor='email'>Your Email</label>
                    <input type='email' name='email' id='email' placeholder='john@gmail.com' required />
                </div>
                <div className={classes.control}>
                    <label htmlFor='password'>Your Password</label>
                    <input type='password' name='password' id='password' placeholder='*****' required />
                </div>

                <div className={classes.actions}>
                    {!isLoading && (
                        <button>Login</button>
                    )}
                    {isLoading && <p>Sending request...</p>}
                    
                        <Link className={classes.toggle} to="/register">Do not have an account?</Link>
                    
                </div>
            </form>
        </section>);
}

export default Login;
