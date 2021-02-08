package product.controller;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import product.bean.CategoryDTO;

import org.springframework.web.servlet.ModelAndView;

import product.bean.ProductDTO;
import product.bean.RelProdPaging;
import product.service.ProductService;
import store.bean.ReviewDTO;
import store.bean.StoreDTO;

@Controller
@RequestMapping(value="product")
public class ProductController {
	@Autowired
	private ProductService productService;
	
	@RequestMapping(value="registForm", method=RequestMethod.GET) //상품 등록 페이지
	public String registForm(Model model) {
		model.addAttribute("display", "/product/registForm.jsp");
		return "/index";
	}
	
	@RequestMapping(value="productRegist", method=RequestMethod.POST) //상품 등록
	@ResponseBody
	public void productRegist(@ModelAttribute ProductDTO productDTO,
							  @RequestParam MultipartFile[] img,
							  @RequestParam(required=false, defaultValue="") String[] hashtag) {
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
		
		//DB 연결
		productService.productRegist(productDTO);
	}
	
	@RequestMapping(value="getSmallCategoryList", method=RequestMethod.POST) //소분류 카테고리 불러오기
	@ResponseBody
	public ModelAndView getSmallCategoryList(@RequestParam String cate_parent) {
		List<CategoryDTO> list = productService.getSmallCategoryList(cate_parent);
		
		ModelAndView mav = new ModelAndView();
		mav.addObject("cate_parent", cate_parent);
		mav.addObject("list", list);
		mav.setViewName("jsonView");
		return mav;
	}
	
	@RequestMapping(value="getMyLocation", method=RequestMethod.POST) //내 위치 불러오기
	@ResponseBody
	public String getMyLocation(HttpSession session) {
		String mem_id = (String)session.getAttribute("memId");
		return productService.getMyLocation(mem_id);
	}
	
	@RequestMapping(value="getMyRecentLocation", method=RequestMethod.POST) //최근 위치 불러오기
	@ResponseBody
	public String getMyRecentLocation(HttpSession session) {
		String mem_id = (String)session.getAttribute("memId");
		return productService.getMyRecentLocation(mem_id);
	}
	
	@RequestMapping(value="productDetail", method=RequestMethod.GET)
	public String registDetail(@RequestParam String seq, Model model, HttpSession session) {
		
		 ArrayList<String> list = (ArrayList)session.getAttribute("recentlyProduct");
		 
		 if(list==null)
		 {
		  list = new ArrayList<String>();
		  session.setAttribute("recentlyProduct", list);
		 }
		 list.add(seq);
		 
		// 상품 정보 받아옴
		ProductDTO productDTO = productService.productDetail(seq);
		//model.addAttribute("productDTO", productDTO);
		model.addAttribute("product_logtime", productDTO.getProduct_logtime());
		model.addAttribute("seq", seq);
		model.addAttribute("display", "/product/productDetail.jsp");
		return "/index";
	}
	
	// 상품상세페이지 - 상품 정보 받아오기
	@RequestMapping(value="getProductDetail", method=RequestMethod.GET)
	@ResponseBody
	public ModelAndView getProductDetail(@RequestParam String seq) {
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
		String cateName = productService.getProdCateName(seq);
		
		ModelAndView mav = new ModelAndView();
		mav.addObject("cateName", cateName);
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
	
	// 찜 업데이트
	@RequestMapping(value="zzimInsert", method=RequestMethod.GET)
	@ResponseBody
	public ModelAndView zzimInsert(@RequestParam Map<String, String> map) {
		productService.zzimInsert(map);
		
		ModelAndView mav = new ModelAndView();
		mav.setViewName("jsonView");
		return mav;
	}
}













