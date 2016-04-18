<link rel="stylesheet" href="github-markdown.css">
<style>
    .markdown-body {
        box-sizing: border-box;
        min-width: 200px;
        max-width: 980px;
        margin: 0 auto;
        padding: 45px;
    }
</style>
<body class="markdown-body">

##Todos.redux

Wouldn't it be great if you could keep track of all your notes? All your posts, tweets, blog entries.  All of your todo lists.  Wouldn't it be great if you could organize them into collections by hashtag, keyword, whatever? Wouldn't it be great if you could search through everything all at once?

It would.


# Front End -- TodosMVC in Redux/React

A reworking of the standard todoMVC example from github.com/reactjs/redux.
This example is re-factored to:

	o	Persist to local storage
	o	Connect Async to Todos back-end (for pgSQL storage)
	o	Add "Lanes" for kanban simul
	o	Add todo ordering
	

###Async actions through middleware:
http://redux.js.org/docs/advanced/AsyncActions.html
https://github.com/reactjs/redux/issues/291
http://survivejs.com/webpack_react/react/
http://makeitopen.com/tutorials/building-the-f8-app/data/

### To Install
	# npm -i       -- install everything referenced in package.json
	# npm start    -- runs 'node server.js'



### How This Project Works

## Actions
	Basic actions that come out of the box with TodoMVC 
	(app/actions/index.js)
* ADD_TODO
* DELETE_TODO
* EDIT_TODO
* COMPLETE_TODO
* COMPLETE_ALL  -- mark all Todos as complete
	
	Things we need for Async communications with Todos
	
* REQUEST_TODOS   props:  status, error 
* RECEIVE_TODOS   
* UPDATE_TODO_ASYNC
* DELETE_TODO_ASYNC
* EDIT_TODO_ASYNC

These will all be handled by "Thunks"  -- action handlers mediated by the Thunk middleware.  Thunks fire off async actions and complete with a dispatch of a synchronous action.  For instance, a Thunk for ADD_TODO will fire ADD_TODO_ASYNC, and finish with the synchronous ADD_TODO action.
	
	Kanban actions
* ADD_LANE
* EDIT_LANE
* DELETE_LANE

## Reducers

	TodoMVC has a reducer to handle the basic Todo crud, but only synchronous.
	
	Need to hook these up to the Async actions.
	
	Convert the TodoMVC actionHandlers to Thunks with async/sync action combos
	
	Add reducer section for the Kanban actions


## Data Structure

Single client-side store, ala Redux conventions

	Store
			.recs			-- un-ordered list of all records
				.id -> todo
					todo
						.id
						.uuid
						.title
						.desc
						.tags {tag1,tag2,tag3}
				
			.working 	-- working tree, computed from todos according to some start point
						-- default query is top level todos (starting with todo ID 1)
						-- tree is computed to two-levels, current plus children
			.todos		-- list of all relationships
			.idx[x]  ?? cached versions of high-use sub-trees? idx[1] is default (start at 1).

	calcTree(store,startID,{query}, ){
		startRec = recs[startID];
		depth = query.treeDepth(=2);
		//something something 
		//This next thing would be O(n) * O(n) for two levels
		working = recurseForNLevlels(store.recs.filter(todo=>{
						todo.parents = getParents(todo.id);
						return todo.parents ?> startID)});
					)

Store can be fed from async queries using a query API to back-end. Examples

	todosFetchWorking({query})
		fLoad = (data) => store.working = data;
	todosFetchIdx({query})
		fLoad = (data) => 	store.idx[data.startID] = data;
			
		{query} = {start_id:id=1, tag_list:{tag_list}, keyword_list:{keywords}, depth:treeDepth=2, max:maxRecs=500}

</body>