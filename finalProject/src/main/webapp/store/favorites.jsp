<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<script type="text/javascript" src="https://code.jquery.com/jquery-3.5.1.min.js"></script>  
<script defer src="${pageContext.request.contextPath}/js/store/favorites.js"></script>
<link rel="stylesheet" href="${pageContext.request.contextPath}/css/store/favorites.css">    
<link rel="stylesheet" href="${pageContext.request.contextPath}/css/store/store.css">  


<div class="favoritesTop">
	<div>
	찜
	<span class="favoritesNum"></span>
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
		<!-- favorites.js -->
	</div>
</div>

<!-- 하단 여백 -->
<div class="favoritesBottomBlank"></div>



