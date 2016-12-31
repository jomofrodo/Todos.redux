import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import Ent from './Ent';
import Notes from './Notes.jsx';
import Editable from './Editable.jsx';
import ItemTypes from '../../constants/ItemTypes';
import PopupBasic from '../ui/PopupBasic';
import * as projectActions from '../../actions/projects';
import * as noteActions from '../../actions/notes';

const noteTarget = {
  hover(targetProps, monitor) {
    const sourceProps = monitor.getItem();
    const sourceID = sourceProps.id;

    if(!targetProps.project.notes.length) {
      targetProps.attachToProject(
        targetProps.project.id,
        sourceID
      );
    }
  }
};

class Project extends Ent {
  handleProjectClick(projectID){
    const {project,setCurrentProject,currentProjectID} = this.props;
    if(project.id != currentProjectID){
      setCurrentProject(project.id);
    }else{
      setCurrentProject(0);
    }
  }
  render() {
    const { project,  updateProject, deleteProject, setCurrentProject,  ...props} = this.props;
    const projectID = project.id;
    //debugger;

    return (
      <div className="project" onClick={()=> this.handleProjectClick(projectID)}>
        <div className="project-header">
           <Editable className="project-name" editing={project.editing}
            value={project.name}
            onEdit={name => updateProject({id: projectID, name, editing: false})} />
            <br/>
          <div>id: {projectID}</div>
          <div className="project-delete">
            <button onClick={() => deleteProject(projectID)}>x</button>
          </div>
        </div>
      </div>
    );
  }
  deleteProject(project, e) {
    e.stopPropagation();
    const projectID = project.id;
    // Clean up notes
    project.notes.forEach(noteID => {
      this.props.detachFromProject(projectID, noteID);
      this.props.deleteNote(noteID);
    });

    this.props.deleteProject(projectID);
  }
  


}

  class ProjectEditorPopUp extends PopupBasic {
    setContent(){
      let {project, updateProject, deleteProject} = this.props;
      let content = (
          <div className="project-edit">
            Project name: <Editable className="project-name" editing={project.editing}
                value={project.name}
                onEdit={name => project.name = name}
              />
              <div className="project-update">
                <button onClick={(project) => updateProject({id: project.projectID, name: project.name, editing: false})}>update</button> 
              </div>
              <div className="project-deletex">
                <button onClick={() => deleteProject(project.projectID)}>x</button>
              </div>
            </div>);
      return content;
    }
      
  }

  const stateMap = (state) => ({ 
      projects: state.projects,
      currentProjectID: state.currentProjectID 
    });

export default compose(
		  connect( stateMap,{
			 ...projectActions
		  })
		)(Project);
