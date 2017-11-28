import React from 'react';
import ReactDOM from 'react-dom';
import Layout from './Layout';

import "normalize.css";

import store from "./Store";
import { Provider } from 'react-redux';

ReactDOM.render(<Provider store={store}>
    <Layout />
  </Provider>, document.getElementById('root'));