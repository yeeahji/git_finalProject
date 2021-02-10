package index.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import index.dao.IndexDAO;
import product.bean.CategoryDTO;
import product.bean.ProductDTO;

@Service
public class IndexServiceImpl implements IndexService {
	@Autowired
	private IndexDAO indexDAO;

	@Override
	public List<ProductDTO> getProductList(int page) {

		Map param = new HashMap<String, Object>();
		int start;
		int end;
		int default_count = 20;
		int pageSize = 10;

		if (page > 0) {
			start = default_count + 1 + (page - 1) * pageSize;
			end = default_count + page * pageSize;
			param.put("start", start);
			param.put("end", end);

			System.out.println("start :" + start);
			System.out.println("end :" + end);

		}

		return indexDAO.getProductList(param);

	}

	@Override
	public int wishProduct(String id) {
		return indexDAO.wishProduct(id);
	}

	@Override
	public void searchProductList(String keyword, int page, String order, Model model) {

		Map<String, Object> param = new HashMap<String, Object>();
		// 검색어
		if (keyword.substring(0, 1).equals("@")) {
			// 상점명
			System.out.println("상점명 :" + keyword);
			keyword = keyword.substring(1, keyword.length());
			param.put("storeName", keyword);
		} else {
			// 상품명
			System.out.println("상품명 :" + keyword);
			param.put("productSubject", keyword);
		}

		int pageSize = 20;
		if (page == 0)
			page = 1;

		int start = (page - 1) * pageSize;
		int end = (page) * pageSize;

		
		param.put("start", start);
		param.put("end", end);
		param.put("order", order);

		// 목록 조회
		List<ProductDTO> list = indexDAO.searchProductList(param);
		// 개수 조회
		int count = indexDAO.searchProductCount(param);

		System.out.println("list	: " + list);
		System.out.println("count	: " + count);

		model.addAttribute("list", list);
		model.addAttribute("count", count);
		model.addAttribute("page", page);
		model.addAttribute("keyword", keyword);
		model.addAttribute("order", order);

	}

	@Override
	public List<ProductDTO> recentlyList(List<String> list) {
		 return indexDAO.recentlyList(list);
	}

	@Override
	public void cateProductList(String cate_code, int page, String order, Model model) {
		Map<String, Object> map = new HashMap<String, Object>();
		

		int pageSize = 20;
		if (page == 0)
			page = 1;

		int start = (page - 1) * pageSize;
		int end = (page) * pageSize;

		String cateState="";
		// 자식 카테고리 조회
		String cate_name = indexDAO.cateCodeName(cate_code);
		//System.out.println("cate_code : " +cate_code); 
		// 검색어
		if (cate_code.substring(cate_code.length()-1, cate_code.length()).equals("0")) {
			cateState = "cate_parent";
			
			cate_name="";
		} else {
			cateState = "cate_code";	
		}
		
		map.put("cateState", cateState);
		map.put("start", start);
		map.put("end", end);
		map.put("order", order);
		map.put("cate_code", Integer.parseInt(cate_code));

		System.out.println("cate"+cate_code.substring(0, cate_code.length()-1)+"0");
		// 목록 조회
		List<ProductDTO> list = indexDAO.cateProductList(map);
		// 개수 조회
		int count = indexDAO.cateProductCount(map);
		// 부모 카테고리 조회
		String cate_parent = indexDAO.cateParentName(cate_code.substring(0, cate_code.length()-1)+"0");
		
		
//		System.out.println("list	: " + list);
//		System.out.println("count	: " + count);

		model.addAttribute("cate_name", cate_name);
		model.addAttribute("cate_parent", cate_parent);
		model.addAttribute("list", list);
		model.addAttribute("count", count);
		model.addAttribute("page", page);
		model.addAttribute("cate_code", cate_code);
		model.addAttribute("order", order);
		
	}

	@Override
	public List<CategoryDTO> categoryList() {
		return indexDAO.categoryList();	
	}
}
