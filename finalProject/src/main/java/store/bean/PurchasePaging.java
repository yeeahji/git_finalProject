package store.bean;

import org.springframework.stereotype.Component;

import lombok.Data;

@Data
@Component
public class PurchasePaging {
	private int currentPage;//현재페이지
	private int pageBlock;//[이전][1][2][3][다음]
	private int pageSize;//1페이지 당 5개씩
	private int totalA;//총 글 수 
	private StringBuffer pagingHTML;//StringBuffer는 편집이 가능
	
	public void makePagingHTML() {
		pagingHTML = new StringBuffer();
		int totalP = (totalA + (pageSize-1)) / pageSize; //총 페이지 수
		int startPage = (currentPage-1) / pageBlock * pageBlock + 1;
		int endPage = startPage + pageBlock - 1;
		if(endPage > totalP) endPage = totalP;
		
		if(startPage > 1) //이전
	        pagingHTML.append("<a id='paging' onclick='purchasePaging("+(startPage-1)+")'><img src=\"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMiIgaGVpZ2h0PSIxMiIgdmlld0JveD0iMCAwIDEyIDEyIj4KICAgIDxwYXRoIGZpbGw9IiM5Qjk5QTkiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTMuNiAxMmEuNTk2LjU5NiAwIDAgMCAuNDQ5LS4yMDJsNC44LTUuNGEuNi42IDAgMCAwIDAtLjc5N2wtNC44LTUuNGEuNi42IDAgMSAwLS44OTcuNzk3TDcuNTk4IDYgMy4xNTIgMTFBLjYuNiAwIDAgMCAzLjYgMTIiLz4KPC9zdmc+Cg==\" width='12' height='12' alt='페이징 아이콘' style='transform:rotate(180deg);'></a>");
		for(int i=startPage; i<=endPage; i++) {
			if(i == currentPage) // 현재페이지
			     pagingHTML.append("<a id='currentPaging' onclick='purchasePaging("+i+")'>"+i+"</a>");
			else //다음페이지
				 pagingHTML.append("<a id='paging' onclick='purchasePaging("+i+")'>"+i+"</a>");
													
		}//for
			
		if(endPage < totalP) // 다음
			 pagingHTML.append("<a id='paging' onclick='purchasePaging("+(endPage+1)+")'><img src=\"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMiIgaGVpZ2h0PSIxMiIgdmlld0JveD0iMCAwIDEyIDEyIj4KICAgIDxwYXRoIGZpbGw9IiM5Qjk5QTkiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTMuNiAxMmEuNTk2LjU5NiAwIDAgMCAuNDQ5LS4yMDJsNC44LTUuNGEuNi42IDAgMCAwIDAtLjc5N2wtNC44LTUuNGEuNi42IDAgMSAwLS44OTcuNzk3TDcuNTk4IDYgMy4xNTIgMTFBLjYuNiAwIDAgMCAzLjYgMTIiLz4KPC9zdmc+Cg==\" width='12' height='12' alt='페이징 아이콘'></a>");
	
	}
}
