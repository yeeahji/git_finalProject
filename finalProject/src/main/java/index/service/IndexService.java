package index.service;

import java.util.List;

import org.springframework.ui.Model;

import product.bean.CategoryDTO;
import product.bean.ProductDTO;

public interface IndexService {

	public List<ProductDTO> getProductList(int page); //상품목록

	public int wishProduct(String id); //찜한 상품 수

	public void searchProductList(String keyword, int page, String order, Model model); //검색

	public List<ProductDTO> recentlyList(List<String> list); //최근본상품

	public void cateProductList(String cate_code, int page, String order, Model model); //카테고리

	public List<CategoryDTO> categoryList(); //세부 카테고리

}
