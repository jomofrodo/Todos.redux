import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';

// Middleware you want to use in production:
//const enhancer = applyMiddleware(p1, p2, p3);
//const enhancer = {};
// See https://github.com/zalmoxisus/redux-devtools-extension#usage
const enhancer = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
//let enhancer = applyMiddleware(thunk);
/*
  const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify here name, actionsBlacklist, actionsCreators and other options
      }) : compose;

  const enhancer = composeEnhancers(
    applyMiddleware(thunk),
    // other store enhancers if any
  );
*/
/* DON'T DO THIS!!  OLD STYLE compose DOES NOT WORK with new >= 3.1.0 style
const compA = compose(
    enhancer,
    applyMiddleware(thunk)
  );
*/
export default function configureStore(initialState) {
    // Note: only Redux >= 3.1.0 supports passing enhancer as third argument.
    // See https://github.com/rackt/redux/releases/tag/v3.1.0
    //const store = createStore(rootReducer, initialState, enhancer);
    //const store = createStore(rootReducer, initialState, compA);
    //const store = createStore(rootReducer,initialState,applyMiddleware(thunk));
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(thunk)));
    store.subscribe(() => {
        //console.log(store.getState());
        console.log(store.getState());
    })
    return store;
}
