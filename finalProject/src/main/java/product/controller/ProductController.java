package product.controller;

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
