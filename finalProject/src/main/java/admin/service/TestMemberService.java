package admin.service;

import java.util.List;
import java.util.Map;

import admin.bean.BoardPaging;
import admin.bean.TestMemberDTO;
import member.bean.MemberDTO;

public interface TestMemberService {

	public List<MemberDTO> getMemberList(String pg);

	public BoardPaging boardPaging(String pg);

	public List<MemberDTO> getSearchMember(Map<String, String> map);

	public BoardPaging searchBoardPaging(Map<String, String> map);

	public MemberDTO getMemberView(String id);

}
