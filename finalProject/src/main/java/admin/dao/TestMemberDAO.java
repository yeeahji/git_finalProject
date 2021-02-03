package admin.dao;

import java.util.List;
import java.util.Map;

import admin.bean.TestMemberDTO;
import member.bean.MemberDTO;

public interface TestMemberDAO {

	public List<MemberDTO> getMemberList(Map<String, Integer> map);

	public int getTotalA();

	public List<MemberDTO> getSearchMember(Map<String, String> map);
	//검색한 후 총글
	public int getTotalB(Map<String, String> map);

	public MemberDTO getMemberView(String id);

}
