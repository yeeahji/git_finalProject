<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<script type="text/javascript" src="https://code.jquery.com/jquery-3.5.1.min.js"></script>  
<script defer src="${pageContext.request.contextPath}/js/store/purchases.js?ver=1"></script>
<link rel="stylesheet" href="${pageContext.request.contextPath}/css/store/purchases.css">    
<link rel="stylesheet" href="${pageContext.request.contextPath}/css/store/store.css">  

<input type="hidden" id="pg" value="${pg }"> <!-- 컨트롤러에서 받아오는; 상품리스트 pg; 디폴트 1--> 
<main class="purchaseManageWrap">
	<header class="purchaseHeader">
		<div class="purchasesTitleWrap">
			<div class="purchasesTitle">구매내역 
				<span class="purchasesNum"></span>
			</div>
		</div>
	</header>
	<table id="purchaseTable">
		<thead>
			<tr>
				<th>사진</th>
				<th>상품명</th>
				<th>가격</th>
				<th>판매자 상점명</th>
				<th>거래일시</th>
			</tr>
		</thead>
		<tbody id="purchaseTbody">
			<!-- purchases.js -->
		</tbody>
	</table>
</main>
<!-- 페이징 처리-->
<footer class="footerWrap">

		<div id="purchasePagingDiv" class="paging" align="center"></div>
		
</footer>