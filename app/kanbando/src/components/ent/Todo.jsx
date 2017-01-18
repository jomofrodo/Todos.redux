//TodoCard

import React  from "react";
import { connect } from 'react-redux';
import Ent from './Ent';
import * as todoActions from '../../actions/todos';
import { Input } from 'semantic-ui-react';
import Editable1 from './Editable.1';

class Todo extends Ent{

	todoID;
	tdName;
	tdDesc;
	flgCompleted;
	flgEditing;
	projectID;
 
 	createTodo(){}

	constructor(props){
		super(props);
		const { todo, createTodo } = this.props;
		this.assignProperties(todo);
	}

    detachTodoHdlr(todoID,projectID){
    	const { unattachTodo } = this.props;
    }
    deleteTodoHdlr(todoID, projectID){
    	const {deleteTodo, unlinkTodo} = this.props;
    	if(projectID) unlinkTodo(todoID,projectID);
    	deleteTodo(todoID);
    }

    editTodoHdlr(todoID){
    	const {editTodo} = this.props;
    	editTodo({todoID});
    }
	render(){
		const {updateTodo} = this.props;
		let todoID = this.todoID;
		return(
			<p>nada</p>
			)
	}

}


//Export: include reducer in export for inclusion in rootReducer
export { Todo as default }
