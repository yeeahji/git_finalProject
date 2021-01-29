<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<script type="text/javascript" src="https://code.jquery.com/jquery-3.5.1.min.js"></script>  
<script defer src="${pageContext.request.contextPath}/js/store/productManage.js"></script>
<link rel="stylesheet" href="${pageContext.request.contextPath}/css/store/productManage.css">    
<link rel="stylesheet" href="${pageContext.request.contextPath}/css/store/store.css">  
    
<main class="productManageWrap">
	<header class="productSearchWrap">
		<form class="productSearchForm">
			<input type="text" placeholder="상품명을 입력해주세요." value>
			<button type="submit" class="productSearchBtn"></button>
		</form>
		
		<div class="sortNumWrap1">
			<div class="sortNumWrap2">
				<div class="sortNumWrap3">
					<div class="sortNumTitle">
						<div class="sortNumText">10개씩</div>
						<input id="sortNumTextInner" readonly tabindex="0" aria-autocomplete="list" class="css-sortNumTextInner" value="">	
					</div><!-- //sortNumTitle -->
					<div class="sortNumTextBtn"></div>
				</div><!-- //sortNumWrap3 -->
			</div><!-- //sortNumWrap2 -->
		</div><!-- //sortNumWrap1 -->
		
		<div class="sortProdManageWrap1">
			<div class="sortProdManageWrap2">
				<div class="sortProdManageWrap3">
					<div class="sortProdManageTitle"> 
						<div class="sortProdManageText">전체</div>
						<input id="sortProdManageTextInner" readonly tabindex="0" aria-autocomplete="list" class="css-sortProdManageTextInner" value="">
					</div>
					<div class="sortProdManageBtn"></div>
				</div><!-- Wrap3 -->
			</div><!-- Wrap2 -->
		</div><!-- Wrap1 -->
	</header>
	
	<table id="prodMangeTable">
		<thead>
			<tr>
				<th>사진</th>
				<th>판매상태</th>
				<th>상품명</th>
				<th>가격</th>
				<th>찜</th>
				<th>최근수정일</th>
				<th>기능</th>
			</tr>
		</thead>
		<tbody id="prodMangeTbody">
			<!-- productManage.js -->
		</tbody>
	</table>
</main>
<footer class="footerWrap">
	<div class="pagingWrap">
		<a class="beforePage">
			<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMiIgaGVpZ2h0PSIxMiIgdmlld0JveD0iMCAwIDEyIDEyIj4KICAgIDxwYXRoIGZpbGw9IiM5Qjk5QTkiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTMuNiAxMmEuNTk2LjU5NiAwIDAgMCAuNDQ5LS4yMDJsNC44LTUuNGEuNi42IDAgMCAwIDAtLjc5N2wtNC44LTUuNGEuNi42IDAgMSAwLS44OTcuNzk3TDcuNTk4IDYgMy4xNTIgMTFBLjYuNiAwIDAgMCAzLjYgMTIiLz4KPC9zdmc+Cg==" width="12" height="12" alt="페이징 아이콘" class="beforePageIcon">
		</a>
		<a class="page">1</a>
		<a class="afterPage">
			<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMiIgaGVpZ2h0PSIxMiIgdmlld0JveD0iMCAwIDEyIDEyIj4KICAgIDxwYXRoIGZpbGw9IiM5Qjk5QTkiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTMuNiAxMmEuNTk2LjU5NiAwIDAgMCAuNDQ5LS4yMDJsNC44LTUuNGEuNi42IDAgMCAwIDAtLjc5N2wtNC44LTUuNGEuNi42IDAgMSAwLS44OTcuNzk3TDcuNTk4IDYgMy4xNTIgMTFBLjYuNiAwIDAgMCAzLjYgMTIiLz4KPC9zdmc+Cg==" width="12" height="12" alt="페이징 아이콘">
		</a>
	</div>
</footer>
