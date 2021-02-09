package member.bean;

import java.util.Date;
import lombok.Data;

@Data
public class ComplainDTO {
	private String reporter_id;
	private String mem_id;
	
	private String complain_content;
	private Date complain_logtime;
	
	private int product_seq;
	private int board_seq;
	private int review_seq;
	private int comment_seq;
	private int talk_seq;
	private int complain_seq;
	private String complain_category;
}
