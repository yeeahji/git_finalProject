package chat.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import chat.dao.ChatDAO;
import index.dao.IndexDAO;


@Service
public class ChatServiceImpl implements ChatService {
	@Autowired
	private ChatDAO chatDAO;


}
