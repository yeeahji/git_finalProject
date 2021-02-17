package index.controller;

import java.security.Principal;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import index.service.IndexService;
import product.bean.CategoryDTO;
import product.bean.ProductDTO;

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

		ModelAndView mav = new ModelAndView();
		mav.addObject("list", list);
		mav.setViewName("jsonView");
		return mav;
	}

	@RequestMapping(value = "/wishProduct", method = RequestMethod.POST)
	@ResponseBody
	public ModelAndView wishProduct(Principal principal) {
		int su = indexService.wishProduct(principal.getName());

		ModelAndView mav = new ModelAndView();
		mav.addObject("su", su);
		mav.setViewName("jsonView");
		return mav;
	}

	@RequestMapping(value = "/recentlyProduct", method = RequestMethod.POST)
	@ResponseBody
	public ModelAndView recentlyProduct(HttpSession session,
			@RequestParam(value = "page", required = false, defaultValue = "0") String page) {
		
		//System.out.println("/recentlyProduct ");
		
		List<String> list = (List) session.getAttribute("recentlyProduct");
		
		//System.out.println("list(0) :" + list.get(list.size()-1));
		
		List<ProductDTO> recentlyList = null;
		if (  list != null && list.size() != 0) {
			recentlyList = indexService.recentlyList(list);
		}
			
		//System.out.println("last seq :: " +recentlyList.get(0).getProduct_seq());
		ModelAndView mav = new ModelAndView();
		mav.addObject("recentlyList", recentlyList);
		mav.setViewName("jsonView");
		return mav;
	}
	

	@RequestMapping(value = "recentlyProductDelete", method = RequestMethod.POST)
	@ResponseBody
	public ModelAndView recentlyProductDelete(@RequestParam String seq, Model model, HttpSession session) {

		List<String> list = (List) session.getAttribute("recentlyProduct");
		
		for ( int i=0; i < list.size(); i++) {
			if ( list.get(i).equals(seq) )
				list.remove(i);
		}
		
		//System.out.println("list :" + list.size());
		session.setAttribute("recentlyProduct", list);
		
		List<ProductDTO> recentlyList = null;
		if (  list != null && list.size() != 0) {
			recentlyList = indexService.recentlyList(list);
		}
			
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
	
	//카테고리 세부 값 가져오기
	@RequestMapping(value = "/categoryList", method = RequestMethod.POST)
	@ResponseBody
	public ModelAndView categoryList() {
		List<CategoryDTO> list = indexService.categoryList();

		//System.out.println(" /categoryList ");

		ModelAndView mav = new ModelAndView();
		mav.addObject("list", list);
		mav.setViewName("jsonView");
		return mav;
	}

}
