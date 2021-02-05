package store.bean;

import lombok.Getter;
import lombok.Setter;
import member.bean.MemberDTO;


@Getter
@Setter
public class StoreDTO {
	private String MEM_ID;
	private String STORE_NICKNAME;
	private String STORE_IMG;
	private String STORE_INTRO;
	private int STORE_ECHO;
	private int STORE_SCOREAVG;
	
	
}
