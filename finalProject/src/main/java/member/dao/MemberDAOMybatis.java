package member.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import member.bean.MemberDTO;

@Repository
@Transactional
public class MemberDAOMybatis implements MemberDAO {
	@Autowired
	private SqlSession sqlSession;
	
//	[시큐리티: 권한 가져오기] ----------------------------------------------------------	
	@Override
	public List<String> getAuth(String mem_id) {
		return sqlSession.selectList("memberSQL.getAuth", mem_id);
	}	
	
//	[회원가입] ----------------------------------------------------------
	@Override
	public MemberDTO checkId(String id) {
		return sqlSession.selectOne("memberSQL.getData", id);
	}


	@Override
	public int join(MemberDTO memberDTO) {
		return sqlSession.insert("memberSQL.join", memberDTO);
	}
	
//	[로그인] ----------------------------------------------------------
	@Override
	public MemberDTO login(Map<String, String> map) {
		return sqlSession.selectOne("memberSQL.login", map);
	}
	
//	카카오
	@Override
	public MemberDTO checkEmail(String email) {
		return sqlSession.selectOne("memberSQL.checkEmail", email);
	}
	@Override
	public void joinKakao(MemberDTO memberDTO) {
		sqlSession.insert("memberSQL.joinKakao", memberDTO);
		
	}
	@Override
	public MemberDTO selectKakao(Map<String, String> map) {
		return sqlSession.selectOne("memberSQL.selectKakao", map);
	}
	
	
//	[회원정보수정] ----------------------------------------------------------
	
	@Override
	public MemberDTO getData(String id) {
		return sqlSession.selectOne("memberSQL.getData", id);
	}

	@Override
	public void update(MemberDTO memberDTO) {
		sqlSession.update("memberSQL.update", memberDTO);
	}

	@Override
	public void withdraw(Map<String, String> map) {
		sqlSession.delete("memberSQL.withdraw", map);
	}

	@Override
	public MemberDTO findId(String mem_email) {
		return sqlSession.selectOne("memberSQL.findId", mem_email);
	}

	@Override
	public MemberDTO findPwd(Map<String, String> map ) {
		return sqlSession.selectOne("memberSQL.findPwd",  map);
	}

	@Override
	public void resetPwd(Map<String, String> map) {
		sqlSession.update("memberSQL.resetPwd",  map);
	}

	@Override
	public int distinguishKakao(String mem_id) {
		System.out.println("distinguishKakao memId:"+mem_id);
		//mem_kakao 컬럼 만들기 전에 생긴 회원정보일 경우 mem_kakao가 null이라서 에러 발생.
		return  sqlSession.selectOne("memberSQL.distinguishKakao", mem_id);
	}

	@Override
	public MemberDTO sessionLogin(Map<String, String> map) {
		return sqlSession.selectOne("memberSQL.login", map);
		
	}

	@Override
	public void complain(Map<String, String> map) {
		sqlSession.insert("memberSQL.complain", map);
	}

	

	
	
	
}
