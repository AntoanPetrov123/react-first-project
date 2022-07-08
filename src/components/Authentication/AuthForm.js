import { useState, useRef } from 'react';

import classes from './AuthForm.module.css';

const AuthForm = () => {
  // const usernameInputRef = useRef();
  // const rePasswordInputRef = useRef();
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.peventDefault();

    // const enteredUsername = usernameInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    // const enteredRePassword = rePasswordInputRef.current.value;

    console.log(enteredEmail, enteredPassword, 'here');
    // TODO: Add validation
    setIsLoading(true);
    let url;
    if (isLogin) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCCPh4cwZaL0tHRX8P91m5cRQ5DJhklFbc';
    } else {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCCPh4cwZaL0tHRX8P91m5cRQ5DJhklFbc.json';
    }

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
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        {/* {isLogin || <div className={classes.control}>
          <label htmlFor='username'>Your Username</label>
          <input type='text' id='username' ref={usernameInputRef} required />
        </div>} */}
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' ref={emailInputRef} required />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' ref={passwordInputRef} required />
        </div>
        {/* {isLogin || <div className={classes.control}>
          <label htmlFor='rePassword'>Repeat Password</label>
          <input type='password' id='rePassword' ref={rePasswordInputRef} required />
        </div>} */}
        <div className={classes.actions}>
          {!isLoading && (
            <button>{isLogin ? 'Login' : 'Create Account'}</button>
          )}
          {isLoading && <p>Sending request...</p>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;