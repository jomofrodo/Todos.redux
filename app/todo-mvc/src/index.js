import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';
import App from './containers/App';
import configureStore from './store/configureStore';
import 'todomvc-app-css/index.css';
import storage from './libs/storage';
import rootReducer from './reducers';

const APP_STORAGE = 'redux_todosMVC';

let initialState = storage.get(APP_STORAGE) || {};
//one of the following
let store =  applyMiddleware(thunk)(createStore)(rootReducer,initialState);
/*
const store = configureStore(initialState);
*/
store.subscribe(() => {
  if(!storage.get('debug')) {
    storage.set(APP_STORAGE, store.getState(), store);
  }
});

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)


