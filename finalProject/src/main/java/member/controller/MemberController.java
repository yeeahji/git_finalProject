package member.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
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
//	- 이메일 인증
//	@RequestMapping(value ="/sendMail", method=RequestMethod.POST)
//	public String sendMail(@ModelAttribute MemberDTO memberDTO) {
//		
//		return memberService.sendMail(id);
//	}
	
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
	
		
		return memberService.login(map, session );
	}
//	- 로그아웃
	@RequestMapping(value ="/logout", method=RequestMethod.GET)
	public String logout(HttpSession session) {
		session.invalidate(); 
		return "/index";
	}
//	[아이디 비번 찾기]===================================================================================
	@RequestMapping(value = "/findId", method =RequestMethod.GET)
	public String findId() {
		return "/member/findId";
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

















