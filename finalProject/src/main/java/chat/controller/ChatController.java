package chat.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping(value="chat")
public class ChatController {

	@RequestMapping(value = "/chatList", method =RequestMethod.GET)
	public String chatList() {
		return "/chat/chatList";
	}
	
	@RequestMapping(value = "/chatForm", method =RequestMethod.GET)
	public String chatForm() {
		return "/chat/chatForm";
	}

}













