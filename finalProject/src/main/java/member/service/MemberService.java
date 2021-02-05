package member.service;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import member.bean.MemberDTO;
import member.bean.ZipcodeDTO;

public interface MemberService {

	public String login(Map<String, String> map, HttpSession session);

	public String checkId(String id);


	public int join(MemberDTO memberDTO);

	public MemberDTO getData(String id);

	public void update(MemberDTO memberDTO);

	public String  certify(Map<String, String> map);

	public void withdraw(String id);

	public MemberDTO findId(String mem_email);

	public MemberDTO findPwd(Map<String, String> map);

	public void resetPwd(Map<String, String> map);

}
