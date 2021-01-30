package product.controller;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.Map;

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
import product.service.ProductService;

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
	public String getMyLocation(@RequestParam String mem_id) {
		return productService.getMyLocation(mem_id);
	}
	
	@RequestMapping(value="getMyRecentLocation", method=RequestMethod.POST) //최근 위치 불러오기
	@ResponseBody
	public String getMyRecentLocation(@RequestParam String mem_id) {
		return productService.getMyRecentLocation(mem_id);
	}
	
	@RequestMapping(value="productDetail", method=RequestMethod.GET)
	public String registDetail(@RequestParam String seq, Model model) {
		model.addAttribute("display", "/product/productDetail.jsp");
		return "/index";
	}

	@RequestMapping(value ="/getProductList", method=RequestMethod.POST)
	@ResponseBody
	public ModelAndView getProductList() {
		List<ProductDTO> list = productService.getProductList();	

		ModelAndView mav = new ModelAndView();
		mav.addObject("list", list);
		mav.setViewName("jsonView");
		return mav;
	}

}













