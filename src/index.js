import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App/App';
import registerServiceWorker from './App/registerServiceWorker';

ReactDOM.render( < App / > , document.getElementById('root'));
registerServiceWorker();