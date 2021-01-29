<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<script type="text/javascript" src="https://code.jquery.com/jquery-3.5.1.min.js"></script>  
<script defer src="${pageContext.request.contextPath}/js/store/store.js"></script>
<script defer src="${pageContext.request.contextPath}/js/store/productPg.js"></script>
<link rel="stylesheet" href="${pageContext.request.contextPath}/css/store/store.css">    

<div id="productTop">
	<!-- 상품+개수 -->
	<div>상품 <span class="productNum"></span></div>
	<!-- 카테고리 -->
	<div class="categoryWrap">
		<div class="categoryInner">
			<div class="categoryMain">전체<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAOCAYAAAAvxDzwAAAAAXNSR0IArs4c6QAAASVJREFUOBGlks9qwkAQxrMLihRKQXyUHjx58dBLEXqxUPCavIKvkpCQgxcTD0LpSQQfoBfpRXwHj16av37fYWWrJhvqwDCbb2d+O5NdYcFc120hzIQQkW3bS2pNzPf9blEUC+ROUffNGkEYQWVZvuE7xfq9CRR1T8hfw5/hR/jIcZyN8DyPsDEEZUZoEASPeZ6vUNdXRYi/aOZVYjGHp9pGC4kRDmLHV4bOHrIs+7qAWYDtoW0lx+OYqDRCwzDsIO8TPtBPQv0PYEOMfGCHVhNoHMftJEl4YcMqGHWhb3JMjguNt64slVJOoH/AR0pk1DtT+h8gxQqoyj/HWzBuXgEpmqBVsEpgHbQOVgu8BTXBjEAdCthOPQ3qdxn+6QsedO8uyH+LT8nvvwPGjeHzAAAAAElFTkSuQmCC" width="10" height="6" alt="카테고리 화살표 아이콘">
			</div>
			<div class="categoryList"><!-- 상점 주인이 올린 물품의 카테고리만 뜸 -->
				<a class="categoryCheck">전체</a>
				<a class="categoryOther">뷰티/미용</a>
				<a class="categoryOther">가전</a>
			</div>
		</div><!-- //productCategory -->
	</div><!-- //categoryWrap -->
</div><!-- //productTop -->

<div id="productList">
	<!-- 상품말고 위에 -->
	<div class="productListTop">
		<div class="listTopInner">
			<div class="mainGroup">
				<div>전체</div>
				<div class="mainGroupNum"></div>
			</div>
			<div class="group">
				<!-- DB-카테고리 정렬 -->
				<a class="groupChecked">최신순</a>
				<a class="groupOther">인기순</a>
				<a class="groupOther">저가순</a>
				<a class="groupOther">고가순</a>
			</div>
		</div>
	</div><!-- //productListTop -->
	<div class="listWrap">
		<!-- productPg.js -->
	</div>
</div><!-- productList -->