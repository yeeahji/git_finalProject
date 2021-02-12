package store.bean;

import java.util.Date;

import lombok.Data;

@Data
public class PurchaseExistDTO {
	private String my_id;
	private String seller_id;
	private int product_seq;
	private Date purchase_logtime;
}
