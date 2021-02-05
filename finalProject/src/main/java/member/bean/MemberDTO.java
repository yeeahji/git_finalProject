package member.bean;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MemberDTO {
	
	private String mem_name, mem_id, mem_pwd, mem_email, mem_tel,
					mem_add1, mem_add2, 
					mem_recentAdd1, mem_recentAdd2,
					mem_location, mem_recentLocation; 
	private int mem_postcode, mem_recentPostcode;
	@JsonFormat(shape=JsonFormat.Shape.STRING, pattern = "yyyy.mm.dd")
	private Date mem_logtime;
	
}
