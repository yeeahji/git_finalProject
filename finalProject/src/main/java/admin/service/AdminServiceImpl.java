package admin.service;

import java.util.List;
import java.util.Map;

import org.apache.commons.collections4.map.HashedMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import admin.bean.AdminBoardPaging;
import admin.bean.AdminMembersDTO;
import admin.dao.AdminDAO;
import member.bean.MemberDTO;
import store.bean.StoreDTO;

@Service
public class AdminServiceImpl implements AdminService {
	@Autowired
	private AdminDAO adminDAO;	
	@Autowired
	private AdminBoardPaging adminBoardPaging;

	@Override
	public List<MemberDTO> getMemberList(String pg, String viewNum) {
		System.out.println("서비스Impl, list에서 받는 viewNum값 = "+viewNum);
		//1페이지당 10개씩
		int endNum = Integer.parseInt(pg)*Integer.parseInt(viewNum);
		int startNum = endNum-(Integer.parseInt(viewNum)-1);
		
		Map <String, Integer> map = new HashedMap<String, Integer>();
		map.put("startNum", startNum);
		map.put("endNum", endNum);
		List<MemberDTO> list = adminDAO.getMemberList(map);
		return list;
	}

	@Override
	public AdminBoardPaging boardPaging(String pg, String viewNum) {
		System.out.println("서비스Impl, 페이징에서 받는 viewNum값 = "+viewNum);
		int totalA = adminDAO.getTotalA();
		
		adminBoardPaging.setCurrentPage(Integer.parseInt(pg));
		adminBoardPaging.setPageBlock(10);
		adminBoardPaging.setPageSize(Integer.parseInt(viewNum));//위에endNum,startNum과 맞아야함
		adminBoardPaging.setTotalA(totalA);
		
		adminBoardPaging.makePagingHTML();
		
		return adminBoardPaging;
	}
//검색
	@Override
	public List<MemberDTO> getSearchMember(Map<String, String> map) {
		//1페이지당 10개씩
		int viewNum = Integer.parseInt(map.get("viewNum"));
		
		int endNum = Integer.parseInt(map.get("pg"))*viewNum;
		int startNum = endNum-(viewNum-1);
		
		map.put("startNum", startNum+"");
		map.put("endNum", endNum+"");
		return adminDAO.getSearchMember(map);
	}

	@Override
	public AdminBoardPaging searchBoardPaging(Map<String, String> map) {
		int viewNum = Integer.parseInt(map.get("viewNum"));
		
		int totalB = adminDAO.getTotalB(map);
		
		adminBoardPaging.setCurrentPage(Integer.parseInt(map.get("pg")));
		adminBoardPaging.setPageBlock(10);
		adminBoardPaging.setPageSize(viewNum);//위에endNum,startNum과 맞아야함
		adminBoardPaging.setTotalA(totalB);
		
		adminBoardPaging.makePagingHTML();
		
		return adminBoardPaging;
	}

	@Override
	public AdminMembersDTO getMemberView(String id) {
		AdminMembersDTO adminMembersDTO = adminDAO.getMemberView(id);
		return adminMembersDTO;
	}
	
	//상점리스트출력
	@Override
	public List<StoreDTO> getStoreList(String pg) {
		System.out.println("서비스Impl도착");
		//1페이지당 10개씩
		int endNum = Integer.parseInt(pg)*10;
		int startNum = endNum-9;
		
		Map <String, Integer> map = new HashedMap<String, Integer>();
		map.put("startNum", startNum);
		map.put("endNum", endNum);
		List<StoreDTO> storeList = adminDAO.getStoreList(map);
		return storeList;
	}

	@Override
	public AdminBoardPaging StoreBP(String pg) {
		System.out.println("페이징처리도착");
		int totalC = adminDAO.getTotalC();
		
		adminBoardPaging.setCurrentPage(Integer.parseInt(pg));
		adminBoardPaging.setPageBlock(10);
		adminBoardPaging.setPageSize(10);//위에endNum,startNum과 맞아야함
		adminBoardPaging.setTotalA(totalC);
		
		adminBoardPaging.makePagingHTML();
		System.out.println("페이징처리끝");
		return adminBoardPaging;
	}

	@Override
	public StoreDTO getStoreView(String id) {
		StoreDTO storeDTO = adminDAO.getStoreView(id);
		return storeDTO;
	}


}
