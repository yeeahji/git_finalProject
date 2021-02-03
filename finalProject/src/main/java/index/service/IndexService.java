package index.service;

import java.util.List;
import java.util.Map;

import product.bean.ProductDTO;

public interface IndexService {

	public List<ProductDTO> getProductList(int page); //상품목록

	public int wishProduct(String id); //찜한 상품 수

	public List<ProductDTO> searchProductList(Map map); //검색

}
