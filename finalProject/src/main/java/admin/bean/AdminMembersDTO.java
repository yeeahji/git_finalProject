package admin.bean;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;
@Data
public class AdminMembersDTO {
	private String mem_id, 
				   store_nickname,
				   store_img, 
				   store_intro;
	private int store_echo, store_scoreavg;
	
	private String mem_name, mem_pwd, 
				   mem_email, mem_tel,
				   mem_add1, mem_add2, 
				   mem_recentAdd1, mem_recentAdd2,
				   mem_location, mem_recentLocation; 
	private int mem_postcode, mem_recentPostcode;
	
	@JsonFormat(shape=JsonFormat.Shape.STRING, pattern = "yyyy.mm.dd")
	private Date mem_logtime;
	}
