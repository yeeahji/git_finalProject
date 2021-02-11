package chat.bean;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChatRoomDTO {
	private int chat_seq;
	private String one_mem_id;
	private String two_mem_id;
	private String one_store_nickname;
	private String two_store_nickname;
	private String one_store_img;
	private String two_store_img;
	private String message_content;
	private Date chat_logtime;

}