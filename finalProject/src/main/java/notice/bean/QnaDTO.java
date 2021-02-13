package notice.bean;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
public class QnaDTO {
	private String mem_id;
	private String qnaCate_main;
	private String qnaCate_sub;
	private String qna_content;
	private String qna_img1;
	private String qna_img2;
	private String qna_answer;
	
	@JsonFormat(shape=JsonFormat.Shape.STRING, pattern = "yyyy.MM.dd")
	private Date qna_logtime;
	@JsonFormat(shape=JsonFormat.Shape.STRING, pattern = "yyyy.MM.dd")
	private Date qna_answerLogtime;
	
	
	private int qna_seq;
}