package product.bean;

import org.springframework.stereotype.Component;

import lombok.Data;

@Data
@Component
public class RelProdPaging {
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
		
		
		//if(startPage > 1) //이전
		if(currentPage > 1)
			pagingHTML.append("<button direction='prev' id='paging' onclick='relProdPaging("+(currentPage-1)+")' class='list_PrevBtn'>\r\n" + 
				"<img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAcCAYAAABsxO8nAAAAAXNSR0IArs4c6QAAAndJREFUOBGdlEloU1EUhvsyCMkiZFgEXRgykYBChAhVuglIWytOiFRBnEBw50pBcJONO9G9iNSd4oCggrYWo0XBlTEQSiADgSDtJoMLMWTyOyWvmLQv76UXDvfed87/5dx7zs3ExA5HMBi85Pf7n8XjcasgTDvhALnZ7XYX0M7XarWTYzN6vZ4C5B6Z9LAO6+sqRFEXenMikbCUy+XHxF1UFKXJfKFYLL5UdYZA3IOdI7wgozkgv7HThULhkwqRWRcUjUY9zWbzHbGTANZNJtNcPp//8T9EFxQIBPaSxQcCo1jRbDbPACkMQ2SvWbVQKLQP/zdMID/tdvuUFgT/9kejGlOU9w1+F/aZI53iYhsi0BpbMqKsJ4AsIXABeO3z+Y7qQQQ+AOJOriJ+xXcbl/qIap1NpVJ/JdDwAHKbbKTRehztrmGhGijdCuRBH9IFckP1jTMrABYQXBYRx7lCoz2R9bgDrekpoj8i5JLPSxePC5H4jc6mZw53Oh3pXqnUV4fDcTydTtfHAW4+Ee5mPxktIt4NLGOz2Waz2eyaUdgmSASRSMTfarUWKUAIWMFqtU7ncrmSEdgASARcvpfpPXYA+9V/X1nWI8dAQ0pkqVRaJ5sEtsJ2D3f3JRwOT46k4NwCEoE8Ca/XOwvsLVt3u91eJtNp8WkNs5ajUqm0Y7HY80aj4SfmINBzLpdrlT+4VS3NyO9Dnd8ms2sjBXpOAHcw9S3eGo7XPNpwYL1eX/F4PGtkeAybcbvdNo75cTjO8J5XMM8jb/aze5hMJjcKZjgj9Zeq1WrW6XR+Z38GO5TJZHaR2fK25VdFWjO9tmSxWI7gTzHfl7h/OAri9svEgRYAAAAASUVORK5CYII=' width='9' height='14' alt='이전 페이지 아이콘'>\r\n" + 
				"</button>");
		
		if(endPage < totalP) // 다음
			pagingHTML.append("<button direction='next' id='paging' onclick='relProdPaging("+(endPage+1)+")' class='list_NextBtn'>\r\n" + 
					"<img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAcCAYAAABsxO8nAAAAAXNSR0IArs4c6QAAAnhJREFUOBGllUuIUmEUx8erMC6S8NFA9BAfyIiQELSqTMqSgpmgkoIWtQlqO9E6F+0igqBFtG0RPTY9ZCgimXBR7STExGfWrhSEynDUfsfxwnDzXh998Pf77nfO+XnO+b6rcx6PZw9KBwKBHXP/MRRib6JDnU4n4/V6A7OyFLPZnCB4DbnRO7/fv3cWmFIsFltutztuMple9Pv9hV6v9xZYdFqYWQKq1ep6OBx+3Gq1vMD2oXMul+tTo9H4PC1w4A/AROPvoD5a9/l8F2cCqUE0PTmE9ZivqvtG86A0rUOz2Uw7nc4GGR7HFnc4HFb23mj9Nj+PBIkDgR/sdnuJQ1gGGAG8MxaLpXK5XH8zQF2b1IXeTGlL2B4hK9CniqKc56T/aP3lQhqOSqXy3GKxyPVokdlprsfLUCi0RRs0NiM1QC4qkFVg24B+BH6iUCh8V+0TgyRg+Aq9BrabxzxlHiuVSnWxjS1NnNRRLpcLBO/nOY8WAWZ42RfFPhVIAmj0V6ZXsga0q9vtHpW17vGLUTsSiYS53W7fZ/8K6tKrS2R5T/wm7lE0GrXWarWHxJxEv9FZOVHmwZgIRJO3UsYzIiKoSZ+WaHJmA7HxObZHwWBwO65rKEIp3/j9OqiFCMowI95+P3dHGutBeUBxevJFArVDNyO5gHK8BAjk/fz8/AE9iEBHgsjkMJmkAS3gs2qz2Y7k8/kfEqA3/gHxkp4BkEI2SnnAT8hyNpv9qQcYuc/pXAbURX3Wt4AZ9lAPcl0AqEdp10Y6GW0mk0mFb787zKID5IKRv57NXK/Xb1DCCg6/6MkpTuaJnrPRvvxB3sYhzRwDkjJyNrL9BU8n98q8AKoVAAAAAElFTkSuQmCC' width='9' height='14' alt='다음 페이지 아이콘'>\r\n" + 
					"</button>");
		
		
		
	}
}		








