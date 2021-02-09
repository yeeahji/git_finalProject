package product.service;

import java.util.List;
import java.util.Map;

import product.bean.CategoryDTO;
import product.bean.ProductDTO;
import product.bean.RelProdPaging;
import store.bean.StoreDTO;

public interface ProductService {

	public void productRegist(ProductDTO productDTO);
	
	public List<CategoryDTO> getSmallCategoryList(String cate_parent);

	public String getMyLocation(String mem_id);

	public String getMyRecentLocation(String mem_id);

	public ProductDTO productDetail(String seq); //상품 디테일

	public List<ProductDTO> getRelatedProducts(String rel_pg, String seq);

	public RelProdPaging relProdPaging(String rel_pg);

	public CategoryDTO getProdCateName(String seq);

	public StoreDTO getStoreInfo(String seq);

	public int getStoreProdNum(String seq);

	public List<ProductDTO> getStoreProduct(String seq);

	public int getZzimNum(String seq);

	public void zzimInsert(Map<String, String> map);

	public String getProdBigCate(String cate_code);

}
