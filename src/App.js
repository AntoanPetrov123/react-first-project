import { useState } from 'react';

import './App.css';
import Header from './components/Layout/Header';
import Cars from './components/Cars/Cars';
import Cart from './components/Cart/Cart';
import CartProvider from './storage/CartProvider';


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
      {cartIsShown && <Cart onHideCart={hideCartHandler}/>}
      <Header onShowCart={showCartHandler} />
      <main>
        <Cars />
      </main>
    </CartProvider>
  );
}

export default App;
