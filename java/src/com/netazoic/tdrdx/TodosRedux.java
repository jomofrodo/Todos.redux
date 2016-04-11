package com.netazoic.tdrdx;

import java.io.IOException;
import java.sql.Connection;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletConfig;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.netazoic.ent.NetRoute;
import com.netazoic.todos.Todos;
import com.netazoic.util.ParseUtil;

public class TodosRedux extends Todos {

	NetRoute homeHdlr = new HomeHdlr();
	
	//creating enum HOME TemPLate?
	public  enum TDRDX_TPL{
		Home("README.md","Todos/Redux Read Me"),
		;
		//Why store template path and description into variables?
		String tplPath;
		String desc;
		TDRDX_TPL(String t, String d){
			tplPath = t;
			desc = d;
		}
	}
	
	private enum TDRDX_ROUTE{
		//route is the second segment of the url, e.g., http://someserver/route
		home("home");
	
		String route;
		
		TDRDX_ROUTE(String r){
			route  = r;
		}
	}
	
	@Override
	public void init(ServletConfig config) throws javax.servlet.ServletException {
			super.init(config);
			defaultRoute = TDRDX_ROUTE.home.route;
			routeMap.put(TDRDX_ROUTE.home.route, homeHdlr);
	}
		
	public class HomeHdlr extends RouteEO{

			@Override
			public void routeAction(HttpServletRequest request,
				HttpServletResponse response, Connection con, HttpSession session)
							throws IOException, Exception {
				String tPath = TDRDX_TPL.Home.tplPath;
				Map<String,Object> map = new HashMap<String,Object>();
				ParseUtil.parseOutput(map, tPath, response.getWriter());
			}	
	}
	

}
