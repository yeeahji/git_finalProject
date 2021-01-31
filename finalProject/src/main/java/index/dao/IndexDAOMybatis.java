package index.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import index.bean.ProductDTO;

@Repository
@Transactional
public class IndexDAOMybatis implements IndexDAO {
	@Autowired
	private SqlSession sqlSession;
	
	@Override	
	public List<ProductDTO> getProductList(Map param) {
		return sqlSession.selectList("indexSQL.getProductList", param);

	}
}