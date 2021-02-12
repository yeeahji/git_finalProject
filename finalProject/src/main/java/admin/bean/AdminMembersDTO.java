package admin.bean;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;
@Data
public class AdminMembersDTO {
	//member
	private String mem_id, 
				   store_nickname,
				   store_img, 
				   store_intro;
	private int store_echo, store_scoreavg;
	
	//store
	private String mem_name, 
				   mem_pwd, 
				   mem_email, 
				   mem_tel,
				   mem_add1, 
				   mem_add2, 
				   mem_recentAdd1, 
				   mem_recentAdd2,
				   mem_location, 
				   mem_recentLocation; 
	private int mem_postcode, mem_recentPostcode;
	
	@JsonFormat(shape=JsonFormat.Shape.STRING, pattern = "yyyy.MM.dd")
	private Date mem_logtime;
	
	//product
	private int product_seq,
				cate_code,
				product_condition,
				product_delivery_fee,
				product_view,
				product_manage;
	
	private String product_subject,
			product_content,
			product_img1, product_img2, product_img3, product_img4, product_img5,
			product_price,
			product_location,
			product_hashtag1, product_hashtag2, product_hashtag3, product_hashtag4, product_hashtag5,
			product_logtime;
	}
