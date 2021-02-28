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
	
//	[시큐리티: 권한 가져오기](by 예지) ===================================================================================	
	@Override
	public List<String> getAuth(String mem_id) {
		return sqlSession.selectList("memberSQL.getAuth", mem_id);
	}	
	
//	[회원가입] ===================================================================================
//	- 아이디 중복체크(by명경) + id로 dto정보 가져오기
	@Override
	public MemberDTO checkId(String id) {
		return sqlSession.selectOne("memberSQL.getData", id);
	}
//	- 이메일 중복체크(by명경)
	@Override
	public MemberDTO checkEmail(String email) {
		return sqlSession.selectOne("memberSQL.checkEmail", email);
	}
//	- 회원가입(by명경)
	@Override
	public int join(MemberDTO memberDTO) {
		return sqlSession.insert("memberSQL.join", memberDTO);
	}
	
//	[로그인] ===================================================================================
//	- 로그인(by명경)
	@Override
	public MemberDTO login(Map<String, String> map) {
		return sqlSession.selectOne("memberSQL.login", map);
	}
	
//	- 카카오 최초 로그인 시, 카카오 정보 회원가입(by명경)
	@Override
	public void joinKakao(MemberDTO memberDTO) {
		sqlSession.insert("memberSQL.joinKakao", memberDTO);
	}
	
//	카카오 로그인???????????????????????????????????
	@Override
	public MemberDTO selectKakao(Map<String, String> map) {
		return sqlSession.selectOne("memberSQL.selectKakao", map);
	}
//	- 로그인 정보 세션 저장(by명경)
	@Override
	public MemberDTO sessionLogin(Map<String, String> map) {
		return sqlSession.selectOne("memberSQL.login", map);
	}
	
//	[마이페이지] ===================================================================================
	//회원 정보 가져오기(회원정보 수정 시, 기존 회원 데이터 뿌려주기)(by명경)
	@Override
	public MemberDTO getData(String id) {
		return sqlSession.selectOne("memberSQL.getData", id);
	}
	//회원정보수정(by명경)
	@Override
	public void update(MemberDTO memberDTO) {
		sqlSession.update("memberSQL.update", memberDTO);
	}
	//회원탈퇴(by명경)
	@Override
	public void withdraw(Map<String, String> map) {
		sqlSession.delete("memberSQL.withdraw", map);
	}
//	[아이디 비번 찾기]===================================================================================

	//아이디 찾기(by명경)
	@Override
	public MemberDTO findId(String mem_email) {
		return sqlSession.selectOne("memberSQL.findId", mem_email);
	}
	//비밀번호찾기(by명경)
	@Override
	public MemberDTO findPwd(Map<String, String> map ) {
		return sqlSession.selectOne("memberSQL.findPwd",  map);
	}
	//비밀번호 재설정(아이디/비번찾기)
	@Override
	public void resetPwd(Map<String, String> map) {
		sqlSession.update("memberSQL.resetPwd",  map);
	}
	//카카오 회원 구분(by명경) //마이페이지 이동 시, 카카오 회원이라면 비밀번호 재입력 x
	@Override
	public int distinguishKakao(String mem_id) {
		return  sqlSession.selectOne("memberSQL.distinguishKakao", mem_id);
	}

//	[신고하기](by 명경)===========================================================================
	//신고
	@Override
	public void complain(Map<String, String> map) {
//		map : reporter_id(신고자), mem_id(신고당한 사람), complain_content(신고내용), ~_seq(신고항목),구분번호(complain_number.신고db seq)
		sqlSession.insert("memberSQL.complain", map);
	}
}

















