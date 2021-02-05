package admin.service;

import java.util.List;
import java.util.Map;

import org.apache.commons.collections4.map.HashedMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import admin.bean.AdminBoardPaging;
import admin.bean.TestMemberDTO;
import admin.dao.TestMemberDAO;
import member.bean.MemberDTO;

@Service
public class TestMemberServiceImpl implements TestMemberService {
	@Autowired
	private TestMemberDAO testMemberDAO;	
	@Autowired
	private AdminBoardPaging boardPaging;

	@Override
	public List<MemberDTO> getMemberList(String pg) {
		//1페이지당 10개씩
		int endNum = Integer.parseInt(pg)*10;
		int startNum = endNum-9;
		
		Map <String, Integer> map = new HashedMap<String, Integer>();
		map.put("startNum", startNum);
		map.put("endNum", endNum);
		List<MemberDTO> list = testMemberDAO.getMemberList(map);
		return list;
	}

	@Override
	public AdminBoardPaging boardPaging(String pg) {
		int totalA = testMemberDAO.getTotalA();
		
		boardPaging.setCurrentPage(Integer.parseInt(pg));
		boardPaging.setPageBlock(10);
		boardPaging.setPageSize(10);//위에endNum,startNum과 맞아야함
		boardPaging.setTotalA(totalA);
		
		boardPaging.makePagingHTML();
		
		return boardPaging;
	}
//검색
	@Override
	public List<MemberDTO> getSearchMember(Map<String, String> map) {
		//1페이지당 10개씩
		int endNum = Integer.parseInt(map.get("pg"))*10;
		int startNum = endNum-9;
		
		map.put("startNum", startNum+"");
		map.put("endNum", endNum+"");
		return testMemberDAO.getSearchMember(map);
	}

	@Override
	public AdminBoardPaging searchBoardPaging(Map<String, String> map) {
		int totalB = testMemberDAO.getTotalB(map);
		
		boardPaging.setCurrentPage(Integer.parseInt(map.get("pg")));
		boardPaging.setPageBlock(5);
		boardPaging.setPageSize(10);//위에endNum,startNum과 맞아야함
		boardPaging.setTotalA(totalB);
		
		boardPaging.makePagingHTML();
		
		return boardPaging;
	}

	@Override
	public MemberDTO getMemberView(String id) {
		MemberDTO memberDTO = testMemberDAO.getMemberView(id);
		return memberDTO;
	}

}
