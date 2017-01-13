import React from 'react';
import { connect } from 'react-redux';
import Ent from './Ent';
import Editable1 from './Editable.1.jsx';
import { PopupBasic as ModalB } from '../ui/PopupBasic';
import * as projectActions from '../../actions/projects';
import { Popup, Icon, Confirm } from 'semantic-ui-react';
import Modal from 'react-modal';



class Project extends Ent {

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
    debugger;
    if (project.projectID !== currentProjectID) {
      setCurrentProject(project.projectID);
    } else {
      setCurrentProject(0);
    }
  }

  handleDelete(e) {
    e.stopPropagation();
    //debugger;
    // Clean up notes
    debugger;
    this.notes.forEach(noteID => {
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
    return (
      <div>nadad</div>
      //override methodName(params) {

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



//Export: include reducer in export for inclusion in rootReducer
export { Project as default }
