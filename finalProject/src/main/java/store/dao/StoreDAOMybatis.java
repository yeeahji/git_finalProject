package store.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import product.bean.ProductDTO;
import store.bean.StoreDTO;

@Repository
@Transactional
public class StoreDAOMybatis implements StoreDAO {
	@Autowired
	private SqlSession sqlSession;

	@Override
	public List<ProductDTO> storeProductList() {
		System.out.println(sqlSession.selectList("storeSQL.storeProductList"));
		return sqlSession.selectList("storeSQL.storeProductList");
	}

	@Override
	public int storeProductTotalA() {
		return sqlSession.selectOne("storeSQL.storeProductTotalA");
	}

	@Override
	public StoreDTO getMember(String nickname) {
		return sqlSession.selectOne("storeSQL.getMember", nickname);
	}

	@Override
	public int nicknameUpdate(Map<String, String> map) {
		return sqlSession.update("storeSQL.nicknameUpdate", map);
	}

	@Override
	public List<ProductDTO> storeFavoritesList(String mem_id) {
		return sqlSession.selectList("storeSQL.storeFavoritesList", mem_id);
	}
}
