package product.controller;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import index.bean.wishDTO;
import member.bean.MemberDTO;
import product.bean.CategoryDTO;

import org.springframework.web.servlet.ModelAndView;

import product.bean.ProductDTO;
import product.bean.RelProdPaging;
import product.service.ProductService;
import store.bean.ReviewDTO;
import store.bean.StoreDTO;

@Controller
@RequestMapping(value = "product")
public class ProductController {
	@Autowired
	private ProductService productService;
	
	// 상품 등록 페이지
	@RequestMapping(value="registForm", method=RequestMethod.GET)
	public String registForm(Model model) {
		model.addAttribute("display", "/product/registForm.jsp");
		return "/index";
	}
	
	// 상품 등록
	@RequestMapping(value="productRegist", method=RequestMethod.POST) 
	@ResponseBody
	public ModelAndView productRegist(@ModelAttribute ProductDTO productDTO,
									  @RequestParam MultipartFile[] img,
									  @RequestParam(required=false, defaultValue="") String[] hashtag,
									  Principal principal) {
		//이미지 파일 복사
		String filePath = "D:/git_home/git_final/finalProject/src/main/webapp/storage";
		File file;
		
		for(int i=0; i<=img.length-1; i++) {
			String fileName = img[i].getOriginalFilename();
			file = new File(filePath, fileName);
			
			try {
				FileCopyUtils.copy(img[i].getInputStream(), new FileOutputStream(file));
			} catch (IOException e) {
				e.printStackTrace();
			}
			
			if(i == 0) productDTO.setProduct_img1(fileName);
			else if(i == 1) productDTO.setProduct_img2(fileName);
			else if(i == 2) productDTO.setProduct_img3(fileName);
			else if(i == 3) productDTO.setProduct_img4(fileName);
			else if(i == 4) productDTO.setProduct_img5(fileName);
		}
		
		//연관태그
		if(hashtag.length > 0) {
			for(int i=0; i<=hashtag.length-1; i++) {
				String tagName = hashtag[i];
				if(i == 0) productDTO.setProduct_hashtag1(tagName);
				else if(i == 1) productDTO.setProduct_hashtag2(tagName);
				else if(i == 2) productDTO.setProduct_hashtag3(tagName);
				else if(i == 3) productDTO.setProduct_hashtag4(tagName);
				else if(i == 4) productDTO.setProduct_hashtag5(tagName);
			}
		}
		
		//아이디
		productDTO.setMem_id(principal.getName());
		
		//DB 연결
		productService.productRegist(productDTO);
		
		//현재 상품의 seq 가져오기
		int seq = productService.getCurrentProductSeq() - 1;
		
		//데이터 전달
		ModelAndView mav = new ModelAndView();
		mav.addObject("seq", seq);
		mav.setViewName("jsonView");
		return mav;
	}
	
	// 소분류 카테고리 불러오기
	@RequestMapping(value="getSmallCategoryList", method=RequestMethod.POST) 
	@ResponseBody
	public ModelAndView getSmallCategoryList(@RequestParam String cate_parent) {
		List<CategoryDTO> list = productService.getSmallCategoryList(cate_parent);
		
		ModelAndView mav = new ModelAndView();
		mav.addObject("cate_parent", cate_parent);
		mav.addObject("list", list);
		mav.setViewName("jsonView");
		return mav;
	}
	
	// 최근 위치 불러오기
	@RequestMapping(value="getMyLocation", method=RequestMethod.POST) 
	@ResponseBody
	public ModelAndView getMyLocation(Principal principal) {
		String myLocation = productService.getMyLocation(principal.getName());
		
		ModelAndView mav = new ModelAndView();
		mav.addObject("myRecentLocation", myLocation);
		mav.setViewName("jsonView");
		return mav;
	}
	
	// 상품 리스트 - > 상세페이지
	@RequestMapping(value="productDetail", method=RequestMethod.GET)
	public String registDetail(@RequestParam String seq, Model model, 
							   @AuthenticationPrincipal MemberDTO memberDTO, 
							   HttpSession session,
							   HttpServletResponse response) {
		 // 최근 본 상품 목록들
		 ArrayList<String> list = (ArrayList)session.getAttribute("recentlyProduct");
		 if (list == null) {
				list = new ArrayList<String>();
				session.setAttribute("recentlyProduct", list);
			}else {
				for ( int i=0; i < list.size(); i++) {
					if ( list.get(i).equals(seq) ) {
						list.remove(i);
						System.out.println("remove seq :" + seq);
						break;
					}
				}
			}
		list.add(seq); 
		
		// 상품 상세페이지 조회수  
		if(memberDTO != null) {
			//System.out.println(" 지금로그인중인아디->"+memberDTO.getUsername());
			Cookie cookie = new Cookie("memHit", "0");//생성
			cookie.setMaxAge(60*60*24);//초 단위 생존기간
			response.addCookie(cookie);//클라이언트에게 보내기
		}
		
		// 상품 정보 받아옴
		ProductDTO productDTO = productService.productDetail(seq);
		model.addAttribute("product_logtime", productDTO.getProduct_logtime());
		model.addAttribute("seq", seq);
		model.addAttribute("productDTO", productDTO);
		model.addAttribute("display", "/product/productDetail.jsp");
		return "/index";
	}
	
	// 상품상세페이지 - 상품 정보 받아오기
	@RequestMapping(value="getProductDetail", method=RequestMethod.GET)
	@ResponseBody
	public ModelAndView getProductDetail(@CookieValue(value="memHit", required=false) Cookie cookie,
										 HttpServletResponse response,
										 @RequestParam String seq) {
		if(cookie != null) {
			//System.out.println("쿠키.."+cookie);
			productService.hitUpdate(seq); //조회수 증가
			cookie.setMaxAge(0); //쿠키 삭제
 			response.addCookie(cookie); //쿠키 삭제된걸 클라이언트에게 보내주기.
 		}
		
		ProductDTO productDTO = productService.productDetail(seq);
		ModelAndView mav = new ModelAndView();
		
		mav.addObject("productDTO", productDTO);
		mav.setViewName("jsonView");
		return mav;
	}
	
	// 연관상품
	@RequestMapping(value="getRelatedProducts", method=RequestMethod.GET)
	@ResponseBody
	public ModelAndView getRelatedProducts(@RequestParam(required=false, defaultValue="1") String pg,
										   @RequestParam String seq) {
		// 연관상품 24개  (한 페이지 당 6개 출력)
		List<ProductDTO> relProdList = productService.getRelatedProducts(pg, seq);
		
		RelProdPaging relProdPaging = productService.relProdPaging(pg); 
		
		ModelAndView mav = new ModelAndView();
		mav.addObject("pg", pg);
		mav.addObject("relProdList", relProdList);
		mav.addObject("relProdPaging", relProdPaging);
		mav.setViewName("jsonView");
		return mav;
	}

	// 카테고리 이름
	@RequestMapping(value="getProdCateName", method=RequestMethod.GET)
	@ResponseBody
	public ModelAndView getProdCateName(@RequestParam String seq) {
		CategoryDTO categoryDTO = productService.getProdCateName(seq);
		ModelAndView mav = new ModelAndView();
		mav.addObject("categoryDTO", categoryDTO);
		mav.setViewName("jsonView");
		return mav;
	}
	
	// seq로 상점 정보 조회 + 물건 총 개수
	@RequestMapping(value="getStoreInfo", method=RequestMethod.GET)
	@ResponseBody
	public ModelAndView getStoreInfo(@RequestParam String seq) {
		// 상점
		StoreDTO storeDTO = productService.getStoreInfo(seq);
		// 상점 물건 총 개수
		int storeProdNum = productService.getStoreProdNum(seq);
		ModelAndView mav = new ModelAndView();
		mav.addObject("storeDTO", storeDTO);
		mav.addObject("storeProdNum", storeProdNum);
		mav.setViewName("jsonView");
		return mav;
	}
	
	// 상점 정보 - 최신 상품 2개 
	@RequestMapping(value="getStoreProduct", method=RequestMethod.GET)
	@ResponseBody
	public ModelAndView getStoreProduct(@RequestParam String seq) {
		List<ProductDTO> getStoreProdList = productService.getStoreProduct(seq);
		
		ModelAndView mav = new ModelAndView();
		mav.addObject("getStoreProdList", getStoreProdList);
		mav.setViewName("jsonView");
		return mav;
	}
	
	// 대분류 이름 
	@RequestMapping(value="getProdBigCate", method=RequestMethod.GET)
	@ResponseBody
	public ModelAndView getProdBigCate(@RequestParam String cate_code) {
		String bigCateName = productService.getProdBigCate(cate_code);
		
		ModelAndView mav = new ModelAndView();
		mav.addObject("bigCateName", bigCateName);
		mav.setViewName("jsonView");
		return mav;
	}
	
	
	// 해당 상품이 찜 받은 수
	@RequestMapping(value="getZzimNum", method=RequestMethod.GET)
	@ResponseBody
	public ModelAndView getZzimNum(@RequestParam String seq) {
		int zzimNum = productService.getZzimNum(seq);
		
		ModelAndView mav = new ModelAndView();
		mav.addObject("zzimNum", zzimNum);
		mav.setViewName("jsonView");
		return mav;
	}
	
	// 찜 눌렀는지 조회
	@RequestMapping(value="zzimExistCheck", method=RequestMethod.GET)
	@ResponseBody
	public ModelAndView zzimExistCheck(@RequestParam Map<String, String> map) {
		wishDTO wishDTO = productService.zzimExistCheck(map);
		
		ModelAndView mav = new ModelAndView();
		mav.addObject("wishDTO", wishDTO);
		mav.setViewName("jsonView");
		return mav;
	}
	
	// 찜 업데이트
	@RequestMapping(value="zzimInsert", method=RequestMethod.GET)
	@ResponseBody
	public void zzimInsert(@RequestParam Map<String, String> map) {
		productService.zzimInsert(map);

	}
	
	// 찜 해제
	@RequestMapping(value="zzimDelete", method=RequestMethod.GET)
	@ResponseBody
	public void zzimDelete(@RequestParam Map<String, String> map) {
		productService.zzimDelete(map);

	}

	
}













