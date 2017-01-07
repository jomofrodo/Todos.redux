import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Ent from '../ent/Ent';
import Projects from '../ent/Projects.jsx';
import Project from '../ent/Project.jsx';
import { createProject } from '../../actions/projects';
import { Sidebar, Segment, Menu, Icon } from 'semantic-ui-react';

class ProjectBoard extends Ent {
  state = { sidebarVisible: false }
  toggleSidebar(){
    this.setState({ sidebarVisible: !this.state.sidebarVisible });
  } 

  handleCreateProject() {
    const {createProject} = this.props;
    createProject({ prjName: 'New project' });
  }

  render() {

    const {projects, currentProjectID, createProject} = this.props;
    //const { sidebarVisible } = this.state;
    const sidebarVisible = currentProjectID?true:false;
    let currentProject = null;
    if (currentProjectID) {
      let tempPrj = null, idx = 0;
      while (idx < projects.length) {
        tempPrj = projects[idx];
        if (tempPrj.projectID == currentProjectID) {
          currentProject = tempPrj;
          break;
        }
        idx++;
      }

    }
    return (
      <div>
        <Menu>
          <Menu.Item name='home' onClick={this.toggleSidebar}>
            <Icon name='home' />
            Sidebar
            </Menu.Item>
          <Menu.Item name="add" onClick={() => this.handleCreateProject() }>
            <Icon name='add' />
            Add new project
            </Menu.Item>
          <Menu.Item name='camera'>
            <Icon name='camera' />
            Channels
            </Menu.Item>
        </Menu>
        <Sidebar.Pushable as={Segment}>
          <Sidebar as={Segment} animation='scale down' direction='right' width='wide' visible={sidebarVisible} icon="labeled" vertical>
            {currentProject &&
              <Project project={currentProject} format="full" />
            }
          </Sidebar>
          <Sidebar.Pusher>
            <Segment basic>
              <div>

                <Projects projects={projects} />
              </div>
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  }
}


// Redux wiring
const stateMap = (state) => ({
  projects: state.projects,
  currentProjectID: state.currentProjectID
});
const actionMap = { createProject };
ProjectBoard = connect(stateMap, actionMap)(ProjectBoard);  //Wire it up as a Redux container
// End of Redux wiring

//Export: include reducer in export for inclusion in rootReducer
export { ProjectBoard as default }
