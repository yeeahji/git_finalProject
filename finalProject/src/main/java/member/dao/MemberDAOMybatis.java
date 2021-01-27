package member.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import member.bean.MemberDTO;
import member.bean.ZipcodeDTO;

@Repository
@Transactional
public class MemberDAOMybatis implements MemberDAO {
	@Autowired
	private SqlSession sqlSession;
	
//	[회원가입] ----------------------------------------------------------
	@Override
	public MemberDTO checkId(String id) {
		return sqlSession.selectOne("memberSQL.getData", id);
	}

	@Override
	public List<ZipcodeDTO> searchPost(Map<String, String> map) {
		return sqlSession.selectList("memberSQL.searchPost", map);
	}

	@Override
	public int join(MemberDTO memberDTO) {
		System.out.println("aaaaa");
		return sqlSession.insert("memberSQL.join", memberDTO);
	}
	
//	[로그인] ----------------------------------------------------------
	@Override
	public MemberDTO login(Map<String, String> map) {
		return sqlSession.selectOne("memberSQL.login", map);
	}
//	[회원정보수정] ----------------------------------------------------------
	@Override
	public MemberDTO certify(Map<String, String> map) {
		MemberDTO memberDTO = sqlSession.selectOne("memberSQL.certify", map);
		return memberDTO;
	}
	
	@Override
	public MemberDTO getData(String id) {
		return sqlSession.selectOne("memberSQL.getData", id);
	}

	@Override
	public void update(MemberDTO memberDTO) {
		sqlSession.update("memberSQL.update", memberDTO);
	}

	@Override
	public void withdraw(String id) {
		sqlSession.delete("memberSQL.withdraw", id);
		
	}
	
	
}
