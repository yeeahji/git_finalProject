package board.bean;

import org.springframework.stereotype.Component;

import lombok.Data;
//담당 : 김명경
@Data
@Component
public class BoardPaging {
	public int currentPage; //현재페이지 
	public int pageBlock;  //[이전][1][2][3][다음]한 페이지당 띄울 페이지 번호. ->> 5 
	public int pageSize; //1페이지당 출력할 글 수. (1페이지당 10개씩)
	public int total; //총 글 수 
	public StringBuffer pagingHTML;
	
	
	public void makePagingHTML() {
		pagingHTML = new StringBuffer();
		int totalP = (total+(pageSize-1))/pageSize; // ★공식!   총 페이지 수  : 5개
		
		int startPage = (currentPage-1) / pageBlock * pageBlock + 1;
		
		int endPage = startPage + pageBlock - 1;
		if(endPage > totalP) {
			endPage = totalP;
		}
//		▶ [이전]/[다음]을 페이지에 추가하기.
//		1) 일반
		if(startPage > pageBlock) {
			pagingHTML.append("<a id='paging' onclick='boardPaging("+(startPage-1)+")'><img src=\"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMiIgaGVpZ2h0PSIxMiIgdmlld0JveD0iMCAwIDEyIDEyIj4KICAgIDxwYXRoIGZpbGw9IiM5Qjk5QTkiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTMuNiAxMmEuNTk2LjU5NiAwIDAgMCAuNDQ5LS4yMDJsNC44LTUuNGEuNi42IDAgMCAwIDAtLjc5N2wtNC44LTUuNGEuNi42IDAgMSAwLS44OTcuNzk3TDcuNTk4IDYgMy4xNTIgMTFBLjYuNiAwIDAgMCAzLjYgMTIiLz4KPC9zdmc+Cg==\" width='12' height='12' alt='페이징 아이콘' style='transform:rotate(180deg);'></a>"); // 링크 걸어주기
		}
//		js의 boardPaging(n)을 찾아간다.
		for (int i=startPage; i<=endPage; i++) {
			if(i == currentPage) //현재페이지라면
				pagingHTML.append("<a id='currentPaging' onclick='boardPaging("+i+")'>"+i+"</a>");
			else
				pagingHTML.append("<a id='paging' onclick='boardPaging("+i+")'>"+i+"</a>");
			
		}//for
		
//		2) 마지막 페이지에는 [다음]이 없다.
		if(endPage < totalP) {
			pagingHTML.append("<a id ='paging' onclick='boardPaging("+(endPage+1)+")'><img src=\"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMiIgaGVpZ2h0PSIxMiIgdmlld0JveD0iMCAwIDEyIDEyIj4KICAgIDxwYXRoIGZpbGw9IiM5Qjk5QTkiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTMuNiAxMmEuNTk2LjU5NiAwIDAgMCAuNDQ5LS4yMDJsNC44LTUuNGEuNi42IDAgMCAwIDAtLjc5N2wtNC44LTUuNGEuNi42IDAgMSAwLS44OTcuNzk3TDcuNTk4IDYgMy4xNTIgMTFBLjYuNiAwIDAgMCAzLjYgMTIiLz4KPC9zdmc+Cg==\" width='12' height='12' alt='페이징 아이콘'></a>");
		}
//		3) 1페이지는 [이전] 페이지가 없다.	
	}

	
	
	
}
