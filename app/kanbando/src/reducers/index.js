import { combineReducers } from 'redux'
import todos from './todos'
import lanes from './lanes'
import projects from './projects'
import notes from './notes'
import * as appTypes from '../actions/app';

const appReducer = combineReducers({
	todos, lanes, projects, notes
});

const rootReducer = (state, action) => {
	switch(action.type){
		case appTypes.RESET_APP:
			state = undefined;
			break;
		default:
			state = state;
	}
	return appReducer(state, action)
}


export default rootReducer
