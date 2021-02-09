package admin.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import admin.bean.AdminMembersDTO;
import member.bean.MemberDTO;
import product.bean.ProductDTO;
import store.bean.StoreDTO;

@Repository
@Transactional
public class AdminDAOMybatis implements AdminDAO {
	@Autowired
	private SqlSession sqlSession;

	@Override
	public List<MemberDTO> getMemberList(Map<String, Integer> map) {
		return sqlSession.selectList("adminSQL.getMemberList", map);
	}

	@Override
	public int getTotalA() {
		return sqlSession.selectOne("adminSQL.getTotalA");
	}
	
	@Override
	public List<MemberDTO> getSearchMember(Map<String, String> map) {
		return sqlSession.selectList("adminSQL.getSearchMember", map);
	}
	
	@Override
	public int totalSellProduct(String id) {
		return sqlSession.selectOne("adminSQL.totalSellProduct", id);
	}
	
	//검색한 후 총글
	@Override
	public int getTotalB(Map<String, String> map) {
		return sqlSession.selectOne("adminSQL.getTotalB", map);
	}

	@Override
	public AdminMembersDTO getMemberView(String id) {
		return sqlSession.selectOne("adminSQL.getMemberView", id);
	}
	
	//상점출력
	@Override
	public List<StoreDTO> getStoreList(Map<String, Integer> map) {
		return sqlSession.selectList("adminSQL.getStoreList", map);
	}

	@Override
	public int getTotalC() {
		return sqlSession.selectOne("adminSQL.getTotalC");
	}

	@Override
	public AdminMembersDTO getStoreView(String id) {
		return sqlSession.selectOne("adminSQL.getStoreView", id);
	}
	//상점조건검색
	@Override
	public List<StoreDTO> getSearchStoreList(Map<String, String> map) {
		return sqlSession.selectList("adminSQL.getSearchStoreList", map);
	}
	//상점조건건색 페이징
	@Override
	public int getTotalD(Map<String, String> map) {
		return sqlSession.selectOne("adminSQL.getTotalD", map);
	}
	//상점상세보기_물건출력
	@Override
	public List<ProductDTO> getProductList(String id) {
		return sqlSession.selectList("adminSQL.getProductList", id);
	}
	//상점목록_물품리스트에서 삭제
	@Override
	public void store_productDelete(Map<String, String[]> map) {
		sqlSession.delete("adminSQL.store_productDelete", map);
	}


	
	
}
