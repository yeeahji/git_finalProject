package board.bean;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;
//담당 : 김명경
@Data
public class BoardDTO {
	private int board_seq, board_ref, board_lev, board_step, board_pseq,board_reply, board_hit;
	private String mem_id, board_subject, board_content;
	@JsonFormat(shape=JsonFormat.Shape.STRING, pattern = "yyyy.MM.dd")
	private Date board_logtime;
}
