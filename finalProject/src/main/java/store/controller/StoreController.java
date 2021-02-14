package store.controller;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.FileCopyUtils;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import chat.bean.ChatListDTO;
import product.bean.ProductDTO;
import store.bean.StorePaging;
import store.bean.PurchaseDTO;
import store.bean.PurchaseExistDTO;
import store.bean.PurchasePaging;
import store.bean.ReviewDTO;
import store.bean.StoreDTO;
import store.service.StoreService;

@Controller
@RequestMapping(value="store")
public class StoreController {
	@Autowired
	private StoreService storeService;
	
	// 외부에서 상점으로 페이지 이동 
	@RequestMapping(value= "/store", method=RequestMethod.GET)
	public String store(Model model,
						HttpServletResponse response) {
		// (test)상점 들어왔을 때 쿠키 추가 ★★★★★ ㄴ일단 여기에 추가함
		Cookie cookie = new Cookie("UP", "10");// (이름, 값) 생성
		cookie.setMaxAge(60*5); // 5분으로 설정
		response.addCookie(cookie); // 응답에 쿠키 추가; 클라이언트에게 보내기
		System.out.println("쿠키생성");
		 //------------------------------------이거쿠키  로그인으로 옮기기
		
		model.addAttribute("display", "/store/store.jsp");
		model.addAttribute("displayNum", "1");	
		return "/index";
	}

	
	
	
	// [상점] ----------------------------------------------------------------
	// 상점 기본 정보
	@RequestMapping(value="storeInfo", method=RequestMethod.GET)
	@ResponseBody
	public ModelAndView storeInfo(@RequestParam String mem_id) {
		// 상점 DTO
		StoreDTO storeDTO = storeService.storeInfo(mem_id);
		
		ModelAndView mav = new ModelAndView();
		mav.addObject("storeDTO", storeDTO);
		mav.setViewName("jsonView");
		return mav;
	}
	
	// [상점 정보 수정] ----------------------------------------------------------
	// 	(1) 닉네임  - 닉네임 중복체크 (및 회원 정보 가져오는)
	@RequestMapping(value="/getMember", method=RequestMethod.GET)
	@ResponseBody
	public StoreDTO getMember(@RequestParam String nickname) {
		return storeService.getMember(nickname);
	}
	
	// - 닉네임 수정
	@RequestMapping(value="/nicknameUpdate", method=RequestMethod.GET)
	@ResponseBody
	public int nicknameUpdate(@RequestParam String nickname, String mem_id) {
		Map<String, String> map = new HashMap<String, String>();
		map.put("nickname", nickname);
		map.put("mem_id", mem_id);
		return storeService.nicknameUpdate(map);
	}
	
	// (2) 소개글 등록
	@RequestMapping(value="/introUpdate", method=RequestMethod.GET)
	@ResponseBody
	public int introUpdate(@RequestParam Map<String, String> map) {
		return storeService.introUpdate(map);
	}
	
	// (3) 프로필 사진 등록
	@RequestMapping(value="/profileImgUpdate", method=RequestMethod.POST)
	@ResponseBody
	public void profileImgUpdate(@RequestParam MultipartFile[] profileImg_Name,
								@ModelAttribute StoreDTO storeDTO){ //storeDTO지만 mem_id만 보냈음
		
		String filePath = "C:\\git_home\\git_final\\finalProject\\src\\main\\webapp\\storage";
		// 가상 폴더 위치 가져오기
		String fileName; 
		File file;
		
		// 실제 파일 경로를 읽어서 현재 이 파일을 출력하도록
	    fileName = profileImg_Name[0].getOriginalFilename(); 
	    file = new File(filePath, fileName);
	    
	    try { 
	   	    FileCopyUtils.copy(profileImg_Name[0].getInputStream(), new FileOutputStream(file));  
	    } catch (IOException e) {
		    e.printStackTrace(); }	
	   
	    //DB
	    String mem_id = storeDTO.getMem_id();
	    storeService.profileImgUpdate(mem_id, fileName);
		
	}	
	
	// 에코지수 계산
	@RequestMapping(value="echoCalc", method=RequestMethod.POST)
	@ResponseBody
	public ModelAndView echoCalc(@RequestParam String mem_id) {
		//System.out.println("아디는 ->"+mem_id);
		// mem_id의 구매횟수
		int purchaseNum = storeService.purchaseTotalA(mem_id); //구매내역에서 만든
		// mem_id의 판매횟수
		int salesNum = storeService.salesNum(mem_id); //seller_id = mem_id
		
		int actSum= purchaseNum + salesNum;
		
		// 여기서 범위
		if(actSum >=0 && actSum <= 2) {
			actSum = 20; 
		}else if(actSum > 2 && actSum <= 4) {
			actSum = 40; 
		}else if(actSum > 4 && actSum <= 6) {
			actSum = 60; 
		}else if(actSum > 6 && actSum <= 8) {
			actSum = 80; 
		}else if(actSum > 8 && actSum <= 10) {
			actSum = 100; 
		}
		//System.out.println("엨트썸"+actSum);
		ModelAndView mav = new ModelAndView();
		mav.addObject("actSum", actSum);
		mav.addObject("salesNum", salesNum); // 상점 판매횟수
		mav.setViewName("jsonView");
		return mav;
	}
	
	// 에코지수 업데이트
	@RequestMapping(value="echoUpdate", method=RequestMethod.POST)
	@ResponseBody
	public ModelAndView echoUpdate(@RequestParam Map<String,String> map) {
		storeService.echoUpdate(map);
		
		ModelAndView mav = new ModelAndView();

		mav.setViewName("jsonView");
		return mav;
	}
	
	
	
	// 1. [상품] ----------------------------------------------------------
	// 상품 리스트 가져오기
	@RequestMapping(value="storeProductList", method=RequestMethod.POST)
	@ResponseBody
	public ModelAndView storeProductList(@RequestParam String mem_id,
										 @RequestParam String sortNum) {
		// 상품 리스트
		List<ProductDTO> productList = storeService.storeProductList(mem_id, sortNum);
		// 상품 총 개수
		int productTotalA = storeService.storeProductTotalA(mem_id);
		
		System.out.println(sortNum);
		
		ModelAndView mav = new ModelAndView();
		mav.addObject("productList", productList);
		mav.addObject("productTotalA", productTotalA);
		mav.setViewName("jsonView");
		return mav;
	}
	
	// 2. [상품후기] ---------------------------------------------------------
	// 후기 리스트 가져오기
	@RequestMapping(value="storeReviewsList", method=RequestMethod.POST)
	@ResponseBody
	public ModelAndView storeReviewsList(@RequestParam String mem_id) {
		// 후기 리스트
		List<ReviewDTO> reviewsList = storeService.storeReviewsList(mem_id); // 상점 주인의 아이디
		// 후기 총 개수
		int reviewTotalA = storeService.storeReviewTotalA(mem_id);
		
		ModelAndView mav = new ModelAndView();
		mav.addObject("reviewsList", reviewsList);
		mav.addObject("reviewTotalA", reviewTotalA);
		mav.setViewName("jsonView");
		return mav;
	}
	
	// 상품후기 작성
	// 1. 구매내역 여부 확인
	@RequestMapping(value="purchaseExist", method=RequestMethod.POST)
	@ResponseBody
	public ModelAndView purchaseExist(@RequestParam Map<String, String> map) {
		List<PurchaseExistDTO> purchaseList = storeService.purchaseExist(map);
		
		ModelAndView mav = new ModelAndView();
		mav.addObject("purchaseList", purchaseList);
		mav.setViewName("jsonView");
		return mav;
	}
	
	// 2. 후기 등록
	@RequestMapping(value="reviewRegister", method=RequestMethod.POST)
	@ResponseBody
	public void reviewRegister(@RequestParam Map<String, String> map) {
		storeService.reviewRegister(map);
	}
	
	// 후기 쓸 상품 선택
	@RequestMapping(value="purchaseListSelect", method=RequestMethod.POST)
	@ResponseBody
	public ModelAndView purchaseListSelect(@RequestParam String product_seq) {
		ProductDTO productDTO = storeService.purchaseListSelect(product_seq);
		
		ModelAndView mav = new ModelAndView();
		mav.addObject("productDTO", productDTO);
		mav.setViewName("jsonView");
		return mav;
	}

	
	// 3. [찜] ------------------------------------------------------------
	// 찜 리스트 가져오기
	@RequestMapping(value="storeFavoritesList", method=RequestMethod.POST)
	@ResponseBody
	public ModelAndView storeFavoritesList(@RequestParam String mem_id,
										   @RequestParam String sortNum) { // 상점 주인 아이디
		// 찜 리스트
		List<ProductDTO> favoritesList = storeService.storeFavoritesList(mem_id, sortNum);
		// 찜 총 개수
		int favoritesTotalA = storeService.storeFavoritesTotalA(mem_id);
		
		ModelAndView mav = new ModelAndView();
		mav.addObject("favoritesList", favoritesList);
		mav.addObject("favoritesTotalA", favoritesTotalA);
		mav.setViewName("jsonView");
		return mav;
	}
 
	// 판매 완료(product_manage == 3) 상품 삭제
	@RequestMapping(value="storeSoldOutDelete", method=RequestMethod.POST)
	@ResponseBody
	public void storeSoldOutDelete() {
		storeService.storeSoldOutDelete();
	}
	
	
	// 찜 삭제 - 체크버튼
	@RequestMapping(value="favoritesDelete", method=RequestMethod.POST)
	@ResponseBody
	public void favoritesDelete(@RequestParam Map<String, Object> map)  { // 상점 주인 아이디
		storeService.favoritesDelete(map);
		System.out.println("디비 안료다");
		
	}
	
	
	
	
	
	
	// 4. [구매내역] ----------------------------------------------------------
	@RequestMapping(value="purchaseList", method=RequestMethod.GET)
	@ResponseBody
	public ModelAndView purchaseList(@RequestParam(required=false, defaultValue="1") String pg,
									 @RequestParam String my_id) { 
		List<PurchaseDTO> purchaseList = storeService.purchaseList(pg, my_id);
		
		PurchasePaging purchasePaging = storeService.purchasePaging(pg, my_id);
		//구매내역 총 개수
		int purchaseTotalA = storeService.purchaseTotalA(my_id);
		
		ModelAndView mav = new ModelAndView();
		mav.addObject("pg", pg);
		mav.addObject("purchaseList", purchaseList);
		mav.addObject("purchasePaging", purchasePaging);
		mav.addObject("purchaseTotalA", purchaseTotalA);
		mav.setViewName("jsonView");
		return mav;
	}
	
	// 닉으로 거래 상대방 아이디 구하기
	@RequestMapping(value="getStoreNick", method=RequestMethod.GET)
	@ResponseBody
	public ModelAndView getStoreNick(@RequestParam String other_store_nickname) { 
		String other_mem_id = storeService.getStoreNick(other_store_nickname);
		
		ModelAndView mav = new ModelAndView();
		mav.addObject("other_mem_id", other_mem_id);
		mav.setViewName("jsonView");
		return mav;
	}
	
	// 구매내역 데이터 넣기
	@RequestMapping(value="purchaseInsert", method=RequestMethod.GET)
	@ResponseBody
	public void purchaseInsert(@RequestParam Map<String, String> map) { 
		storeService.purchaseInsert(map);

	}
	
	// 5. [내 상품 관리] --------------------------------------------------------
	// 상품 리스트
	@RequestMapping(value="productManageList", method=RequestMethod.GET)
	@ResponseBody
	public ModelAndView productManageList(@RequestParam(required=false, defaultValue="1") String pg,
										  @RequestParam String mem_id,
										  @RequestParam String product_manage) {
		List<ProductDTO> productManageList = storeService.productManageList(pg, mem_id, product_manage);
		StorePaging storePaging = storeService.storePaging(pg, mem_id, product_manage);
		
		ModelAndView mav = new ModelAndView();
		
		mav.addObject("pg", pg);
		mav.addObject("productManageList", productManageList);
		mav.addObject("storePaging", storePaging);
		mav.setViewName("jsonView");
		return mav;
	}
	
	// 상품 검색
	@RequestMapping(value="productManageSearch", method=RequestMethod.GET)
	@ResponseBody
	public ModelAndView productManageSearch(@RequestParam(required=false, defaultValue="1") String pg,
											@RequestParam String mem_id,
											@RequestParam String searchKeyword,
											@RequestParam String product_manage) { 
		
		Map<String, String> map = new HashMap<String, String>();
		map.put("pg", pg);
		map.put("mem_id", mem_id);
		map.put("searchKeyword", searchKeyword);
		map.put("product_manage", product_manage);
		
		List<ProductDTO> prodSearchList = storeService.productManageSearch(map);	
		
		StorePaging storePaging = storeService.storePaging(map);
		
		ModelAndView mav = new ModelAndView();
		mav.addObject("pg", pg);
		mav.addObject("storePaging", storePaging);
		mav.addObject("prodSearchList", prodSearchList);
		mav.setViewName("jsonView");
		return mav;
	}
	
	// 각 상품의 찜 수
	@RequestMapping(value="favoritesOfProd", method=RequestMethod.POST)
	@ResponseBody
	public int favoritesOfProd(@RequestParam Map<String, String> map) { //mem_id, product_seq
		// 해당 상품의 찜(wish) 수
		int favoritesOfProd = storeService.favoritesOfProd(map);
		return favoritesOfProd;
	}
	
	// [판매상태] 변경 
	@RequestMapping(value="prodManageUpdate", method=RequestMethod.GET)
	@ResponseBody
	public ModelAndView prodManageUpdate(@RequestParam Map<String, String> map) {
		int updateCheck = storeService.prodManageUpdate(map);
		
		ModelAndView mav = new ModelAndView();
		mav.addObject("updateCheck", updateCheck);
		mav.setViewName("jsonView");
		return mav;
	}
	
	// [UP]
	@RequestMapping(value="productUp", method=RequestMethod.GET)
	@ResponseBody
	public ModelAndView productUp(@CookieValue(value="UP", required=false) Cookie cookie,
								  HttpServletResponse response,
								  @RequestParam Map<String, String> map) { //상점주인 아이디, 상품번호
		int upCookie = Integer.parseInt(cookie.getValue()); 

		if(upCookie > 0) { 
			upCookie -= 1;
			cookie.setValue(upCookie+"");
			response.addCookie(cookie); 
			int upCheckNum = storeService.productUp(map); // sysdate 업데이트
		}else if(upCookie <= 0){
			upCookie = 0;
			cookie.setMaxAge(0); //쿠키삭제!!
		}
		ModelAndView mav = new ModelAndView();
		mav.addObject("cookieNum", upCookie);
		mav.setViewName("jsonView");
		return mav;
	}
	
	// [삭제] 
	@RequestMapping(value="productDlt", method=RequestMethod.GET)
	@ResponseBody
	public ModelAndView productDlt(@RequestParam Map<String, String> map) { //상점주인 아이디, 상품번호
		int dltCheckNum = storeService.productDlt(map);
		
		ModelAndView mav = new ModelAndView();
		mav.addObject("dltCheckNum", dltCheckNum);
		mav.setViewName("jsonView");
		return mav;
	}

	// 상품 DB에 존재하는지 확인 (삭제한 상품 또 삭제 누를 때)
	@RequestMapping(value="existProd", method=RequestMethod.GET)
	@ResponseBody
	public ModelAndView existProd(@RequestParam Map<String, String> map) { 
		ProductDTO productDTO = storeService.existProd(map);
		
		ModelAndView mav = new ModelAndView();
		mav.addObject("productDTO", productDTO);
		mav.setViewName("jsonView");
		return mav;
	}
	
	// 판매완료 -> 거래내역 채팅방 리스트 
	@RequestMapping(value="getChatList", method=RequestMethod.GET)
	@ResponseBody
	public ModelAndView getChatList(@RequestParam String mem_id) { 
		List<ChatListDTO> chatList = storeService.getChatList(mem_id);
		ModelAndView mav = new ModelAndView();
		mav.addObject("chatList", chatList);
		mav.setViewName("jsonView");
		return mav;
	}
}







