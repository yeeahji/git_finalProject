package admin.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping(value="admin")
public class AdminController {
	
	@RequestMapping(value="/login", method=RequestMethod.GET)
	public String login() {
		return "/admin/page/login";
	}
	
	@RequestMapping(value="/menu", method=RequestMethod.GET)
	public String menu() {
		return "/admin/page/menu";
	}
}
