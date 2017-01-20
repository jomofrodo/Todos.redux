package com.netazoic.kanban.ent;

import java.sql.Connection;
import java.util.Date;
import java.util.HashMap;
import java.util.UUID;

import com.netazoic.ent.ENTException;

public class Project extends com.netazoic.ent.ENT<Project>{
	public Long projectID;
	public UUID prjUUID;
	public String projectCode;
	public String prjName;
	public String prjDesc;
	public String projectStatusCode;
	public Date prjBegin;
	public Date prjEnd;
	
	public enum PRJ_Route{
		cprj("cprj","Create PRJ"),
		rprj("rprj","Retrieve PRJ"),
		uprj("uprj","Update PRJ"),
		dprj("dprj","Delete PRJ"),
		lnprj("lnprj","Link PRJ"),
		lsprj("lsprj", "List PRJs");
		;

		public String route;
		public String desc;

		PRJ_Route(String r, String d){
			route = r;
			desc = d;
		}
	}
	
	public Project(Connection con) {
		this.con = con;
		init();
	}

	public void init(){
		initENT();
	}
	
	@Override
	public void initENT() {
		this.nit.fld_nitID = "projectID";
		this.nit.nitTable = "Project";
		this.nit.nitName = "Basic Project";
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
