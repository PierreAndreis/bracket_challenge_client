import React from 'react';

import App from "./App/App";

import "./Layout.css";


const Header = () => (
  <div className="Header">
    <div className="Header-bar"><div className="Logo" /></div>
    <div className="Header-banner"><span>Bracket Challenge</span></div>
  </div>
);

const Layout = () => (
  <div>
    <Header/>
    <div className="App-Content">
      <App />
    </div>
  </div>
)

export default Layout;
