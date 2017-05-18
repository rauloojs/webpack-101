// const css = require('./app.scss');
import css from './app.scss';
import React from 'react';
import ReactDOM from 'react-dom';

console.log('Testing hot module replacement');

ReactDOM.render(
  <h1>React!</h1>,
  document.getElementById('root')
);
