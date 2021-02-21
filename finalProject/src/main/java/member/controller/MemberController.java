package member.controller;

import java.io.IOException;
import java.security.Principal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Random;

import javax.mail.internet.MimeMessage;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import member.bean.MemberDTO;
import member.service.MemberService;

@Controller
@RequestMapping(value="member")
public class MemberController {
	@Autowired
	private MemberService memberService;
	
	@Autowired  
    JavaMailSender mailSender;
	
//	[회원가입]===================================================================================
	@RequestMapping(value = "/joinForm", method =RequestMethod.GET)
	public String joinForm() {
		return "/member/joinForm";
	}
//	- 아이디 중복체크
	@RequestMapping(value ="/checkId", method=RequestMethod.POST)
	@ResponseBody
	public String checkId(@RequestParam String id) {
		return memberService.checkId(id);
	}
	
//	- 이메일 중복체크
	@RequestMapping(value ="/checkEmail", method=RequestMethod.POST)
	@ResponseBody
	public String checkEmail(@RequestParam String mem_email) {
		System.out.println("1:"+ mem_email);
		return memberService.checkEmail(mem_email);
	}
	
//	- 이메일 보내기
	@ResponseBody
	@RequestMapping(value ="/sendMail", method=RequestMethod.POST)
	public ModelAndView  sendMail(HttpServletRequest request, @RequestParam String mem_email)throws IOException  {
		
		//난수 발생
		int randomNum = new Random().nextInt(5784675);
		
		String sender = "brighthannah12@gmail.com";
		String recipient = mem_email;
		System.out.println("recipient : "+recipient);
		String title = "▣ 아나바다 마켓 회원가입 인증 이메일입니다 ▣";
		String content = System.getProperty("line.separator")
						+ System.getProperty("line.separator")
	                    + "안녕하세요. 아나바다 마켓 회원가입 본인인증용 발송 메일입니다."
	                    + System.getProperty("line.separator")
	                    + System.getProperty("line.separator")
	                    + " 인증번호는 " +randomNum+ " 입니다. "
	                    + System.getProperty("line.separator")
	                    + System.getProperty("line.separator")
	                    + "받으신 인증번호를 홈페이지에 입력해 주시면 다음으로 넘어갑니다."; 
		try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper messageHelper = new MimeMessageHelper(message,true, "UTF-8");

            messageHelper.setFrom(sender); // 보내는사람 생략하면 정상작동을 안함
            messageHelper.setTo(recipient); // 받는사람 이메일
            messageHelper.setSubject(title); // 메일제목은 생략이 가능하다
            messageHelper.setText(content); // 메일 내용
            
            mailSender.send(message);
        } catch (Exception e) {
            System.out.println(e);
        }
		ModelAndView mav = new ModelAndView(); 
        mav.addObject("randomNum", randomNum);
        mav.setViewName("jsonView");
        
        return mav;
	}
//	- 이메일 인증번호 확인
	@RequestMapping(value = "/confirmMail", method = RequestMethod.POST)
    public ModelAndView confirmMail(@RequestParam String emailNum, @RequestParam String randomNum, HttpServletResponse response_equals) throws IOException {
        ModelAndView mav = new ModelAndView();
        mav.setViewName("jsonView");
        mav.addObject("emailNum",emailNum);
        mav.addObject("randomNum",randomNum);

        return mav;
 
	}
//	- 회원가입
	@RequestMapping(value ="/join", method=RequestMethod.POST)
	public ModelAndView join(@ModelAttribute MemberDTO memberDTO) {
		memberService.join(memberDTO);
		return new ModelAndView("redirect:/");
 	}
	
	
	
//	[로그인]===================================================================================
//	- 로그인 페이지 이동
	@RequestMapping(value = "/loginForm", method={RequestMethod.GET, RequestMethod.POST})
	public String loginForm(Model model) { //headerLogin, security-context에서 GET방식, loginFailHandler에선 POST방식으로 오므로 둘 다 설정해줌 
		model.addAttribute("display", "/member/loginForm.jsp");
		return "/index";
	}
//	- 로그인
	@RequestMapping(value = "/login", method =RequestMethod.POST)
	@ResponseBody
	public void login(@RequestParam Map<String, String> map, HttpServletRequest request) {
		memberService.login(map);
		
	}
	@RequestMapping(value = "/sessionLogin", method =RequestMethod.POST)
	@ResponseBody
	public void sessionLogin(HttpServletRequest request, HttpSession session, Principal principal) {
		String sessionId = principal.getName();
		MemberDTO memberDTO =memberService.getData(sessionId);
	
		session.setAttribute("sessionId", memberDTO.getMem_id());
		session.setAttribute("sessionEmail", memberDTO.getMem_email());
		session.setAttribute("sessionKakao", memberDTO.getMem_kakao());
	}
//	- 카카오	
	@RequestMapping(value="/kakao", method=RequestMethod.POST)
	@ResponseBody
	public String kakao(@RequestParam Map<String, String> map) {
		List<GrantedAuthority> roles = new ArrayList<GrantedAuthority>(1); //권한 설정
		roles.add(new SimpleGrantedAuthority("ROLE_USER"));	
		User user = new User(map.get("mem_id"), "", roles); //계정 생성
		
		Authentication auth = new UsernamePasswordAuthenticationToken(user, null, roles); //인증하기
		SecurityContextHolder.getContext().setAuthentication(auth); //권한 부여

		return memberService.kakao(map);
	}

//	- 로그인 실패
	@RequestMapping(value="/loginFail", method=RequestMethod.POST)
	public String loginFail() throws Exception {
		return "/member/loginFail";
	}
//	- 로그인 거부(권한이 없을 때 접근 거부 페이지 = 403 에러 페이지)
	@RequestMapping(value="/accessDenied")
	public String accessDeniedPage() throws Exception {
		return "/member/accessDenied";
	}
//	- 중복 로그인
	@RequestMapping(value="/accessDuplicated")
	public String accessDuplicated() throws Exception {
		return "/member/accessDuplicated";
	}
//	- 로그아웃
	@RequestMapping(value ="/logout", method=RequestMethod.GET)
	public ModelAndView logout(HttpSession session) {
		session.invalidate(); 
		return new ModelAndView("redirect:/");
	}
	
	
	
//	[아이디 비번 찾기]===================================================================================
	
	@RequestMapping(value = "/findIdForm", method =RequestMethod.GET)
	public String findIdForm() {
		return "/member/findIdForm";
	}
//	- 아이디찾기
	@RequestMapping(value = "/findId", method =RequestMethod.POST)
	public ModelAndView findId(HttpServletRequest request, @RequestParam String mem_email)throws IOException  {
		
		ModelAndView mav = new ModelAndView(); 
		
		MemberDTO memberDTO = memberService.findId(mem_email);
		
		if(memberDTO==null) {
			mav.addObject("findId", null);
			mav.setViewName("jsonView");
		}else {
			String findId= memberDTO.getMem_id();
			
			String sender = "brighthannah12@gmail.com";
			String recipient = mem_email;
			String title = "▣ 아나바다 마켓 :: 아이디를 확인하세요 ▣";
			String content = System.getProperty("line.separator")
							+ System.getProperty("line.separator")
		                    + "안녕하세요. 아나바다 마켓 아이디 찾기 서비스 확인 메일입니다."
		                    + System.getProperty("line.separator")
		                    + System.getProperty("line.separator")
		                    + "고객님의 아이디는 '" +findId+ "'입니다. "
		                    + System.getProperty("line.separator")
		                    + System.getProperty("line.separator")
		                    + "이용해주셔서 감사합니다."; 
			try {
	            MimeMessage message = mailSender.createMimeMessage();
	            MimeMessageHelper messageHelper = new MimeMessageHelper(message,true, "UTF-8");

	            messageHelper.setFrom(sender); // 보내는사람 생략하면 정상작동을 안함
	            messageHelper.setTo(recipient); // 받는사람 이메일
	            messageHelper.setSubject(title); // 메일제목은 생략이 가능하다
	            messageHelper.setText(content); // 메일 내용
	            
	            mailSender.send(message);
	        } catch (Exception e) {
	            System.out.println(e);
	        }
			
	        mav.addObject("findId", findId);
	        mav.setViewName("jsonView");
		}
        return mav;
	}
//	- 비밀번호 찾기
	@RequestMapping(value = "/findPwd", method =RequestMethod.POST)
	@ResponseBody
	public ModelAndView findPwd(HttpServletRequest request, @RequestParam String mem_id, @RequestParam String mem_email)throws IOException  {
		
		ModelAndView mav = new ModelAndView(); 
		
		Map <String, String> map = new HashMap<String, String>();
		map.put("mem_id", mem_id);
		map.put("mem_email", mem_email);
		MemberDTO memberDTO = memberService.findPwd(map);
		
		if(memberDTO==null) {
			mav.addObject("member", null);
			mav.setViewName("jsonView");
		}else {
			int randomNum = new Random().nextInt(7845126);
			
			String sender = "brighthannah12@gmail.com";
			String recipient = mem_email;
			String title = "▣ 아나바다 마켓 :: 비밀번호 수정을 위한 인증번호를 확인하세요 ▣";
			String content = System.getProperty("line.separator")
							+ System.getProperty("line.separator")
		                    + "안녕하세요. 아나바다 마켓 비밀번호 수정용 본인 인증번호입니다."
		                    + System.getProperty("line.separator")
		                    + System.getProperty("line.separator")
		                    + "인증번호는 '" +randomNum+ "'입니다. "
		                    + System.getProperty("line.separator")
		                    + System.getProperty("line.separator")
		                    + "이용해주셔서 감사합니다."; 
			try {
	            MimeMessage message = mailSender.createMimeMessage();
	            MimeMessageHelper messageHelper = new MimeMessageHelper(message,true, "UTF-8");

	            messageHelper.setFrom(sender); // 보내는사람 생략하면 정상작동을 안함
	            messageHelper.setTo(recipient); // 받는사람 이메일
	            messageHelper.setSubject(title); // 메일제목은 생략이 가능하다
	            messageHelper.setText(content); // 메일 내용
	            
	            mailSender.send(message);
	        } catch (Exception e) {
	            System.out.println(e);
	        }
	        mav.addObject("randomNum", randomNum);
	        mav.setViewName("jsonView");
		}//else
        return mav;
	}
	
//	- 비밀번호용 인증코드 인증
	@RequestMapping(value = "/confirmPwdcode", method = RequestMethod.POST)
    public ModelAndView confirmPwdcode(@RequestParam String certifyNum, @RequestParam String randomNum, HttpServletResponse response_equals) throws IOException {
     	ModelAndView mav = new ModelAndView();
        mav.setViewName("jsonView");
        mav.addObject("certifyNum",certifyNum);
        mav.addObject("randomNum",randomNum);

        return mav;
	}
//	- 비밀번호 재설정(아이디/비번찾기)
	@ResponseBody
	@RequestMapping(value = "/resetPwd", method = RequestMethod.POST)
	public void resetPwd(@RequestParam String mem_pwd, String mem_email) {
		
		memberService.resetPwd(mem_pwd, mem_email);
	}
	
//	[회원정보수정] ===================================================================================
//	- 본인 재확인 페이지 이동
	@RequestMapping(value = "/certifyForm", method =RequestMethod.GET)
	public String certifyForm(HttpSession session, Model model, Principal principal) {
		int sessionKakao = memberService.distinguishKakao(principal.getName());
		if (sessionKakao==1) {
			model.addAttribute("display", "/member/myPage.jsp");
			return "/index";
		}
		model.addAttribute("display", "/member/certifyForm.jsp");
		return "/index";
	}
//	- 본인 재확인
	@ResponseBody
	@RequestMapping(value = "/certify", method =RequestMethod.POST)
	public String certify(@RequestParam String mem_id, @RequestParam String mem_pwd) {		
		Map <String, String> map = new HashMap<String, String>();
		map.put("mem_id", mem_id);
		map.put("mem_pwd", mem_pwd);
		
		return memberService.certify(map);
	}
//	- 마이페이지 이동
	@RequestMapping(value = "/myPage", method =RequestMethod.GET)
	public String myPage(HttpSession session, Model model) {
		model.addAttribute("id", (String) session.getAttribute("memId"));
		model.addAttribute("display", "/member/myPage.jsp");
		return "/index";
	}
//	- 회원정보 페이지 이동
	@RequestMapping(value = "/updateForm", method =RequestMethod.GET)
	public String updateForm(HttpSession session, Model model, Principal principal) {
		String id = (String) session.getAttribute("sessionId");
		System.out.println("id:"+id);
		MemberDTO memberDTO = memberService.getData(id);
		Map<String, Object> map = new HashMap<String, Object>();
		int sessionKakao = memberService.distinguishKakao(principal.getName());
		System.out.println("세션카카오"+sessionKakao);
		if (sessionKakao==0) {//일반로그인일 경우 전화번호 + 이메일 정보를 split하여 가져간다.
			String[] tel = memberDTO.getMem_tel().split("-",3);
			map.put("tel1", tel[0]);
			map.put("tel2", tel[1]);
			map.put("tel3", tel[2]);
		}
		System.out.println("dto:"+memberDTO);
		System.out.println("이메일 : "+memberDTO.getMem_email());
		String[] email = memberDTO.getMem_email().split("@",2);//카카오 로그인은 이메일만 split해서 가져간다.
		System.out.println(email);
		map.put("email1", email[0]);
		map.put("email2", email[1]);
		
		model.addAttribute("sessionKakao", sessionKakao);
		model.addAttribute("map", map);
		model.addAttribute("memberDTO", memberDTO);
		model.addAttribute("display", "/member/updateForm.jsp");
		
		return "/member/updateForm";
	}
//	- 회원정보 수정 
	@RequestMapping(value ="/update", method=RequestMethod.POST)
	public String update(@ModelAttribute MemberDTO memberDTO) {
		memberService.update(memberDTO);
		return "/index";
	}
//	- 탈퇴 페이지 이동
	@RequestMapping(value ="/withdrawForm", method=RequestMethod.GET)
	public String withdrawForm() {
		return "/member/withdrawForm";
	}
//	- 탈퇴
	@RequestMapping(value ="/withdraw", method=RequestMethod.POST)
	public ModelAndView withdraw(@RequestParam Map<String, String> map, HttpSession session) {
//		map:탈퇴사유 6항목 + 개선사항(주관식) 
		String mem_id = (String)session.getAttribute("sessionId");
		String mem_pwd = (((char)((int)(Math.random()*26)+65)) + ((Math.random()*9999999-1)+1))+"";
		//영문+숫자 랜덤조합. 이메일은 unique라 'out'이라는 중복값이 들어갈 수 없다
		String mem_email= (((char)((int)(Math.random()*26)+65)) + ((Math.random()*9999999-1)+1))+"";
		
		
		map.put("mem_id", mem_id);
		map.put("mem_pwd", mem_pwd); //탈퇴한 회원의 비밀번호에 난수 숫자를 입력하여 로그인 방지
		map.put("mem_email", mem_email);
		memberService.withdraw(map);
		session.invalidate(); 
		return new ModelAndView("redirect:/");
	}
	
//	===========================================================================
//	- 신고하기
	@ResponseBody
	@RequestMapping(value ="/complain", method=RequestMethod.POST)
	public void complain(@RequestParam Map<String, String> map) {
//		map : reporter_id(신고자), mem_id(신고당한 사람), complain_content(신고내용), ~_seq(신고항목),구분번호(complain_number)
		memberService.complain(map);
	}
	

//	===========================================================================
	//내 정보 겸 주소 불러오기(채팅 관련)
	@RequestMapping(value="getMyInfo", method=RequestMethod.POST) 
	@ResponseBody
	public ModelAndView getMyInfo(@RequestParam String mem_id) {
		MemberDTO memberDTO = memberService.getData(mem_id);
		String location = memberDTO.getMem_location();
				
		ModelAndView mav = new ModelAndView();
		mav.addObject("memberDTO", memberDTO);
		mav.addObject("location", location);
		mav.setViewName("jsonView");
		return mav;
	}
	
}

















