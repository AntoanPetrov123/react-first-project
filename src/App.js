import { useState, useContext } from 'react';
import { Route, Routes } from 'react-router-dom';

import './App.css';
import Header from './components/Layout/Header';
import Cars from './components/Cars/Cars';
import Cart from './components/Cart/Cart';
import CartProvider from './storage/CartProvider';
import Home from './components/Home/Home';
// import Footer from './components/Layout/Footer';
import CarDetails from './components/Cars/CarItem/CarDetails';
import NewPost from './components/Cars/Create/NewPost';
import NotFound from './components/UI/NotFound';
import Register from './components/Authentication/Register';
import Login from './components/Authentication/Login';
import AuthContext from './storage/auth-context';
import Profile from './components/Authentication/Profile/Profile';



function App() {

  const [cartIsShown, setCartIsShown] = useState(false);

  const authContext = useContext(AuthContext);
  const isAuth = authContext.isLoggedIn;

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  return (
    <CartProvider>
      {cartIsShown && <Cart onHideCart={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cars-catalog" element={<Cars />} />
          {isAuth && <Route path="/create-post" element={<NewPost />} />}
          <Route path="/details/:id" element={<CarDetails />} />
          {isAuth && <Route path="/profile" element={<Profile />} />}
          {!isAuth && <Route path="/login" element={<Login />} />}
          {!isAuth && <Route path="/register" element={<Register />} />}
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </main>
      {/* <Footer /> */}
    </CartProvider>
  );
}

export default App;
