package index.dao;

import java.util.List;
import java.util.Map;

import product.bean.CategoryDTO;
import product.bean.ProductDTO;

public interface IndexDAO {

	public List<ProductDTO> getProductList(Map param); //목록

	public int wishProduct(String id); //찜한 상품 수

	public List<ProductDTO> searchProductList(Map map); //검색
	
	public int searchProductCount(Map map); //검색

	public List<ProductDTO> recentlyList(List<String> list); //최근본상품

	public List<ProductDTO> cateProductList(Map<String, Object> map); //카테고리

	public int cateProductCount(Map<String, Object> param); //카테고리

	public List<CategoryDTO> categoryList(); //새부 카테고리

	public String cateParentName(String cate_code); //부모카테고리이름

	public String cateCodeName(String cate_code); //자식카테고리이름

}
