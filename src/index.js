import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'font-awesome/css/font-awesome.css';
import store from "./store"
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from "react-redux"
import { retrieveMessages } from "./actions"

store.dispatch(retrieveMessages())

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>, document.getElementById('root'));
registerServiceWorker();
