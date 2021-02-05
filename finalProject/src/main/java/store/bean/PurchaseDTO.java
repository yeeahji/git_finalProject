package store.bean;

import lombok.Data;

@Data
public class PurchaseDTO {
	private String my_id; //내아이디
	private int product_seq; //상품번호
	private String product_img1; //상품사진
	private String product_subject; //상품명
	private String product_price; //상품가격
	private String store_nickname; //거래상점명
	private String purchase_logtime;//거래일
}
