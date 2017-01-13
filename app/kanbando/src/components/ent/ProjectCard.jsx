import React from 'react';
import { connect } from 'react-redux';
import Ent from './Ent';
import Editable1 from './Editable.1.jsx';
import { PopupBasic as ModalB } from '../ui/PopupBasic';
import * as projectActions from '../../actions/projects';
import { Popup, Icon, Confirm } from 'semantic-ui-react';
import Project from './Project';
import Modal from 'react-modal';
import ModalEx from '../ui/ModalEx';
import ModalBasic from '../ui/ModalBasic';
import ReactModal from '../ui/ReactModal';



class ProjectCard extends Project {



  constructor(props) {
    super(props);
   
    this.state = {
      editing: false,
      modalIsOpen: false
    };
  }


  openDModal() {
    this.setState({ modalIsOpen: true });
  }
  handleDelete(e){
    super.handleDelete(e);
    
  }


  closeDModal() { this.setState({ modalIsOpen: false }) }

  renderEditor() {
    return (
      <div>Editor goes here</div>
    )
  }

  render() {
    const {project, deleteProject, idx} = this.props;
    const projectID = project.projectID;
    let className = (this.className ? this.className : "") + " project";
    let editTrigger = <Icon name="edit" />;
    let editor = this.renderEditor();
    const flgOpen  = this.state.modalIsOpen;


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
          <div className="project-edit">
            <Popup hoverable basic trigger={editTrigger} on="click">
              <Popup.Header>Project Info</Popup.Header>
              <Popup.Content>
                {editor}
              </Popup.Content>
            </Popup>
          </div>
          <div className="project-delete">
            <Icon className="delete" onClick={this.openDModal} />
           <ModalBasic flgOpen={flgOpen}>
           Delete this project?
           <Icon className="checkmark" onClick={this.handleDelete}/>
           <Icon className="bug" onClick={this.closeDModal}/>
           
           </ModalBasic>
          </div>
        </div>
      </div>
    );
  }

}

let updateProject = null;  //Override with action handler from props





// Redux wiring
const stateMap = (state) => ({
  projects: state.projects,
  currentProjectID: state.currentProjectID
});
const actionMap = { ...projectActions };
ProjectCard = connect(stateMap, actionMap)(ProjectCard);  //Wire it up as a Redux container
// End of Redux wiring

//Export: include reducer in export for inclusion in rootReducer
export { ProjectCard as default }
