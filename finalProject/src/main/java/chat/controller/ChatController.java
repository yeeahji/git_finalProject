package chat.controller;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;
import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import chat.bean.ChatListDTO;
import chat.bean.ChatRoomDTO;
import chat.service.ChatService;
import chat.service.ChatServiceImpl;
import member.bean.MemberDTO;
import store.bean.StoreDTO;
import store.service.StoreService;

@Controller
@RequestMapping(value="chat")
public class ChatController {
	@Autowired
	private ChatService chatService;
	@Autowired
	private StoreService storeService;
	
	// 채팅방 리스트 입장 (바다톡 누르거나(확실) 채팅방에서 목록 누를 시(불확실))
	@RequestMapping(value="/chatList", method=RequestMethod.GET)
	public String chatList() {
		return "/chat/chatList";
	}
	
	// 채팅방 리스트 불러오기
	@RequestMapping(value="/getChatList", method=RequestMethod.POST)
	@ResponseBody
	public ModelAndView getChatList(Principal principal) {	
		List<ChatListDTO> chatList = chatService.getChatList(principal.getName());
		
		ModelAndView mav = new ModelAndView();
		mav.addObject("chatList", chatList);
		mav.setViewName("jsonView");
		return mav;
	}
	
	// 채팅방입장
		@RequestMapping(value="/chatRoom", method=RequestMethod.GET)
		public String chatRoom() {
			return "/chat/chatRoom";
		}
		
	// 채팅방 (연락하기 눌렀을 때 바로 여기로 연결)
	/*
	 * @RequestMapping(value="/chatRoom", method=RequestMethod.POST) public String
	 * chatRoom(@RequestParam String other_store_nickname,
	 * 
	 * @RequestParam(required=false, defaultValue="0") String product_seq,
	 * 
	 * @RequestParam(required=false, defaultValue="") String product_subject,
	 * Principal principal, HttpSession session) throws Exception { //데이터 가져오기 //사용자
	 * String one_mem_id = principal.getName(); StoreDTO one_storeDTO =
	 * storeService.storeInfo(one_mem_id); String one_store_nickname =
	 * one_storeDTO.getStore_nickname(); String one_store_img =
	 * one_storeDTO.getStore_img();
	 * 
	 * //상대방 System.out.println("상대방의 상점 닉네임 : " + other_store_nickname); StoreDTO
	 * two_storeDTO = storeService.getMember(other_store_nickname); String
	 * two_mem_id = two_storeDTO.getMem_id(); String two_store_nickname =
	 * other_store_nickname; String two_store_img = two_storeDTO.getStore_img();
	 * 
	 * //기존에 두 아이디로 생성된 채팅방이 있는지 체크 Map<String, String> chatId = new HashMap<String,
	 * String>(); chatId.put("one_mem_id", one_mem_id); chatId.put("two_mem_id",
	 * two_mem_id); ChatRoomDTO chatRoomDTO = chatService.checkChatId(chatId); int
	 * chat_seq = 0;
	 * 
	 * //처음 연락 시 채팅방 생성 if(chatRoomDTO == null) { //채팅방 번호 난수 부여 chat_seq = new
	 * Random().nextInt(5784675);
	 * 
	 * //처음 연락한 사람(현재 로그인한 사람)이 ONE으로 들어감 Map<String, String> map = new
	 * HashMap<String, String>(); map.put("chat_seq", chat_seq+"");
	 * map.put("one_mem_id", one_mem_id); map.put("two_mem_id", two_mem_id);
	 * map.put("one_store_nickname", one_store_nickname);
	 * map.put("two_store_nickname", two_store_nickname); map.put("one_store_img",
	 * one_store_img); map.put("two_store_img", two_store_img);
	 * 
	 * //메시지 내용 파일화 map.put("message_content", "안녕하세요"); //나중에 split
	 * map.put("last_message", "마지막 메시지");
	 * 
	 * //DB에 저장 (1개의 채팅방 생성, 2개의 채팅리스트 생성(두 명 모두 생성되어야 하니까))
	 * chatService.insertRoomInfo(map);
	 * 
	 * } else { //채팅방 번호 가져오기 chat_seq = chatRoomDTO.getChat_seq(); }
	 * 
	 * //데이터 전달 session.setAttribute("chat_seq", chat_seq);
	 * session.setAttribute("product_seq", product_seq);
	 * session.setAttribute("product_subject", product_subject);
	 * session.setAttribute("my_store_nickname", one_store_nickname);
	 * session.setAttribute("other_store_nickname", two_store_nickname);
	 * session.setAttribute("two_mem_id", two_mem_id);
	 * 
	 * return "/chat/chatRoom"; }
	 */
	
	// 메시지 저장
	@RequestMapping(value="saveMsg", method=RequestMethod.POST)
	@ResponseBody
	public void saveMsg(@RequestParam String message_content,
						@RequestParam String chat_seq, Principal principal) {
		//파일로 저장
		String filePath = "D:/git_home/git_final/finalProject/src/main/webapp/storageMsg";
		String fileName = chat_seq + ".txt";
		File file = new File(filePath, fileName);
        FileOutputStream fos = null;
        
        try {
            byte[] content = message_content.getBytes(); //문자열을 바이트로 변환
            fos = new FileOutputStream(file);
            fos.write(content);
            fos.flush();
            fos.close();
            
        } catch(IOException e) {
            e.printStackTrace();
        } finally {
            try {
                if(fos != null) fos.close();
            } catch(IOException e) {
                e.printStackTrace();
            }
        }
	}
	
	// 메시지 불러오기
//	@RequestMapping(value="loadMsg", method=RequestMethod.POST)
//	@ResponseBody
//	public String loadMsg(@RequestParam String chat_seq) {
//		//처음 입장이 아닐 때만 수행
//        BufferedReader reader = null;
//        String msg = null;
//        
//        //DB
//        //chatService.getMessage_content();
//        try {
//        	String filePath = "D:/git_home/git_final/finalProject/src/main/webapp/storageMsg";
//        	String fileName = chat_seq + ".txt";
//            File file = new File(filePath, fileName);
//            reader = new BufferedReader(new FileReader(file));
//              
//            //파일 읽기
//            while(reader.readLine() != null) {
//            	msg = reader.readLine();
//            }
//        } catch(IOException e) {
//            e.printStackTrace();
//        } finally {
//            try {
//                if(reader != null) reader.close();
//            } catch(IOException e) {
//                e.printStackTrace();
//            }
//        }
//        System.out.println(msg);
//        return msg;
//	}
	
	// 마지막 메시지
	@RequestMapping(value="getLastMessage", method={RequestMethod.GET, RequestMethod.POST})
	@ResponseBody
	public void getLastMessage(@RequestParam String last_message,
							   @RequestParam String chat_seq) {
		Map<String, String> map = new HashMap<String, String>();
		map.put("last_message", last_message);
		map.put("chat_seq", chat_seq);
		
		chatService.setLastMessage(map);
	}
	
	// 채팅방 나가기
	@RequestMapping(value="deleteChatRoom", method={RequestMethod.POST})
	@ResponseBody
	public void deleteChatRoom(@RequestParam String chat_seq) {
		//만약 채팅방을 나간다면	
		//chatRoom은 chatList의 부모이고, chatRoom이 null인 조건에서만 chatList가 각각 생성되기 때문에
		//데이터를 한쪽은 보존하고 다른 한쪽은 삭제할 수가 없다
		//한쪽은 보존, 한쪽은 삭제하려면(번개장터식) 메시지 내용을 2개의 파일로 나눠서 저장해야할듯 하다 (하지만 남은 시간이..)
		//여기서 여러 방법으로 나뉠 수 있는데
		
		//1. 채팅방 나가기 없음 - 나간다면 채팅리스트에선 안보이나 다시 연락하면 언제든지 예전 대화 내용이 있는 방 생성됨
		//2. 채팅방 나가기 없음 - 나가기 버튼 자체가 없음(걍 구현안함)
		//3. 채팅방 나가기 있음 - 나가고 모든 데이터 삭제(상대도 강제로 나가짐. 말도안되는듯). 그 전에 둘이 했던 대화 내용은 알아볼수 있는 제목으로 변경하여 따로 백업해두기(나중에 관리자 문의를 위해)
		
	}
}
	 





