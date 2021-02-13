package chat.dao;

import java.util.List;
import java.util.Map;

import chat.bean.ChatListDTO;
import chat.bean.ChatRoomDTO;

public interface ChatDAO {

	public List<ChatListDTO> getChatList(String mem_id);
	
	public void insertRoomInfo(Map<String, String> map);

	public ChatRoomDTO checkChatId(Map<String, String> chatId);

	public void setLastMessage(Map<String, String> map);
	
}