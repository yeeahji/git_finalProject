package chat.controller;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
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

import com.google.gson.JsonElement;
import com.google.gson.JsonParser;

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
	
	// 채팅방 리스트 입장
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
	
	// 채팅방 (연락하기 눌렀을 때 바로 여기로 연결)
	@RequestMapping(value="/chatRoom", method=RequestMethod.POST)
	public String chatRoom(@RequestParam String other_store_nickname,
						   @RequestParam(required=false, defaultValue="0") String product_seq,
						   @RequestParam(required=false, defaultValue="") String product_subject,
						   Principal principal, HttpSession session) throws Exception {
		//데이터 가져오기
			//사용자
		String one_mem_id = principal.getName();
		StoreDTO one_storeDTO = storeService.storeInfo(one_mem_id);
		String one_store_nickname = one_storeDTO.getStore_nickname();
		String one_store_img = one_storeDTO.getStore_img();

			//상대방
		StoreDTO two_storeDTO = storeService.getMember(other_store_nickname);
		String two_mem_id = two_storeDTO.getMem_id();
		String two_store_nickname = other_store_nickname;
		String two_store_img = two_storeDTO.getStore_img();
		
		//기존에 두 아이디로 생성된 채팅방이 있는지 체크
		Map<String, String> chatId = new HashMap<String, String>();
		chatId.put("one_mem_id", one_mem_id);
		chatId.put("two_mem_id", two_mem_id);
		ChatRoomDTO chatRoomDTO = chatService.checkChatId(chatId);
		int chat_seq = 0;

		//처음 연락 시 채팅방 생성
		if(chatRoomDTO == null) {
			//채팅방 번호 난수 부여
			chat_seq = new Random().nextInt(5784675);

			//처음 연락한 사람(현재 로그인한 사람)이 ONE으로 들어감
			Map<String, String> map = new HashMap<String, String>();
			map.put("chat_seq", chat_seq+"");
			map.put("one_mem_id", one_mem_id);
			map.put("two_mem_id", two_mem_id); 
			map.put("one_store_nickname", one_store_nickname);
			map.put("two_store_nickname", two_store_nickname);
			map.put("one_store_img", one_store_img);
			map.put("two_store_img", two_store_img);
			
			//메시지 내용 파일화
			map.put("last_message", "");
			
			//DB에 저장 (1개의 채팅방 생성, 2개의 채팅리스트 생성(두 명 모두 생성되어야 하니까))
			chatService.insertRoomInfo(map);
			
		} else {
			//채팅방 번호 가져오기
			chat_seq = chatRoomDTO.getChat_seq();
		}
		
		//데이터 전달
		session.setAttribute("chat_seq", chat_seq);
		session.setAttribute("product_seq", product_seq);
		session.setAttribute("product_subject", product_subject);
		session.setAttribute("my_store_nickname", one_store_nickname);
		session.setAttribute("other_store_nickname", two_store_nickname);
		session.setAttribute("two_mem_id", two_mem_id);

		return "/chat/chatRoom";
	}
	
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
	
	// 이미지 단축 URL화
//	@RequestMapping(value="getShortenURL", method=RequestMethod.GET)
//	@ResponseBody
//	public String getShortenURL(@RequestParam String originalURL) throws UnsupportedEncodingException {
//		System.out.println("도착?");
//		System.out.println(originalURL);
//
//        String apiURL = "https://openapi.naver.com/v1/util/shorturl?url=" + originalURL;
//        String clientId = ""; //애플리케이션 클라이언트 아이디값"
//        String clientSecret = ""; //애플리케이션 클라이언트 시크릿값"
//
//        Map<String, String> requestHeaders = new HashMap<>();
//        requestHeaders.put("X-Naver-Client-Id", clientId);
//        requestHeaders.put("X-Naver-Client-Secret", clientSecret);
//        String responseBody = ShortenURL.get(apiURL,requestHeaders);
//        
//        System.out.println("단축 URL의 JSON : " + responseBody);
//
//        JsonParser jsonParser = new JsonParser();
//        JsonElement jsonElement = jsonParser.parse(responseBody);
//        jsonElement = jsonElement.getAsJsonObject().get("result");
//
//        String result = String.valueOf(jsonElement.getAsJsonObject().get("url"));
//        result = result.substring(1);
//        result = result.substring(0,result.length()-1);
//        
//        System.out.println("단축 URL : " + result);
//
//        return result;
//	}
}
	 





