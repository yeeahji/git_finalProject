package member.service;

import java.security.Principal;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import member.bean.MemberDTO;

public interface MemberService {

	public void login(Map<String, String> map);
	
	public String kakao(Map<String, String> map);

	public String checkId(String id);

	public int join(MemberDTO memberDTO);

	public MemberDTO getData(String id);

	public void update(MemberDTO memberDTO);

	public String  certify(Map<String, String> map);

	public void withdraw(Map<String, String> map);

	public MemberDTO findId(String mem_email);

	public MemberDTO findPwd(Map<String, String> map);

	public void resetPwd(String mem_pwd, String mem_email);

	public void sessionLogin(Map<String, String> map, HttpSession session);

	public String checkEmail(String mem_email);

	public int distinguishKakao(String mem_id);

	public void complain(Map<String, String> map);

	

}
