package product.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.collections.map.HashedMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import product.bean.CategoryDTO;
import product.bean.ProductDTO;
import product.dao.ProductDAO;

@Service
public class ProductServiceImpl implements ProductService {
	@Autowired
	private ProductDAO productDAO;

	@Override
	public void productRegist(ProductDTO productDTO) {
		productDAO.productRegist(productDTO);
	}

	@Override
	public List<CategoryDTO> getSmallCategoryList(String cate_parent) {
		return productDAO.getSmallCategoryList(cate_parent);
	}

	@Override
	public String getMyLocation(String mem_id) {
		return productDAO.getMyLocation(mem_id);
	}

	@Override
	public String getMyRecentLocation(String mem_id) {
		return productDAO.getMyRecentLocation(mem_id);
	}

	@Override
	public ProductDTO productDetail(String seq) {
		return productDAO.productDetail(seq);
	}

}
