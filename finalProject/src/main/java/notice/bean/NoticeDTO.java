package notice.bean;

import lombok.Data;

@Data
public class NoticeDTO {
	
	private int seq; 		  //글번호
	private String option1_id;   //대분류
	private String option2_id;   //소분류
	private String notice_subject;   //제목
	private String notice_content;   //내용
	private String notice_picture;   //사진
	private String logtime;   //시간


}
