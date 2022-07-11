import { createContext, useState } from "react";

const AuthContext = createContext({
    token: '',
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

export const AuthContextProvider = (props) => {

    const initialToken = localStorage.getItem('token');
    const [token, setToken] = useState(initialToken);

    const userIsLoggedIn = !!token; //empty => false

    const logoutHandler = () => {
        setToken(null);
        localStorage.clear('token');
    };

    const loginHandler = (token, expirationTime) => {
        setToken(token);
        localStorage.setItem('token', token); //save token locally

        const remainingTime = calcRemainingTime(expirationTime);

        setTimeout(logoutHandler, remainingTime); //auto logaout after remaining time //remainingTime change with 3000 for testing
    };

    const contextValue = {
        token: token,
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