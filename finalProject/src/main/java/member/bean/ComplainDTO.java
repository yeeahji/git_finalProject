package member.bean;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
public class ComplainDTO {
	private String reporter_id;
	private String mem_id;
	
	private String complain_content;
	@JsonFormat(shape=JsonFormat.Shape.STRING, pattern = "yyyy.MM.dd")
	private Date complain_logtime;
	
	private int product_seq;
	private int board_seq;
	private int review_seq;
	private int comment_seq;
	private String store_seq;
	private int talk_seq;
	private int complain_seq;

	private String complain_category;
}
