import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux'
import promiseMiddleware from 'redux-promise-middleware';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger'
import { Provider } from 'react-redux'
import reducer from './reducers'
import './index.css';
import App from './containers/VisibleApp';
import registerServiceWorker from './registerServiceWorker';

const store = createStore(reducer, {}, applyMiddleware(
  thunkMiddleware,
  promiseMiddleware(),
  logger
));

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
