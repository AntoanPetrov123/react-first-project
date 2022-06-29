import { Fragment } from 'react';

import './App.css';
import Header from './components/Layout/Header';
import Cars from './components/Cars/Cars';

function App() {
  return (
    <Fragment>
      <Header />
      <main>
        <Cars />
      </main>
    </Fragment>
  );
}

export default App;
