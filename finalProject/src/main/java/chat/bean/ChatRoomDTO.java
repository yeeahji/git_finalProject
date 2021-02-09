package chat.bean;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChatRoomDTO {
	private int chat_seq;
	private int chat_create;
	private String ONE_mem_id;
	private String TWO_mem_id;
	private String ONE_store_nickname;
	private String TWO_store_nickname;
	private String ONE_store_img;
	private String TWO_store_img;
	private String message_content;
	private Date chat_logtime;

}



//package chat.bean;
//
//import lombok.Getter;
//import lombok.Setter;
//
//@Getter
//@Setter
//public class ChatRoomDTO {
//	private String chatroom_id;
//	private String USER_user_id;
//	private String TUTOR_USER_user_id;
//	private int CLASS_class_id;
//	
//	@Override
//	public String toString() {
//		return "ChatRoomVO [chatroom_id=" + chatroom_id + ", USER_user_id=" + USER_user_id + ", TUTOR_USER_user_id="
//				+ TUTOR_USER_user_id + ", CLASS_class_id=" + CLASS_class_id + "]";
//	}	
//	
//}