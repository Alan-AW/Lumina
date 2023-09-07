import React from 'react';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import App from './App';
import { store } from 'state/store';
import './index.css';
import 'nprogress/nprogress.css';
import 'animate.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <HashRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </HashRouter>
);
