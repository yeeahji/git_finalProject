package chat.service;

import java.util.List;
import java.util.Map;

import chat.bean.ChatListDTO;

public interface ChatService {
	
	public List<ChatListDTO> getChatList(String mem_id);

	public void insertRoomInfo(Map<String, String> map);


}
