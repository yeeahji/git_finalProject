package board.bean;

import org.springframework.stereotype.Component;

import lombok.Data;

@Data
@Component
public class BoardPaging {
	public int currentPage; //현재페이지 
	public int pageBlock;  //[이전][1][2][3][다음]한 페이지당 띄울 페이지 번호. ->> 5 
	public int pageSize; //->> 1페이지당 10개씩
	public int total; //총 글 수 
	public StringBuffer pagingHTML;
	
//	▶ StringBuffer / String
//	:둘다 문자열 클래스
//	- StringBuffer:편집이 가능하다. 내가 있는 현재페이지가 어디인지에 따라 내용을 바꿀 수 있다. 
	
	public void makePagingHTML() {
		pagingHTML = new StringBuffer();
		int totalP = (total+(pageSize-1))/pageSize; // ★공식!   총 페이지 수  : 5개
		System.out.println("totalP:"+totalP);
		
		int startPage = (currentPage-1) / pageBlock * pageBlock + 1;
		
		int endPage = startPage + pageBlock - 1;
		if(endPage > totalP) {
			endPage = totalP;
		}
//		▶ [이전]/[다음]을 페이지에 추가하기.
//		1) 일반
		if(startPage > pageBlock) {
			pagingHTML.append("[<span id='paging' onclick='boardPaging("+(startPage-1)+")'>이전</span>]"); // 링크 걸어주기
		}
//		js의 boardPaging(n)을 찾아간다.
		for (int i=startPage; i<=endPage; i++) {
			if(i == currentPage) //현재페이지라면
				pagingHTML.append("[<span id='currentPaging' onclick='boardPaging("+i+")'>"+i+"</span>]");
			else
				pagingHTML.append("[<span id='paging' onclick='boardPaging("+i+")'>"+i+"</span>]");
			
		}//for
		
//		2) 마지막 페이지에는 [다음]이 없다.
		if(endPage < totalP) {
			pagingHTML.append("[ <span id ='paging' onclick='boardPaging("+(endPage+1)+")'>다음</a> ]");
		}
//		3) 1페이지는 [이전] 페이지가 없다.	
	}

	public void setCurrentPage(int parseInt) {
		// TODO Auto-generated method stub
		
	}

	
	
}
