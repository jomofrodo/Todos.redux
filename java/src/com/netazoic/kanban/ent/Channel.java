package com.netazoic.kanban.ent;

import java.sql.Connection;
import java.util.HashMap;

import com.netazoic.ent.ENTException;

public class Channel extends com.netazoic.ent.ENT<Channel> {
	
	public String channelCode;
	public String chName;
	public String chDesc;
	
	public enum CHN_Route{
		home("home","Show home page"),
		cchn("cchn","Create Channel"),
		rchn("rchn","Retrieve Channel"),
		uchn("uchn","Update Channel"),
		dchn("dchn","Delete Channel"),
		lnchn("lnchn","Link Channel"),
		lschn("lschn", "List Channels");
		;

		public String route;
		public String desc;

		CHN_Route(String r, String d){
			route = r;
			desc = d;
		}
	}

	@Override
	public void initENT() {
		this.nit.fld_nitID = "channelCode";
		this.nit.nitTable = "channel";
		this.nit.nitName = "Kanban Channel";
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
