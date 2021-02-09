package chat.controller;

import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import chat.bean.ChatListDTO;
import chat.service.ChatService;
import member.bean.MemberDTO;

@Controller
@RequestMapping(value="chat")
public class ChatController {
	@Autowired
	private ChatService chatService;
	
	//채팅방 리스트 입장 (바다톡 누르거나(확실) 채팅방에서 목록 누를 시(불확실))
	@RequestMapping(value="/chatList", method=RequestMethod.GET)
	public String chatList() {	
		return "/chat/chatList";
	}
	
	//채팅방 리스트 불러오기
	@RequestMapping(value="/getChatList", method=RequestMethod.POST)
	@ResponseBody
	public void getChatList(Principal principal, Model model) {	
		List<ChatListDTO> chatList = chatService.getChatList(principal.getName());
			
		model.addAttribute("chatList", chatList);
	}
	
//	@RequestMapping(value="/chatList", method=RequestMethod.GET)
//	public String chatList(Principal principal, Model model) {	
//
//		return "/chat/chatList";
//	}
	
	@RequestMapping(value="/chatForm", method=RequestMethod.GET)
	public String chatForm() {
		return "/chat/chatForm";
	}
	
	//채팅방 (연락하기 눌렀을 때 바로 여기로 연결)
	@RequestMapping(value="/chatRoom", method=RequestMethod.GET)
	public String chatRoom(HttpServletRequest request, @AuthenticationPrincipal MemberDTO memberDTO) throws Exception {
		//만약 room_create = 1 인데 제 3자가 들어오려 하면 거르기 --이게 되려나?
		
		//처음 연락 시 채팅방 생성		
			//채팅방 번호 난수 부여
			int chat_seq = new Random().nextInt(5784675);
			request.setAttribute("chat_seq", chat_seq);
			
			//DB로 정보 가져오기
			  //구매자의 상점 프사
			
			//처음 연락한 사람(현재 로그인한 사람)이 TWO로 들어감
			Map<String, String> map = new HashMap<String, String>();
			map.put("chat_seq", chat_seq+"");
			map.put("ONE_mem_id", memberDTO.getMem_id());
			map.put("TWO_mem_id", "seller1"); 
			map.put("ONE_store_nickname", memberDTO.getMem_name());
			map.put("TWO_store_nickname", "판매자의 상점이름");
			map.put("ONE_store_img", "연락자의 이미지");
			map.put("TWO_store_img", "판매자의 이미지");
			
			//메시지 내용 파일화
			map.put("message_content", "안녕하세요"); //나중에 split
			map.put("last_message", "마지막 메시지");
			
			//DB에 저장 (1개의 채팅방 생성, 2개의 채팅리스트 생성(두 명 모두 생성되어야 하니까))
			chatService.insertRoomInfo(map);
			
			return "/chat/chatRoom";
	
			
		//두 번째 이상 연락 시 채팅 정보 업데이트
			
	}

}













