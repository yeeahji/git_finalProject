package product.bean;

import lombok.Data;

@Data
public class CategoryDTO {
	private int category_code;
	private String category_name;
	private String caategory_parent; //기본값이 null이라 String
}
