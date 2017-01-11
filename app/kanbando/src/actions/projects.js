import uuid from 'node-uuid';
import API from '../libs/API';

export const CREATE_PROJECT = 'CREATE_PROJECT';
export function createProject(project) {
  return {
    type: CREATE_PROJECT,
    project: {
      projectID: uuid.v4(),
      notes: project.notes || [],
      todos: project.todos || [],
      ...project
    }
  };
};

export const UPDATE_PROJECT = 'UPDATE_PROJECT';
export function updateProject(updatedProject) {
  //debugger;
  return {
    type: UPDATE_PROJECT,
    ...updatedProject
  };
};

export const DELETE_PROJECT = 'DELETE_PROJECT';
export function deleteProject(projectID) {
  return {
    type: DELETE_PROJECT,
    projectID: projectID
  };
};

export const ATTACH_TO_PROJECT = 'ATTACH_TO_PROJECT';
export function attachToProject(projectID, noteID) {
  return {
    type: ATTACH_TO_PROJECT,
    projectID,
    noteID
  };
};

export const DETACH_FROM_PROJECT = 'DETACH_FROM_PROJECT';
export function detachFromProject(projectID, noteID) {
  return {
    type: DETACH_FROM_PROJECT,
    projectID,
    noteID
  };
};

export const MOVE_PROJECT_TODO = 'MOVE_PROJECT_TODO';
export function moveProjectTodo({sourceID, targetID}) {
  return {
    type: MOVE_PROJECT_TODO,
    sourceID,
    targetID
  };
};

export const SET_CURRENT_PROJECT = 'SET_CURRENT_PROJECT';
export function setCurrentProject(projectID) {
  return {
    type: SET_CURRENT_PROJECT,
    projectID
  };
};

export function updateProjectSortOptimistic(sortMap){
  return{
type: UPDATE_PROJECT_SORT,
        sortMap: sortMap
  }
}

export const UPDATE_PROJECT_SORT = 'UPDATE_PROJECT_SORT';
export function updateProjectSort(sortMap) {
  return function(dispatch) {
      debugger;
      dispatch(updateProjectSortOptimistic(sortMap))
      /*.then(API.updateProjectSort(sortMap)
        .catch(e =>{
          dispatch(updateFailed(e));
      }).then(
        sortMap => dispatch(updateGolden(sortMap)),
        error => dispatch(updateFailed(error))
        ))
        */
  }
}

function updateGolden(response) {
  console.log("Update Success:  " + response);
}

function updateFailed(error) {
  debugger;
  console.log("Update Failed: " + error);
}




