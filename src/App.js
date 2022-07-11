import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import './App.css';
import Header from './components/Layout/Header';
import Cars from './components/Cars/Cars';
import Cart from './components/Cart/Cart';
import CartProvider from './storage/CartProvider';
import Home from './components/Home/Home';
// import Footer from './components/Layout/Footer';
// import AuthPage from './components/Authentication/AuthPage';
import CarDetails from './components/Cars/CarItem/CarDetails';
import NewPost from './components/Cars/Create/NewPost';
import NotFound from './components/UI/NotFound';
import Register from './components/Authentication/Register';
import Login from './components/Authentication/Login';



function App() {

  const [cartIsShown, setCartIsShown] = useState(false);

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
          <Route path="/create-post" element={<NewPost />} />
          <Route path="/details/:id" element={<CarDetails />} />
          <Route path="/profile" element={<Cars />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </main>
      {/* <Footer /> */}
    </CartProvider>
  );
}

export default App;
