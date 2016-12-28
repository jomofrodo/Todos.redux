import React, { PropTypes } from 'react';
import API from '../API';
import ModalBasic from '../ui/ModalBasic';
import PopupBasic from '../ui/PopupBasic';
import { Popup } from 'semantic-ui-react'
import * as types from '../constants/ActionTypes';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import $ from 'jquery';
import Ent from './Ent.js';
import '../css/reset.css';

import 'jquery-ui/themes/base/sortable.css';
import 'jquery-ui/themes/base/tabs.css';
import 'jquery-ui/ui/widgets/sortable';
import 'jquery-ui/ui/widgets/tabs';

/*
A ToDo is a basic ToDo unit.  It has
	id,
	name,
	desc
	
Two types of actions:  component actions, and redux/store actions

	 Component actions are defined as handlers in the component.
	 	These may call the API and then chain to Store actions

	 Store actions are defined in myActions collection below.
	    These are the actions that are bound to dispatch and sent to the Redux store 
*/


let myActions = {
	selectDo: todoID => ({ type: types.SELECT_DO, todoID: todoID }),
	addDo: (typeCode, name, desc) => ({ type: types.ADD_DO, typeCode, name, desc }),
	deleteDo: todoID => ({ type: types.DELETE_DO, todoID: todoID }),
	editDo: (todoID, tdName, tdDesc) => ({ type: types.EDIT_DO, todoID: todoID, tdName: tdName, tdDesc:tdDesc }),
	updateDo: (do) => ({ type: types.UPDATE_DO, do })
}

function reducer(ToDo = {}, action) {
	switch (action.type) {
		case 'SELECT_DO':
			return action.ToDo;
			break;
		case 'UPDATE_DO':
			return action.ToDo;
			break;
		default:
			return action.ToDo;
	}
}


class ToDo extends Ent {
	static propTypes = {
		todoID: PropTypes.object.isRequired,
		actions: PropTypes.object.isRequired
	}

	constructor(props) {
		//todoID (state) and 'actions' inserted into props using react-redux connect method
		let { todoID, actions} = props;
		super(props);
	}
	
	componentDidMount() {
		$('#div-tabs').tabs();			//load jquery-ui tabs
		$(".sortable").sortable({		// jquery-ui sortable
			
		});
	}
	componentWillUnmount() {
		if ($(".sortable").length) $(".sortable").sortable("destroy");
	}

	// Action handlers 



	// Render
	render() {
		const { todoID, actions } = this.props;
		return (
			//ToDo something to render a DO
			
		);
	}
}

// Redux wiring
const stateMap = (state) => ({ ToDo: state.ToDo });
const actionMap = (dispatch) => ({ actions: bindActionCreators(myActions, dispatch) });
PubType = connect(stateMap, actionMap)(ToDo);  //Wire it up as a Redux container
// End of Redux wiring

//Export: include reducer in export for inclusion in rootReducer
export { ToDo as default, reducer }
