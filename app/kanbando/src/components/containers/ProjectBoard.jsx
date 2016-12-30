import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Projects from '../Projects.jsx';
import {createProject} from '../../actions/projects';

class ProjectBoard extends React.Component {
  render() {
    const {projects, createProject} = this.props;

    return (
      <div>
        <button className="add-project"
          onClick={createProject.bind(null, {
            name: 'New project'
          })}>+</button>
        <Projects projects={projects} />
      </div>
    );
  }
}


// Redux wiring
const stateMap = (state) => ({ projects: state.projects });
const actionMap = { createProject };
ProjectBoard = connect(stateMap, actionMap)(ProjectBoard);  //Wire it up as a Redux container
// End of Redux wiring

//Export: include reducer in export for inclusion in rootReducer
export { ProjectBoard as default }
