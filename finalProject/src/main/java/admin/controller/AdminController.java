package admin.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping(value="admin")
public class AdminController {
	
	@RequestMapping(value="/index", method=RequestMethod.GET)
	public String index() {
		return "/admin/index";
	}
	@RequestMapping(value="/login", method=RequestMethod.GET)
	public String login() {
		return "/admin/login";
	}
	
	@RequestMapping(value="/menu", method=RequestMethod.GET)
	public String menu() {
		return "/admin/menu";
	}
	
	@RequestMapping(value="/member", method=RequestMethod.GET)
	public String member(Model model) {
		model.addAttribute("display", "/admin/page/member.jsp");
		return "/admin/menu";
	}
	
	@RequestMapping(value="/productManagement", method=RequestMethod.GET)
	public String productManagement(Model model) {
		model.addAttribute("display", "/admin/page/productManagement.jsp");
		return "/admin/menu";
	}
	
	@RequestMapping(value="/boardManagement", method=RequestMethod.GET)
	public String boardManagement(Model model) {
		model.addAttribute("display", "/admin/page/boardManagement.jsp");
		return "/admin/menu";
	}
	
	@RequestMapping(value="/noticeManagement", method=RequestMethod.GET)
	public String noticeManagement(Model model) {
		model.addAttribute("display", "/admin/page/noticeManagement.jsp");
		return "/admin/menu";
	}
}
