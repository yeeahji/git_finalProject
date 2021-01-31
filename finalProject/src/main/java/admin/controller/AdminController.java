package admin.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping(value="admin")
public class AdminController {
	
	//메인페이지
	@RequestMapping(value="/index", method=RequestMethod.GET)
	public String index() {
		return "/admin/index";
	}
	//전체회원리스트
	@RequestMapping(value="/memberList", method=RequestMethod.GET)
	public String memberList() {
		return "/admin/memberManagement/memberList.jsp";
	}
	//신고된회원리스트
	@RequestMapping(value="/reportedMemberList", method=RequestMethod.GET)
	public String reportedMemberList() {
		return "/admin/memberManagement/reportedMemberList.jsp";
	}
	//전체상품리스트
	@RequestMapping(value="/productList", method=RequestMethod.GET)
	public String productList() {
		return "/admin/memberManagement/productList.jsp";
	}
	//신고된상품리스트
	@RequestMapping(value="/reportedProductList", method=RequestMethod.GET)
	public String reportedProductList() {
		return "/admin/memberManagement/reportedProductList.jsp";
	}
	//전체상품리스트
	@RequestMapping(value="/storeList", method=RequestMethod.GET)
	public String storeList() {
		return "/admin/memberManagement/storeList.jsp";
	}
	//게시글리스트
	@RequestMapping(value="/boardList", method=RequestMethod.GET)
	public String boardList() {
		return "/admin/memberManagement/boardList.jsp";
	}
	//일대일문의리스트
	@RequestMapping(value="/boardList", method=RequestMethod.GET)
	public String memberQnaList() {
		return "/admin/memberManagement/memberQnaList.jsp";
	}
	//공지사항등록
	@RequestMapping(value="/boardList", method=RequestMethod.GET)
	public String noticeWrite() {
		return "/admin/memberManagement/noticeWrite.jsp";
	}
	
	
	
	
	
}
