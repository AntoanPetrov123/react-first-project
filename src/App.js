import { Fragment } from 'react';

import './App.css';
import Header from './components/Layout/Header';
import Cars from './components/Cars/Cars';
import Cart from './components/Cart/Cart';


function App() {
  return (
    <Fragment>
      <Cart />
      <Header />
      <main>
        <Cars />
      </main>
    </Fragment>
  );
}

export default App;
