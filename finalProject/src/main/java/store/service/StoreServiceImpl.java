package store.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import product.bean.ProductDTO;
import store.bean.StorePaging;
import store.bean.PurchaseDTO;
import store.bean.PurchaseExistDTO;
import store.bean.PurchasePaging;
import store.bean.ReviewDTO;
import store.bean.StoreDTO;
import store.dao.StoreDAO;

@Service
public class StoreServiceImpl implements StoreService {
	@Autowired
	private StoreDAO storeDAO;

	@Autowired
	private StorePaging storePaging;
	
	@Autowired
	private PurchasePaging purchasePaging;
	
	@Override
	public List<ProductDTO> storeProductList(String mem_id, String sortNum) {
		Map<String, String> map = new HashMap<String, String>();
		map.put("mem_id", mem_id);
		map.put("sortNum", sortNum);
		return storeDAO.storeProductList(map);
	}

	@Override
	public int storeProductTotalA(String mem_id) {
		return storeDAO.storeProductTotalA(mem_id);
	}

	@Override
	public StoreDTO getMember(String nickname) {
		return storeDAO.getMember(nickname);
	}

	@Override
	public int nicknameUpdate(Map<String, String> map) {
		return storeDAO.nicknameUpdate(map);
	}

	@Override
	public List<ProductDTO> storeFavoritesList(String mem_id) {
		return storeDAO.storeFavoritesList(mem_id);
	}

	@Override
	public int storeFavoritesTotalA(String mem_id) {
		return storeDAO.storeFavoritesTotalA(mem_id);
	}

	@Override
	public void storeSoldOutDelete() {
		storeDAO.storeSoldOutDelete();
	}

	@Override
	public List<ReviewDTO> storeReviewsList(String mem_id) {
		return storeDAO.storeReviewsList(mem_id);
	}

	@Override
	public int storeReviewTotalA(String mem_id) {
		return storeDAO.storeReviewTotalA(mem_id);
	}

	@Override
	public int favoritesOfProd(Map<String, String> map) {
		return storeDAO.favoritesOfProd(map);
	}

	// 상품관리 리스트 불러오기 (페이징처리포함)
	@Override
	public List<ProductDTO> productManageList(String pg, String mem_id, String product_manage) {
		// 2개씩으로 테스트
		int endNum = Integer.parseInt(pg)*2;
		int startNum = endNum-1;
		
		Map<String, String> map = new HashMap<String, String>();
		map.put("startNum", startNum+"");
		map.put("endNum", endNum+"");
		map.put("mem_id", mem_id);
		map.put("product_manage", product_manage);

		return storeDAO.productManageList(map);
	}
    // 상품관리 - 검색 리스트 불러오기 (페이징처리추가)
	@Override
	public List<ProductDTO> productManageSearch(Map<String, String> map) {
		int endNum = Integer.parseInt(map.get("pg"))*2;
		int startNum = endNum-1;
		
		map.put("startNum", startNum+"");
		map.put("endNum", endNum+"");
		return storeDAO.productManageSearch(map);
	}

	// 기본 - 페이징처리
	@Override
	public StorePaging storePaging(String pg, String mem_id, String product_manage) {
		//[내상품관리] 판매상태별 총 개수
		int productTotalA = storeDAO.prodManageTotalA(mem_id, product_manage);
		storePaging.setCurrentPage(Integer.parseInt(pg)); //현재페이지
		storePaging.setPageBlock(2); //[이전][1][2][3][다음]
		storePaging.setPageSize(2); //1페이지 당 몇 개 - 지금은 2개로 테스트중
		storePaging.setTotalA(productTotalA); //총 글 수 
		storePaging.makePagingHTML(); 
		return storePaging;
	}

	// 검색 - 페이징 처리
	@Override
	public StorePaging storePaging(Map<String, String> map) {
		// 검색 글 총 수 
		int productTotalA = storeDAO.prodManageTotalA(map);
		storePaging.setCurrentPage(Integer.parseInt(map.get("pg"))); //현재페이지
		storePaging.setPageBlock(2); //[이전][1][2][3][다음]
		storePaging.setPageSize(2); //1페이지 당 몇 개 - 지금은 2개로 테스트중
		storePaging.setTotalA(productTotalA); //총 글 수 
		storePaging.makePagingHTML(); 
		return storePaging;
	}
	// 판매 상태 변경 업데이트
	@Override
	public int prodManageUpdate(Map<String, String> map) {
		return storeDAO.prodManageUpdate(map);
	}
	// UP사용 업데이트
	@Override
	public int productUp(Map<String, String> map) {
		return storeDAO.productUp(map);
	}
	// 상품 삭제
	@Override
	public int productDlt(Map<String, String> map) {
		return storeDAO.productDlt(map);
	}

	// 상품 한 개의 정보 (존재여부)
	@Override
	public ProductDTO existProd(Map<String, String> map) {
		return storeDAO.existProd(map);
	}
	
	// 구매내역 리스트
	@Override
	public List<PurchaseDTO> purchaseList(String pg, String my_id) {
		int endNum = Integer.parseInt(pg)*2;
		int startNum = endNum-1;
		
		Map<String, String> map = new HashMap<String, String>();
		map.put("my_id", my_id);
		map.put("startNum", startNum+"");
		map.put("endNum", endNum+"");
		return storeDAO.purchaseList(map);
	}

	@Override
	public PurchasePaging purchasePaging(String pg, String my_id) {
		// 구매내역 총 개수
		int purchaseTotalA = storeDAO.purchaseTotalA(my_id);
		purchasePaging.setCurrentPage(Integer.parseInt(pg)); //현재페이지
		purchasePaging.setPageBlock(2); //[이전][1][2][3][다음]
		purchasePaging.setPageSize(2); //1페이지 당 몇 개 - 지금은 2개로 테스트중
		purchasePaging.setTotalA(purchaseTotalA); //총 글 수 
		purchasePaging.makePagingHTML(); 
		return purchasePaging;
	}

	// 구매내역 총 개수
	@Override
	public int purchaseTotalA(String my_id) {
		return storeDAO.purchaseTotalA(my_id);
	}

	// 상점 기본 정보
	@Override
	public StoreDTO storeInfo(String mem_id) {
		return storeDAO.storeInfo(mem_id);
	}
	
	// 상점 소개글 업뎃
	@Override
	public int introUpdate(Map<String, String> map) {
		return storeDAO.introUpdate(map);
	}
	
	// 프사 업뎃
	@Override
	public void profileImgUpdate(String mem_id, String fileName) {
		Map<String, String> map = new HashMap<String, String>();
		map.put("mem_id", mem_id);
		map.put("store_img", fileName);
		storeDAO.profileImgUpdate(map);
	}
	
	// 에코지수 판매
	@Override
	public int salesNum(String mem_id) {
		return storeDAO.salesNum(mem_id);
	}

	@Override
	public void echoUpdate(Map<String, String> map) {
		storeDAO.echoUpdate(map);
	}

	// 구매 내역 존재 여부
	@Override
	public List<PurchaseExistDTO> purchaseExist(Map<String, String> map) {
		return storeDAO.purchaseExist(map);
	}

	

}
