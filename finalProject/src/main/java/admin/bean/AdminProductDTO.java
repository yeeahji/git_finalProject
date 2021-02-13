package admin.bean;

import lombok.Data;

@Data
public class AdminProductDTO {
	//카테고리
	private int cate_code;
	private String cate_name;
	private String cate_parent; //기본값이 null이라 String
	//product
	private int product_seq;
	private String mem_id;
	private String product_subject;
	private String product_content;
	private String product_img1;
	private String product_img2;
	private String product_img3;
	private String product_img4;
	private String product_img5;
	private String product_price;
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
	private String product_logtime;
}
