package chat.service;


import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import chat.bean.ChatListDTO;
import chat.dao.ChatDAO;
import index.dao.IndexDAO;


@Service
public class ChatServiceImpl implements ChatService {
	@Autowired
	private ChatDAO chatDAO;

	@Override
	public List<ChatListDTO> getChatList(String mem_id) {
		return chatDAO.getChatList(mem_id);
	}

	@Override
	public void insertRoomInfo(Map<String, String> map) {
		chatDAO.insertRoomInfo(map);
	}

}
