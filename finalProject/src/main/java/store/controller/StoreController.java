package store.controller;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.FileCopyUtils;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import product.bean.ProductDTO;
import store.bean.StoreDTO;
import store.service.StoreService;

@Controller
@RequestMapping(value="store")
public class StoreController {
	@Autowired
	private StoreService storeService;
	
	// 외부에서 상점으로 페이지 이동 ---------------------------------------------
	@RequestMapping(value= "/store", method=RequestMethod.GET)
	public String store(Model model) {
		 model.addAttribute("display", "/store/store.jsp");
		 model.addAttribute("displayNum", "1");
		 return "/index";
	}
	
	// 상점 상단 ----------------------------------------------------------
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
//	@RequestMapping(value="/introduceRegister", method=RequestMethod.GET)
//	@ResponseBody
//	public int introduceRegister(@RequestParam String nickname, String mem_id) {
//		
//		return null;
//	}

	
	// (3) 프로필 사진 등록
	@RequestMapping(value="/profileImgUpdate", method=RequestMethod.POST)
	@ResponseBody
	public void profileImgUpdate(@RequestParam MultipartFile[] profileImg) {
		
		String filePath = "C:\\Spring\\workspace\\finalProject\\src\\main\\webapp\\storage";
		
		String fileName; 
		File file;
		
		if(profileImg[0] != null) {
			  fileName =profileImg[0].getOriginalFilename(); 
			  file = new File(filePath, fileName);
		  try { 
			  FileCopyUtils.copy(profileImg[0].getInputStream(), new FileOutputStream(file));  
		  } catch (IOException e) {
			  e.printStackTrace(); }	
		  
		  //Store.setImage1(fileName); 
		}else { 
			//imageboardDTO.setImage1("");
		}
	}	
	
	
	// 상점 메뉴 ----------------------------------------------------------
	// [상품] 상품 리스트 가져오기
	@RequestMapping(value="storeProductList", method=RequestMethod.POST)
	@ResponseBody
	public ModelAndView storeProductList() {
		// 상품 리스트
		List<ProductDTO> productList = storeService.storeProductList();
		// 상품 총 개수
		int productTotalA = storeService.storeProductTotalA();
		
		ModelAndView mav = new ModelAndView();
		mav.addObject("productList", productList);
		mav.addObject("productTotalA", productTotalA);
		mav.setViewName("jsonView");
		return mav;
	}
	
	
	// [찜] 찜 리스트 가져오기
//	@RequestMapping(value="storeFavoritesList", method=RequestMethod.POST)
//	@ResponseBody
//	public ModelAndView storeFavoritesList(@RequestParam String mem_id) {
//		// 찜 리스트
//		List<ProductDTO> favoritesList = storeService.storeFavoritesList(mem_id);
//		
//		// 찜 총 개수
//		
//		ModelAndView mav = new ModelAndView();
//		mav.addObject("favoritesList", favoritesList);
//		mav.setViewName("jsonView");
//		return mav;
//	}
//	
	
	
	
	

}
