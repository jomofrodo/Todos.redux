#Todos.redux

This is a front-end back-end POC of Todos working with a React/Redux front end.  Todos is a back-end modeling framework.  The front end is reworking of the standard todoMVC example from github.com/reacts/redux.  Redux acts as the client-side MC (Model and Controller) and React acts as the V (View).  Todos on the back-end acts as a parallel Model (and a Controller?), so the resulting system could be called M-MVC, or possibly MC-MVC? 

What is MVC anyway?
http://forthescience.org/books/modelviewcontroller/index.html

# Front End -- TodosMVC in Redux/React

A reworking of the standard todoMVC example from github.com/reactjs/redux.


This example is slightly re-factored

	o	Connect to local storage
	o	Connect Async to back end (for pgSQL storage)
	o	Add "Lanes" for kanban simul
	o	Add todo ordering
	

Async actions through middleware:
http://danmaz74.me/2015/08/19/from-flux-to-redux-async-actions-the-easy-way/
https://github.com/reactjs/redux/issues/291


Basic Tutorials:
http://www.jchapron.com/2015/08/14/getting-started-with-redux/
survivejs kanban app in alt/React and React/Redux

Read up on the webpack dev server:
https://webpack.github.io/docs/webpack-dev-server.html

Compiles your webpack.config.js into memory and serves from there
Supports hot reload



### To Install
	# npm -i       -- install everything referenced in package.json
	# npm start    -- runs 'node server.js'


### Todos
Wouldn't it be great if you could keep track of all your notes? All your posts, tweets, blog entries.  All of your todo lists.  Wouldn't it be great if you could organize them into collections by hashtag, keyword, whatever? Wouldn't it be great if you could search through everything all at once?

It would.



