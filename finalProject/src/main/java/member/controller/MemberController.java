package member.controller;

import java.io.IOException;
import java.text.DateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
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
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import member.bean.MemberDTO;
import member.bean.ZipcodeDTO;
import member.service.MemberService;

@Controller
@RequestMapping(value="member")
public class MemberController {
	@Autowired
	private MemberService memberService;
	
	@Autowired  
    JavaMailSender mailSender;  
	
	private static final Logger logger=LoggerFactory.getLogger(MemberController.class);
	private static final String String = null;
	
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
//	- 우편번호 확인 창
	@RequestMapping(value ="/postForm", method=RequestMethod.GET)
	public String checkPost() {
		return "/member/postForm";
	}
//	- 우편번호 가져오기
	@RequestMapping(value ="/searchPost", method=RequestMethod.POST)
	public ModelAndView searchPost(@RequestParam Map<String, String> map) {
		List<ZipcodeDTO> list = memberService.searchPost(map);
		
		ModelAndView mav = new ModelAndView();
		mav.setViewName("jsonView");
		mav.addObject("list", list);
		
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
	@RequestMapping(value = "/loginForm", method =RequestMethod.GET)
	public String loginForm() {
		return "/member/loginForm";
	}
//	- 로그인
	@RequestMapping(value = "/login", method =RequestMethod.POST)
	@ResponseBody
	public String login(@RequestParam Map<String, String> map, HttpSession session) {
		String kakaoNickname = map.get("id");
		String kakaoEmail = map.get("email");
		System.out.println("프로필 카카오 닉네임 : "+ kakaoNickname);
		System.out.println("카카오 이메일 : "+ kakaoEmail);
		return memberService.login(map, session );
	}

	
	
//	- 로그아웃
	@RequestMapping(value ="/logout", method=RequestMethod.GET)
	public String logout(HttpSession session) {
		session.invalidate(); 
		return "/index";
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
			System.out.println("recipient : "+recipient);
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
		}//else
//		System.out.println("mav : "+ mav);
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
		System.out.println("dto: "+memberDTO);
		
		if(memberDTO==null) {
			mav.addObject("member", null);
			mav.setViewName("jsonView");
		}else {
			int randomNum = new Random().nextInt(7845126);
			
			String sender = "brighthannah12@gmail.com";
			String recipient = mem_email;
			System.out.println("recipient : "+recipient);
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
     	System.out.println("마지막 : 내가 넣은 값 : "+certifyNum);
        System.out.println("마지막 : 랜덤넘버 : "+randomNum);
        
        ModelAndView mav = new ModelAndView();
        mav.setViewName("jsonView");
        mav.addObject("certifyNum",certifyNum);
        mav.addObject("randomNum",randomNum);

        return mav;
	}
//	- 비밀번호 재설정
	@ResponseBody
	@RequestMapping(value = "/resetPwd", method = RequestMethod.POST)
	public void resetPwd(@RequestParam String mem_pwd, String mem_email) {
		Map <String, String> map = new HashMap<String, String>();
		map.put("mem_pwd", mem_pwd);
		map.put("mem_email", mem_email);
		
		memberService.resetPwd(map);
	}
	
//	[회원정보수정] ===================================================================================
//	- 본인 재확인 페이지 이동
	@RequestMapping(value = "/certifyForm", method =RequestMethod.GET)
	public String certifyForm(HttpSession session, Model model) {
		model.addAttribute("display", "/member/certifyForm.jsp");
		
		return "/index";
	}
//	- 본인 재확인
	@ResponseBody
	@RequestMapping(value = "/certify", method =RequestMethod.POST)
	public String certify(@RequestParam String mem_id, @RequestParam String mem_pwd) {
		
		Map <String, String> map = new HashMap<String, String>();
		System.out.println(mem_id);
		System.out.println(mem_pwd);
		map.put("mem_id", mem_id);
		map.put("mem_pwd", mem_pwd);
		return memberService.certify(map);
	}
//	- 마이페이지 이동
	@RequestMapping(value = "/myPage", method =RequestMethod.GET)
	public String myPage(Model model) {
		model.addAttribute("display", "/member/myPage.jsp");
		return "/index";
	}
//	- 회원정보 페이지 이동
	@RequestMapping(value = "/updateForm", method =RequestMethod.GET)
	public String updateForm(HttpSession session, Model model) {
		String id = (String) session.getAttribute("memId");
		MemberDTO memberDTO = memberService.getData(id);
		
		String[] tel = memberDTO.getMem_tel().split("-",3);
		String[] email = memberDTO.getMem_email().split("@",2);
		
		Map<String, String> map = new HashMap<String, String>();
		map.put("tel1", tel[0]);
		map.put("tel2", tel[1]);
		map.put("tel3", tel[2]);
		map.put("email1", email[0]);
		map.put("email2", email[1]);
		
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
	public String withdraw(@RequestParam String id, HttpSession session) {
		
		memberService.withdraw(id);
		session.invalidate(); 
		return "/index";
	}
//	- 
	
}

















