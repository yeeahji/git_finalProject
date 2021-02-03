package index.service;

import java.util.List;

import org.springframework.ui.Model;

import product.bean.ProductDTO;

public interface IndexService {

	public List<ProductDTO> getProductList(int page); //상품목록

	public int wishProduct(String id); //찜한 상품 수

	public void searchProductList(String keyword, int page, String order, Model model); //검색

}
