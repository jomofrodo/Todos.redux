import React, { Component } from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import logo from '../../img/logo.svg';
import '../../css/App.css';
import '../../css/kanban.css';
import ProjectBoard from './ProjectBoard';
import KanBanBoard from './KanBanBoard';
import {resetApp} from '../../actions/app.js';

import $ from 'jquery';
import '../../css/reset.css';

import 'jquery-ui/themes/base/sortable.css';
import 'jquery-ui/themes/base/tabs.css';
import 'jquery-ui/ui/widgets/sortable';
import 'jquery-ui/ui/widgets/tabs';


class App extends Component {

	componentDidMount() {
		$('#div-tabs').tabs({
				active:0,
				collapsible: true});			//load jquery-ui tabs
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
					<ul className="ui tabular menu">
						<li><a href="#tab-projects">Project Board</a></li>
						<li><a href="#tab-kanban">Kanban View</a></li>
					</ul>

					<div className="ui tab" id="tab-projects">
						<ProjectBoard />
					</div>
					<div className="ui tab" id="tab-kanban">
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
			 resetApp
		  })
		)(App);
