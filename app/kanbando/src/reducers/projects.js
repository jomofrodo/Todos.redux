import update from 'immutability-helper';
import * as types from '../actions/projects';
import { List, Map } from 'immutable';

const initialState = Map({});

export default function projects(state = initialState, action) {
	switch (action.type) {
		case types.CREATE_PROJECT:
			//return [...state, action.project];
			const {type, ...newProject}  = action;
			return state.set(newProject.projectID,newProject);

		case types.UPDATE_PROJECT:
			return state.set(action.projectID,action.project);
			/*
			return state.map((project) => {
				//debugger;
				if(project.projectID === action.projectID) {
					const {type, ...updatedProject} = action;
					return Object.assign({}, project, updatedProject);
				}

				return project;
			});
			*/
		case types.ATTACH_TO_PROJECT:
			return state.map((project) => {
				//debugger;
				if(project.projectID === action.projectID) {
					let newTodos = project.todos || new Array();
					newTodos = [...newTodos,action.todo.todoID];
					return Object.assign({},project,{todos:newTodos});
				}

				return project;
			});
		 case types.UNLINK_TODO:
		    return state.map((project) => {
		    		if(project.projectID === action.projectID){
		    			const idx = project.todos.indexOf(action.todoID);
		    			const newTodos = project.todos.splice(idx,1);
		    			return Object.assign({},project,{todos: newTodos});
		    		}
		    		return project;
		    	});

		case types.UPDATE_PROJECT_SORT:
			const sortMap = action.sortMap;
			return sortMap.map((idx) => {
				//be sure sortMap is zero-based
				return state[idx];
			});
			/*
      let newState = [];
      for (let idx=0;idx<sortMap.length;idx++){
        newState[idx] = state[sortMap[idx]];
      }
      return newState;*/
		case types.DELETE_PROJECT:
			let filtProjects = state.filter(
					(project) => project.projectID !== action.projectID
			);
			return filtProjects;    

		case types.ATTACH_TO_PROJECT:
			debugger;
			const projectID = action.projectID;
			const noteID = action.noteID;

			return state.map((project) => {
				const index = project.notes.indexOf(noteID);

				if(index >= 0) {
					return Object.assign({}, project, {
						notes: project.notes.length > 1 ? project.notes.slice(0, index).concat(
								project.notes.slice(index + 1)
						): []
					});
				}
				if(project.projectID === projectID) {
					return Object.assign({}, project, {
						notes: [...project.notes, noteID]
					});
				}

				return project;
			});

		case types.DETACH_FROM_PROJECT:
			return state.map((project) => {
				if(project.projectID === action.projectID) {
					return Object.assign({}, project, {
						notes: project.notes.filter((id) => id !== action.noteID)
					});
				}

				return project;
			});

		case types.MOVE:
			const sourceID = action.sourceID;
			const targetID = action.targetID;

			const projects = state;
			const sourceLane = projects.filter((project) => {
				return project.notes.indexOf(sourceID) >= 0;
			})[0];
			const targetLane = projects.filter((project) => {
				return project.notes.indexOf(targetID) >= 0;
			})[0];
			const sourceNoteIndex = sourceLane.notes.indexOf(sourceID);
			const targetNoteIndex = targetLane.notes.indexOf(targetID);

			if(sourceLane === targetLane) {
				return state.map((project) => {
					return project.projectID === sourceLane.id ? Object.assign({}, project, {
						notes: update(sourceLane.notes, {
							$splice: [
							          [sourceNoteIndex, 1],
							          [targetNoteIndex, 0, sourceID]
							          ]
						})
					}) : project;
				});
			}
			else {
				return state.map((project) => {
					if(project === sourceLane) {
						// get rid of the source note
						return Object.assign({}, project, {
							notes: project.notes.length > 1 ? project.notes.slice(0, sourceNoteIndex).concat(
									project.notes.slice(sourceNoteIndex + 1)
							): []
						});
					}

					if(project === targetLane) {
						// and move it to target
						return Object.assign({}, project, {
							notes: project.notes.slice(0, targetNoteIndex).concat(
									[sourceID]
							).concat(
									project.notes.slice(targetNoteIndex)
							)
						});
					}

					return project;
				});
			}

			return state;

		default:
			return state;
	}
}
