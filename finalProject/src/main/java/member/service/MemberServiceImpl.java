package member.service;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.stereotype.Service;

import member.bean.MemberDTO;
import member.bean.ZipcodeDTO;
import member.dao.MemberDAO;

@Service
public class MemberServiceImpl implements MemberService {
	@Autowired
	private MemberDAO memberDAO;
	@Autowired
	private JavaMailSenderImpl mailSender;
	
//	[회원가입] ----------------------------------------------------------
	@Override
	public String checkId(String id) {
		MemberDTO memberDTO = memberDAO.checkId(id);
		
		if(memberDTO == null) //사용 가능
			return "non_exist";
		else //사용 불가
			return "exist";
	}

	@Override
	public List<ZipcodeDTO> searchPost(Map<String, String> map) {
		return memberDAO.searchPost(map);
	}

	@Override
	public int join(MemberDTO memberDTO) {
		return memberDAO.join(memberDTO);
	}
	
//	[로그인] ----------------------------------------------------------
	@Override
	public String login(Map<String, String> map, HttpSession session) {
//		카카오로그인 시
		if (map.get("email")!=null) {
			session.setAttribute("memId", map.get("id"));
			session.setAttribute("memEmail", map.get("email"));
			return "success";
		}
//		일반 로그인 시 
		MemberDTO memberDTO = memberDAO.login(map);
		
		if(memberDTO == null) {
			return "fail";
		}else {
			session.setAttribute("memName", memberDTO.getMem_name());
			session.setAttribute("memId", memberDTO.getMem_id());
			session.setAttribute("memEmail", memberDTO.getMem_email());
			return "success";
		}
	}
	
	@Override
	public MemberDTO getData(String id) {
		return memberDAO.getData(id);
	}

	@Override
	public void update(MemberDTO memberDTO) {
		memberDAO.update(memberDTO);
	}

	@Override
	public String  certify(Map<String, String> map) {
		MemberDTO memberDTO = memberDAO.certify(map);
		if(memberDTO == null)//인증 실패 
			return "no";
		else 
			return "yes";
	}

	@Override
	public void withdraw(String id) {
		memberDAO.withdraw(id);
	}

	@Override
	public MemberDTO findId(String mem_email) {
		MemberDTO memberDTO = memberDAO.findId(mem_email);
		
		if(memberDTO == null) {
			return null;
		}else {
			return memberDTO;
		}
	}

	@Override
	public MemberDTO findPwd(Map<String, String> map) {
		MemberDTO memberDTO = memberDAO.findPwd(map);
		
		if(memberDTO == null) {
			return null;
		}else {
			return memberDTO;
		}
	}

	@Override
	public void resetPwd(Map<String, String> map) {
		memberDAO.resetPwd(map);
		
	}
	
}
