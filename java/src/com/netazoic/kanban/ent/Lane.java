package com.netazoic.kanban.ent;

import java.sql.Connection;
import java.util.HashMap;

import com.netazoic.ent.ENTException;

public class Lane extends com.netazoic.ent.ENT<Lane> {
	
	public String laneCode;
	public String lnName;
	public String lnDesc;
	
	public enum LANE_Route{
		home("home","Show home page"),
		cLANE("cLANE","Create Channel"),
		rLANE("rLANE","Retrieve Channel"),
		uLANE("uLANE","Update Channel"),
		dLANE("dLANE","Delete Channel"),
		lnLANE("lnLANE","Link Channel"),
		lsLANE("lsLANE", "List Channels");
		;

		public String route;
		public String desc;

		LANE_Route(String r, String d){
			route = r;
			desc = d;
		}
	}

	@Override
	public void initENT() {
		this.nit.fld_nitID = "laneCode";
		this.nit.nitTable = "lane";
		this.nit.nitName = "Kanban Lane";
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
