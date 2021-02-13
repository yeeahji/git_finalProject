package admin.controller;

import java.util.HashMap;
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
import admin.bean.QnaDTO;
import admin.bean.WithdrawDTO;
import admin.service.AdminService;
import board.bean.CommentDTO;
import member.bean.ComplainDTO;
import member.bean.MemberDTO;
import product.bean.ProductDTO;
import store.bean.ReviewDTO;
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
	//탈퇴 사유 분석
	@RequestMapping(value="/withdrawList", method=RequestMethod.GET)
	public String boardList() {
		return "/admin/adminPage/withdrawList";
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
	//신고 관리
	@RequestMapping(value="/complainList", method=RequestMethod.GET)
	public String complainList() {
		return "/admin/adminPage/complainList";
	}
	
	
//	=========================================================================

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

//	[신고]=========================================================================

	//신고 내역 출력
	@RequestMapping(value="/getComplainList", method=RequestMethod.POST)
	public ModelAndView getComplainList(@RequestParam(required=false, defaultValue="1") String pg,
				  						 @RequestParam(required=false, defaultValue="20") String viewNum) {
		List<StoreDTO> list = adminService.getComplainList(pg,viewNum);
		//페이징처리
		AdminBoardPaging adminComplainBP = adminService.adminComplainBP(pg,viewNum);
		System.out.println("list:"+list);		
		ModelAndView mav = new ModelAndView();
		mav.addObject("list", list);
		mav.addObject("pg", pg);
		mav.addObject("viewNum", viewNum);
		mav.addObject("adminComplainBP", adminComplainBP);
		mav.setViewName("jsonView");
		return mav;
	}
	
//	신고자 검색 내역 출력
	@RequestMapping(value="searchReportedMember", method=RequestMethod.POST)
	public ModelAndView searchReportedMember(@RequestParam Map<String,String> map) {
//		map: keyword, searchType, pg,viewNum
		List<ComplainDTO> list = adminService.searchReportedMember(map);
		
		AdminBoardPaging adminComplainBP = adminService.getSearchReportedBP(map);
		
		ModelAndView mav = new ModelAndView();
		mav.addObject("pg", map.get("pg"));
		mav.addObject("list", list);
		mav.addObject("adminComplainBP",adminComplainBP);
		mav.setViewName("jsonView");
		return mav;
	}	
	//원하는 댓글 내용 가져오기
	@RequestMapping(value="getCommentContent", method=RequestMethod.POST)
	public ModelAndView getCommentContent(@RequestParam String comment_seq) {
		
		CommentDTO commentDTO = adminService.getCommentContent(comment_seq);
		ModelAndView mav = new ModelAndView();
		
		mav.addObject("commentDTO", commentDTO);
		mav.setViewName("jsonView");
		return mav;
	}	
	//원하는 리뷰 내용 가져오기
	@RequestMapping(value="getReviewContent", method=RequestMethod.POST)
	public ModelAndView getReviewContent(@RequestParam String review_seq) {
		
		ReviewDTO reviewDTO = adminService.getReviewContent(review_seq);
		ModelAndView mav = new ModelAndView();
		
		mav.addObject("reviewDTO", reviewDTO);
		mav.setViewName("jsonView");
		return mav;
	}	
	//신고 내용 처리상태 변경하기
	@ResponseBody
	@RequestMapping(value="solveComplain", method=RequestMethod.POST)
	public void solveComplain(@RequestParam String complain_seq, @RequestParam String complain_status) {
		Map <String, Integer> map = new HashMap<String, Integer>();
		map.put("complain_seq", Integer.parseInt(complain_seq));
		map.put("complain_status", Integer.parseInt(complain_status));
		adminService.solveComplain(map);
	}
	//신고 리뷰/댓글/게시글 블라인드 처리
	@ResponseBody
	@RequestMapping(value="blindComplain", method=RequestMethod.POST)
	public void blindComplain(@RequestParam String board_seq, @RequestParam String comment_seq,
								@RequestParam String review_seq, @RequestParam String thisIs) {
		Map <String, Integer> map = new HashMap<String, Integer>();
		System.out.println("1:"+board_seq+"/"+comment_seq+"/"+review_seq+"/"+thisIs);
		
		adminService.blindComplain(board_seq, comment_seq, review_seq, thisIs);
	}
	
	
//	[1:1문의]=========================================================================
	
	//문의 내역 출력
	@RequestMapping(value="/getQnaList", method=RequestMethod.POST)
	public ModelAndView getQnaList(@RequestParam(required=false, defaultValue="1") String pg,
				  						 @RequestParam(required=false, defaultValue="20") String viewNum) {
		List<QnaDTO> list = adminService.getQnaList(pg,viewNum);
		
		//페이징처리
		AdminBoardPaging qnaBP = adminService.qnaBP(pg,viewNum);
		System.out.println("list:"+list);	
		
		ModelAndView mav = new ModelAndView();
		mav.addObject("list", list);
		mav.addObject("pg", pg);
		mav.addObject("viewNum", viewNum);
		mav.addObject("qnaBP", qnaBP);
		mav.setViewName("jsonView");
		return mav;
	}
	
//	카테고리별 검색 내역 출력
//	@RequestMapping(value="selectQnaCount", method=RequestMethod.POST)
//	public ModelAndView selectQnaCount(@RequestParam Map<String,String> map) {
////		map: keyword, searchType, pg,viewNum
//		List<ComplainDTO> list = adminService.selectQnaCount(map);
//		
//		AdminBoardPaging qnaCountBP = adminService.getQnaCount(map);
//		
//		ModelAndView mav = new ModelAndView();
//		mav.addObject("pg", map.get("pg"));
//		mav.addObject("list", list);
//		mav.addObject("qnaCountBP",qnaCountBP);
//		mav.setViewName("jsonView");
//		return mav;
//	}	
	
	//원하는 1:1문의 내용 가져오기
	@RequestMapping(value="getQnaContent", method=RequestMethod.POST)
	public ModelAndView getQnaContent(@RequestParam String qna_seq) {
		
		QnaDTO qnaDTO = adminService.getQnaContent(Integer.parseInt(qna_seq));
		
		ModelAndView mav = new ModelAndView();
		mav.addObject("qnaDTO", qnaDTO);
		mav.setViewName("jsonView");
		return mav;
	}	
	
	//답변 쓰기
	@ResponseBody
	@RequestMapping(value="writeAnswer", method=RequestMethod.POST)
	public void writeAnswer(@RequestParam String qna_seq, @RequestParam String qna_answer) {
		Map <String, Object> map = new HashMap<String, Object>();
		map.put("qna_seq", Integer.parseInt(qna_seq));
		map.put("qna_answer", qna_answer);
		adminService.writeAnswer(map);
	}	
	
//	[탈퇴회원 관리]=========================================================================

	//탈퇴회원 전체리스트 가져오기
	@RequestMapping(value="/getWithdrawList", method=RequestMethod.POST)
	public ModelAndView getWithdrawList(@RequestParam(required=false, defaultValue="1") String pg,
				  						 @RequestParam(required=false, defaultValue="20") String viewNum) {
		List<WithdrawDTO> list = adminService.getWithdrawList(pg,viewNum);
		
		//페이징처리
		AdminBoardPaging withdrawBP = adminService.withdrawBP(pg,viewNum);
		System.out.println("list:"+list);	
		
		ModelAndView mav = new ModelAndView();
		mav.addObject("list", list);
		mav.addObject("pg", pg);
		mav.addObject("viewNum", viewNum);
		mav.addObject("withdrawBP", withdrawBP);
		mav.setViewName("jsonView");
		return mav;
	}
//	탈퇴회원 전체 수 가져오기(파이차트용)
	@RequestMapping(value="/getWithdrawTotal", method=RequestMethod.POST)
	public ModelAndView getWithdrawTotal() {	
		Map <String, Integer> map= adminService.getWithdrawTotal();
		System.out.println("map:"+map);
		ModelAndView mav = new ModelAndView();
		mav.addObject("map", map);
		mav.setViewName("jsonView");
	
		return mav;
	}
	
	
	
}




	
	
	
	


