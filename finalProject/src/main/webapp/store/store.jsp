<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="sec" %>
<sec:authentication property="principal" var="member"/> <!-- 사용자 정보 가져오기 -->
<!-- store메인 시큐리티 로그인 중인 아이디 -->
<input type="hidden" class="loginId" value="${member.username}">
<!-- store 메인  주소로넘어온 -->
<input type="hidden" class="hiddenId" value="${param.id }">

<script type="text/javascript" src="https://code.jquery.com/jquery-3.5.1.min.js"></script>  
<script defer src="${pageContext.request.contextPath}/js/store/store.js"></script>
<link rel="stylesheet" href="${pageContext.request.contextPath}/css/store/store.css">
<script defer src="${pageContext.request.contextPath}/js/store/reviews.js"></script><!-- 상점 상품후기 수 -->

<div id="storeBody">
<div id="storeWrap">
	<div id="storeTop">
		<div id="profileLeftWrap">
			<div id="profileLeft">
				<div class="background1">
					<div class="backgroundImg"></div>
				</div><!-- // (1) background -->
				<div class="background2">
					<div class="profileLink"> 
						<!-- 프로필 기본 이미지 -> 프로필 사진 변경 -->
						<div id="preview">
							<img width="100" height="100" alt="상점 프로필 이미지" class="profileImage" src="">
						</div>
					</div>
					<div class="profileNickname"></div>
					<!-- 상점 별점 : 후기에 따라 별점 갯수 달라짐 -->
					<div class="storeStar"> 
						<img width="15" height="14" class="star1" alt="별 " src="" >
						<img width="15" height="14" class="star2" alt="별" src="" >
						<img width="15" height="14" class="star3" alt="별" src="" >
						<img width="15" height="14" class="star4" alt="별" src="" >
						<img width="15" height="14" class="star5" alt="별" src="" >
					</div>
					
					<!-- 내상점 - 프로필 사진 변경 -->
					<c:if test="${member.username == param.id || empty param.id}">
					<form id="profileImgForm">
						<div class="imageEdit">
			                 <label for="store_img" class="btn_model">
									<span id="btnChangeProfile" class="btn2" onclick="">프로필 사진 변경</span>
							 </label>
							 
			                 <input type="file" name="profileImg_Name" id="store_img" accept="image/*"> 
	
						</div><!-- //imageEdit -->
					</form> 
					</c:if>
					<!-- 남의 상점 - 바다톡-->
					<c:if test="${member.username!=param.id && not empty param.id}">
					<form id="storeForm" method="post" action="/market/chat/chatRoom" target="chatRoom">
						<div class="badaTalkWrap">
			                 <button type="button" class="badaTalk_btn">
								<span class="badaTalk_btn_text">바다톡</span>
							 </button>
						</div><!-- //imageEdit -->
					</form>
					</c:if>
					
				</div><!-- //(2)background2 -->
			</div>
		</div><!-- //profileLeftWrap -->
		<div id="profileRight">
			<input class="hiddenNick" type="hidden" value=""> <!-- 현재 닉과 동일한 닉 넣었을 때 alert창 위해 -->
			<div class="storeTitleWrap">
				<!-- 닉네임 & 닉네임 수정 버튼 -->
				<div class="nickName">
					<div class="nickNameText" name="store_nickname"></div>
					<c:if test="${member.username == param.id || empty param.id}">
						<button class="nickNameEdit" id="nickNameEdit">닉네임 수정</button>
					</c:if>
				</div><!-- //nickName -->
			</div><!-- //storeTitleWrap -->
			<div id="middleWrap">
				<!-- 에코지수 -->
				<div class="echoIndication">
					<div style="display:flex;">
						<div class="echoIndiText"><strong>에코지수</strong></div>
						<a rel="tooltip" title="">
							<img class="echoInfoiImg" width="17" height="20" alt="infoIcon" src="/market/image/store/infoIcon6.svg">
						</a>
					</div>
					<img class="ehcoImg" width="255" height="23" src="" alt="에코지수">
					<!-- 에코지수 설명 테스트 -->
				</div> <!-- // 에코지수  -->
			
				
				<div class="rigthIndi">
					<!-- (2) 상점후기 수 -->
					<div class="storeIndication">
						<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAAAXNSR0IArs4c6QAAAQBJREFUSA1jZCASNOz/z3L34Z1aBkaGZLCW/wxzleVVmhscGf8QYwQLMYpAakCW/GdgqGMAElBQBxQDMethAvhoJnySKHIwnyALYhNDlkdiE28RkiZymMRbBIwTDAuwiWEogggQHUegiAfHCSy4oIkBh7kjQJgxdtHtUIZ/jJP+M/yXoIV/GRkYXzAw/c9joqUlIIeDPQD0CPGpjkLvMoG8BfYehQbh0g4LOkZcCkDiMQtuIwocfAqhcksSVHGaR8egI8Kl1FAy6iOyQ5HoQhVkA3qqIiVVjsYR2XE0woIOubBFZsPCD1kMmQ2TR6bxBx20ZAcbAmQjawSzCckjaQAAJL9HBV3GwxoAAAAASUVORK5CYII=" width="14" height="15" alt="상점방문수 아이콘">상점후기<div class="reviewIndicateNum"></div>
					</div>
					<!-- (3) 판매내역 수 -->
					<div class="storeIndication">
						<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAAAXNSR0IArs4c6QAAAl1JREFUSA21Vc9PE1EQnnktW2yIFy9GiCduSki4QjSGwA3qj248q/HCwQtnwg//CxKrMd4WMO2RQrxwkbQmBI0XExMxqQk3TTAt7Q4zu91l231btrq85KWz33wz39v3vn0F6HOYO7nHMvssA+ynwPxgXrebjc9So9LGbeue9StuvYpLFJ592lgHomsynbiP4thC+XLuCQDN8Rb8limxi8VTi7V1Ztm8SVQ/JICriPhUWhNRwRHFzJg1Y/24SO7CN+KGSNAotEVKGzPF1zJZsCSYk2POfwvld+8vsNg0dzq+klXPvYYSCyY54Xh41G/PlbDLRu3T+gEXZ1UKH1rTxffBRuZu7oHdoi3GTtRAZpxd+C2YD8aRW7dCK4pF3jA5y9v0tltEmggmOeEIV2oE143IxJedT4tcMAmARwjGC12xYG4Oj4TbrtFSMV+e/0kEw9psYiDWFBDuJ9YvohEiVWXrPkbkk4QrSim69DcCTFXV0CBUENBOcvndvQYNrKrCVOkPXyhfu5OhZ4SmAlxWqcyIMzlmyzVDvBCAtXd3tmppB0c2BNGtECcAKMKX1mxxLQCtmds5sIFWA1goFCMI6H5HGMMQKeNVqIsOC5Gg4gvxfXV5hmAj+EJj6YlDvkr+hhcTQFqNZ4EnN9RhXSQxgkD+pfpoe36Pn/nKiRhiBj4n8LaLRWykJSBwz1lbhrXN2eINSfkkfqN93sJoIW7oHHyrfn74/IfUa3hGEI5/qWIcQ/Tqqs85RugQggEjeUO0jdAhZN21vvOBHesX9m+oZ4QOIaeVfLiJDfdG8NqdARu11RN7gt5lAAAAAElFTkSuQmCC" width="14" height="15" alt="상품판매 아이콘">상품판매<div class="sellIndicateNum"></div>
					</div>
				</div>
			</div><!-- middleWrap -->
			<!-- 상점 주인 : 소개글 -->
			<div class="introduce"></div>
				<c:if test="${member.username == param.id || empty param.id}">
					<div class="introduceEdit"><button class="introduceEditBtn">소개글 수정</button></div> 
				</c:if>
			<!-- 남의 상점 : 신고하기 -->
			<c:if test="${member.username != param.id && not empty param.id}">
				<div id="singo">
					<a class="singoBtn">
					<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAAAXNSR0IArs4c6QAAAgtJREFUSA3tVrtOAkEUdQnKkvADFGtpIR01DYXyMLGwVisLjFEbE42FhYWJiY0YEwsqtLYwkZcFf2C3FJZuwQdIAvgAz8EdGHZZwpJIInGS3blzzzn3zty5m6wyM8Iol8tqs9lca7Vaq6CHFUUJUtZut6uYnj0ez4PP57uPRqMN+ocNZRhILJ/Pr2M6Q3BtGBebMIAfJxKJu6E8JxCn8tbr9SvgKXIQsIIpg7kUCARe6avVavPYyDLMLcyL9GHc+P3+XZz282fZ//b2L3srkQwJPuA9iMfj17C/eoyOpeOtI1m6UCjswL6AnYKW4DZf1jGwpCwjhLdMhvtZicViT1bhoHWxWFzCPT9COwvtxqDy2hKyQRqNxgtEGkT7EKVFcF3X5wzDOAW2SR/wrKZpJ6FQ6F1wsNk94JfADFVVF6yN5BFEMbMbzWQVllH4OTMZTnAIPMiHNn0yxyx9hTEYS8Zo2xKarU+MDdJ3ZwjSORlBMaw+U5MhLsUSdHtCIGGiEJa6LJeGpO3EkuW2E4Lc+ahF68tkYFl5TXuQT2hFLFljS4gSBUiIRCJvMpE2GwRde45AVT606bPyhFbEknHH71AmCdvsxiOs+Yw1bCccK4oL0X9CF8UajTr9JXX8LHK5XHu0IrljTbyk7rb3F9nKb92VUzEmfofdLk0mk7bfDaddjuMXlZz4Caf/Dr8BRaXTUmgtW58AAAAASUVORK5CYII=" width="14" height="14" alt="신고하기 아이콘">
					<span style="color:rgb(136, 136, 136);">신고하기</span>
					</a>
				</div> 
			</c:if>
			
		</div>
	</div><!-- //storeTop -->
	
	

	<div id="storeBottom">
		<div class="menuBar"> 
			<a href="#" id="productPg" class="now">상품</a>
			<a href="#" id="reviews" class="default">상품후기</a>
			<!-- 내상점, 남의 상점 구분 -->
			<c:if test="${member.username == param.id || empty param.id}"> <!-- null일때 -> main에서 넘어올 때 -->
				<a href="#" id="favorites" class="default">찜</a>
				<a href="#" id="purchases" class="default">구매내역</a>
				<a href="#" id="productManage" class="default">내 상품관리</a>
			</c:if>
		</div><!-- // menuBar-->
		<div class="storeContent">
			<!-- [상품]/[상품후기]/[찜]/[구매내역]/[내상품관리] -->
			<div class="contentStore">
				<c:if test="${displayNum==1 }">
					<jsp:include page="../store/productPg.jsp"/>
				</c:if>
			</div>
			<div class="listGap">
			</div>
		</div><!-- //content -->
	</div><!-- //storeBottom -->

	<!-- ************************ 신고하기 모달창 ************************ -->
	<div id="modalHidden">
		<div class="singoModalWrap">
			<div id="singoModalTop">
				<div class="title">신고하기</div>
				<button class="modalCloseBtn">
					<!-- 닫기 버튼 아이콘 -->
					<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAiBJREFUaAXtmM1xwjAQRrFvcE+aSJoIPaSI5MCNHmC4caCK1ECaCE0kBTBccPxl0MyO0C6r1drkIF/Q6Gf3vbU9kplM6lUrUCtQK/BvK7Bard622+3DvQCRGwxS/pYbvCzcHY/H/T0kkBO5e76dJMEKzGazj6Zpvrquex5bIsAjNxjAwhW64QbQHweaTqfzxWLxI60pHcvNKQqMLZELD76bAmNJWODVAkNLWOGzBIaSKIHPFvCWKIU3CXhJeMCbBUolvOCLBKwSnvDFAgmJQ7/ZvXCb3QX+s99hn7DDemyMqn0AoNIVgSUlNHOkHNyYiwCCS4DSGAem7XcT4CTQ3x8Gw2OTvDta2NQ8VwEkiKuNvssz7w6P2O4CCEol/pI0zSDwiM1+D2DQep1Op6vCpPqs8em6q0R00NLebDaP5/N5Hx4bxAjttm3ny+Xy2xKXW+MqEMMDGImpkLeEm0AKPlRbGuMqq+13EdAAauZooem8YoEcsJy5FFJqFwlYgCxrBhEoASlZG8uY7oAHgEcMyGQLeCVGco9YWQIeCQFOr9KY6qNEaSIKTdvYK7C59R84B+zY2PRwlqJzpLZKAAGH3E1jCRy/tRI3HyF6skSVvI8CtLrxXZY+T8M6USCG1wQMga2/uTlZgdxAVuDUupzc7DvQP4ev4Rg8RuWpCP7VQM7wYoOFjqvb6/X6HdVQL3CeiHcCDM5ha7hagVqBWgHHCvwCWAH5e5bAf84AAAAASUVORK5CYII=" width="24" height="24" alt="닫기 버튼 아이콘">
				</button>
			</div>
			
			<div id="singoModalBottom"> 
				<!-- 카테고리 (1) -->
				<div class="singoCategory">
					<div class="singoTitle">
						<span>광고(교신 및 상점홍보)</span>
						<button type="button" class="titleBtn"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAQCAYAAAAI0W+oAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAXNJREFUeNqslK1Pw1AUxV9fmoq5Ldl/MCSaBLkEAQkIPgxzTUABjoRMsAJmCQ4HJGAAw8yCwGFQaCyOKSpgZmIGzk1OyU1Zu7fRm/yWvtvec1777p0XRVFgjLkGZ+DFFBtzYBeEPn5uwAZYAPPgrSCTGngAVRBY/HTBNxOPoFKASYVaVWp3xegWRGoX97KDf5gE1KhxfSwelosTGkrUwRXwpjDxWFvnWjSP5CIxktcLwRPXDdCawqjFWkOtkNq/RhJDsKaa4VAVuUSDNYYa69Q0aSOJL7AI4hGfIS/0546p8akfsCOKZDfLYMCD7aiDzWrjDp8dsPbPiNiMYhncLX7fsmrVdCQjUeaz21lDb3N2egeaqeErqfsl5pK3barOnchIog3O1d/JBc9BuGTO8LqdJ+Q7HPQemOGBS2e9M7+p2nhnnIiLkbToKngGs+BA3XvlveE4Ees4I32wBD5ULmau7yLgTzCQPbAC9rk+Zc4pfgQYAOZsSsrHKCoBAAAAAElFTkSuQmCC" width="13" height="8" alt="화살표 아이콘"></button>
					</div>
					<div class="singoContent">
						<div class="contentList">
							<button type="button">교환신청</button>
						</div>
						<div class="contentList">
							<button type="button">상점홍보</button>
						</div>
						<div class="contentList">
							<button type="button">타사이트,어플광고</button>
						</div>
						
					</div>
				</div> <!-- //광고(교신 및 상점홍보) -->
				<!-- 카테고리 (2) -->
				<div class="singoCategory">
					<div class="singoTitle">
						<span>거래비매너(거래파기, 늦은배송)</span>
						<button type="button" class="titleBtn"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAQCAYAAAAI0W+oAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAXNJREFUeNqslK1Pw1AUxV9fmoq5Ldl/MCSaBLkEAQkIPgxzTUABjoRMsAJmCQ4HJGAAw8yCwGFQaCyOKSpgZmIGzk1OyU1Zu7fRm/yWvtvec1777p0XRVFgjLkGZ+DFFBtzYBeEPn5uwAZYAPPgrSCTGngAVRBY/HTBNxOPoFKASYVaVWp3xegWRGoX97KDf5gE1KhxfSwelosTGkrUwRXwpjDxWFvnWjSP5CIxktcLwRPXDdCawqjFWkOtkNq/RhJDsKaa4VAVuUSDNYYa69Q0aSOJL7AI4hGfIS/0546p8akfsCOKZDfLYMCD7aiDzWrjDp8dsPbPiNiMYhncLX7fsmrVdCQjUeaz21lDb3N2egeaqeErqfsl5pK3barOnchIog3O1d/JBc9BuGTO8LqdJ+Q7HPQemOGBS2e9M7+p2nhnnIiLkbToKngGs+BA3XvlveE4Ees4I32wBD5ULmau7yLgTzCQPbAC9rk+Zc4pfgQYAOZsSsrHKCoBAAAAAElFTkSuQmCC" width="13" height="8" alt="화살표 아이콘"></button>
					</div>
					<div class="singoContent">
						<div class="contentList">
							<button type="button">거래파기</button>
						</div>
						<div class="contentList">
							<button type="button">늦은배송</button>
						</div>
						<div class="contentList">
							<button type="button">불친절한 응대</button>
						</div>
					</div>
				</div> <!-- //거래비매너(거래파기, 늦은배송) -->
				<!-- 카테고리 (3) -->
				<div class="singoCategory">
					<div class="singoTitle">
						<span>언어폭력(비방, 욕설, 성희롱)</span>
						<button type="button" class="titleBtn"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAQCAYAAAAI0W+oAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAXNJREFUeNqslK1Pw1AUxV9fmoq5Ldl/MCSaBLkEAQkIPgxzTUABjoRMsAJmCQ4HJGAAw8yCwGFQaCyOKSpgZmIGzk1OyU1Zu7fRm/yWvtvec1777p0XRVFgjLkGZ+DFFBtzYBeEPn5uwAZYAPPgrSCTGngAVRBY/HTBNxOPoFKASYVaVWp3xegWRGoX97KDf5gE1KhxfSwelosTGkrUwRXwpjDxWFvnWjSP5CIxktcLwRPXDdCawqjFWkOtkNq/RhJDsKaa4VAVuUSDNYYa69Q0aSOJL7AI4hGfIS/0546p8akfsCOKZDfLYMCD7aiDzWrjDp8dsPbPiNiMYhncLX7fsmrVdCQjUeaz21lDb3N2egeaqeErqfsl5pK3barOnchIog3O1d/JBc9BuGTO8LqdJ+Q7HPQemOGBS2e9M7+p2nhnnIiLkbToKngGs+BA3XvlveE4Ees4I32wBD5ULmau7yLgTzCQPbAC9rk+Zc4pfgQYAOZsSsrHKCoBAAAAAElFTkSuQmCC" width="13" height="8" alt="화살표 아이콘"></button>
					</div>
					<div class="singoContent">
						<div class="contentList">
							<button type="button">비방/욕설</button>
						</div>
						<div class="contentList">
							<button type="button">성희롱</button>
						</div>
						<div class="contentList">
							<button type="button">리뷰(별점평가)요구 및 테러</button>
						</div>
					</div>
				</div><!-- //언어폭력(비방, 욕설, 성희롱) -->
				<!-- 카테고리 (4) 얘만 height:180;으로 -->
				<div class="singoCategory">
					<div class="singoTitle">
						<span>거래 금지 품목</span>
						<button type="button" class="titleBtn"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAQCAYAAAAI0W+oAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAXNJREFUeNqslK1Pw1AUxV9fmoq5Ldl/MCSaBLkEAQkIPgxzTUABjoRMsAJmCQ4HJGAAw8yCwGFQaCyOKSpgZmIGzk1OyU1Zu7fRm/yWvtvec1777p0XRVFgjLkGZ+DFFBtzYBeEPn5uwAZYAPPgrSCTGngAVRBY/HTBNxOPoFKASYVaVWp3xegWRGoX97KDf5gE1KhxfSwelosTGkrUwRXwpjDxWFvnWjSP5CIxktcLwRPXDdCawqjFWkOtkNq/RhJDsKaa4VAVuUSDNYYa69Q0aSOJL7AI4hGfIS/0546p8akfsCOKZDfLYMCD7aiDzWrjDp8dsPbPiNiMYhncLX7fsmrVdCQjUeaz21lDb3N2egeaqeErqfsl5pK3barOnchIog3O1d/JBc9BuGTO8LqdJ+Q7HPQemOGBS2e9M7+p2nhnnIiLkbToKngGs+BA3XvlveE4Ees4I32wBD5ULmau7yLgTzCQPbAC9rk+Zc4pfgQYAOZsSsrHKCoBAAAAAElFTkSuQmCC" width="13" height="8" alt="화살표 아이콘"></button>
					</div>
					<div class="singoContentOther">
						<div class="contentList">
							<button type="button">담배/주류</button>
						</div>
						<div class="contentList">
							<button type="button">장물(분실폰,분실노트북,...)</button>
						</div>
						<div class="contentList">
							<button type="button">의약품류/콘택트 렌즈</button>
						</div>
						<div class="contentList">
							<button type="button">마약/불법성</button>
						</div>
						
					</div>
				</div><!-- //거래 금지 품목 -->
				<div class="singoCategory">
					<div class="singoTitle">
						<span>기타사유(직접입력)</span>
						<button type="button" class="titleBtn"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAQCAYAAAAI0W+oAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAXNJREFUeNqslK1Pw1AUxV9fmoq5Ldl/MCSaBLkEAQkIPgxzTUABjoRMsAJmCQ4HJGAAw8yCwGFQaCyOKSpgZmIGzk1OyU1Zu7fRm/yWvtvec1777p0XRVFgjLkGZ+DFFBtzYBeEPn5uwAZYAPPgrSCTGngAVRBY/HTBNxOPoFKASYVaVWp3xegWRGoX97KDf5gE1KhxfSwelosTGkrUwRXwpjDxWFvnWjSP5CIxktcLwRPXDdCawqjFWkOtkNq/RhJDsKaa4VAVuUSDNYYa69Q0aSOJL7AI4hGfIS/0546p8akfsCOKZDfLYMCD7aiDzWrjDp8dsPbPiNiMYhncLX7fsmrVdCQjUeaz21lDb3N2egeaqeErqfsl5pK3barOnchIog3O1d/JBc9BuGTO8LqdJ+Q7HPQemOGBS2e9M7+p2nhnnIiLkbToKngGs+BA3XvlveE4Ees4I32wBD5ULmau7yLgTzCQPbAC9rk+Zc4pfgQYAOZsSsrHKCoBAAAAAElFTkSuQmCC" width="13" height="8" alt="화살표 아이콘"></button>
					</div>
					<div class="singoContent">
						<div class="contetnListTextarea">
							<textarea id="complainReason"></textarea>
		                     <div id="textareaDiv"><span id="counter">0</span>자/200자</div>
		                     <div id="textCounterDiv" class="caution"></div>
		                     <button type="button" id="complainReasonBtn">등록</button>
						</div>
					</div>
				</div>
				<div class="singoCategory">
					<div class="singoTitle">
						<button style="float:right" class="directAsk"
                  			onclick="location.href='/market/notice/qna'">1:1문의하기</button>
               		</div>
					<div class="singoContent"></div>
				</div>
			</div><!-- //singoModalBottom -->
		</div><!-- singoModalWrap -->
	</div><!-- //modalHidden -->
	
</div><!-- //storeWrap -->
</div><!-- //storeBody -->


