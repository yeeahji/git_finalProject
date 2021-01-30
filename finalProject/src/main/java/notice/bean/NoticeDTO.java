package notice.bean;

import lombok.Data;

@Data
public class NoticeDTO {
	
	private int seq; 		  //글번호
	private String select1;   //대분류
	private String select2;   //소분류
	private String subject;   //제목
	private String adminName; //작성자
	private String content;   //내용
	private String logtime;   //시간

}
