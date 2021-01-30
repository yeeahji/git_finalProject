package index.bean;

import lombok.Data;

@Data
public class CategoryDTO {
	private int cate_code;
	private String cate_name;
	private String caat_parent; //기본값이 null이라 String
}
