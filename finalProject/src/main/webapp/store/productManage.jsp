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

<!-- 판매완료 모달 -->
<div id="soldOutModal">
	<div class="soldOutModalWrap">
		<div align="center" style="margin-bottom:12px;"><img width="30" height="30" alt="infoIcon" src="/market/image/store/check.svg"></div>
		<p class="soldOutModalText">상태가 변경되었습니다.</p>
		<p class="soldOutModalText" style="font-weight:bold;margin-bottom:30px;">구매자를 선택해주세요.</p>
		<!-- 거래한 물건 정보 -->
		<div class="itemDetail">
			<!-- 상품 이미지 -->
			<div class="itemImgWrap">
				<img src="" alt="거래 상품 이미지">
			</div>
			<div class="itemContentWrap">
				<div class="itemName_Title">거래한 물건</div>
				<div class="itemName"></div>
			</div>
		</div>
		<!-- 채팅방 사람 리스트 -->
		<div class="chatListWrap">
			<!-- 한 개  -->
			<!-- <div class="chatOne">
				상점 이미지 
				<div class="chat_storeImg">
					<img src="/market/storage/maskRyan.jpg" widht="48" alt="프로필 이미지" style="height: 48px;">
				</div>
				상점명 & 마지막 대화시간
				<div class="chat_storeInfo">
					<div class="chat_storeName">zzz</div>
					<div class="chat_lastLogtime">마지막 대화 19시45일</div>
				</div>
			</div> -->
		</div>
		
		<!-- 확인/취소 버튼 -->
		<div class="soldOutModalBtm">
			<!-- <button type="button" class="soldOutModalOkBtn">확인</button> -->
			<button type="button" class="soldOutModalCancelBtn">다음에</button>
		</div>
	</div>
</div><!-- //soldOutModal -->



