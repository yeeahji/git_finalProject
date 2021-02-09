package product.bean;

import lombok.Data;

@Data
public class CategoryDTO {
	private int cate_code;
	private String cate_name;
	private String cate_parent; //기본값이 null이라 String
}
