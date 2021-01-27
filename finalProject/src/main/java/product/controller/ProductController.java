package product.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

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
	public String registDetail(Model model) {
		model.addAttribute("display", "/product/productDetail.jsp");
		return "/index";
	}
}
