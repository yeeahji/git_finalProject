package index.dao;

import java.util.List;
import java.util.Map;

import product.bean.ProductDTO;

public interface IndexDAO {

	public List<ProductDTO> getProductList(Map param); //목록

	public int wishProduct(String id); //찜한 상품 수

	public List<ProductDTO> searchProductList(Map map); //검색
	
	public int searchProductCount(Map map); //검색

}
