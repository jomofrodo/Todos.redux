package com.netazoic.kanban.ent;

import java.sql.Connection;
import java.util.HashMap;
import java.util.UUID;

import com.netazoic.ent.ENTException;

public class ToDo extends com.netazoic.ent.ENT<ToDo> {
	
	public Long todoID;
	public UUID tdUUID;
	public String tdName;
	public String tdDesc;
	public Boolean tdComplete;
	
	public enum TODO_Route{
		ctdo("ctdo","Create TODO"),
		CreateTodo("CreateTodo", "CreateTodo alias"),
		rtdo("rtdo","Retrieve TODO"),
		utdo("utdo","Update TODO"),
		dtdo("dtdo","Delete TODO"),
		lntdo("lntdo","Link TODO"),
		lstdo("lstdo", "List TODOs"),
		;

		public String route;
		public String desc;

		TODO_Route(String r, String d){
			route = r;
			desc = d;
		}
	}
	public enum TODO_CTP{
		sql_CreateRecord("/KanbanDo/ent/ToDo/sql/CreateRecord.sql",""),
		;
		String ctpPath;
		String desc;
		
		TODO_CTP(String p, String d){
			ctpPath = p;
			desc = d;
		}
	}
	
	public enum TODO_Param{
		todoID,tdName,tdDesc
	}

	public ToDo(Connection con) throws ENTException {
		this.con = con;
		init();
	}

	public void init() throws ENTException{
		super.init();
	}
	
	@Override
	public void initENT() throws ENTException {
		nit.FLD_NIT_ID = "todoID";
		nit.NIT_TABLE = "ToDo";
		nit.ENTITY_NAME = "Basic Todo";
		nit.sql_CreateENT = TODO_CTP.sql_CreateRecord.ctpPath;
		super.initENT();
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
