package product.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import product.bean.CategoryDTO;
import product.bean.ProductDTO;

@Repository
@Transactional
public class ProductDAOMybatis implements ProductDAO {
	@Autowired
	private SqlSession sqlSession;

	@Override
	public void productRegist(ProductDTO productDTO) {
		sqlSession.insert("productSQL.productRegist", productDTO);
	}

	@Override
	public List<CategoryDTO> getLargeCategoryList() {
		return sqlSession.selectList("productSQL.getLargeCategoryList");
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
	public String getMyRecentLocation(String mem_id) {
		return sqlSession.selectOne("productSQL.getMyRecentLocation", mem_id);
	}
}
