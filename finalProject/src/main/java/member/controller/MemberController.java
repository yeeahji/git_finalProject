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


//담당 : 김명경 / SpringSecurity 이예지
@Controller
@RequestMapping(value="member")
public class MemberController {
	@Autowired
	private MemberService memberService;
	
	@Autowired  
    JavaMailSender mailSender;
	
//	[회원가입]===================================================================================
//	회원가입 페이지 이동(by명경)
	@RequestMapping(value = "/joinForm", method =RequestMethod.GET)
	public String joinForm() {
		return "/member/joinForm";
	}
//	- 아이디 중복체크(by명경)
	@RequestMapping(value ="/checkId", method=RequestMethod.POST)
	@ResponseBody
	public String checkId(@RequestParam String id) {
		return memberService.checkId(id);
	}
	
//	- 이메일 중복체크(by명경)
	@RequestMapping(value ="/checkEmail", method=RequestMethod.POST)
	@ResponseBody
	public String checkEmail(@RequestParam String mem_email) {
		System.out.println("1:"+ mem_email);
		return memberService.checkEmail(mem_email);
	}
	
//	- 이메일 보내기(by명경)
	@ResponseBody
	@RequestMapping(value ="/sendMail", method=RequestMethod.POST)
	public ModelAndView  sendMail(HttpServletRequest request, @RequestParam String mem_email)throws IOException  {
		
		//난수 발생(이메일 인증 확인 코드용)
		int randomNum = new Random().nextInt(5784675);
		
		String sender = "brighthannah12@gmail.com"; 
		String recipient = mem_email;
		
		//메일 제목
		String title = "▣ 아나바다 마켓 회원가입 인증 이메일입니다 ▣"; 
		//메일 내용
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
//	- 이메일 인증번호 확인(by명경)
	@RequestMapping(value = "/confirmMail", method = RequestMethod.POST)
    public ModelAndView confirmMail(@RequestParam String emailNum, @RequestParam String randomNum, HttpServletResponse response_equals) throws IOException {
        ModelAndView mav = new ModelAndView();
        mav.setViewName("jsonView");
        mav.addObject("emailNum",emailNum);
        mav.addObject("randomNum",randomNum);

        return mav;
	}
//	- 회원가입(by명경)
	@RequestMapping(value ="/join", method=RequestMethod.POST)
	public ModelAndView join(@ModelAttribute MemberDTO memberDTO) {
		memberService.join(memberDTO);
		return new ModelAndView("redirect:/"); //회원가입 후, 메인 화면으로 바로 이동
 	}
	
	
	
//	[로그인]===================================================================================
//	- 로그인 페이지 이동(by명경)
	@RequestMapping(value = "/loginForm", method={RequestMethod.GET, RequestMethod.POST})
	public String loginForm(Model model) { //headerLogin, security-context에서 GET방식, loginFailHandler에선 POST방식으로 오므로 둘 다 설정해줌 
		model.addAttribute("display", "/member/loginForm.jsp");
		return "/index";
	}
//	- 로그인(by명경)
	@RequestMapping(value = "/login", method =RequestMethod.POST)
	@ResponseBody
	public void login(@RequestParam Map<String, String> map, HttpServletRequest request) {
		memberService.login(map);
		
	}
//	- 로그인 정보 세션 저장(by명경)
	@RequestMapping(value = "/sessionLogin", method =RequestMethod.POST)
	@ResponseBody
	public void sessionLogin(HttpServletRequest request, HttpSession session, Principal principal) {
		String sessionId = principal.getName();
		MemberDTO memberDTO =memberService.getData(sessionId);
	
		session.setAttribute("sessionId", memberDTO.getMem_id());
		session.setAttribute("sessionEmail", memberDTO.getMem_email());
		session.setAttribute("sessionKakao", memberDTO.getMem_kakao());
	}
//	- 카카오로그인(by 명경/예지)
	@RequestMapping(value="/kakao", method=RequestMethod.POST)
	@ResponseBody
	public String kakao(@RequestParam Map<String, String> map) {
		//map: mem_id (카카오 이메일 들어있음).
		List<GrantedAuthority> roles = new ArrayList<GrantedAuthority>(1); //권한 설정
		roles.add(new SimpleGrantedAuthority("ROLE_USER"));	//일반 사용자(ROLE_USER) 권한 부여
		User user = new User(map.get("mem_id"), "", roles); //계정 생성
		
		Authentication auth = new UsernamePasswordAuthenticationToken(user, null, roles); //인증하기
		SecurityContextHolder.getContext().setAuthentication(auth); //권한 부여

		return memberService.kakao(map);
	}

//	- 로그인 실패(by 예지)
	@RequestMapping(value="/loginFail", method=RequestMethod.POST)
	public String loginFail() throws Exception {
		return "/member/loginFail";
	}
//	- 로그인 거부(권한이 없을 때 접근 거부 페이지 = 403 에러 페이지)(by 예지)
	@RequestMapping(value="/accessDenied")
	public String accessDeniedPage() throws Exception {
		return "/member/accessDenied";
	}
//	- 중복 로그인(by 예지)
	@RequestMapping(value="/accessDuplicated")
	public String accessDuplicated() throws Exception {
		return "/member/accessDuplicated";
	}
//	- 로그아웃(by 명경)
	@RequestMapping(value ="/logout", method=RequestMethod.GET)
	public ModelAndView logout(HttpSession session) {
		session.invalidate(); 
		return new ModelAndView("redirect:/");
	}
	
//	[아이디 비번 찾기]===================================================================================
	//아이디 비번 찾기 페이지 이동 (by 명경)
	@RequestMapping(value = "/findIdForm", method =RequestMethod.GET)
	public String findIdForm() {
		return "/member/findIdForm";
	}
//	- 아이디찾기(이메일 입력-> 이메일로 아이디 발송)(by 명경)
	@RequestMapping(value = "/findId", method =RequestMethod.POST)
	public ModelAndView findId(HttpServletRequest request, @RequestParam String mem_email)throws IOException  {
		
		ModelAndView mav = new ModelAndView(); 
		
		//이메일로 memberDTO값 전체 가져오기. 아이디 찾기는 이메일(unique)를 통해서만 이루어진다. 
		MemberDTO memberDTO = memberService.findId(mem_email);
		
		if(memberDTO==null) {//해당 이메일이 없을 경우(가입되지 않은 회원일 경우)
			mav.addObject("findId", null);
			mav.setViewName("jsonView"); //findId에 null을 담아 페이지로 이동(페이지에서 '등록되지 않은 이메일~' div 경고창 뜬다)
		}else {
			//이메일 확인 후, 해당 이메일로 메일 발송
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
//	            																↑멀티파트 형식으로 보낸다

	            messageHelper.setFrom(sender); // 보내는사람. 생략하면 정상작동을 안함
	            messageHelper.setTo(recipient); // 받는사람 이메일
	            messageHelper.setSubject(title); // 메일제목. (생략가능)
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
//	- 비밀번호 찾기(이메일/아이디 입력 -> 이메일로 인증번호 발송 -> 인증번호 확인 -> 비밀번호 변경&재확인)(by 명경)
	@RequestMapping(value = "/findPwd", method =RequestMethod.POST)
	@ResponseBody
	public ModelAndView findPwd(HttpServletRequest request, @RequestParam String mem_id, @RequestParam String mem_email)throws IOException  {
		
		ModelAndView mav = new ModelAndView(); 
		
		//비밀번호 찾기에는 아이디와 이메일을 모두 받는다.
		Map <String, String> map = new HashMap<String, String>();
		map.put("mem_id", mem_id);
		map.put("mem_email", mem_email);
		MemberDTO memberDTO = memberService.findPwd(map);
		
		if(memberDTO==null) {//가입되지 않은 회원일 경우
			mav.addObject("member", null);
			mav.setViewName("jsonView");
		}else {
			int randomNum = new Random().nextInt(7845126);//이메일 본인인증 난수 번호
			
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

	            messageHelper.setFrom(sender); // 보내는사람. 생략하면 정상작동을 안함
	            messageHelper.setTo(recipient); // 받는사람 이메일
	            messageHelper.setSubject(title); // 메일제목(생략가능)
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
	
//	- 비밀번호용 인증코드 인증(by 명경)
	@RequestMapping(value = "/confirmPwdcode", method = RequestMethod.POST)
    public ModelAndView confirmPwdcode(@RequestParam String certifyNum, @RequestParam String randomNum, HttpServletResponse response_equals) throws IOException {
     	ModelAndView mav = new ModelAndView();
        mav.setViewName("jsonView");
        mav.addObject("certifyNum",certifyNum);
        mav.addObject("randomNum",randomNum);

        return mav;
	}
//	- 비밀번호 재설정(아이디/비번찾기)(by 명경)
	@ResponseBody
	@RequestMapping(value = "/resetPwd", method = RequestMethod.POST)
	public void resetPwd(@RequestParam String mem_pwd, String mem_email) {
		
		memberService.resetPwd(mem_pwd, mem_email);
	}
	
//	[회원정보수정] ===================================================================================
//	- 본인 재확인 페이지 이동(마이페이지 입장 전, 본인 재확인 페이지)(by 명경)
	@RequestMapping(value = "/certifyForm", method =RequestMethod.GET)
	public String certifyForm(HttpSession session, Model model, Principal principal) {
		
		//마이페이지 이동 시, 카카오 회원이라면 비밀번호 재입력 x
		int sessionKakao = memberService.distinguishKakao(principal.getName());
		
		//카카오 회원이라면, 마이페이지로 이동
		if (sessionKakao==1) {
			model.addAttribute("display", "/member/myPage.jsp");
			return "/index";
		}
		//일반 회원이라면, 비밀번호 재입력 페이지로 이동
		else {
			model.addAttribute("display", "/member/certifyForm.jsp");
			return "/index";
		}
	}
//	- 본인 재확인 작업(by 명경)
	@ResponseBody
	@RequestMapping(value = "/certify", method =RequestMethod.POST)
	public String certify(@RequestParam String mem_id, @RequestParam String mem_pwd) {		
		Map <String, String> map = new HashMap<String, String>();
		map.put("mem_id", mem_id);
		map.put("mem_pwd", mem_pwd);
		
		return memberService.certify(map);
	}
//	- 마이페이지 이동(by 명경)
	@RequestMapping(value = "/myPage", method =RequestMethod.GET)
	public String myPage(HttpSession session, Model model) {
		model.addAttribute("id", (String) session.getAttribute("memId"));
		model.addAttribute("display", "/member/myPage.jsp");
		return "/index";
	}
//	- 회원정보 페이지 이동(by 명경)
	@RequestMapping(value = "/updateForm", method =RequestMethod.GET)
	public String updateForm(HttpSession session, Model model, Principal principal) {
		String id = (String) session.getAttribute("sessionId");
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
		map.put("email1", email[0]);
		map.put("email2", email[1]);
		
		model.addAttribute("sessionKakao", sessionKakao);
		model.addAttribute("map", map);
		model.addAttribute("memberDTO", memberDTO);
		model.addAttribute("display", "/member/updateForm.jsp");
		
		return "/member/updateForm";
	}
//	- 회원정보수정 페이지 이동(by 명경)
	@RequestMapping(value ="/update", method=RequestMethod.POST)
	public String update(@ModelAttribute MemberDTO memberDTO) {
		memberService.update(memberDTO);
		return "/index";
	}
//	- 회원탈퇴 페이지 이동(by 명경)
	@RequestMapping(value ="/withdrawForm", method=RequestMethod.GET)
	public String withdrawForm() {
		return "/member/withdrawForm";
	}
//	- 회원 탈퇴(by 명경)
	@RequestMapping(value ="/withdraw", method=RequestMethod.POST)
	public ModelAndView withdraw(@RequestParam Map<String, String> map, HttpSession session) {
		//map:탈퇴사유 6항목 + 개선사항(주관식) 
		
		//탈퇴 시, db에서 데이터를 삭제하지 않고, 아이디-유지, 비밀번호/이메일-난수 처리, 권한-없음, 기타 varchar2값-out으로 설정한다.
		//(데이터를 삭제하면, 탈퇴한 아이디로 타인이 가입하여, 탈퇴한 사람의 행세를 할 수 있기 때문)
		String mem_id = (String)session.getAttribute("sessionId");
		String mem_pwd = (((char)((int)(Math.random()*26)+65)) + ((Math.random()*9999999-1)+1))+"";
		//영문+숫자 랜덤조합. 
		//이메일은 unique라 'out'이라는 중복값이 들어갈 수 없다. 하지만 해당 아이디로 재가입할 수 있기 때문에 값을 저장하고 있을 수도 없다. 하여 난수를 대신 저장한다
		String mem_email= (((char)((int)(Math.random()*26)+65)) + ((Math.random()*9999999-1)+1))+"";
		
		map.put("mem_id", mem_id);
		map.put("mem_pwd", mem_pwd); //탈퇴한 회원의 비밀번호에 난수 숫자를 입력하여 로그인 방지
		map.put("mem_email", mem_email);
		memberService.withdraw(map);
		session.invalidate(); //세션 삭제
		return new ModelAndView("redirect:/");
	}
	
//	[신고하기]===========================================================================
//	신고 접수(by 명경)
	@ResponseBody
	@RequestMapping(value ="/complain", method=RequestMethod.POST)
	public void complain(@RequestParam Map<String, String> map) {
//		map : reporter_id(신고자), mem_id(신고당한 사람), complain_content(신고내용), ~_seq(신고항목),구분번호(complain_number.신고db seq)
		memberService.complain(map);
	}
	

//	===========================================================================
	//내 정보 겸 주소 불러오기(채팅 관련). by 예지
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

















