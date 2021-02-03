package index.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import product.bean.ProductDTO;

@Repository
@Transactional
public class IndexDAOMybatis implements IndexDAO {
	@Autowired
	private SqlSession sqlSession;
	
	@Override	
	public List<ProductDTO> getProductList(Map param) {
		return sqlSession.selectList("indexSQL.getProductList", param);

	}

	@Override
	public int wishProduct(String id) {
		return sqlSession.selectOne("indexSQL.wishProduct", id);
	}

	@Override
	public List<ProductDTO> searchProductList(Map map) {
		return sqlSession.selectList("indexSQL.searchProductList", map);
	}

	@Override
	public int searchProductCount(Map map) {
		// TODO Auto-generated method stub
		return sqlSession.selectOne("indexSQL.searchProductCount", map);
	}
	
	
	
	
}
