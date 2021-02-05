package index.controller;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import org.springframework.web.servlet.ModelAndView;

import product.bean.ProductDTO;
import index.service.IndexService;

@Controller
@RequestMapping(value="index")
public class IndexController {
	@Autowired
	private IndexService indexService;

	@RequestMapping(value="", method=RequestMethod.GET) //메인화면
	public String index() {
		return "/index";
	}

	@RequestMapping(value ="/getProductList", method=RequestMethod.POST)
	@ResponseBody
	public ModelAndView getProductList(@RequestParam(name = "page") int page ) {
		List<ProductDTO> list = indexService.getProductList(page);	
		
		System.out.println(" /getProductList ");
		System.out.println(" page " + page);

		ModelAndView mav = new ModelAndView();
		mav.addObject("list", list);
		mav.setViewName("jsonView");
		return mav;
	}
	
	@RequestMapping(value ="/wishProduct", method=RequestMethod.POST)
	@ResponseBody
	public ModelAndView wishProduct(HttpSession session) {
		String id = (String) session.getAttribute("memId");
		int su = indexService.wishProduct(id);	

		ModelAndView mav = new ModelAndView();
		mav.addObject("su", su);
		mav.setViewName("jsonView");
		return mav;
	}
	
	
	
	@RequestMapping(value= "/searchDisplay", method=RequestMethod.GET)
	public String searchProduct(Model model) {
		
		 model.addAttribute("display", "/index/searchDisplay.jsp");
		 return "/index";
	}
	
	
	
	@RequestMapping(value= "/searchProductList", method=RequestMethod.POST)
	@ResponseBody
	public ModelAndView searchProductList(@RequestParam Map<String, String> map, Model model) {
		List<ProductDTO> list = indexService.searchProductList(map);	
		
		System.out.println(" /searchProductList ");
		System.out.println("map"+map);
		
		ModelAndView mav = new ModelAndView();
		mav.addObject("list", list);
		mav.setViewName("jsonView");
		return mav;
	}

}













