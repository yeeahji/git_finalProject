<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>

<link rel="stylesheet" href="/market/css/index/searchDisplay.css">

<input type="hidden" id="keyword" name="keyword" value="${keyword}">
<input type="hidden" id="order" name="order" value="${order}">
<input type="hidden" id="page" name="page" value="${page}">
<input type="hidden" id="productState" name="productState" value="${productState}">


<!-- 컨트롤러붙터 넘어온 pg값 -->
<div id="productTop">
	<!-- 상품+개수 -->
	<div>
		<span id="productName">${keyword}</span><span>${productState}</span>&nbsp;<span
			class="productNum">${count}개</span>
	</div>
</div>
<!-- //productTop -->

<!-- 상품말고 위에 -->
<div class="productListTop">
	<div class="listTopInner">
		<div class="group" style="float: right;">
			<!-- DB-카테고리 정렬 -->
			<a class="groupChecked ${order eq null ? 'active' : ''} ${order eq 'A' ? 'active' : ''}"
				onclick="order('A')">최신순</a> <a
				class="groupOther ${order eq 'B' ? 'active' : ''}"
				onclick="order('B')">인기순</a> <a
				class="groupOther ${order eq 'C' ? 'active' : ''}"
				onclick="order('C')">저가순</a> <a
				class="groupOther ${order eq 'D' ? 'active' : ''}"
				onclick="order('D')">고가순</a>
		</div>
	</div>
</div>

<div id="display-list" class="row">

	<c:forEach varStatus="status" items="${list}" var="item">
		<c:set var="b_time" value="${item.product_logtime}" />
		<c:set var="time"
			value="${ b_time > (60 * 24) ? Math.round( b_time / (60 * 24) ) : ( b_time > 60 ? Math.round( b_time / 60 ) : b_time ) }" />

		<c:if test="${60 > b_time }">
			<c:set var="unit" value="분 전" />
		</c:if>
		<c:if test="${ b_time > 60 }">
			<c:set var="unit" value="시간 전" />
		</c:if>
		<c:if test="${ b_time > (60 * 24) }">
			<c:set var="unit" value="일 전" />
		</c:if>


		<div class="item col-3" onclick="test(${item.product_seq})" style="cursor: pointer">
			<div class="item">
				<div id="itemSolid">
					<div class="img-box">
						<img src="/market/storage/${item.product_img1}"
							class="rounded float-start" alt="${item.product_subject}">
					</div>
					<div class="text-box">
						<div class="displayName">${item.product_subject}</div>
						<div class="price-time">
							<div class="displayPrice">${item.product_price}</div>
							<div class="displayTime">
								<span>${time}${unit}<span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</c:forEach>
</div>
<!-- //listWrap -->


<script type="text/javascript"
	src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
<script type="text/javascript">

function order(order){
	location.href='/market/index/searchDisplay?keyword=' 
			+ $("#keyword").val() 
			+ "&page=" + $("#page").val()
			+ "&order=" + order
}

function test(seq) {
	location.href = "/market/product/productDetail?seq=" + seq
}
/* 
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
}); */
</script>

