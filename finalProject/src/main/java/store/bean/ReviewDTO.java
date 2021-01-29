package store.bean;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
public class ReviewDTO {
	private int product_seq;
	private String store_nickname;
	private String store_img;
	private String mem_id; //review.mem_id
	private String product_subject;
	private String review_content;
	private int review_score;
	@JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yy/MM/dd")
	private Date review_date;
	private int review_seq;
}
