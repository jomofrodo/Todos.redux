import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
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

    if (!targetProps.project.notes.length) {
      targetProps.attachToProject(
        targetProps.project.id,
        sourceID
      );
    }
  }
};

class Project extends Ent {
  state = {editing:false}

  handleProjectClick(projectID) {
    const {project, setCurrentProject, currentProjectID} = this.props;
    if (project.id != currentProjectID) {
      setCurrentProject(project.id);
    } else {
      setCurrentProject(0);
    }
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

  render() {
     const { format, ...props} = this.props;
     switch (format) {
      case "full":
        return this.renderFullProject();
        break;
      default:
        return this.renderProjectCard();
    }
  }

  renderFullProject() {
    const { project, updateProject, deleteProject, setCurrentProject, format, ...props} = this.props;
    const projectID = project.id;
    return (
      <div className="project full-project"  >
        <div className="project-header">
          <Editable className="project-name" editing={project.editing}
            onValueClick={()=>{console.log("editing!"); updateProject({ id: projectID, editing: true });}}
            value={project.name}
            onEdit={name => updateProject({ id: projectID, name, editing: false })} />
          <br />
          <div>id: {projectID}</div>
          <div className="project-delete">
            <button onClick={() => deleteProject(projectID)}>x</button>
          </div>
        </div>
      </div>
    );
  }

  renderProjectCard() {
    const { project, updateProject, deleteProject, setCurrentProject, format, ...props} = this.props;
    const projectID = project.id;
    return (
      <div className="project" onClick={() => this.handleProjectClick(projectID)}>
        <div className="project-header">
          <Editable className="project-name" editing={project.editing}
            value={project.name}
            onEdit={name => updateProject({ id: projectID, name, editing: false })} />
          <br />
          <div>id: {projectID}</div>
          <div className="project-delete">
            <button onClick={() => deleteProject(projectID)}>x</button>
          </div>
        </div>
      </div>
    );
  }


}

class ProjectEditorPopUp extends PopupBasic {
  setContent() {
    let {project, updateProject, deleteProject} = this.props;
    let content = (
      <div className="project-edit">
        Project name: <Editable className="project-name" editing={project.editing}
          value={project.name}
          onEdit={name => project.name = name}
          />
        <div className="project-update">
          <button onClick={(project) => updateProject({ id: project.projectID, name: project.name, editing: false })}>update</button>
        </div>
        <div className="project-deletex">
          <button onClick={() => deleteProject(project.projectID)}>x</button>
        </div>
      </div>);
    return content;
  }

}

// Redux wiring
const stateMap = (state) => ({
  projects: state.projects,
  currentProjectID: state.currentProjectID
});
const actionMap = { ...projectActions };
Project = connect(stateMap, actionMap)(Project);  //Wire it up as a Redux container
// End of Redux wiring

//Export: include reducer in export for inclusion in rootReducer
export { Project as default }
