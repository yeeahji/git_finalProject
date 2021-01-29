package store.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import product.bean.ProductDTO;
import store.bean.ReviewDTO;
import store.bean.StoreDTO;
import store.dao.StoreDAO;

@Service
public class StoreServiceImpl implements StoreService {
	@Autowired
	private StoreDAO storeDAO;

	@Override
	public List<ProductDTO> storeProductList(String mem_id) {
		return storeDAO.storeProductList(mem_id);
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
	
}
