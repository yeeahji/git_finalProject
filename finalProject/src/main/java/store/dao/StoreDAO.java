package store.dao;

import java.util.List;
import java.util.Map;

import chat.bean.ChatListDTO;
import product.bean.ProductDTO;
import store.bean.PurchaseDTO;
import store.bean.PurchaseExistDTO;
import store.bean.ReviewDTO;
import store.bean.StoreDTO;

public interface StoreDAO {

	public List<ProductDTO> storeProductList(Map<String, String> map);
	//기본 총글수
	public int storeProductTotalA(String mem_id);

	public StoreDTO getMember(String nickname);

	public int nicknameUpdate(Map<String, String> map);

	public List<ProductDTO> storeFavoritesList(String mem_id, String sortNum);

	public int storeFavoritesTotalA(String mem_id);

	public void storeSoldOutDelete();

	public List<ReviewDTO> storeReviewsList(String mem_id);

	public int storeReviewTotalA(String mem_id);

	public int favoritesOfProd(Map<String, String> map);

	public List<ProductDTO> productManageList(Map<String, String> map);

	public List<ProductDTO> productManageSearch(Map<String, String> map);

	public int prodManageUpdate(Map<String, String> map);
	
	public int prodManageTotalA(String mem_id, String product_manage);
	
	public int prodManageTotalA(Map<String, String> map);
	
	public int productUp(Map<String, String> map);
	
	public int productDlt(Map<String, String> map);
	
	public ProductDTO existProd(Map<String, String> map);
	
	public List<PurchaseDTO> purchaseList(Map<String, String> map);
	
	public int purchaseTotalA(String my_id);
	// 상점 기본 정보
	public StoreDTO storeInfo(String mem_id);
	// 상점 소개글 업뎃
	public int introUpdate(Map<String, String> map);
	// 프사 업뎃
	public void profileImgUpdate(Map<String, String> map);
	
	public int salesNum(String mem_id);
	
	public void echoUpdate(Map<String, String> map);
	
	public List<PurchaseExistDTO> purchaseExist(Map<String, String> map);
	
	public List<ChatListDTO> getChatList(String mem_id);
	
	public void purchaseInsert(Map<String, String> map);
	
	public String getStoreNick(String other_store_nickname);
	
	public ProductDTO purchaseListSelect(String product_seq);
	
	public void reviewRegister(Map<String, String> map);
	
	public void favoritesDelete(Map<String, Object> map);
	
	public PurchaseExistDTO purchaseCompleted(Map<String, String> map);
	
	public int storeScoreSum(String mem_id);
	
}
