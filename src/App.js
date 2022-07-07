import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import './App.css';
import Header from './components/Layout/Header';
import Cars from './components/Cars/Cars';
import Cart from './components/Cart/Cart';
import CartProvider from './storage/CartProvider';
import Home from './components/Home/Home';


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
        </Routes>
      </main>
    </CartProvider>
  );
}

export default App;
