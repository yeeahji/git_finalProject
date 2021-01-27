package product.bean;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductDTO {
	private int product_seq;
	private String mem_id;
	private int cate_code;
	private String product_subject;
	private String product_content;
	private String product_img1;
	private String product_img2;
	private String product_img3;
	private int product_price;
	private String product_location;
	private int product_condition;
	private int product_delivery_fee;
	private String product_hashtag1;
	private String product_hashtag2;
	private String product_hashtag3;
	private String product_hashtag4;
	private String product_hashtag5;
	private int product_view;
	private int product_manage;
	private Date product_logtime;
}
