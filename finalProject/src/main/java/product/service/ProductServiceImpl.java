package product.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.collections.map.HashedMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import index.bean.wishDTO;
import product.bean.CategoryDTO;
import product.bean.ProductDTO;
import product.bean.RelProdPaging;
import product.dao.ProductDAO;
import store.bean.StoreDTO;

@Service
public class ProductServiceImpl implements ProductService {
	@Autowired
	private ProductDAO productDAO;
	
	@Autowired
	private RelProdPaging relProdPaging;

	@Override
	public int getCurrentProductSeq() {
		return productDAO.getCurrentProductSeq();
	}
	
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
	public ProductDTO productDetail(String seq) {
		return productDAO.productDetail(seq);
	}
	// 연관상품 리스트
	@Override
	public List<ProductDTO> getRelatedProducts(String rel_pg, String seq) {
		// 한 페이지 당 6개씩
		int endNum = Integer.parseInt(rel_pg)*6;
		int startNum = endNum-5;
		
		Map<String, String> map = new HashMap<String, String>();
		map.put("seq", seq);
		map.put("startNum", startNum+"");
		map.put("endNum", endNum+"");
		
		return productDAO.getRelatedProducts(map);
	}
	// 연관상품 페이징 처리
	@Override
	public RelProdPaging relProdPaging(String rel_pg) {
		relProdPaging.setCurrentPage(Integer.parseInt(rel_pg)); //현재페이지
		relProdPaging.setPageBlock(1); //[이전][1][2][3][다음] 숫자가 2갠
		relProdPaging.setPageSize(6); //1페이지 당 몇 개 - 지금은 2개로 테스트중
		relProdPaging.setTotalA(24); //총 글 수 24개로고정
		relProdPaging.makePagingHTML(); 
		return relProdPaging;
	}
	// 카테고리이름
	@Override
	public CategoryDTO getProdCateName(String seq) {
		return productDAO.getProdCateName(seq);
	}

	@Override
	public StoreDTO getStoreInfo(String seq) {
		return productDAO.getStoreInfo(seq);
	}

	@Override
	public int getStoreProdNum(String seq) {
		return productDAO.getStoreProdNum(seq);
	}

	@Override
	public List<ProductDTO> getStoreProduct(String seq) {
		return productDAO.getStoreProduct(seq);
	}

	@Override
	public int getZzimNum(String seq) {
		return productDAO.getZzimNum(seq);
	}

	@Override
	public void zzimInsert(Map<String, String> map) {
		productDAO.zzimInsert(map);
		
	}

	@Override
	public String getProdBigCate(String cate_code) {
		return productDAO.getProdBigCate(cate_code);
	}

	@Override
	public wishDTO zzimExistCheck(Map<String, String> map) {
		return productDAO.zzimExistCheck(map);
	}

	@Override
	public void zzimDelete(Map<String, String> map) {
		productDAO.zzimDelete(map);
	}

	@Override
	public void hitUpdate(String seq) {
		productDAO.hitUpdate(seq);
	}

	@Override
	public ProductDTO getProductInfo(String product_seq) {
		return productDAO.getProductInfo(product_seq);
	}
	
	
	
	
	

}






