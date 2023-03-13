import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';
import WordContextProvider from './context/WordContext.js';

const Root = () => {
  return (
    <WordContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </WordContextProvider>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);
