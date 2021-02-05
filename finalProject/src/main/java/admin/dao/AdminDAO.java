package admin.dao;

import java.util.List;
import java.util.Map;

import admin.bean.AdminMembersDTO;
import member.bean.MemberDTO;
import store.bean.StoreDTO;

public interface AdminDAO {

	public List<MemberDTO> getMemberList(Map<String, Integer> map);

	public int getTotalA();

	public List<MemberDTO> getSearchMember(Map<String, String> map);
	//검색한 후 총글
	public int getTotalB(Map<String, String> map);

	public AdminMembersDTO getMemberView(String id);
	//상점출력
	public List<StoreDTO> getStoreList(Map<String, Integer> map);
	//상점총글수
	public int getTotalC();
	//상점상세보기
	public StoreDTO getStoreView(String id);


}
