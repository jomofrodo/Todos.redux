import React from 'react';
import TodoCard from './TodoCard.jsx';


export default ({todos}) => {

  return (

    <div className="todos sortable-todos">{todos.map((todo,idx) =>
           <TodoCard className="todo" key={todo.todoID} idx={idx} todo={todo} />
    )}</div>
  );
}
