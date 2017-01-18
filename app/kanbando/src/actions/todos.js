import uuid from 'node-uuid';
import lodash from 'lodash';

/*
 * addTodo replaced with async action creator using thunk.  See below
 */
/*
export function addTodo(text) {
  return { type: ADD_TODO, text }
}
*/

export const ATTACH_TO_PROJECT = 'ATTACH_TO_PROJECT'
export const CREATE_TODO = 'CREATE_TODO'
export const DELETE_TODO = 'DELETE_TODO'
export const EDIT_TODO = 'EDIT_TODO'
export const UPDATE_TODO = 'UPDATE_TODO'
export const UPDATE_TODOS = 'UPDATE_TODOS'
export const COMPLETE_TODO = 'COMPLETE_TODO'
export const COMPLETE_ALL = 'COMPLETE_ALL'
export const CLEAR_COMPLETED = 'CLEAR_COMPLETED'
export const UNLINK_TODO = 'UNLINK_TODO'

export function attachTodo(todo,projectID){
	return{ type: ATTACH_TO_PROJECT, todo, projectID}
}

export function deleteTodo(todoID) {
	return { type: DELETE_TODO, todoID }
}

export function unlinkTodo(todoID,projectID){
	return { type: UNLINK_TODO, todoID, projectID}
}

export function updateTodo(updatedTodo){
	return { type: UPDATE_TODO, updatedTodo}
}
export function editTodo(id, text) {
	return { type: EDIT_TODO, id, text }
}

export function completeTodo(todoID) {
	return { type: COMPLETE_TODO, todoID }
}

export function completeAll() {
	return { type: COMPLETE_ALL }
}

export function clearCompleted() {
	return { type: CLEAR_COMPLETED }
}



export function createTodo(projectID, tdName) {
	 let uid = uuid.v4();  //Originally assigned a uid4 randmon id;

    return function(dispatch,getState) {
  		let ret = dispatch(createTodoObj(uid,tdName));
  		dispatch(attachTodo(ret.todo,projectID));
  		dispatch(createTodoAPI);
  		return ret.todo;
  	}
  }

//renamed optimistic action creator - this won't be called directly 
//by the React components anymore, but from our async thunk function

export function createTodoObj(todoID, tdName) {

  return {
    type: CREATE_TODO,
    todo: {
      todoID: todoID,
      tdName: tdName
    }
  };
};


export function addTodoSuccess(todoRec, uid,state){
	let todos = state.todos.map((todo) => {
		if(todo.id !== uid) return todo;
		todo.id = todoRec.id;
		return todo;    
	});
	return {type: UPDATE_TODOS, todos}
}

//the async action creator uses the name of the old action creator, so 
//it will get called by the existing code when a new todo item should 
//be added
export function createTodoAPI(todo) {
    // we return a thunk function, not an action object!
    // the thunk function needs to dispatch some actions to change 
    // the Store status, so it receives the "dispatch" function as its
    // >first parameter

    let uid = todo.todoID;  //Originally assigned a uid4 randmon id;

    return function(dispatch,getState) {
	// here starts the code that actually gets executed when the 
	//  addTodo action creator is dispatched

	//The fLoad will update state todo.id with value from the database.
	//Maybe we should save the UUID in a uuid field?
	var fLoad = function(response){
		console.debug(response.status);
		if (!response.ok) {
			throw Error(response.statusText);
		}
		return response.json();
	}
	let createAction = function(json){
	    //do something here
	    let state = getState();
	    let todoRec = json.data;
	    const newAction = addTodoSuccess(todoRec,uid,state);
	    dispatch(newAction);
	}

	let fErr = function(err){
		console.debug(err);
	}
	var rec = todo;
	let payload = JSON.stringify(rec);
	let data = {pl:payload};

	var request = new Request('/todos/cdo', {
		method: 'POST', 
		body: data, 
		redirect: 'follow',
		headers: new Headers({
			'Content-Type': 'text/json'
		})
	});
	fetch(request).then(fLoad).then(createAction);

	// what you return here gets returned by the dispatch function that 
	// used this action creator
	return null; 
}
}