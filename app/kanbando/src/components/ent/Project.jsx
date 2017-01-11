import React from 'react';
import { connect } from 'react-redux';
import Ent from './Ent';
import Editable1 from './Editable.1.jsx';
import PopupBasic from '../ui/PopupBasic';
import * as projectActions from '../../actions/projects';




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
  flgEditing;
  projectObjectID;

  className;
  style;


  constructor(props) {
    super(props);
    const {project} = this.props;

    this.dbTable = 'kbd.Project';
    this.entName = 'Project';
    this.initNit();

    this.assignProperties(project);
    //let propMap = this.getPropMap();
    this.updateProject = this.props.updateProject;
  }


  handleProjectClick(projectID) {
    const {project, setCurrentProject, currentProjectID} = this.props;
    if (project.projectID !== currentProjectID) {
      setCurrentProject(project.projectID);
    } else {
      setCurrentProject(0);
    }
  }

  handleDelete(project, e) {
    e.stopPropagation();
    //debugger;
    const projectID = project.projectID;
    // Clean up notes
    project.notes.forEach(noteID => {
      this.props.detachFromProject(projectID, noteID);
      this.props.deleteNote(noteID);
    });

    debugger;
    this.props.deleteProject(projectID);
  }


  handleUpdate(evt) {
    // debugger;
    const fldVal = evt.target.value;
    const fldName = evt.target.name;
    let params = {};
    params.projectID = this.projectID;
    params[fldName] = fldVal;
    //this.props.updateProject(params);
    this.updateProject(params);
  }

  render() {
    const { format } = this.props;
    switch (format) {
      case "full":
        return this.renderEditor();
      default:
        return this.renderProjectCard();
    }
  }


  renderEditor = () => {
    const { project, updateProject, deleteProject} = this.props;

    this.resetObject();
    this.assignProperties(project);

    return (
      <div className="project project-editor"  >
        <div className="project-header">
          <div className="ui labeled input">
            <div className="ui label">
              name:
            </div>
            <Editable1 id="prjName" name="prjName"
              className="project-name" flgEditing={this.flgEditing}
              onValueClick={() => updateProject({ projectID: this.projectID, flgEditing: true })}
              value={this.prjName}
              onEdit={prjName => updateProject({ projectID: this.projectID, prjName, flgEditing: false })} />
          </div>
          <div className="ui labeled input">
            <div className="ui label">id: </div>
            <div className="ui input value">{this.projectID}</div>
          </div>
          <div className="ui labeled input">
            <div className="ui label">color: </div>
            <input type="color" name="prjColor" id="prjColor" value={this.prjColor}
              onChange={this.handleUpdate}
              />
            <span style={{ width: 100, background: this.prjColor }}></span>
          </div>
          <div className="ui labeled input">
            <div className="ui label">icon: </div>
            <input type="text" name="prjIcon" id="prjIcon" value={this.prjIcon}
              style={{ width: 100 }}
              onChange={this.handleUpdate}
              />
            <span style={{ width: 100 }}><i className={this.prjIcon + " icon"}></i></span>
          </div>
          <div className="project-delete">
            <button onClick={() => {
              //debugger;
              deleteProject(this.projectID)
            }
            }>x</button>
          </div>
        </div>
      </div>
    );
  }

  renderProjectCard() {
    const {project, deleteProject, idx} = this.props;
    const projectID = project.projectID;
    let className = (this.className ? this.className : "") + " project";
    return (
      <div className={className} data-idx={idx}>
        <div className="project-header" style={{ background: project.prjColor }}>
          <div onClick={() => this.handleProjectClick(projectID)}>
            <div className="project-name" >
              {project.prjName}
              &nbsp; <i className={"icon " + project.prjIcon}></i>
            </div>
            <br />
            <div className="limit-text-100">id: {projectID}</div>
          </div>
          <div className="project-delete">
            <button onClick={() => deleteProject(projectID)}>x</button>
          </div>
        </div>
      </div>
    );
  }


}

let updateProject = null;  //Override with action handler from props

class ProjectEditorPopUp extends PopupBasic {
  setContent() {
    let {project, updateProject, deleteProject} = this.props;
    let content = (
      <div className="project-edit">
        Project name: <Editable1 className="project-name" editing={project.editing}
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


  Project.propTypes = {
    project: React.PropTypes.shape({
      projectID: React.PropTypes.string.isRequired,
      prjName: React.PropTypes.string.isRequired,
      prjDesc: React.PropTypes.string,
      prjColor: React.PropTypes.string,
      prjCode: React.PropTypes.string,
      prjClient: React.PropTypes.string,
      prjIcon: React.PropTypes.string,
      prjLogo: React.PropTypes.string,
      notes: React.PropTypes.array,
      todos: React.PropTypes.array
    })
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
