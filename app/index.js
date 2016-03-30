import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';
import App from './containers/App'
import configureStore from './store/configureStore'
import 'todomvc-app-css/index.css'
import storage from './libs/storage';
import rootReducer from './reducers';

const APP_STORAGE = 'redux_todosMVC';

let initialState = storage.get(APP_STORAGE);
if(!initialState) initialState = {};
//one of the following
//let store =  applyMiddleware(thunk)(createStore)(rootReducer,initialState);
/*
 **/ 
const store = configureStore(initialState || {});

store.subscribe(() => {
  if(!storage.get('debug')) {
    storage.set(APP_STORAGE, store.getState());
    /*
        fetch('/add_todo', {
      method: 'post',
      body: JSON.stringify({
        text
      })
    }).then(response => {
      // you should probably get a real id for your new todo item here, 
      // and update your store, but we'll leave that to you
	console.debug(response);
    }).catch(err => {
    // Error: handle it the way you like, undoing the optimistic update,
    //  showing a "out of sync" message, etc.
    });
    */
  }
});
/**/

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)


