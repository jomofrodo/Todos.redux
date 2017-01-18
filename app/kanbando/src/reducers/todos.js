import { CREATE_TODO, DELETE_TODO, EDIT_TODO, UPDATE_TODO, COMPLETE_TODO, COMPLETE_ALL, CLEAR_COMPLETED } from '../actions/todos'

const initialState = [
  {
    text: 'Use Redux',
    completed: false,
    todoID: 0
  }
]

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
      return state.map(todo =>
        todo.todoID === action.updatedTodo.todoID ?
          Object.assign({}, todo, action.updatedTodo) :
          todo
      );
      
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
