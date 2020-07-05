import React from 'react';
import ReactDOM from 'react-dom';
import './CSS/Main.css';
import AuthenticationRouter from './AuthenticationRouter';

ReactDOM.render(
  <React.StrictMode>
        <AuthenticationRouter />
  </React.StrictMode>,
  document.getElementById('root')
);

