package com.netazoic.kanban;

import java.io.IOException;
import java.sql.Connection;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.netazoic.ent.ENTException;
import com.netazoic.ent.RouteAction;
import com.netazoic.ent.ServENT.RouteEO;
import com.netazoic.kanban.ent.ToDo;
import com.netazoic.kanban.ent.Lane.LANE_Route;
import com.netazoic.kanban.ent.Project;
import com.netazoic.kanban.ent.Project.PRJ_Route;
import com.netazoic.kanban.ent.ToDo.TODO_Param;
import com.netazoic.kanban.ent.ToDo.TODO_Route;
import com.netazoic.todos.DO;
import com.netazoic.todos.Todos;
import com.netazoic.todos.DO.DO_Param;
import com.netazoic.todos.DO.DO_Route;
import com.netazoic.todos.Todos.TODOS_Route;
import com.netazoic.util.ParseUtil;

public class KanbanDo extends Todos {

	RouteAction homeHdlr = new HomeHdlr();

	//creating enum HOME TemPLate?
	public  enum KBD_F{
		Home("README.md","Todos/Redux Read Me"),
		;
		//Why store template path and description into variables?
		String fPath;
		String desc;
		KBD_F(String t, String d){
			fPath = t;
			desc = d;
		}
	}

	public enum KBD_Route{
		home("home","Show home page"),

		;

		public String route;
		public String desc;

		KBD_Route(String r, String d){
			route = r;
			desc = d;
		}

	}

	ToDoHandler todoHdlr = new ToDoHandler();
	ProjectHandler projHdlr = new ProjectHandler();
	ChannelHandler chanHdlr = new ChannelHandler();


	@Override
	public void init(ServletConfig config) throws javax.servlet.ServletException {
		super.init(config);
		defaultRoute = KBD_Route.home.route;
		routeMap.put(KBD_Route.home.route, homeHdlr);


		routeMap.put(TODO_Route.lstdo.route, todoHdlr);
		routeMap.put(TODO_Route.CreateTodo.route, todoHdlr);
		routeMap.put(TODO_Route.ctdo.route, todoHdlr);
		routeMap.put(TODO_Route.rtdo.route, todoHdlr);
		routeMap.put(TODO_Route.utdo.route, todoHdlr);
		routeMap.put(TODO_Route.dtdo.route, todoHdlr);

		routeMap.put(LANE_Route.lsLANE.route, chanHdlr);
		routeMap.put(LANE_Route.cLANE.route, chanHdlr);
		routeMap.put(LANE_Route.rLANE.route, chanHdlr);
		routeMap.put(LANE_Route.uLANE.route, chanHdlr);
		routeMap.put(LANE_Route.dLANE.route, chanHdlr);


		routeMap.put(PRJ_Route.lsprj.route, projHdlr);
		routeMap.put(PRJ_Route.cprj.route, projHdlr);
		routeMap.put(PRJ_Route.rprj.route, projHdlr);
		routeMap.put(PRJ_Route.uprj.route, projHdlr);
		routeMap.put(PRJ_Route.dprj.route, projHdlr);



	}

	public class HomeHdlr extends RouteEO{

		@Override
		public void routeAction(HttpServletRequest request,
				HttpServletResponse response, Connection con, HttpSession session)
						throws IOException, Exception {
			String tPath = KBD_F.Home.fPath;
			Map<String,Object> map = new HashMap<String,Object>();
			parseOutput(map, tPath, response);
		}	
	}

	public class ToDoHandler extends RouteEO{

		@Override
		public void routeAction(HttpServletRequest request,
				HttpServletResponse response, Connection con, HttpSession session)
						throws IOException, Exception {

			TODO_Route route = TODO_Route.valueOf(getRouteString(request));

			switch(route){
			case ctdo:
			case CreateTodo:

				createToDo(request, response, con);
				break;

			default:
				//nada
			}	

		}

		private void createToDo(HttpServletRequest request,
				HttpServletResponse response, Connection con)
						throws ENTException, IOException {
			ToDo td = new ToDo(con);
			//Convert an incoming uuid in todoID field
			String idStr = (String) request.getAttribute(TODO_Param.todoID.name());
			UUID uuid;
			if(idStr!=null){
				try{
					uuid = UUID.fromString(idStr);
					td.tdUUID = uuid;
					request.setAttribute(TODO_Param.todoID.name(), null);
				}catch(Exception ex){
					//idStr not a UUID, assume it is a Long
				}
			}
			td.setFieldVals(request);
			Long id = td.createRecord();
			td.retrieveRecord();
			ajaxResponse(td.getJSON(),response);
		}
	}
	
	
	public class ProjectHandler extends RouteEO{

		@Override
		public void routeAction(HttpServletRequest request,
				HttpServletResponse response, Connection con, HttpSession session)
						throws IOException, Exception {

			TODO_Route route = TODO_Route.valueOf(getRouteString(request));

			switch(route){
			case ctdo:

				createProject(request, response, con);
				break;

			default:
				//nada
			}	

		}

		private void createProject(HttpServletRequest request,
				HttpServletResponse response, Connection con)
						throws ENTException, IOException {
			Project prj = new Project(con);
			//Convert an incoming uuid in todoID field
			String idStr = (String) request.getAttribute(TODO_Param.todoID.name());
			UUID uuid;
			if(idStr!=null){
				try{
					uuid = UUID.fromString(idStr);
					prj.prjUUID = uuid;
					request.setAttribute(TODO_Param.todoID.name(), null);
				}catch(Exception ex){
					//idStr not a UUID, assume it is a Long
				}
			}
			prj.setFieldVals(request);
			Long id = prj.createRecord();
			prj.retrieveRecord();
			ajaxResponse(prj.getJSON(),response);
		}
	}
	
	public class ChannelHandler extends RouteEO{

		@Override
		public void routeAction(HttpServletRequest request,
				HttpServletResponse response, Connection con, HttpSession session)
						throws IOException, Exception {

			TODO_Route route = TODO_Route.valueOf(getRouteString(request));

			switch(route){
			case ctdo:

				createToDo(request, response, con);
				break;

			default:
				//nada
			}	

		}

		private void createToDo(HttpServletRequest request,
				HttpServletResponse response, Connection con)
						throws ENTException, IOException {
			ToDo td = new ToDo(con);
			td.setFieldVals(request);
			Long id = td.createRecord();
			td.retrieveRecord();
			ajaxResponse(td.getJSON(),response);
		}
	}


}
