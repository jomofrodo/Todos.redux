package com.netazoic.todos;

import java.io.IOException;
import java.sql.Connection;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletConfig;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.netazoic.ent.NetRoute;
import com.netazoic.ent.ServENT;

public class TodosRedux extends ServENT {

	NetRoute homeHdlr = new HomeHdlr();
	NetRoute addTodoHdlr = new AddTodoHdlr();
	
	public enum TODOS_ROUTE{
		//route is the second segment of the url, e.g., http://someserver/route
		home("home"),
		addTodo("addTodo");
		
		String route;
		
		TODOS_ROUTE(String r){
			route  = r;
		}
	}
	
	@Override
	public void init(ServletConfig config) throws javax.servlet.ServletException {
			super.init(config);

			defaultRoute = TODOS_ROUTE.home.route;

			routeMap.put(TODOS_ROUTE.home.route, homeHdlr);
			routeMap.put(TODOS_ROUTE.addTodo.route, addTodoHdlr);
	}
		
	public class HomeHdlr extends RouteEO{

			@Override
			public void routeAction(HttpServletRequest request,
				HttpServletResponse response, Connection con, HttpSession session)
							throws IOException, Exception {
				String hello = "Hello World";
				response.getWriter().append(hello);
			}	
	}
	
	public class AddTodoHdlr extends RouteEO{

		@Override
		public void routeAction(HttpServletRequest request,
			HttpServletResponse response, Connection con, HttpSession session)
						throws IOException, Exception {
			String hello = "Hello World, this is Add TODO";
			
			response.getWriter().append(hello);
		}	
}

}
