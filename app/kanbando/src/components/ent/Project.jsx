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
import { Input } from 'semantic-ui-react';


const noteTarget = {
  hover(targetProps, monitor) {
    const sourceProps = monitor.getItem();
    const sourceID = sourceProps.id;

    if (!targetProps.project.notes.length) {
      targetProps.attachToProject(
        targetProps.project.projectID,
        sourceID
      );
    }
  }
};

class Project extends Ent {
  state = { editing: false };
  projectID;
  prjName;
  prjDesc;
  prjCode;
  prjColor;
  prjClient;
  notes;
  todos;

  constructor(props) {
    super(props);
    const {project, ...otherProps} = this.props;
    this.dbTable = 'kbd.Project';
    this.entName = 'Project';
    this.initNit();

    this.assignProperties(project);
    let propMap = this.getPropMap();
  }



  handleProjectClick(projectID) {
    const {project, setCurrentProject, currentProjectID} = this.props;
    if (project.projectID != currentProjectID) {
      setCurrentProject(project.projectID);
    } else {
      setCurrentProject(0);
    }
  }

  deleteProject(project, e) {
    e.stopPropagation();
    debugger;
    const projectID = project.projectID;
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


  handleInputChange = (e) => {
    //debugger;
    const el = e.target
    const { project, updateProject, ...props} = this.props;
    let val = el.value;
    let elName = el.name;
    let projectID = project.projectID;
    updateProject({ projectID, prjName: val, editing: true })
  }


  checkEnter = (e) => {
    if (e.key === 'Enter') {
      this.handleInputChange(e);
    }
    return(e.key);
  };


  renderFullProject = () => {
    const { project, updateProject, deleteProject, ...props} = this.props;
    const projectID = project.projectID;
    const flgEditing = project.editing;

    /*
          <div className="ui labeled input">
            <div className="ui label">
              name:
            </div>
           

            <Input placeholder="my project" type="text" name="prjName" id="prjName" defaultValue={project.prjName}
              value={project.prjName}
              onKeyPress={this.checkEnter}
              onBlur={this.handleInputChange}
              //onChange={()=>this.handleInputChange} 
              />
          </div>
         */

    return (
      <div className="project full-project"  >
        <div className="project-header">
           <div>
              <label for="prjName">name:</label>  <Editable id="prjName" name="prjName" 
              className="project-name" editing={flgEditing}
            onValueClick={() => updateProject({projectID, editing: true})}
            value={project.prjName}
            onEdit={prjName => updateProject({projectID, prjName, editing: false})} />
          </div>
          <div>id: {projectID}</div>
          <div className="project-delete">
            <button onClick={() => {
              debugger;
            deleteProject(projectID)}
            }>x</button>
          </div>
        </div>
      </div>
    );
  }

  renderProjectCard() {
    const {project, updateProject, deleteProject, setCurrentProject, format, ...props} = this.props;
    const projectID = project.projectID;
    return (
      <div className="project" >
        <div className="project-header">
          <div onClick={() => this.handleProjectClick(projectID)}>
            <div className="project-name" >
              {project.prjName}
             </div>
            <br />
            <div>id: {projectID}</div>
          </div>
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
          value={project.prjName}
          onEdit={name => project.prjName = name}
          />
        <div className="project-update">
          <button onClick={(project) => updateProject({ id: project.projectID, name: project.prjName, editing: false })}>update</button>
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
