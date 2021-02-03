<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>


<input type="hidden" id="searchProduct" name="searchProduct" value="${searchProduct}" > <!-- 컨트롤러붙터 넘어온 pg값 -->
<div id="productTop">
	<!-- 상품+개수 -->
	<div><span id="productName"></span>의 검색 결과<span class="productNum"></span></div>
</div><!-- //productTop -->

<div id="productList">
	<!-- 상품말고 위에 -->
	<div class="productListTop">
		<div class="listTopInner">
			<div class="group" style="float:right;">
				<!-- DB-카테고리 정렬 -->
				<a class="groupChecked">최신순</a>
				<a class="groupOther">인기순</a>
				<a class="groupOther">저가순</a>
				<a class="groupOther">고가순</a>
			</div>
		</div>
	</div><!-- //productListTop -->
	<div class="listWrap">
	
	</div><!-- //listWrap -->	
</div><!-- productList -->


<script type="text/javascript"
	src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
<script type="text/javascript">


//검색
$(document).ready(function() {
	$.ajax({
		type: 'post',
		url: '/market/index/searchProductList', 
		data: $('#searchProduct').val(),
		dataType: 'json',
		success: function(data){
			alert(JSON.stringify(data));
			
			
			
		},
		error: function(err){
			console.log(err);
		}
	});
});
</script>

