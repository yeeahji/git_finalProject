<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="sec" %>
<sec:authentication property="principal" var="member"/> <!-- 사용자 정보 가져오기 -->
<!-- 리뷰; 시큐리티 로그인 중인 아이디 -->
<input type="hidden" class="loginId" value="${member.username}">
    
    
<script type="text/javascript" src="https://code.jquery.com/jquery-3.5.1.min.js"></script>  
<script defer src="${pageContext.request.contextPath}/js/store/productManage.js?ver=1"></script>
<link rel="stylesheet" href="${pageContext.request.contextPath}/css/store/productManage.css">    
<link rel="stylesheet" href="${pageContext.request.contextPath}/css/store/store.css">  

<script defer src="${pageContext.request.contextPath}/js/store/store.js"></script>


<input type="hidden" id="pg" value="${pg }"> <!-- 상품리스트 pg; 디폴트 1-->
<main class="productManageWrap">
	<header class="productSearchWrap">
		<form class="productSearchForm">
		
			<input type="hidden" name="pg" value="1"> <!-- 검색관련 pg; 검색을 위해 무조건 일페이지로 셋팅  -->
			
			<input type="hidden" name="hiddenVal" value=""> 
			
			<input type="hidden" class="hiddenProdMange" value="0">  <!-- 기본:0 전체선택 -->
			
			<input class="prodSearchInput" type="text" placeholder="상품명을 입력해주세요." value="">
			
			<button type="submit" id="productSearchBtn"></button>
			
		</form>
		
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
<!-- 페이징 처리-->
<footer class="footerWrap">
		
		<div id="storePagingDiv" class="paging" align="center"></div>
		
</footer>
<!-- 상태변경 모달 -->
<div id="conditionModal">
	<div class="condiMadalWrap1">
		<div class="condiMadalWrap2">
			<div class="condiMadalWrap3">
					<div class="condiModalTop">
						<div class="condiModalTopText"><p>z</p></div>
					</div><!-- ModalTop -->
					<div class="condiModalBottom">
						<button class="modalBottomBtn">확인</button>
					</div><!-- ModalBottom -->

				<div class="condiModalEndWrap"></div>
			</div>
		</div>
	</div><!-- //condiModalWrap2 -->
</div><!-- //conditionModal -->
<!-- 삭제버튼 모달 -->
<div id="deleteModal">
	<div class="deleteModalWrap"><p class="deleteModalText">상품을 삭제하시겠습니까?</p>
		<div class="deleteModalBtm">
			<button type="button" class="dltModalOkBtn">확인</button>
			<button type="button" class="dltModalCancelBtn">취소</button>
		</div>
	</div>
</div><!-- //deleteModal -->




