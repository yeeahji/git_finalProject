package product.controller;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;

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
import product.bean.ProductDTO;
import product.service.ProductService;

@Controller
@RequestMapping(value="product")
public class ProductController {
	@Autowired
	private ProductService productService;
	
	@RequestMapping(value="registForm", method=RequestMethod.GET)
	public String registForm(Model model) {
		model.addAttribute("display", "/product/registForm.jsp");
		return "/index";
	}
	
	@RequestMapping(value="productDetail", method=RequestMethod.GET)
	public String productDetail(Model model) {
		model.addAttribute("display", "/product/productDetail.jsp");
		return "/index";
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
	
	/*
	@RequestMapping(value="productRegist", method=RequestMethod.POST) //소분류 카테고리 불러오기
	@ResponseBody
	public void productRegist(@RequestParam Map<String, Object> map) {
		System.out.println(map);
		System.out.println(map.get("obj"));
	}
	*/
	
	@RequestMapping(value="productRegist", method=RequestMethod.POST)
	@ResponseBody
	public void productRegist(@ModelAttribute ProductDTO productDTO,
								@RequestParam MultipartFile[] img) {
		System.out.println(img.length);
		System.out.println(img[0]);
		
		String filePath = "D:\\git_home\\git_final\\finalProject\\src\\main\\webapp\\storage";
		String fileName;
		File file;
		
		//파일 복사
		if(img[0] != null) {
			fileName = img[0].getOriginalFilename();
			file = new File(filePath, fileName);
			try {
				FileCopyUtils.copy(img[0].getInputStream(), new FileOutputStream(file));
			} catch (IOException e) {
				e.printStackTrace();
			}
			productDTO.setProduct_img1(fileName); //img[0]에 이미지 데이터 들어왔을 시 fileName 설정
		}else {
			productDTO.setProduct_img1(""); //img[0]에 이미지 데이터 들어오지 않으면 공백으로 설정 (null은 글씨가 들어가니까 공백으로 처리)
		}
		
		if(img[1] != null) {
			fileName = img[1].getOriginalFilename();
			file = new File(filePath, fileName);
			try {
				FileCopyUtils.copy(img[1].getInputStream(), new FileOutputStream(file));
			} catch (IOException e) {
				e.printStackTrace();
			}
			productDTO.setProduct_img2(fileName);
		}else {
			productDTO.setProduct_img2("");
		}
		
		if(img[2] != null) {
			fileName = img[2].getOriginalFilename();
			file = new File(filePath, fileName);
			try {
				FileCopyUtils.copy(img[2].getInputStream(), new FileOutputStream(file));
			} catch (IOException e) {
				e.printStackTrace();
			}
			productDTO.setProduct_img3(fileName);
		}else {
			productDTO.setProduct_img3("");
		}
	}
	
}
