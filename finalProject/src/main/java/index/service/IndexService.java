package index.service;

import java.util.List;

import index.bean.ProductDTO;

public interface IndexService {

	public List<ProductDTO> getProductList(int page); //상품목록

}
