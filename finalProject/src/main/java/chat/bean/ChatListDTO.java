  
package chat.bean;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChatListDTO {
	private String mem_id;
	private int chat_seq;
	private String other_store_nickname;
	private String other_store_img;
	private String last_message;
	@JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd HH:mm")
	private Date chat_logtime;
}