import { CREATE_TODO, DELETE_TODO, EDIT_TODO, UPDATE_TODO, COMPLETE_TODO, COMPLETE_ALL, CLEAR_COMPLETED } from '../actions/todos'
import { Map, List } from 'immutable';

const initialState = List(Map(
  {
    text: 'Use Redux',
    completed: false,
    todoID: 0
}));

export default function todos(state = initialState, action) {
  switch (action.type) {
    case CREATE_TODO:
      let todo = action.todo;
      return [
        {
          //assert(action.id);
          completed: false,
          ...todo
        }, 
        ...state
      ]

    case DELETE_TODO:
      const newTodos = state.filter(todo =>
          todo.todoID !== action.todoID
        );
      return newTodos;

    case EDIT_TODO:
      return state.map(todo =>
        todo.todoID === action.todoID ?
          Object.assign({}, todo, { tdName: action.tdName }) :
          todo
      )
      
   case UPDATE_TODO:
      const idx = state.findIndex( function(todo,idx){
        if(todo.todoID ) return todo.todoID === action.updatedTodo.todoID;
        else return todo.tdUUID === action.updatedTodo.tdUUID;
      }); 
      let newState = state.slice(0);
      newState[idx] = Object.assign({}, state[idx], action.updatedTodo);
      return newState;
      
    case COMPLETE_TODO:
      return state.map(todo =>
        todo.todoID === action.todoID ?
          Object.assign({}, todo, { completed: !todo.completed }) :
          todo
      )

    case COMPLETE_ALL:
      const areAllMarked = state.every(todo => todo.completed)
      return state.map(todo => Object.assign({}, todo, {
        completed: !areAllMarked
      }))

    case CLEAR_COMPLETED:
      return state.filter(todo => todo.completed === false)

    default:
      return state
  }
}
