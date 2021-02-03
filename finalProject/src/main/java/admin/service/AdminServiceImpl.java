package admin.service;

import java.util.List;
import java.util.Map;

import org.apache.commons.collections4.map.HashedMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import admin.bean.AdminBoardPaging;
import admin.dao.AdminDAO;
import member.bean.MemberDTO;

@Service
public class AdminServiceImpl implements AdminService {
	@Autowired
	private AdminDAO adminDAO;	
	@Autowired
	private AdminBoardPaging adminBoardPaging;

	@Override
	public List<MemberDTO> getMemberList(String pg) {
		//1페이지당 10개씩
		int endNum = Integer.parseInt(pg)*10;
		int startNum = endNum-9;
		
		Map <String, Integer> map = new HashedMap<String, Integer>();
		map.put("startNum", startNum);
		map.put("endNum", endNum);
		List<MemberDTO> list = adminDAO.getMemberList(map);
		return list;
	}

	@Override
	public AdminBoardPaging boardPaging(String pg) {
		int totalA = adminDAO.getTotalA();
		
		adminBoardPaging.setCurrentPage(Integer.parseInt(pg));
		adminBoardPaging.setPageBlock(10);
		adminBoardPaging.setPageSize(10);//위에endNum,startNum과 맞아야함
		adminBoardPaging.setTotalA(totalA);
		
		adminBoardPaging.makePagingHTML();
		
		return adminBoardPaging;
	}
//검색
	@Override
	public List<MemberDTO> getSearchMember(Map<String, String> map) {
		//1페이지당 10개씩
		int endNum = Integer.parseInt(map.get("pg"))*10;
		int startNum = endNum-9;
		
		map.put("startNum", startNum+"");
		map.put("endNum", endNum+"");
		return adminDAO.getSearchMember(map);
	}

	@Override
	public AdminBoardPaging searchBoardPaging(Map<String, String> map) {
		int totalB = adminDAO.getTotalB(map);
		
		adminBoardPaging.setCurrentPage(Integer.parseInt(map.get("pg")));
		adminBoardPaging.setPageBlock(5);
		adminBoardPaging.setPageSize(10);//위에endNum,startNum과 맞아야함
		adminBoardPaging.setTotalA(totalB);
		
		adminBoardPaging.makePagingHTML();
		
		return adminBoardPaging;
	}

	@Override
	public MemberDTO getMemberView(String id) {
		MemberDTO memberDTO = adminDAO.getMemberView(id);
		return memberDTO;
	}

}
