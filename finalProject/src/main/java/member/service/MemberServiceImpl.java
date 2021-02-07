package member.service;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import member.bean.MemberDTO;
import member.dao.MemberDAO;

@Service
public class MemberServiceImpl implements MemberService, UserDetailsService {
	@Autowired
	private MemberDAO memberDAO;
	@Autowired
	private BCryptPasswordEncoder pwEncoder;
	@Autowired
	private JavaMailSenderImpl mailSender;

//	[시큐리티: 시큐리티에 사용자 정보 가져오기] ----------------------------------------------------------
	@Override
	public UserDetails loadUserByUsername(String mem_id) throws UsernameNotFoundException {
		MemberDTO memberDTO = memberDAO.getData(mem_id); //사용자 정보 가져오기
		
		if(memberDTO == null) { //사용자 정보 없으면 null 처리
			//return null;
			throw new UsernameNotFoundException(mem_id);
			//자꾸 null 뜨는데.. 해결할 방법? throw 하면 
			
		} else { //사용자 정보 있으면 값 넣기
			memberDTO.setUsername(memberDTO.getMem_id()); //사용자 인증 가져오기
			memberDTO.setPassword(memberDTO.getMem_pwd());
			memberDTO.setAuthorities(memberDAO.getAuth(mem_id)); //사용자 권한 인증 가져오기
			
			System.out.println(memberDAO.getAuth(mem_id));
			
			return memberDTO;
		}
		
	}
	
//	[회원가입] ----------------------------------------------------------
	@Override
	public String checkId(String id) {
		MemberDTO memberDTO = memberDAO.checkId(id);
		
		if(memberDTO == null) {//사용 가능			
			return "non_exist";
		}
		else //사용 불가
			return "exist";
	}
	@Override
	public String checkEmail(String mem_email) {
		MemberDTO memberDTO = memberDAO.checkEmail(mem_email);
		if(memberDTO == null) {//사용 가능			
			return "non_exist";
		}
		else //사용 불가
			return "exist";
	}

	@Override
	public int join(MemberDTO memberDTO) {
		//패스워드 암호화
		memberDTO.setMem_pwd(pwEncoder.encode(memberDTO.getMem_pwd()));
	
		return memberDAO.join(memberDTO);
	}
	
//	[로그인] ----------------------------------------------------------
	public void login(Map<String, String> map) {
		memberDAO.login(map);
	}
	@Override
	public void sessionLogin(Map<String, String> map, HttpSession session) {
		
		MemberDTO memberDTO = memberDAO.sessionLogin(map);
		session.setAttribute("memName", memberDTO.getMem_name());
		session.setAttribute("memId", memberDTO.getMem_id());
		session.setAttribute("memEmail", memberDTO.getMem_email());
		session.setAttribute("memKakao", memberDTO.getMem_kakao());
		System.out.println("세션 정보 : "+session.getAttribute("memId"));
		
	}
//	@Override
//	public String kakao(MemberDTO memberDTO) {
//		//카카오로 최초 로그인 시 회원가입 시키기
//		if(memberDAO.getData(memberDTO.getMem_id()) == null) {
//			memberDAO.join(memberDTO); 
//		}
//		
//		loadUserByUsername(memberDTO.getMem_id());
//
//		
//		return "success";
//	}
	
	@Override
	public String kakao(Map<String, String> map) {
		//카카오로 최초 로그인 시 회원가입 시키기
		if(memberDAO.getData(map.get("mem_id")) == null) {
			MemberDTO memberDTO = new MemberDTO();
			memberDTO.setMem_id(map.get("mem_id"));
			memberDTO.setMem_name(map.get("mem_name"));
			memberDTO.setMem_email(map.get("mem_id"));
			memberDTO.setEnabled(true);
			memberDTO.setAuthorities(Arrays.asList(new String[]{"ROLE_USER"}));
		
			memberDAO.joinKakao(memberDTO); 
		}
		return "success";
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
		MemberDTO memberDTO = memberDAO.getData(map.get("mem_id"));
		
		//pwEncoder.matches : (사용자가 입력한 패스워드(평문), 암호화된 패스워드)를 비교해주는 메소드
		if(pwEncoder.matches(map.get("mem_pwd"), memberDTO.getMem_pwd())) //인증 성공		
			return "yes";
		else 
			return "no";
	}

	@Override
	public void withdraw(Map<String, String> map) {
		memberDAO.withdraw(map);
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

	@Override
	public int distinguishKakao(String mem_id) {
		
		return memberDAO.distinguishKakao(mem_id);
	}

	

	




	
}
