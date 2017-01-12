import React from 'react';
import { connect } from 'react-redux';
import Ent from './Ent';
import Editable1 from './Editable.1.jsx';
import {PopupBasic as ModalB} from '../ui/PopupBasic';
//import ModalBasic from '../ui/ModalBasic';
//import IconButton from '../ui/IconButton';
import * as projectActions from '../../actions/projects';
import {Popup,Icon} from 'semantic-ui-react';
//import {ModalBS as Modal} from '../ui/ModalBS';
//import {ModalPeteris as Modal} from '../ui/PeterisModal';


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


  handleProjectClick(myProjectID) {
    const {currentProjectID, setCurrentProject} = this.props;
    debugger;
    if (myProjectID !== currentProjectID) {
      setCurrentProject(myProjectID);
    } else {
      setCurrentProject(0);
    }
  }

  handleDelete(e) {
    debugger;
    e.stopPropagation();
    if(!confirm("Delete this project")) return;
    const {project} = this.props;

    //debugger;
    // Clean up notes
    project.notes.forEach(noteID => {
      this.props.detachFromProject(this.projectID, noteID);
      this.props.deleteNote(noteID);
    });

    debugger;
    this.props.deleteProject(this.projectID);
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

          <div className="project-delete"><Icon circular name='delete'
               onClick={() => {
                 debugger;
                 this.handleDelete}} />
          </div>
        </div>
      </div>
    );
  }

  renderProjectCard() {
    const {project, deleteProject, idx} = this.props;
    const projectID = project.projectID;
    let className = (this.className ? this.className : "") + " project";
    let Project = this;
    return (
      <div className={className} data-idx={idx}>
        <div className="project-header" style={{ background: project.prjColor }}>
          <div >
            <div onClick={() => Project.handleProjectClick(projectID)} className="project-name" >
              {project.prjName}
              &nbsp; <i className={"icon " + project.prjIcon}></i>
            </div>
            <br />
            <div className="limit-text-100">id: {projectID}</div>
          </div>
          <div className="project-edit"><ModalB content={this.renderEditor()} trigger={<Icon circular name='write'/>}></ModalB></div>
          <div className="project-delete"><Icon circular name='delete'
               onClick={() => {
                 debugger;
                 this.handleDelete}} />
          </div>

        </div>
      </div>
    );
  }



}



let updateProject = null;  //Override with action handler from props




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
