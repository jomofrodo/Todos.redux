//TodoCard

import React  from "react";
import { connect } from 'react-redux';
import Ent from './Ent';
import * as todoActions from '../../actions/todos';
import { Input, Icon } from 'semantic-ui-react';
import Editable1 from './Editable.1';
import Todo from './Todo';

class TodoCard extends Todo{

	render(){
		const {todo, projectID, updateTodo, idx} = this.props;
		if(!todo) return null;
		let todoID = todo.todoID;

		return(

			<div className="todo-card" data-idx={idx}>
				<Input type="checkbox" name="flgCompleted" checked={this.flgCompleted}
   	               onChange={() => updateTodo({todoID,flgCompleted:this.checked})}
				/>
				<Editable1 name="tdName" id="tdName" flgEditing={todo.flgEditing}
				onValueClick={()=> updateTodo({todoID,flgEditing:true})}
				onEdit={(tdName) => updateTodo({tdName,todoID, flgEditing: false, flgASync: true})}
				value={todo.tdName}/>

				<Icon name="info" title={todo.todoID} />

				<Icon name="delete" onClick={() => this.deleteTodoHdlr(todoID)} />
				<Icon name="edit" onClick={() => this.editTodoHdlr(todoID)} />

			</div>
		)
	}

}

// Redux wiring
const stateMap = (state) => ({
  todos: state.todos,
  currentProjectID: state.currentProjectID
});
const actionMap = { ...todoActions };
TodoCard = connect(stateMap, actionMap)(TodoCard);  //Wire it up as a Redux container
// End of Redux wiring

//Export: include reducer in export for inclusion in rootReducer
export { TodoCard as default }
