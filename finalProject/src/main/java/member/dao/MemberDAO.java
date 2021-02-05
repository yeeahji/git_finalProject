package member.dao;

import java.util.List;
import java.util.Map;

import member.bean.MemberDTO;
import member.bean.ZipcodeDTO;

public interface MemberDAO {

	public List<String> getAuth(String mem_id);
	
	public MemberDTO login(Map<String, String> map);

	public MemberDTO checkId(String id);


	public int join(MemberDTO memberDTO);

	public MemberDTO getData(String id);

	public void update(MemberDTO memberDTO);

	public MemberDTO certify(Map<String, String> map);

	public void withdraw(String id);

	public MemberDTO findId(String mem_email);

	public MemberDTO findPwd(Map<String, String> map);

	public void resetPwd(Map<String, String> map);

	public MemberDTO checkEmail(String string);

	public void joinKakao(Map<String, String> map);

	public MemberDTO selectKakao(Map<String, String> map);

}
