import React from 'react';
import ReactDOM from 'react-dom';
import Layout from './Layout';
// import registerServiceWorker from './registerServiceWorker';

import "normalize.css";

import store from "./Store";
import { Provider } from 'react-redux';

ReactDOM.render(<Provider store={store}>
    <Layout />
  </Provider>, document.getElementById('root'));
// registerServiceWorker();
navigator.serviceWorker.getRegistrations().then(function(registrations) {
 for(let registration of registrations) {
  registration.unregister()
} })
