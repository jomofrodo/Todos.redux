import * as types from '../constants/ActionTypes';
import uuid from 'node-uuid';

/*
 * addTodo replaced with async action creator using thunk.  See below
 */
/*
export function addTodo(text) {
  return { type: types.ADD_TODO, text }
}
 */

export function deleteTodo(id) {
	return { type: types.DELETE_TODO, id }
}

export function editTodo(id, text) {
	return { type: types.EDIT_TODO, id, text }
}

export function completeTodo(id) {
	return { type: types.COMPLETE_TODO, id }
}

export function completeAll() {
	return { type: types.COMPLETE_ALL }
}

export function clearCompleted() {
	return { type: types.CLEAR_COMPLETED }
}


//renamed optimistic action creator - this won't be called directly 
//by the React components anymore, but from our async thunk function
export function addTodoOptimistic(text,id) {
	return { type: types.ADD_TODO, text, id };
}

export function addTodoSuccess(todoRec,uuid){
	return function(dispatch,getState){
		let uuid = action.uuid;
		let state = getState();
		let sRec = state.todos.filter(id => id == uuid);
		sRec.id = todoRec.id;
		state.todos = { ...state.todos,sRec};	
		});
	}
}

//the async action creator uses the name of the old action creator, so 
//it will get called by the existing code when a new todo item should 
//be added
export function addTodo(text) {
	// we return a thunk function, not an action object!
	// the thunk function needs to dispatch some actions to change 
	// the Store status, so it receives the "dispatch" function as its
	// >first parameter

	return function(dispatch,getState) {
		// here starts the code that actually gets executed when the 
		//  addTodo action creator is dispatched

		// first of all, let's do the optimistic UI update - we need to 
		// dispatch the old synchronous action object, using the renamed 
		// action creator
		debugger;
		let state = getState();
		let uuid = uuid.v4();
		dispatch(addTodoOptimistic(text,uuid));

		var fLoad = function(data,textStatus,jqXHR){
			//do something here
			console.debug(textStatus);
			const newAction = addTodoSuccess(data);
			dispatch(newAction,uuid);
		};
		var fErr = function(err){
			console.debug(err);
		}
		var record = {id:id,text:text};
		let payload = JSON.stringify(record);
		let data = {pl:payload};
		$.post('/todos/cdo',data,fLoad,fErr);

		// what you return here gets returned by the dispatch function that 
		// used this action creator
		return null; 
	}
}