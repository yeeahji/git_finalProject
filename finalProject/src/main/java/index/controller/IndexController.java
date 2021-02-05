package index.controller;

import java.util.HashMap;
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
@RequestMapping(value = "index")
public class IndexController {
	@Autowired
	private IndexService indexService;

	@RequestMapping(value="", method=RequestMethod.GET) //메인화면
	public String index() {
		return "/index";
	}

	@RequestMapping(value = "/getProductList", method = RequestMethod.POST)
	@ResponseBody
	public ModelAndView getProductList(@RequestParam(name = "page") int page) {
		List<ProductDTO> list = indexService.getProductList(page);

		System.out.println(" /getProductList ");
		System.out.println(" page " + page);

		ModelAndView mav = new ModelAndView();
		mav.addObject("list", list);
		mav.setViewName("jsonView");
		return mav;
	}

	@RequestMapping(value = "/wishProduct", method = RequestMethod.POST)
	@ResponseBody
	public ModelAndView wishProduct(HttpSession session) {
		String id = (String) session.getAttribute("memId");
		int su = indexService.wishProduct(id);

		ModelAndView mav = new ModelAndView();
		mav.addObject("su", su);
		mav.setViewName("jsonView");
		return mav;
	}

	@RequestMapping(value = "/recentlyProduct", method = RequestMethod.POST)
	@ResponseBody
	public ModelAndView recentlyProduct(HttpSession session,
			@RequestParam(value = "page", required = false, defaultValue = "0") String page) {
		List<String> list = (List) session.getAttribute("recentlyProduct");
		
		List<ProductDTO> recentlyList = indexService.recentlyList(list);
		
		//System.out.println("recentlyList:" +recentlyList);
		ModelAndView mav = new ModelAndView();
		mav.addObject("recentlyList", recentlyList);
		mav.setViewName("jsonView");
		return mav;
	}
	
	@RequestMapping(value = "/searchDisplay", method = RequestMethod.GET)
	public String searchProduct(Model model, @RequestParam(value = "keyword") String keyword,
			@RequestParam(value = "page", required = false, defaultValue = "0") String page,
			@RequestParam(value = "order", required = false) String order) {
		
		indexService.searchProductList(keyword, Integer.parseInt(page), order, model);

		String productState="";
		// 검색어
		if (keyword.substring(0, 1).equals("@")) {
			productState = " 회원이 올린 상품";
		} else {
			productState = " 의 검색 결과";
		}
		
		model.addAttribute("productState", productState);
		model.addAttribute("display", "/index/searchDisplay.jsp");

		return "/index";
	}

	@RequestMapping(value = "/cateDisplay", method = RequestMethod.GET)
	public String cateDisplay(Model model,
			@RequestParam(value = "page", required = false, defaultValue = "0") String page,
			@RequestParam(value = "cate_code") String cate_code,
			@RequestParam(value = "order", required = false) String order) {
		
		indexService.cateProductList(cate_code, Integer.parseInt(page), order, model);
		model.addAttribute("display", "/index/cateDisplay.jsp");

		return "/index";
	}

}
