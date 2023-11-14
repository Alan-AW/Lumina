import React from 'react';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import App from './App';
import { store } from 'state/store';
import './index.css';
import 'nprogress/nprogress.css';
import 'animate.css';
import { initReactI18next } from "react-i18next";
import i18n from "i18next";
import { resource } from "./local/resource";
i18n.use(initReactI18next).init({
    fallbackLng: 'en',
    lng: 'en',
    resources: resource,
});
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <HashRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </HashRouter>
);
