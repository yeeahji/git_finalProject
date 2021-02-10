package admin.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.collections4.map.HashedMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import admin.bean.AdminBoardPaging;
import admin.bean.AdminMembersDTO;
import admin.dao.AdminDAO;
import member.bean.MemberDTO;
import product.bean.ProductDTO;
import store.bean.StoreDTO;

@Service
public class AdminServiceImpl implements AdminService {
	@Autowired
	private AdminDAO adminDAO;	
	@Autowired
	private AdminBoardPaging adminBoardPaging;

	@Override
	public List<MemberDTO> getMemberList(String pg, String viewNum) {
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
		int totalA = adminDAO.getTotalA();
		
		adminBoardPaging.setCurrentPage(Integer.parseInt(pg));
		adminBoardPaging.setPageBlock(10);
		adminBoardPaging.setPageSize(Integer.parseInt(viewNum));//위에endNum,startNum과 맞아야함
		adminBoardPaging.setTotalA(totalA);
		
		adminBoardPaging.makePagingHTML();
		
		return adminBoardPaging;
	}
	
	//전체회원수
	@Override
	public int totalMember() {
		int totalMember = adminDAO.getTotalA();
		return totalMember;
	}
	//판매하는물건 총개수
	@Override
	public int totalSellProduct(String id) {
		int totalSellProduct = adminDAO.totalSellProduct(id);
		return totalSellProduct;
	}
			
		
	//검색
	@Override
	public List<MemberDTO> getSearchMember(Map<String, String> map) {
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
		adminBoardPaging.setPageSize(viewNum);
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
	public List<StoreDTO> getStoreList(String pg, String viewNum) {
		int endNum = Integer.parseInt(pg)*Integer.parseInt(viewNum);
		int startNum = endNum-(Integer.parseInt(viewNum)-1);
		
		Map <String, Integer> map = new HashedMap<String, Integer>();
		map.put("startNum", startNum);
		map.put("endNum", endNum);
		List<StoreDTO> storeList = adminDAO.getStoreList(map);
		return storeList;
	}

	@Override
	public AdminBoardPaging StoreBP(String pg, String viewNum) {
		int totalC = adminDAO.getTotalC();
		
		adminBoardPaging.setCurrentPage(Integer.parseInt(pg));
		adminBoardPaging.setPageBlock(10);
		adminBoardPaging.setPageSize(Integer.parseInt(viewNum));//위에endNum,startNum과 맞아야함
		adminBoardPaging.setTotalA(totalC);
		
		adminBoardPaging.makePagingHTML();
		return adminBoardPaging;
	}

	@Override
	public AdminMembersDTO getStoreView(String id) {
		AdminMembersDTO adminMembersDTO = adminDAO.getStoreView(id);
		return adminMembersDTO;
	}

	@Override
	public List<StoreDTO> getSearchStoreList(Map<String, String> map) {
		int viewNum = Integer.parseInt(map.get("viewNum"));
		
		int endNum = Integer.parseInt(map.get("pg"))*viewNum;
		int startNum = endNum-(viewNum-1);
		
		map.put("startNum", startNum+"");
		map.put("endNum", endNum+"");
		return adminDAO.getSearchStoreList(map);
	}

	//상점조건검색 페이징
	@Override
	public AdminBoardPaging getSearchStoreBP(Map<String, String> map) {
		int viewNum = Integer.parseInt(map.get("viewNum"));
		
		int totalD = adminDAO.getTotalD(map);
		
		adminBoardPaging.setCurrentPage(Integer.parseInt(map.get("pg")));
		adminBoardPaging.setPageBlock(10);
		adminBoardPaging.setPageSize(viewNum);
		adminBoardPaging.setTotalA(totalD);
		
		adminBoardPaging.makePagingHTML();
		
		return adminBoardPaging;
	}
	//상점상세보기_물건출력
	@Override
	public List<ProductDTO> getStore_ProductList(String id) {
		List<ProductDTO> productList = adminDAO.getStore_ProductList(id);
		return productList;
	}

	//상점목록_물품리스트에서 삭제
	@Override
	public void store_productDelete(String[] check) {
		Map<String, String[]> map = new HashMap<String, String[]>();
		map.put("array", check);
		adminDAO.store_productDelete(map);
	}

	@Override
	public List<ProductDTO> getProductAllList(String pg, String viewNum) {
		int endNum = Integer.parseInt(pg)*Integer.parseInt(viewNum);
		int startNum = endNum-(Integer.parseInt(viewNum)-1);
		
		Map <String, Integer> map = new HashedMap<String, Integer>();
		map.put("startNum", startNum);
		map.put("endNum", endNum);
		List<ProductDTO> productList = adminDAO.getProductAllList(map);
		return productList;
	}

	@Override
	public AdminBoardPaging ProductBP(String pg, String viewNum) {
		int totalE = adminDAO.getTotalE();
		
		adminBoardPaging.setCurrentPage(Integer.parseInt(pg));
		adminBoardPaging.setPageBlock(10);
		adminBoardPaging.setPageSize(Integer.parseInt(viewNum));//위에endNum,startNum과 맞아야함
		adminBoardPaging.setTotalA(totalE);
		
		adminBoardPaging.makePagingHTML();
		
		return adminBoardPaging;
	}
	
	//물품관련 상세정보, 위에 getStoreView()랑 겹침
	@Override
	public AdminMembersDTO getProductView(String seq) {
		AdminMembersDTO adminMembersDTO = adminDAO.getProductView(seq);
		return adminMembersDTO;
	}
	//물품 조건검색
	@Override
	public List<ProductDTO> getSearchProductList(Map<String, String> map) {
		int viewNum = Integer.parseInt(map.get("viewNum"));
		
		int endNum = Integer.parseInt(map.get("pg"))*viewNum;
		int startNum = endNum-(viewNum-1);
		
		map.put("startNum", startNum+"");
		map.put("endNum", endNum+"");
		return adminDAO.getSearchProductList(map);
	}
	//물품 조건검색_페이징
	@Override
	public AdminBoardPaging getSearchProductBP(Map<String, String> map) {
		int viewNum = Integer.parseInt(map.get("viewNum"));
		
		int totalF = adminDAO.getTotalF(map);
		
		adminBoardPaging.setCurrentPage(Integer.parseInt(map.get("pg")));
		adminBoardPaging.setPageBlock(10);
		adminBoardPaging.setPageSize(viewNum);
		adminBoardPaging.setTotalA(totalF);
		
		adminBoardPaging.makePagingHTML();
		
		return adminBoardPaging;
	}
	//상점_클릭후_후기 총 개수
	@Override
	public int storeReviewTotalA(String id) {
		return adminDAO.storeReviewTotalA(id);
	}
	//상점_정보출력 후 물품 정렬
	@Override
	public List<ProductDTO> getStoreViewOrderby(Map<String, String> map) {
		return adminDAO.getStoreViewOrderby(map);
	}
	
	

	


}
