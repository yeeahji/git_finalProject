package store.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import product.bean.ProductDTO;
import store.bean.ReviewDTO;
import store.bean.StoreDTO;

@Repository
@Transactional
public class StoreDAOMybatis implements StoreDAO {
	@Autowired
	private SqlSession sqlSession;

	@Override
	public List<ProductDTO> storeProductList(String mem_id) {
		return sqlSession.selectList("storeSQL.storeProductList", mem_id);
	}

	@Override
	public int storeProductTotalA(String mem_id) {
		return sqlSession.selectOne("storeSQL.storeProductTotalA", mem_id);
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

	@Override
	public int storeFavoritesTotalA(String mem_id) {
		return sqlSession.selectOne("storeSQL.storeFavoritesTotalA", mem_id);
	}

	@Override
	public void storeSoldOutDelete() {
		sqlSession.delete("storeSQL.storeSoldOutDelete");	
		
	}

	@Override
	public List<ReviewDTO> storeReviewsList(String mem_id) {
		return sqlSession.selectList("storeSQL.storeReviewsList", mem_id);
	}

	@Override
	public int storeReviewTotalA(String mem_id) {
		return sqlSession.selectOne("storeSQL.storeReviewTotalA", mem_id);
	}

	@Override
	public int favoritesOfProd(Map<String, String> map) {
		return sqlSession.selectOne("storeSQL.favoritesOfProd", map);
	}
}
