package store.bean;

import lombok.Getter;
import lombok.Setter;
import member.bean.MemberDTO;


@Getter
@Setter
public class StoreDTO {
	private String mem_id;
	private String store_nickname;
	private String store_img;
	private String store_intro;
	private int store_echo;
	private int store_scoreavg;

}
