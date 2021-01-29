package store.service;

import java.util.List;
import java.util.Map;

import product.bean.ProductDTO;
import store.bean.ReviewDTO;
import store.bean.StoreDTO;

public interface StoreService {

	public List<ProductDTO> storeProductList(String mem_id);

	public int storeProductTotalA(String mem_id);

	public StoreDTO getMember(String nickname);

	public int nicknameUpdate(Map<String, String> map);

	public List<ProductDTO> storeFavoritesList(String mem_id);

	public int storeFavoritesTotalA(String mem_id);

	public void storeSoldOutDelete();

	public List<ReviewDTO> storeReviewsList(String mem_id);

	public int storeReviewTotalA(String mem_id);

	public int favoritesOfProd(Map<String, String> map);

}
