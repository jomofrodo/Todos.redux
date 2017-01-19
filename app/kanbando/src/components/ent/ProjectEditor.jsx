import React from 'react';
import { connect } from 'react-redux';
import Ent from './Ent';
import Editable1 from './Editable.1.jsx';
import * as projectActions from '../../actions/projects';
import { createTodo, updateTodoSort } from '../../actions/todos';
import TetherConfirm from '../ui/TetherConfirm';
import { Popup, Icon, Menu, List, Grid, Image, Radio, Input } from 'semantic-ui-react';
import Modal from 'react-modal';
import Project from './Project';
import TodoCard from './TodoCard';
import Todo from './Todo';
import Todos from './Todos';
import $ from 'jquery';
import '../../css/kanban.css';



class ProjectEditor extends Project {
  state = { editing: false };
  flgEditing;


  constructor(props) {
    super(props);
    const {project} = this.props;
    //let propMap = this.getPropMap();
    this.updateProject = this.props.updateProject;
    this.createTodo = this.props.createTodo;
    const projectID = this.projectID;

  }

      componentDidMount() {
        //const {updateProjectSort} = this.props;
        const cb = this.updateTodoSort;
        $(".sortable-todos").sortable({		// jquery-ui sortable
            update: function(evt, ui) {
                const elms = ui.item.parent().find(".todo-card");
                let currentSort = "";
                currentSort = elms.map(function(el, idx) {
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

  createTodoHdlr(projectID) {
    //const { createTodo } = this.props;
    const todo = this.createTodo(projectID, 'New task');
  }

  selectDiv(div) {
    debugger;
    div.focus();
  }

  handleUpdate(evt) {
    const fldVal = evt.target.value;
    const fldName = evt.target.name;
    let params = {};
    params.projectID = this.projectID;
    params[fldName] = fldVal;
    //this.props.updateProject(params);
    this.updateProject(params);
  }

  checkEnter = (e) => {
    if (e.key === 'Enter') {
      this.handleUpdate(e);
    }
  };

  handleSave(evt) {
    //Do anything to trigger an API call here, 
    //then close the window.
    this.handleProjectClick(this.projectID);
  }

  updateTodoSort(sortKeys){
    const { updateTodoSort } = this.props;
    updateTodoSort(sortKeys);
  }


  render() {
    const { project, todos, updateProject, deleteProject} = this.props;
    //console.debug("props: " + this.props);
    //this.resetObject();
    //this.assignProperties(project);

    let prjTodosIdx = project.todos || new Array();
    let prjTodos = prjTodosIdx.map(function (id, idx) {
      return todos.find(function (todo, idx) {
        return (todo.todoID == id)
      });
    });


    return (
      <div className="project project-editor" key={project.projectID} >
        <div className="project-header">
          <div className="ui labeled input">
            <div className="ui label">
              name:
        </div>
            <Editable1 id="prjName" name="prjName"
              className="project-name" flgEditing={project.flgEditing}
              onValueClick={() => updateProject({ projectID: project.projectID, flgEditing: true })}
              value={project.prjName}
              onEdit={prjName => updateProject({ projectID: project.projectID, prjName, flgEditing: false })} />
          </div>
          <div className="ui labeled input">
            <div className="ui label">id: </div>
            <div className="ui input value">{project.projectID}</div>
          </div>
          <div className="ui labeled input">
            <div className="ui label">color: </div>
            <input type="color" name="prjColor" id="prjColor" value={project.prjColor}
              onChange={this.handleUpdate}
              />
            <span style={{ width: 100, background: project.prjColor }}></span>
          </div>
          <div className="ui labeled input">
            <div className="ui label">icon: </div>
            <input type="text" name="prjIcon" id="prjIcon" value={project.prjIcon}
              style={{ width: 120 }}
              onChange={this.handleUpdate}
              onKeyPress={this.checkEnter}
              onBlur={this.handleUpdate}
              />
            <span style={{ width: 80 }}><i className={project.prjIcon + " icon"}></i></span>
          </div>
          <div className="project-save">
            <Icon className="save" onClick={this.handleSave.bind(this)} />
          </div>
          <div className="project-delete">
            <TetherConfirm onConfirm={this.handleDelete} iconName="delete" >
                Delete this project?
            </TetherConfirm>
          </div>
        </div>
        <div className="project-Todos">
          <Menu secondary id="todosMenu" >
            <Menu.Item name='tasks' onClick={this.toggleSidebar}>
              <Icon name='tasks' />
              Todos
        </Menu.Item>
            <Menu.Item name="add" onClick={() => this.createTodoHdlr(project.projectID)}>
              <Icon name='add' />
              Add new todo
        </Menu.Item>
          </Menu>
          <Grid padded id="todosGrid" >
            <Grid.Row><Grid.Column>
              <div className="todos sortable-todos">
                {prjTodos.map((todo, idx) =>
                  <TodoCard className="todo" projectID={project.projectID} key={idx} idx={idx} todo={todo} />
                )}
              </div></Grid.Column></Grid.Row>
          </Grid>


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
  notes: state.notes,
  todos: state.todos,
  currentProjectID: state.currentProjectID
});
const actionMap = { ...projectActions, createTodo,  updateTodoSort };
ProjectEditor = connect(stateMap, actionMap)(ProjectEditor);  //Wire it up as a Redux container
// End of Redux wiring

//Export: include reducer in export for inclusion in rootReducer
export { ProjectEditor as default }
