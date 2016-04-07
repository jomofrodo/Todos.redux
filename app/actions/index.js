import * as types from '../constants/ActionTypes'

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


// renamed optimistic action creator - this won't be called directly 
// by the React components anymore, but from our async thunk function
export function addTodoOptimistic(text) {
  return { type: types.ADD_TODO, text };
}

// the async action creator uses the name of the old action creator, so 
// it will get called by the existing code when a new todo item should 
//  be added
export function addTodo(text) {
  // we return a thunk function, not an action object!
  // the thunk function needs to dispatch some actions to change 
  // the Store status, so it receives the "dispatch" function as its
  // >first parameter

  return function(dispatch) {
    // here starts the code that actually gets executed when the 
    //  addTodo action creator is dispatched

    // first of all, let's do the optimistic UI update - we need to 
    // dispatch the old synchronous action object, using the renamed 
    // action creator
    dispatch(addTodoOptimistic(text));

    var fLoad = function(data,textStatus,jqXHR){
	//do something here
	console.debug(textStatus);
    };
    $.post('/todos/cdo',JSON.stringify({text}),fLoad)

    
    // now that the Store has been notified of the new todo item, we 
    // should also notify our server - we'll use here ES6 fetch 
    // function to post the data
    /*
    fetch('/todos/cdo', {
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
  // what you return here gets returned by the dispatch function that 
  // used this action creator
  return null; 
  }
}