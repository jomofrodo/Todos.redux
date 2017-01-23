import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import Ent from '../ent/Ent';
import Projects from '../ent/Projects.jsx';
import Project from '../ent/Project.jsx';
import ProjectCard from '../ent/ProjectCard';
import ProjectEditor from '../ent/ProjectEditor';
import { createProject, updateProjectSort, setCurrentProject } from '../../actions/projects';
import { Sidebar, Segment, Menu, Icon, Grid } from 'semantic-ui-react';
import API from '../../libs/API';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import $ from 'jquery';
window.jQuery = $;


class ProjectBoard extends Ent {
    state = { sidebarVisible: false }

    toggleSidebar() {
        this.setState({ sidebarVisible: !this.state.sidebarVisible });
    }

    handleCreateProject() {
        const {createProject, setCurrentProject } = this.props;
        debugger;
        const project = createProject({ prjName: 'New project' });
        setCurrentProject(project.projectID);
        //const div = ReactDOM.findDOMNode(project);
        //debugger;
    }

    componentDidMount() {
        //const {updateProjectSort} = this.props;
        const cb = this.updateProjectSort;
        $(".sortable-project").sortable({		// jquery-ui sortable
            update: function (evt, ui) {
                const elms = ui.item.parent().find(".project");
                let currentSort = "";
                currentSort = elms.map(function (el, idx) {
                    return $(this).attr("data-idx");
                });
                //convert React/jQuery monstrosity to POJ
                let obj = [];
                for (let idx = 0; idx < currentSort.length; idx++) {
                    obj[idx] = currentSort[idx];
                }
                currentSort = obj;
                //currentSort = currentSort.trim().split(" ").join(",");
                cb(obj);
            }
        });
    }

    componentWillUnmount() {
        if ($(".sortable-project").length) $(".sortable-project").sortable("destroy");
    }


    updateProjectSort(currentSort) {
        const {updateProjectSort} = this.props;
        updateProjectSort(currentSort);
    }

    render() {

        const {projects, currentProjectID} = this.props;
        debugger;
        //const { sidebarVisible } = this.state;
        //let sidebarVisible = currentProjectID ? true : false;
        let sidebarVisible = false;
        let gridColumns = 2;
        let centerCols = 10;
        let projectCols = 1;

        let currentProject = null;
        if (currentProjectID) {
            let tempPrj = null, idx = 0;
            while (idx < projects.length) {
                tempPrj = projects[idx];
                if (tempPrj.projectID === currentProjectID) {
                    currentProject = tempPrj;
                    break;
                }
                idx++;
            }
            gridColumns = 3;
            centerCols = 8;
            projectCols = 6;
        } else {
            gridColumns = 2;
            centerCols = 12;
            projectCols = 1;
        }
        return (
            <div>
                <Menu>
                    <Menu.Item name='home' onClick={this.toggleSidebar}>
                        <Icon name='home' />
                        Sidebar
                    </Menu.Item>
                    <Menu.Item name="add" onClick={() => this.handleCreateProject()}>
                        <Icon name='add' />
                        Add new project
                    </Menu.Item>
                    <Menu.Item name='camera'>
                        <Icon name='camera' />
                        Channels
                    </Menu.Item>
                </Menu>
                <Sidebar.Pushable as={Segment}>
                    <Sidebar as={Segment} animation='scale down' direction='right' width='very thin' visible={sidebarVisible} icon="labeled" vertical>
                        {currentProject &&
                            <Segment>Foo</Segment>
                        }
                    </Sidebar>
                    <Sidebar.Pusher>

                        <Grid id="grid-projects" columns={this.gridColumns} divided>
                            <Grid.Row stretched >

                                <Grid.Column width={1} key="col1">
                                    <Segment>1</Segment>
                                </Grid.Column>
                                <Grid.Column width={centerCols} key="centerCol">

                                    <Projects projects={projects} />
                                </Grid.Column>

                                <Grid.Column id="colProject" width={projectCols} >

                                    <ReactCSSTransitionGroup
                                        transitionName="project-column"
                                        transitionEnterTimeout={500}
                                        transitionLeaveTimeout={100}>
                                        {currentProject &&
                                            <ProjectEditor project={currentProject} key={currentProjectID} />
                                        }
                                    </ReactCSSTransitionGroup>
                                </Grid.Column>

                            </Grid.Row>
                        </Grid>
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
            </div>
        );
    }
}


// Redux wiring
const stateMap = function (state) {
    const stateMap = 
    {
        projects: state.get('projects'),
        currentProjectID: state.get('currentProjectID')
    };
    return stateMap;
}
const actionMap = { createProject, updateProjectSort, setCurrentProject };
ProjectBoard = connect(stateMap, actionMap)(ProjectBoard);  //Wire it up as a Redux container
// End of Redux wiring

//Export: include reducer in export for inclusion in rootReducer
export { ProjectBoard as default }
