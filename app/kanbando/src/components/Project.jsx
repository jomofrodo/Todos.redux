import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {DropTarget} from 'react-dnd';
import Notes from './Notes.jsx';
import Editable from './Editable.jsx';
import ItemTypes from '../constants/ItemTypes';
import * as projectActions from '../actions/projects';
import * as noteActions from '../actions/notes';

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

class Project extends React.Component {
  render() {
    const { project,  ...props} = this.props;
    const projectID = project.id;

    return (
      <div className="project">
        <div className="project-header"
          onClick={() => props.updateProject({id: projectID, editing: true})}>
           <Editable className="project-name" editing={project.editing}
            value={project.name}
            onEdit={name => props.updateProject({id: projectID, name, editing: false})} />
          <div className="project-delete">
            <button onClick={this.deleteProject.bind(this, project)}>x</button>
          </div>
        </div>
      </div>
    );
  }
  deleteProject(project, e) {
    e.stopPropagation();

    const projectID = project.id;
    debugger;

    // Clean up notes
    project.notes.forEach(noteID => {
      this.props.detachFromProject(projectID, noteID);
      this.props.deleteNote(noteID);
    });

    this.props.deleteProject(projectID);
  }
}

export default compose(
		  connect(state => ({
		    state: state
		  }),{
			 ...projectActions
		  })
		)(Project);
