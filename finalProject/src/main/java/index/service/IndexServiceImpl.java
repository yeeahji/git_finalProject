package index.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import index.bean.ProductDTO;
import index.dao.IndexDAO;

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
			start = default_count + (page-1) * pageSize ;
			end = default_count + page * pageSize;
			param.put("start", start);
			param.put("end", end);
		}
		
		return indexDAO.getProductList(param);

	}
}
