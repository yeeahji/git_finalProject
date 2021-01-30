package index.dao;

import java.util.List;
import java.util.Map;

import index.bean.ProductDTO;

public interface IndexDAO {

	public List<ProductDTO> getProductList(Map param); //목록


}
