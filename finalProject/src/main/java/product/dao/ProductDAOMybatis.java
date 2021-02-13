package product.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import index.bean.wishDTO;
import product.bean.CategoryDTO;
import product.bean.ProductDTO;
import store.bean.StoreDTO;

@Repository
@Transactional
public class ProductDAOMybatis implements ProductDAO {
	@Autowired
	private SqlSession sqlSession;

	@Override
	public int getCurrentProductSeq() {
		return sqlSession.selectOne("productSQL.getCurrentProductSeq");
	}
	
	@Override
	public void productRegist(ProductDTO productDTO) {
		sqlSession.insert("productSQL.productRegist", productDTO);
	}

	@Override
	public List<CategoryDTO> getSmallCategoryList(String cate_parent) {
		return sqlSession.selectList("productSQL.getSmallCategoryList", cate_parent);
	}

	@Override
	public String getMyLocation(String mem_id) {
		return sqlSession.selectOne("productSQL.getMyLocation", mem_id);
	}

	@Override
	public ProductDTO productDetail(String seq) {
		return sqlSession.selectOne("productSQL.productDetail", Integer.parseInt(seq));
	}

	@Override
	public List<ProductDTO> getRelatedProducts(Map<String, String> map) {
		return sqlSession.selectList("productSQL.getRelatedProducts", map);
	}

	@Override
	public CategoryDTO getProdCateName(String seq) {
		return sqlSession.selectOne("productSQL.getProdCateName", seq);
	}

	@Override
	public StoreDTO getStoreInfo(String seq) {
		return sqlSession.selectOne("productSQL.getStoreInfo", seq);
	}

	@Override
	public int getStoreProdNum(String seq) {
		return sqlSession.selectOne("productSQL.getStoreProdNum", seq);
	}

	@Override
	public List<ProductDTO> getStoreProduct(String seq) {
		return sqlSession.selectList("productSQL.getStoreProduct", seq);
	}

	@Override
	public int getZzimNum(String seq) {
		return sqlSession.selectOne("productSQL.getZzimNum", seq);
	}

	@Override
	public void zzimInsert(Map<String, String> map) {
		sqlSession.insert("productSQL.zzimInsert", map);
		
	}

	@Override
	public String getProdBigCate(String cate_code) {
		return sqlSession.selectOne("productSQL.getProdBigCate", cate_code);
	}

	@Override
	public wishDTO zzimExistCheck(Map<String, String> map) {
		return sqlSession.selectOne("productSQL.zzimExistCheck", map);
	}

	@Override
	public void zzimDelete(Map<String, String> map) {
		sqlSession.delete("productSQL.zzimDelete", map);
		
	}

	@Override
	public void hitUpdate(String seq) {
		sqlSession.update("productSQL.hitUpdate", Integer.parseInt(seq));
		
	}
	
}
