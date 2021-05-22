import React from 'react';
import ReactDOM from 'react-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './assets/css/index.css';
import App from './App';
import { Store, persistor } from './store/store';
import { Provider } from 'react-redux';
import { PersistGate } from "redux-persist/integration/react";
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Provider store={Store}>
    <PersistGate loading={"Loading"} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
