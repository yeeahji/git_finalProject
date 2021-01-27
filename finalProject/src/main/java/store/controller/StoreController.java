package store.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;


import store.service.StoreService;

@Controller
@RequestMapping(value="store")
public class StoreController {
	@Autowired
	private StoreService storeService;
	

   // 외부에서 상점으로 페이지 이동 -----------------------------------------
	@RequestMapping(value= "/store", method=RequestMethod.GET)
	public String store(Model model) {
		 model.addAttribute("display", "/store/store.jsp");
		 return "/index";
	}
	
	// 수정 중
//	@RequestMapping(value= "/store", method=RequestMethod.GET)
//	public String store(@RequestParam(required=false, defaultValue="1")String menu, Model model) {
//		 model.addAttribute("display", "/store/store.jsp");
//		 if(menu=="2") {
//			 model.addAttribute("displayNum", "2");
//		 }
//		 return "/index";
//	}
	
//   @RequestMapping(value= "/store", method=RequestMethod.GET)
//   public String store(@RequestParam(required=false, defaultValue="1") String num, Model model) {
//      
//	   model.addAttribute("display", "/store/store.jsp");
//      
//      if(num == "2") {
//    	  model.addAttribute("displayNum", "2");
//      }
//      return "/index";
//   }

   // 상점 내부에서 페이지 이동 --------------------------------------
//   @RequestMapping(value= "/reviews", method=RequestMethod.GET)
//   public String reviews(@RequestParam String num, Model model) {
//      model.addAttribute("display", "/store/reviews.jsp");
//      model.addAttribute("displayNum", num);
//      return "/index";
//   }
   
//   @RequestMapping(value= "/purchases", method=RequestMethod.GET)
//   public String purchases(Model model) {
//      model.addAttribute("display", "/store/purchases.jsp");
//      model.addAttribute("displayNum", "3");
//      return "/index";
//   }
//   
//   
//   @RequestMapping(value= "/favorites", method=RequestMethod.GET)
//   public String favorites(Model model) {
//      model.addAttribute("display", "/store/favorites.jsp");
//      model.addAttribute("displayNum", "4");
//      return "/index";
//   }
//   
//   @RequestMapping(value= "/productManage", method=RequestMethod.GET)
//   public String productManage(Model model) {
//      model.addAttribute("display", "/store/productManage.jsp");
//      model.addAttribute("displayNum", "5");
//      return "/index";
//   }

}
