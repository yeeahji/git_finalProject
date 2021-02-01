package admin.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import admin.bean.BoardPaging;
import admin.bean.TestMemberDTO;
import admin.dao.TestMemberDAO;

@Service
public class TestMemberServiceImpl implements TestMemberService {
	@Autowired
	private TestMemberDAO testMemberDAO;
	@Autowired
	private BoardPaging boardPaging;

	@Override
	public List<TestMemberDTO> getMemberList() {
		 List<TestMemberDTO> list = testMemberDAO.getMemberList();
		return list;
	}

	@Override
	public BoardPaging boardPaging(String pg) {
		int totalA = testMemberDAO.getTotalA();
		
		boardPaging.setCurrentPage(Integer.parseInt(pg));
		boardPaging.setPageBlock(3);
		boardPaging.setPageSize(5);
		boardPaging.setTotalA(totalA);
		
		boardPaging.makePagingHTML();
		
		return boardPaging;
	}

}
