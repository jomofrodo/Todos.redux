package com.netazoic.kanban.ent;

import java.sql.Connection;
import java.util.HashMap;

import com.netazoic.ent.ENTException;

public class ToDo extends com.netazoic.ent.ENT<ToDo> {
	
	public Long todoID;
	public String tdName;
	public String tdDesc;
	public Boolean tdComplete;
	
	public enum TODO_Route{
		ctdo("ctdo","Create TODO"),
		rtdo("rtdo","Retrieve TODO"),
		utdo("utdo","Update TODO"),
		dtdo("dtdo","Delete TODO"),
		lntdo("lntdo","Link TODO"),
		lstdo("lstdo", "List TODOs");
		;

		public String route;
		public String desc;

		TODO_Route(String r, String d){
			route = r;
			desc = d;
		}
	}
	
	public enum TODO_Param{
		todoID,tdName,tdDesc
	}

	public ToDo(Connection con) {
		// TODO Auto-generated constructor stub
	}

	@Override
	public void initENT() {
		this.nit.fld_nitID = "todoID";
		this.nit.nitTable = "ToDo";
		this.nit.nitName = "Basic Todo";
	}
	
	@Override
	public void updateRecord(HashMap<String, Object> paramMap)
			throws ENTException {
		// TODO Auto-generated method stub
		
	}

	@Override
	public Long createRecord(HashMap<String, Object> paramMap, Connection con)
			throws ENTException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void deleteRecord(String webuserID, String comments)
			throws ENTException {
		// TODO Auto-generated method stub
		
	}

}
