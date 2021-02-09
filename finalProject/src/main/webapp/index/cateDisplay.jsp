<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>

<link rel="stylesheet" href="/market/css/index/cateDisplay.css">

<input type="hidden" id="cateCode" name="cateCode" value="${cate_code}">
<input type="hidden" id="order" name="order" value="${order}">
<input type="hidden" id="page" name="page" value="${page}">
<input type="hidden" id="cate_parent" name="cate_parent" value="${cate_parent}">
<input type="hidden" id="cate_name" name="cate_name" value="${cate_name}">

<!-- 컨트롤러붙터 넘어온 pg값 -->
<div id="productTop">
	<!-- 상품+개수 -->
	<div>
		<span id="productName">${cate_parent}</span><span><img src="/market/image/index/cate.png"
			style="height: 20px;; cursor: pointer; margin:10px; margin-bottom:20px;" alt="화살표 "></span><span id="productName">${cate_name}</span>&nbsp;<span
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
	location.href='/market/index/cateDisplay' 
			+'?cate_code=' + $("#cateCode").val() 
			+ "&page=" + $("#page").val()
			+ "&order=" + order
}

function test(seq) {
	location.href = "/market/product/productDetail?seq=" + seq
}


</script>

