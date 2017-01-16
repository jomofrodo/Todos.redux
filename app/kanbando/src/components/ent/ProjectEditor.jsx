import React from 'react';
import { connect } from 'react-redux';
import Ent from './Ent';
import Editable1 from './Editable.1.jsx';
import {PopupBasic as ModalB} from '../ui/PopupBasic';
import * as projectActions from '../../actions/projects';
import {Popup, Icon, Confirm} from 'semantic-ui-react';
import Modal from 'react-modal';
import Project from './Project';



class ProjectEditor extends Project {
  state = { editing: false };
  flgEditing;
 
 
  constructor(props) {
    super(props);
    const {project} = this.props;
    //let propMap = this.getPropMap();
    this.updateProject = this.props.updateProject;
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
    const { project, updateProject, deleteProject} = this.props;

    //this.resetObject();
    //this.assignProperties(project);

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
            <Icon className="delete" onClick={this.handleDelete}/>
          </div>
        </div>
      </div>
    );
  }
}

let updateProject = null;  //Override with action handler from props


  ProjectEditor.propTypes = {
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
ProjectEditor = connect(stateMap, actionMap)(ProjectEditor);  //Wire it up as a Redux container
// End of Redux wiring

//Export: include reducer in export for inclusion in rootReducer
export { ProjectEditor as default }
