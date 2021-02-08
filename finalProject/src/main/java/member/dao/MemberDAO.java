package member.dao;

import java.util.List;
import java.util.Map;

import member.bean.MemberDTO;

public interface MemberDAO {

	public List<String> getAuth(String mem_id);
	
	public MemberDTO login(Map<String, String> map);

	public MemberDTO checkId(String id);


	public int join(MemberDTO memberDTO);

	public MemberDTO getData(String id);

	public void update(MemberDTO memberDTO);

	public void withdraw(Map<String, String> map);

	public MemberDTO findId(String mem_email);

	public MemberDTO findPwd(Map<String, String> map);

	public void resetPwd(Map<String, String> map);

	public MemberDTO checkEmail(String string);

	public void joinKakao(MemberDTO memberDTO);

	public MemberDTO selectKakao(Map<String, String> map);

	public int distinguishKakao(String mem_id);

	public MemberDTO sessionLogin(Map<String, String> map);

	public void complain(Map<String, String> map);

}
