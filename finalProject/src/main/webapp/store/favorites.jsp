<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<script type="text/javascript" src="https://code.jquery.com/jquery-3.5.1.min.js"></script>  
<script defer src="${pageContext.request.contextPath}/js/store/favorites.js"></script>
<link rel="stylesheet" href="${pageContext.request.contextPath}/css/store/favorites.css">    
<link rel="stylesheet" href="${pageContext.request.contextPath}/css/store/store.css">  


<div class="favoritesTop">
	<div>
	찜
	<span class="favoritesNum">100</span>
	</div>
</div>
<!-- 찜목록  -->
<div class="favoritesContentWrap"> 
	<div class="favoritesContentTop">
		<div class="favoritesDeleteWrap">
			<div class="favoritesDeleteCheck">
			</div>
			<button class="favoritesDeleteBtn">선택삭제</button>	
		</div>
		<div class="group">
				<!-- DB-카테고리 정렬 -->
				<a class="groupChecked">최신순</a>
				<a class="groupOther">인기순</a>
				<a class="groupOther">저가순</a>
				<a class="groupOther">고가순</a>
		</div>
	</div><!-- //reviewsContentTop -->
	
	<!-- 찜한 상품 목록 -->
	<div class="favoritesContentList">
		
		<div class="favoriteOneWrap">
			<a class="favoriteOneLink" href="#">
				<div class="favoriteOneCheckWrap">
					<div class="favoriteOneCheck"></div>
				</div>
				<div class="favoriteOneImg">
					<img src="https://media.bunjang.co.kr/product/136345914_1_1603603952_w268.jpg" alt="상품이미지">
					<div class="favoriteOneImgInner"></div>
				</div>
				<div class="favoriteOneDetailWrap">
					<div class="favoriteOneDetail">
						<div class="favoriteOneName">구두</div>
						<div class="favoriteOnePrice">
							<div>200000</div>
						</div>
						<div class="favoriteOneDate">3달전</div>
					</div>
					<div class="favoriteOneLocation">
						<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAiCAYAAABIiGl0AAAAAXNSR0IArs4c6QAAA6xJREFUWAm1l01IVFEUx51xNAtxIcEENuQIrqTxO8OEmj5IAncVUS2E2kS0axO4C5KiFi0lXIh9QBC1kKgwclNGjaNOSUEapVRiUSHoTOo4/c743vjem/vGp8xcuHPu+Z//Of9778y9740rz0EbGxsrjsViQait9JpEIuF1uVzbGCfo0/jT2GGwx6WlpQN+vz+Gn7G5MkXD4fAOil6C047dlImrxxCfg9tVUFBwtbq6ekbHrVYpzAoLo9FoJ+QL9AJrkkN/3u12d9bW1l5hMsvWnDTh4eHh8uXl5fvMutFK3qD/jLxTDQ0Nv4z5JuHR0VH/4uLiKwjy/WWtseJPLKTZKO7Wq4dCoa1LS0tP8bMqKvURrcT0TU1NbRZfWkqYWXVrhJVI9j+bZmZmbuplk1s9NDR0GNEnOpgrKz8ydBrZ8rBHRHCur0MsCvc1Pazl1GF301PbqOFpBh3Z4Rv0oIvVBgBG01hqYKCwsPBMIBD4bAxHIpGKhYWFbrB9RtxuzDEr9yB6zI5gwV/U19cfYLvktjI1mQh19rOI5wSCpqDC4bgelaXvUcRMEGJzAO0qUZ2oxdrx53XMzsI9KMJldgQDPsgPYtLgK4fCoeigMmgA2R2fCG83YMohxCFlQAHCDSlgE8Tkytx8yDZmbHCKMxIMQSdcJueWFU8Y8pRDiA3KgAJ0yJ1wJMwqGrlSWxQ6Jkg4wjWBamfCzQzfqmOrqGwNXo/c56uoeaTFejSuOWjxmNx7KXiHwYIlpnIr4I1xVo9TPF8nyFgwiYFV6LidhZfgJaFXv6vvUeCEHVmBy7UZ0fAAds3rUq+BcD8X0SFZcR5XWJcecGhFqEnrjkW12rfEJoV5PRlgJg+1QM4MGqG6uroHKWEZsNXnCfzNmWpe3iL1z9LjJmGuux+AF3MlTO1rrDb1FExutS5GQB5tj3Q/WxbRSElJyWVjPZOwBLxe70mI8sKXrTaZn59/pLKy8p+xYJqwz+eLFhUVtUH6aCRuZMwC/tBba2pqvlnz04SFUFVV9Zsj1krSd2vCOvwYNdo4sx9UOUphIfJ9f8XsRXxclbgGNiuiHNOXdjxbYUlgtuMINzN8Y1dAgU+BtTDxfkUsBWUUFhYFfmKCTKAvlWU/kDfPJo7mO3vKSiR5V69Fkrg8DPj32IHtwE2+FhvzmFivx+M5xz/ENV8sJM+xsC4yMjKyKx6P32YC8rdE2iz9HKu8m/QcfqxbWOry7N2CkRfznZzR0/yIvjBeV/sPFdozA8TD8zUAAAAASUVORK5CYII=" width="15" height="17" alt="위치 아이콘">
						위치없음
					</div>
				</div><!-- //favoriteOneDetailWrap -->
			</a><!-- //favoriteOneLink -->
		</div>
	</div><!-- //favoritesContentList -->
</div>

<!-- 하단 여백 -->
<div class="favoritesBottomBlank"></div>



