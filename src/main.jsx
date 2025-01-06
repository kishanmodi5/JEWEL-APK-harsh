import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import store from "./store/store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { setupIonicReact } from '@ionic/react';


const container = document.getElementById('root');
const root = createRoot(container);
defineCustomElements(window);

setupIonicReact({
  rippleEffect: true,  // Enable ripple effect (a Material Design feature)
  mode: 'md',  // Use Material Design (md) mode for all devices
});

root.render(
  <React.StrictMode>
      <Provider store={store}>
     <App />
     <ToastContainer autoClose={1000} theme="dark"  />
    </Provider>
  </React.StrictMode>
);