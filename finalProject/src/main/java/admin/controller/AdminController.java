package admin.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import admin.bean.BoardPaging;
import admin.bean.TestMemberDTO;
import admin.service.TestMemberService;

@Controller
@RequestMapping(value="admin")
public class AdminController {
	@Autowired
	private TestMemberService testMemberService;
	
	//메인페이지
	@RequestMapping(value="/adminIndex", method=RequestMethod.GET)
	public String index() {
		return "/admin/adminIndex";
	}
	//로그인
	@RequestMapping(value="/login", method=RequestMethod.GET)
	public String login() {
		return "/admin/login";
	}
	//전체회원리스트
	@RequestMapping(value="/memberList", method=RequestMethod.GET)
	public String memberList() {
		return "/admin/memberManagement/memberList";
	}
	//신고된회원리스트
	@RequestMapping(value="/reportedMemberList", method=RequestMethod.GET)
	public String reportedMemberList() {
		return "/admin/memberManagement/reportedMemberList";
	}
	//전체상품리스트
	@RequestMapping(value="/productList", method=RequestMethod.GET)
	public String productList() {
		return "/admin/memberManagement/productList";
	}
	//신고된상품리스트
	@RequestMapping(value="/reportedProductList", method=RequestMethod.GET)
	public String reportedProductList() {
		return "/admin/memberManagement/reportedProductList";
	}
	//전체상품리스트
	@RequestMapping(value="/storeList", method=RequestMethod.GET)
	public String storeList() {
		return "/admin/memberManagement/storeList";
	}
	//게시글리스트
	@RequestMapping(value="/boardList", method=RequestMethod.GET)
	public String boardList() {
		return "/admin/memberManagement/boardList";
	}
	//일대일문의리스트
	@RequestMapping(value="/memberQnaList", method=RequestMethod.GET)
	public String memberQnaList() {
		return "/admin/memberManagement/memberQnaList";
	}
	//공지사항등록
	@RequestMapping(value="/noticeWrite", method=RequestMethod.GET)
	public String noticeWrite() {
		return "/admin/memberManagement/noticeWrite";
	}
	
	
	
	//회원정보출력
	@RequestMapping(value="/getMemberList", method=RequestMethod.GET)
	public ModelAndView getMemberList(@RequestParam(required=false, defaultValue="1") String pg) {
		List<TestMemberDTO> list = testMemberService.getMemberList();
		
		//페이징처리
		BoardPaging boardPaging = testMemberService.boardPaging(pg);
				
		ModelAndView mav = new ModelAndView();
		mav.addObject("list", list);
		mav.addObject("pg", pg);
		mav.setViewName("jsonView");
		return mav;
	}
	
	
}
