package admin.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import admin.bean.AdminBoardPaging;
import admin.bean.AdminMembersDTO;
import admin.service.AdminService;
import member.bean.MemberDTO;
import product.bean.ProductDTO;
import store.bean.StoreDTO;


@Controller
@RequestMapping(value="admin")
public class AdminController {
	@Autowired
	private AdminService adminService;
	
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
	public String memberList(@RequestParam(required=false, defaultValue="1") String pg,
							 @RequestParam(required=false, defaultValue="20") String viewNum,
							 Model model) {
		model.addAttribute("pg", pg);
		model.addAttribute("viewNum", viewNum);
		return "/admin/adminPage/memberList";
	}
	//전체상품리스트
	@RequestMapping(value="/productList", method=RequestMethod.GET)
	public String productList(@RequestParam(required=false, defaultValue="1") String pg,
							  @RequestParam(required=false, defaultValue="20") String viewNum,
							  Model model) {
		model.addAttribute("pg", pg);
		model.addAttribute("viewNum", viewNum);
		return "/admin/adminPage/productList";
	}
	//전체상점리스트
	@RequestMapping(value="/storeList", method=RequestMethod.GET)
	public String storeList(@RequestParam(required=false, defaultValue="1") String pg,
						    @RequestParam(required=false, defaultValue="20") String viewNum,
							Model model) {
		model.addAttribute("pg", pg);
		model.addAttribute("viewNum", viewNum);
		return "/admin/adminPage/storeList";
	}
	//게시글리스트
	@RequestMapping(value="/boardList", method=RequestMethod.GET)
	public String boardList() {
		return "/admin/adminPage/boardList";
	}
	//공지사항
	@RequestMapping(value="/noticeMG", method=RequestMethod.GET)
	public String noticeWrite() {
		return "/admin/adminPage/noticeMG";
	}
	//고객상담관리
	@RequestMapping(value="/memberQna", method=RequestMethod.GET)
	public String memberQna() {
		return "/admin/adminPage/memberQna";
	}
	//고객상담관리
	@RequestMapping(value="/complainList", method=RequestMethod.GET)
	public String complainList() {
		return "/admin/adminPage/complainList";

	}
	
	
	
	//회원정보출력
	@RequestMapping(value="/getMemberList", method=RequestMethod.GET)
	public ModelAndView getMemberList(@RequestParam(required=false, defaultValue="1") String pg,
									  @RequestParam(required=false, defaultValue="20") String viewNum) {
		List<MemberDTO> list = adminService.getMemberList(pg,viewNum);
		//페이징처리
		AdminBoardPaging adminBoardPaging = adminService.boardPaging(pg,viewNum);
		//전체회원수
		int totalMember = adminService.totalMember();

		ModelAndView mav = new ModelAndView();
		mav.addObject("list", list);
		mav.addObject("pg", pg);
		mav.addObject("viewNum", viewNum);
		mav.addObject("adminBoardPaging", adminBoardPaging);
		mav.addObject("totalMember", totalMember);
		mav.setViewName("jsonView");
		return mav;
	}
	
	//회원조건검색
	@RequestMapping(value="/getSearchMember", method=RequestMethod.POST)
		public ModelAndView getSearchMember(@RequestParam Map<String,String> map) {
		List<MemberDTO> list = adminService.getSearchMember(map); //pg, keyword, searchType, viewNum
		
		//페이징 처리
		AdminBoardPaging adminBoardPaging = adminService.searchBoardPaging(map);
		
		ModelAndView mav = new ModelAndView();
		mav.addObject("pg", map.get("pg"));
		mav.addObject("list", list);
		mav.addObject("adminBoardPaging", adminBoardPaging);
		mav.setViewName("jsonView");
		return mav;
	}
	//회원정보
	@RequestMapping(value="/memberView", method=RequestMethod.POST)
	public ModelAndView memberView(@RequestParam String id) {	
		AdminMembersDTO adminMembersDTO= adminService.getMemberView(id);
		//판매중인물건 총갯수
		int totalSellProduct = adminService.totalSellProduct(id);
		
		ModelAndView mav = new ModelAndView();
		mav.addObject("adminMembersDTO", adminMembersDTO);
		mav.addObject("totalSellProduct", totalSellProduct);
		mav.setViewName("jsonView");
	
		return mav;
	}
	
	
	
	//상점전체 출력
	@RequestMapping(value="/getStoreList", method=RequestMethod.GET)
	public ModelAndView getStoreList(@RequestParam(required=false, defaultValue="1") String pg,
			  						 @RequestParam(required=false, defaultValue="20") String viewNum) {
		List<StoreDTO> storeList = adminService.getStoreList(pg,viewNum);
		//페이징처리
		AdminBoardPaging adminStoreBP = adminService.StoreBP(pg,viewNum);
				
		ModelAndView mav = new ModelAndView();
		mav.addObject("storeList", storeList);
		mav.addObject("pg", pg);
		mav.addObject("viewNum", viewNum);
		mav.addObject("adminStoreBP", adminStoreBP);
		mav.setViewName("jsonView");
		return mav;
	}
	//상점정보 출력
	@RequestMapping(value="/getStoreView", method=RequestMethod.GET)
	public ModelAndView getstoreView(@RequestParam String id) {	
		AdminMembersDTO adminMembersDTO= adminService.getStoreView(id);
		//판매중인물건 총갯수
		int totalSellProduct = adminService.totalSellProduct(id);
		//상품정보
		List<ProductDTO> productList = adminService.getStore_ProductList(id);
		//후기 총 개수
		int reviewTotalA = adminService.storeReviewTotalA(id);
		
		ModelAndView mav = new ModelAndView();
		mav.addObject("adminMembersDTO",adminMembersDTO);
		mav.addObject("productList",productList);
		mav.addObject("totalSellProduct",totalSellProduct);
		mav.addObject("reviewTotalA",reviewTotalA);
		mav.setViewName("jsonView");
	
		return mav;
	}
	//상점조건검색
	@RequestMapping(value="/getSearchStoreList", method=RequestMethod.POST)
	public ModelAndView getSearchStoreList(@RequestParam Map<String,String> map) {
	List<StoreDTO> storeList = adminService.getSearchStoreList(map); //pg, keyword, searchType, viewNum
	
	//페이징 처리
	AdminBoardPaging adminStoreBP = adminService.getSearchStoreBP(map);
	
	ModelAndView mav = new ModelAndView();
	mav.addObject("pg", map.get("pg"));
	mav.addObject("storeList", storeList);
	mav.addObject("adminStoreBP", adminStoreBP);
	mav.setViewName("jsonView");
	return mav;
	}

	//상점_물품삭제
	@RequestMapping(value="/store_productDelete", method=RequestMethod.GET)
	public ModelAndView store_productDelete(String[] check) {
		System.out.println("check값 = "+check);
		
		adminService.store_productDelete(check);
		return new ModelAndView("redirect:/admin/storeList");
	}

	//신고 내역 출력
//	@RequestMapping(value="/getComplainList", method=RequestMethod.POST)
//	public ModelAndView getComplainList(@RequestParam(required=false, defaultValue="1") String pg,
//				  						 @RequestParam(required=false, defaultValue="20") String viewNum) {
//		List<StoreDTO> complainList = adminService.getComplainList(pg,viewNum);
//		//페이징처리
//		AdminBoardPaging adminStoreBP = adminService.StoreBP(pg,viewNum);
//				
//		ModelAndView mav = new ModelAndView();
//		mav.addObject("complainList", complainList);
//		mav.addObject("pg", pg);
//		mav.addObject("viewNum", viewNum);
//		mav.addObject("adminStoreBP", adminStoreBP);
//		mav.setViewName("jsonView");
//		return mav;
//	}
	
	//물품리스트 출력
	@RequestMapping(value="/getProductAllList", method=RequestMethod.GET)
	@ResponseBody
	public ModelAndView getProductAllList(@RequestParam(required=false, defaultValue="1") String pg,
			  						      @RequestParam(required=false, defaultValue="20") String viewNum) {
		List<ProductDTO> productAllList = adminService.getProductAllList(pg,viewNum);
		//페이징처리
		AdminBoardPaging adminProductBP = adminService.ProductBP(pg,viewNum);
		ModelAndView mav = new ModelAndView();
		mav.addObject("productAllList", productAllList);
		mav.addObject("pg", pg);
		mav.addObject("viewNum", viewNum);
		mav.addObject("adminProductBP", adminProductBP);
		mav.setViewName("jsonView");
		return mav;
	}
	//물품관련 상세정보
	@RequestMapping(value="/getProductView", method=RequestMethod.GET)
	public ModelAndView getProductView(@RequestParam String seq) {	
		AdminMembersDTO adminMembersDTO= adminService.getProductView(seq);
		
		ModelAndView mav = new ModelAndView();
		mav.addObject("adminMembersDTO", adminMembersDTO);
		mav.setViewName("jsonView");
	
		return mav;
	}
	//물품 조건검색
	@RequestMapping(value="/getSearchProductList", method=RequestMethod.POST)
	public ModelAndView getSearchProductList(@RequestParam Map<String,String> map) {
	List<ProductDTO> productList = adminService.getSearchProductList(map); //pg, keyword, searchType, viewNum
	
	//페이징 처리
	AdminBoardPaging adminProductBP = adminService.getSearchProductBP(map);
	
	ModelAndView mav = new ModelAndView();
	mav.addObject("pg", map.get("pg"));
	mav.addObject("productList", productList);
	mav.addObject("adminProductBP", adminProductBP);
	mav.setViewName("jsonView");
	return mav;
	}
	
	//상점_정보출력 후 물품 정렬
	@RequestMapping(value="/getStoreViewOrderby", method=RequestMethod.GET)
	public ModelAndView getStoreViewOrderby(@RequestParam Map<String,String> map) {
		List<ProductDTO> productList = adminService.getStoreViewOrderby(map);
		
		ModelAndView mav = new ModelAndView();
		mav.addObject("pg", map.get("pg"));
		mav.addObject("productList", productList);
		mav.setViewName("jsonView");
		return mav;
	}
	
	
	
	
	
}
