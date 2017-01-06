import React, { Component } from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import logo from '../../img/logo.svg';

import ProjectBoard from './ProjectBoard';
import KanBanBoard from './KanBanBoard';
import {resetApp} from '../../actions/app.js';
import * as projectActions from '../../actions/projects.js';



import $ from 'jquery';
window.jQuery = $;

require('semantic-ui/dist/components/tab');   //user require instead of import because of order of processing issues
											  //import statements always moved to the top. Take place in front of 'jQuery' var assign
require('semantic-ui/dist/semantic.min.css');
require('semantic-ui/dist/components/tab.css');
//require('../../css/reset.css');

require('../../css/App.css');
require('../../css/kanban.css');



import 'jquery-ui/themes/base/sortable.css';
import 'jquery-ui/ui/widgets/sortable';


class App extends Component {

	componentDidMount() {
		$('.tabular.menu .item').tab();
		/*({
				active:0,
				collapsible: true});			//load jquery-ui tabs
		*/
		$(".sortable").sortable({		// jquery-ui sortable
		});
	}
	componentWillUnmount() {
		if ($(".sortable").length) $(".sortable").sortable("destroy");
	}

	render() {
		const {resetApp} = this.props;
		return (
			<div className="App">
				<div className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h2>Welcome to KanBanDo</h2>
					<div>
			        <button className="reset-app"
			          onClick={resetApp.bind(null) }>reset</button>
			      </div>
	
				</div>
				<div id="div-tabs">
					<div className="ui tabular menu">
						<div className="item" data-tab="tab-projects">Project Board
						    
						</div>
						<div className="item" data-tab="tab-kanban">Kanban View</div>
					</div>

					<div className="ui tab" data-tab="tab-projects" id="tab-projects">
						<ProjectBoard />
					</div>
					<div className="ui tab" data-tab="tab-kanban" id="tab-kanban">
						<KanBanBoard />
					</div>
				</div>
			</div>
		);
	}
}


export default compose(
		  connect(state => ({
		    state: state
		  }),{
			 resetApp, 
			 ...projectActions
		  })
		)(App);
