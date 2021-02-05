<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<script type="text/javascript" src="https://code.jquery.com/jquery-3.5.1.min.js"></script>  
<script defer src="${pageContext.request.contextPath}/js/store/store.js"></script>
<script defer src="${pageContext.request.contextPath}/js/store/productPg.js"></script>
<link rel="stylesheet" href="${pageContext.request.contextPath}/css/store/store.css">    

<div id="productTop">

	<!-- 상품+개수 -->
	<div>상품 <span class="productNum"></span></div>
	
</div><!-- //productTop -->

<!-- 정렬 hidden sortNum -->
<input type="hidden" class="hiddenSortNum" value="0">

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