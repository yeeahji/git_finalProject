package admin.service;

import java.util.List;
import java.util.Map;

import admin.bean.AdminBoardPaging;
import admin.bean.TestMemberDTO;
import member.bean.MemberDTO;

public interface TestMemberService {

	public List<MemberDTO> getMemberList(String pg);

	public AdminBoardPaging boardPaging(String pg);

	public List<MemberDTO> getSearchMember(Map<String, String> map);

	public AdminBoardPaging searchBoardPaging(Map<String, String> map);

	public MemberDTO getMemberView(String id);

}
