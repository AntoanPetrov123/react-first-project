import { createContext, useState, useEffect, useCallback } from "react";

let logoutTimer;

const AuthContext = createContext({
    token: '',
    userId: '',
    isLoggedIn: false,
    login: (token) => { },
    logout: () => { }
});

const calcRemainingTime = (expirationTime) => {
    const currentTime = new Date().getTime(); //now
    const adjExpirationTime = new Date(expirationTime).getTime(); //future

    const remainingTime = adjExpirationTime - currentTime;

    return remainingTime;
};

const retriveStoredToken = () => {
    const storedToken = localStorage.getItem('token');
    const storageExpirationDate = localStorage.getItem('expirationTime');

    const remainingTime = calcRemainingTime(storageExpirationDate);

    if (remainingTime <= 6000) {
        localStorage.removeItem('token');
        localStorage.removeItem('expirationTime');
        return null;
    }

    return {
        token: storedToken,
        time: remainingTime
    };
};

export const AuthContextProvider = (props) => {

    const tokenData = retriveStoredToken();
    let initialToken;
    if (tokenData) {
        initialToken = tokenData.token;
    }

    const [token, setToken] = useState(initialToken);
    const [userId, setUserId] = useState(null);

    const userIsLoggedIn = !!token; //empty => false

    const logoutHandler = useCallback(() => {
        setToken(null);
        setUserId(null);
        localStorage.removeItem('userId');
        localStorage.removeItem('token');
        localStorage.removeItem('expirationTime');

        if (logoutTimer) {
            clearTimeout(logoutTimer);
        }
    }, []);

    const loginHandler = (token, expirationTime, userId) => {
        setToken(token);
        setUserId(userId);
        localStorage.setItem('userId', userId);
        localStorage.setItem('token', token); //save token locally
        localStorage.setItem('expirationTime', expirationTime); //save expiration time locally

        const remainingTime = calcRemainingTime(expirationTime);

        logoutTimer = setTimeout(logoutHandler, remainingTime); //auto logaout after remaining time //remainingTime change with 3000 for testing
    };

    useEffect(() => {
        if (tokenData) {
            logoutTimer = setTimeout(logoutHandler, tokenData.time);
        }
    }, [tokenData, logoutHandler]);

    const contextValue = {
        token: token,
        userId: userId,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    )
};

export default AuthContext;