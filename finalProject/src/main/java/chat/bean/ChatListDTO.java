package chat.bean;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChatListDTO {
	private String mem_id;
	private int chat_seq;
	private String OTHER_store_nickname;
	private String OTHER_store_img;
	private String last_message;
	private Date chat_logtime;
}
