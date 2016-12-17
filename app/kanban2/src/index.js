import React from 'react';
import ReactDOM from 'react-dom';
import Root from './containers/Root.jsx';
import configureStore from './store/configureStore';
import storage from './libs/storage';
import './index.css';
import './kanban.css';

const APP_STORAGE = 'redux_kanban';

let initialState = storage.get(APP_STORAGE) || {};

let store = configureStore(storage.get(APP_STORAGE) || {});

store.subscribe(() => {
  if(!storage.get('debug')) {
    storage.set(APP_STORAGE, store.getState());
  }
  console.log(store.getState());
});

ReactDOM.render(
  <Root store={store} />,
  document.getElementById('root')
);
