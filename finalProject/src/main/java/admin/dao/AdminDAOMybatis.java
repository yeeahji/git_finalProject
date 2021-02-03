package admin.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import member.bean.MemberDTO;

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
	//검색한 후 총글
	@Override
	public int getTotalB(Map<String, String> map) {
		return sqlSession.selectOne("adminSQL.getTotalB", map);
	}

	@Override
	public MemberDTO getMemberView(String id) {
		return sqlSession.selectOne("adminSQL.getMemberView", id);
	}
	
	
}
