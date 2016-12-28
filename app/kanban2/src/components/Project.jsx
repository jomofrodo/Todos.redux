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
A Project is a basic Project unit.  It has
	projectCode,
	prjName,
	prjDesc
	
Two types of actions:  component actions, and redux/store actions

	 Component actions are defined as handlers in the component.
	 	These may call the API and then chain to Store actions

	 Store actions are defined in myActions collection below.
	    These are the actions that are bound to dispatch and sent to the Redux store 
*/


let myActions = {
	selectProject: projectCode => ({ type: types.SELECT_PROJECT, projectCode: projectCode }),
	addProject: (typeCode, name, desc) => ({ type: types.ADD_PROJECT, typeCode, name, desc }),
	deleteProject: projectCode => ({ type: types.DELETE_PROJECT, projectCode: projectCode }),
	editProject: (projectCode, tdName, tdDesc) => ({ type: types.EDIT_PROJECT, projectCode: projectCode, tdName: tdName, tdDesc:tdDesc }),
	updateProject: (project) => ({ type: types.UPDATE_PROJECT, project })
}

function reducer(Project = {}, action) {
	switch (action.type) {
		case 'SELECT_PROJECT':
			return action.Project;
			break;
		case 'UPDATE_PROJECT':
			return action.Project;
			break;
		default:
			return action.Project;
	}
}


class Project extends Ent {
	static propTypes = {
		projectCode: PropTypes.object.isRequired,
		actions: PropTypes.object.isRequired
	}

	constructor(props) {
		//projectCode (state) and 'actions' inserted into props using react-redux connect method
		let { projectCode, actions} = props;
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
		const { projectCode, actions } = this.props;
		return (
			//Project something to render a Project
			
		);
	}
}

// Redux wiring
const stateMap = (state) => ({ Project: state.Project });
const actionMap = (dispatch) => ({ actions: bindActionCreators(myActions, dispatch) });
PubType = connect(stateMap, actionMap)(Project);  //Wire it up as a Redux container
// End of Redux wiring

//Export: include reducer in export for inclusion in rootReducer
export { Project as default, reducer }
