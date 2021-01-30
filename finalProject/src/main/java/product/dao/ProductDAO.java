package product.dao;

import java.util.List;

import product.bean.CategoryDTO;
import product.bean.ProductDTO;

public interface ProductDAO {

	public void productRegist(ProductDTO productDTO);

	public List<CategoryDTO> getLargeCategoryList();

	public List<CategoryDTO> getSmallCategoryList(String cate_parent);

	public String getMyLocation(String mem_id);

	public String getMyRecentLocation(String mem_id);

	public List<ProductDTO> getProductList(); //목록


}
