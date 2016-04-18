### Todos
Wouldn't it be great if you could keep track of all your notes? All your posts, tweets, blog entries.  All of your todo lists.  Wouldn't it be great if you could organize them into collections by hashtag, keyword, whatever? Wouldn't it be great if you could search through everything all at once?

It would.

#Todos.redux

This is a front-end back-end POC of Todos working with a React/Redux front end.  Todos is a back-end modeling framework.  The front end is reworking of the standard todoMVC example from github.com/reacts/redux.  Redux acts as the client-side MC (Model and Controller) and React acts as the V (View).  Todos on the back-end acts as a parallel Model (and a Controller?), so the resulting system could be called M-MVC, or possibly MC-MVC? 

What is MVC anyway?
http://forthescience.org/books/modelviewcontroller/index.html

# Front End -- TodosMVC in Redux/React

A reworking of the standard todoMVC example from github.com/reactjs/redux.

See the README in /redux-app  -- [client README](./redux-app/README.md)

Read up on the webpack dev server:
https://webpack.github.io/docs/webpack-dev-server.html


## Back - End -- basic Todos crud in Java
A basic Todos implementation in Java, operating in REST fashion (I guess).

See the Java [README](./java/README.md)

json structures in Postgres: http://www.postgresql.org/docs/current/static/datatype-json.html

The app runs in a servlet container, e.g., Tomcat, and uses a Postgres store.

Store looks like this:










