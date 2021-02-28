package board.bean;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;
//담당 : 김명경
@Data
public class CommentDTO {
	private int board_seq, comment_seq;
	private String comment_content, mem_id;
	@JsonFormat(shape=JsonFormat.Shape.STRING, pattern = "yyyy.MM.dd. HH:mm:ss", timezone="Asia/Seoul")
	private Date comment_logtime;
}
