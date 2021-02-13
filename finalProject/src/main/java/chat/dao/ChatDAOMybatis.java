package chat.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import chat.bean.ChatListDTO;
import chat.bean.ChatRoomDTO;

@Repository
@Transactional
public class ChatDAOMybatis implements ChatDAO {
	@Autowired
	private SqlSession sqlSession;

	@Override
	public List<ChatListDTO> getChatList(String mem_id) {
		return sqlSession.selectList("chatSQL.getChatList", mem_id);
	}

	@Override
	public void insertRoomInfo(Map<String, String> map) {
		sqlSession.insert("chatSQL.insertRoomInfo", map);
	}
	
	@Override
	public ChatRoomDTO checkChatId(Map<String, String> chatId) {
		return sqlSession.selectOne("chatSQL.checkChatId", chatId);
	}

	@Override
	public void setLastMessage(Map<String, String> map) {
		sqlSession.update("chatSQL.setLastMessage", map);
	}


}
