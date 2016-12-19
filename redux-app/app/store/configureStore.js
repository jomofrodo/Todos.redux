import { createStore, applyMiddleWare } from 'redux'
import rootReducer from '../reducers'
import thunk from 'redux-thunk'

export default function configureStore(initialState) {
    
    return createStore{
	rootReducer,
	initialState,
	applyMiddleWare(thunk);
    };
}
