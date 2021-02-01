package admin.service;

import java.util.List;

import admin.bean.BoardPaging;
import admin.bean.TestMemberDTO;

public interface TestMemberService {

	public List<TestMemberDTO> getMemberList();

	public BoardPaging boardPaging(String pg);

}
