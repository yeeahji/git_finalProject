package product.bean;

import java.util.Date;

import lombok.Data;

@Data
public class WishDTO {
	private String mem_id;
	private int product_seq;
	private Date wish_logtime; 
}
