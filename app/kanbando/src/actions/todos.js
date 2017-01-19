import uuid from 'node-uuid';
import lodash from 'lodash';
import API from '../libs/API';

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
export const LINK_TODO = 'LINK_TODO'
export const UNLINK_TODO = 'UNLINK_TODO'
export const UPDATE_TODO_SORT = 'UPDATE_TODO_SORT';

export function attachTodo(todo, projectID) {
	return { type: ATTACH_TO_PROJECT, todo, projectID }
}

export function deleteTodo(todoID) {
	return { type: DELETE_TODO, todoID }
}

export function linkTodo(todoID, projectID) {
	return { type: LINK_TODO, todoID, projectID }
}
export function unlinkTodo(todoID, projectID) {
	return { type: UNLINK_TODO, todoID, projectID }
}

export function updateTodo(updatedTodo) {
	return { type: UPDATE_TODO, updatedTodo }
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

	return function (dispatch, getState) {
		const ret = dispatch(createTodoSync(uid, tdName));
		dispatch(attachTodo(ret.todo, projectID));
		//debugger;
		const todo = ret.todo;
		API.createTodo(todo)
			.then(
				todo => dispatch(updateTodo(uid, todo))
			).catch(e => {
				dispatch(updateNoGo(e));
			})
		return todo;
	}
}

//renamed optimistic action creator - this won't be called directly 
//by the React components anymore, but from our async thunk function

export function createTodoSync(todoID, tdName) {

	return {
		type: CREATE_TODO,
		todo: {
			todoID: todoID,
			tdName: tdName
		}
	};
}



export function updateTodoSort(sortMap) {
	return function (dispatch) {
		dispatch(updateTodoSortOptimistic(sortMap));
		return API.updateTodoSort(sortMap)
			.catch(e => {
				dispatch(updateNoGo(e));
			}).then(
			sortMap => dispatch(updateGolden(sortMap)),
			error => dispatch(updateNoGo(error))
			);

	}
}

export function updateTodoSortOptimistic(sortMap) {
	return {
		type: UPDATE_TODO_SORT,
		sortMap: sortMap
	}
}

function updateGolden(response) {
	return {
		type: 'LOG_INFO',
		msg: "Update Success:  " + response
	}
}
function updateNoGo(error) {
	return {
		type: 'LOG_ERROR',
		msg: "Update Failed:  " + error
	}
}
