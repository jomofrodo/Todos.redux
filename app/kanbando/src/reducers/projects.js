import update from 'immutability-helper';
import * as types from '../actions/projects';

const initialState = [];

export default function projects(state = initialState, action) {
  switch (action.type) {
    case types.CREATE_PROJECT:
      return [...state, action.project];

    case types.UPDATE_PROJECT:
      return state.map((project) => {
        //debugger;
        if(project.projectID === action.projectID) {
          const {type, ...updatedProject} = action;
          return Object.assign({}, project, updatedProject);
        }

        return project;
      });

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
