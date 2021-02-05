package store.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import product.bean.ProductDTO;
import store.bean.PurchaseDTO;
import store.bean.ReviewDTO;
import store.bean.StoreDTO;

@Repository
@Transactional
public class StoreDAOMybatis implements StoreDAO {
	@Autowired
	private SqlSession sqlSession;

	@Override
	public List<ProductDTO> storeProductList(Map<String, String> map) {
		return sqlSession.selectList("storeSQL.storeProductList", map);
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

	@Override
	public List<ProductDTO> productManageList(Map<String, String> map) {
		return sqlSession.selectList("storeSQL.productManageList", map);
	}

	@Override
	public List<ProductDTO> productManageSearch(Map<String, String> map) {
		return sqlSession.selectList("storeSQL.productManageSearch", map);
	}

	@Override
	public int prodManageUpdate(Map<String, String>  map) {
		return sqlSession.update("storeSQL.prodManageUpdate", map);
	}

	@Override
	public int prodManageTotalA(String mem_id, String product_manage) {
		Map<String, String> map = new HashMap<String, String>();
		map.put("mem_id", mem_id);
		map.put("product_manage", product_manage);
		return sqlSession.selectOne("storeSQL.prodManageTotalA", map);
	}

	@Override
	public int prodManageTotalA(Map<String, String> map) {
		return sqlSession.selectOne("storeSQL.productSearchTot", map);
	}

	@Override
	public int productUp(Map<String, String> map) {
		return sqlSession.update("storeSQL.productUp", map);
	}

	@Override
	public int productDlt(Map<String, String> map) {
		return sqlSession.delete("storeSQL.productDlt", map);
	}

	@Override
	public ProductDTO existProd(Map<String, String> map) {
		return sqlSession.selectOne("storeSQL.existProd", map);
	}

	@Override
	public List<PurchaseDTO> purchaseList(Map<String, String> map) {
		return sqlSession.selectList("storeSQL.purchaseList", map);
	}
	// 구매내역 총 개수
	@Override
	public int purchaseTotalA(String my_id) {
		return sqlSession.selectOne("storeSQL.purchaseTotalA", my_id);
	}
	// 상점 기본 정보
	@Override
	public StoreDTO storeInfo(String mem_id) {
		return sqlSession.selectOne("storeSQL.storeInfo", mem_id);
	}
	// 상점 소개글 업뎃
	@Override
	public int introUpdate(Map<String, String> map) {
		return sqlSession.update("storeSQL.introUpdate", map);
	}

	@Override
	public void profileImgUpdate(Map<String, String> map) {
		sqlSession.update("storeSQL.profileImgUpdate", map);
	}
	// 에코지수 판매 
	@Override
	public int salesNum(String mem_id) {
		return sqlSession.selectOne("storeSQL.salesNum", mem_id);
	}

	@Override
	public void echoUpdate(Map<String, String> map) {
		sqlSession.update("storeSQL.echoUpdate", map);
	}

	
	
	
}
