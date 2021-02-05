package admin.service;

import java.util.List;
import java.util.Map;

import admin.bean.AdminBoardPaging;
import admin.bean.AdminMembersDTO;
import member.bean.MemberDTO;
import store.bean.StoreDTO;

public interface AdminService {

	public List<MemberDTO> getMemberList(String pg, String viewNum);

	public AdminBoardPaging boardPaging(String pg, String viewNum);

	public List<MemberDTO> getSearchMember(Map<String, String> map);

	public AdminBoardPaging searchBoardPaging(Map<String, String> map);

	public AdminMembersDTO getMemberView(String id);
	//상점리스트출력
	public List<StoreDTO> getStoreList(String pg);
    //상점페이징
	public AdminBoardPaging StoreBP(String pg);
	//상점상세보기
	public StoreDTO getStoreView(String id);

}
