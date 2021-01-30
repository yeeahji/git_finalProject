package store.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import product.bean.ProductDTO;
import store.bean.StoreDTO;
import store.dao.StoreDAO;

@Service
public class StoreServiceImpl implements StoreService {
	@Autowired
	private StoreDAO storeDAO;

	@Override
	public List<ProductDTO> storeProductList() {
		return storeDAO.storeProductList();
	}

	@Override
	public int storeProductTotalA() {
		return storeDAO.storeProductTotalA();
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
}
