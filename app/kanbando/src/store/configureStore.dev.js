import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';

// Middleware you want to use in production:
//const enhancer = applyMiddleware(p1, p2, p3);
//const enhancer = {};
// See https://github.com/zalmoxisus/redux-devtools-extension#usage
//let enhancer = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
let enhancer = applyMiddleware(thunk);

export default function configureStore(initialState) {
    // Note: only Redux >= 3.1.0 supports passing enhancer as third argument.
    // See https://github.com/rackt/redux/releases/tag/v3.1.0
    //const store = createStore(rootReducer, initialState, enhancer);
    const store = createStore(rootReducer, initialState, enhancer);
    store.subscribe(() => {
        //console.log(store.getState());
        console.log(store.getState());
    })
    return store;
}
