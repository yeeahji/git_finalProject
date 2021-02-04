package index.bean;

import org.springframework.stereotype.Component;

import lombok.Data;

@Data
@Component
public class recentlyPaging {
	private int currentPage; //현재페이지
	private int pageBlock;  //[이전][1][2][3][다음]
	private int pageSize; //1페이지 당 출력되는 페이지 수
	private int totalA;  //총 글 수
	private StringBuffer pagingHTML;
	
	public void makePagingHTML() {
		pagingHTML = new StringBuffer();
		
		int totalP = (totalA + pageSize-1) / pageSize;
	
		int startPage = (currentPage-1) / pageBlock * pageBlock + 1;
		
		int endPage = startPage + pageBlock - 1;
		//전체 페이지가 아직 블록을 채우지 못했을 경우 마지막 페이지 번호를 전체 페이지의 마지막 페이지로 바꿔준다.
		if(endPage > totalP) endPage = totalP; 
		
		//[이전] 나오게 함
		if(startPage > pageBlock) {
			pagingHTML.append("[<a  style='cursor :pointer' id='paging' href='imageboardList.do?pg="+(startPage-1)+"'>이전</a>]");
		}
			
		//[i] 페이지
		for(int i=startPage; i<=endPage; i++) {
			if(i==currentPage) {
				pagingHTML.append("[<a style='cursor :pointer' id='currentPaging'>"+i+"</a>]");
			}else {
				pagingHTML.append("[<span  style='cursor :pointer' id='paging' onclick='imageboardPaging("+i+")'>"+i+"</span>]");
			}
		}
		
		//[다음] 나오게 함
		if(endPage < totalP) {
			pagingHTML.append("[<a  style='cursor :pointer' id='paging' href='imageboardList.do?pg="+(endPage+1)+"'>다음</a>]");
		}
}

}
