import { combineReducers } from 'redux'
import todos from './todos'
import lanes from './lanes'
import projects from './projects'
import notes from './notes'
import * as appTypes from '../actions/app';

const appReducer = combineReducers({
	todos, lanes, projects, notes, currentProjectID
});

const rootReducer = (state, action) => {
	switch(action.type){
		case appTypes.RESET_APP:
			state = undefined;
			break;
		default:
			//nada  -- state = state;
			break;
	}
	return appReducer(state,action);

}

function currentProjectID(state = 0, action) {
  switch (action.type) {
    case 'SET_CURRENT_PROJECT':
      return action.projectID;
    default:
      return state
  }
}


export default rootReducer
