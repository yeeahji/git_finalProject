<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="sec" %>
<sec:authentication property="principal" var="member"/> <!-- 사용자 정보 가져오기 -->
<!-- 리뷰; 시큐리티 로그인 중인 아이디 -->
<input type="hidden" class="loginId" value="${member.username}">
<!-- 리뷰; 주소로넘어온 -->
<%-- <input type="hidden" class="hiddenId" value="${param.id}"> --%>

    
<script type="text/javascript" src="https://code.jquery.com/jquery-3.5.1.min.js"></script>  
<script defer src="${pageContext.request.contextPath}/js/store/reviews.js"></script>
<link rel="stylesheet" href="${pageContext.request.contextPath}/css/store/reviews.css">    
<link rel="stylesheet" href="${pageContext.request.contextPath}/css/store/store.css">  

<div class="reviewsTop">
	<div>
	후기
	<span class="reviewsNum"></span>
	</div>
</div>
<div class="reviewsBottom">
	<!-- 상품후기 추가  -->
	<c:if test="${member.username!=param.id && not empty param.id}">
		<div class="reviewFormWrap">
			<div class="reviewForm">
				<div class="reviewStar">
					<div class="reviewStarWrap"> 
						<img width="26" height="25" class="review_star1" alt="별 " src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAcCAYAAAB2+A+pAAAAAXNSR0IArs4c6QAAAqNJREFUSA2tVk1rE0EYzrYbSKQXRYIfCaUiggaJJiH+AIsnL1poRQ+CBy8VvOivUA8evHgoeNCbRz3pH5B8HlIvYpG0VULxJBqMZn2eZWc7O5nZ7I5deJl33vf5yMzsTpvJWD6tVussw5KembMlgnc9CCsJa2PP81YYVq4gOTbEXq+3NB6PP5ObzWZPVSqVrbQ6ViuGKbfZf+Rc1JKMVsaO44RbLOdJDAUm9Va32+0TONtthM+FsYcoVqvVXSGaZEy9YhheE6Y0YM5aEjMZk9oY5PB8JSFdTWpPp6m2utlsHoXEN8S8IvUX82P1en1PqRunbrfbvYitOmRESI3JZLIMrGpKxDzOeb3T6byT4MYU2J8Orz2IvQLqghF5sI0ujG/O1Wq1j/l8/hImjxHewXrsq1GbHvSiZ+SM8alcxupfIE7uU/4/g+EO4jY+ufdCLWLMYr/fPzIajZ7DPLwkBNhmhOHrXC53t1wuf5f5U8aiidXfgflTxIKopRlh+ANxH6vc0PGMxgTjxTsN45dIGzpyTO0DTG/hLD+ZMLHGJMHYxep7GM+ZROQ6DDexygrGP3JdzWfeXPg2D8P0jEo0zYklx9QX9ZnGAPIlcwUhwUjszBdzpjFWcCOBWQSShBN7xribj+Os+Cdw6gei7l+P6C1HXDFBb4J6EXf3V7Un5lOCohGMq6opRH+j9wAv0BUG86AWUgPOaljQJLHGEFyTOZhvIhpYyROMvAK9IG+wp2AjXLnH3LjV+IQW8cu3ED4Gws8KhcLDUqn0SxXhfDAY5IfD4SPg1zkPftgSduUL5+pjXDEEuM3gO0OQruIyuGcypSh7xBBLDrnUYE/3xBnzbX7ruu55bOcbHVlXI5YccmGc7ovA/81FXJf+lunEk9aoQS0d/h/pAwlu3rYpxwAAAABJRU5ErkJggg==">
						<img width="26" height="25" class="review_star2" alt="별 " src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAcCAYAAAB2+A+pAAAAAXNSR0IArs4c6QAAAqNJREFUSA2tVk1rE0EYzrYbSKQXRYIfCaUiggaJJiH+AIsnL1poRQ+CBy8VvOivUA8evHgoeNCbRz3pH5B8HlIvYpG0VULxJBqMZn2eZWc7O5nZ7I5deJl33vf5yMzsTpvJWD6tVussw5KembMlgnc9CCsJa2PP81YYVq4gOTbEXq+3NB6PP5ObzWZPVSqVrbQ6ViuGKbfZf+Rc1JKMVsaO44RbLOdJDAUm9Va32+0TONtthM+FsYcoVqvVXSGaZEy9YhheE6Y0YM5aEjMZk9oY5PB8JSFdTWpPp6m2utlsHoXEN8S8IvUX82P1en1PqRunbrfbvYitOmRESI3JZLIMrGpKxDzOeb3T6byT4MYU2J8Orz2IvQLqghF5sI0ujG/O1Wq1j/l8/hImjxHewXrsq1GbHvSiZ+SM8alcxupfIE7uU/4/g+EO4jY+ufdCLWLMYr/fPzIajZ7DPLwkBNhmhOHrXC53t1wuf5f5U8aiidXfgflTxIKopRlh+ANxH6vc0PGMxgTjxTsN45dIGzpyTO0DTG/hLD+ZMLHGJMHYxep7GM+ZROQ6DDexygrGP3JdzWfeXPg2D8P0jEo0zYklx9QX9ZnGAPIlcwUhwUjszBdzpjFWcCOBWQSShBN7xribj+Os+Cdw6gei7l+P6C1HXDFBb4J6EXf3V7Un5lOCohGMq6opRH+j9wAv0BUG86AWUgPOaljQJLHGEFyTOZhvIhpYyROMvAK9IG+wp2AjXLnH3LjV+IQW8cu3ED4Gws8KhcLDUqn0SxXhfDAY5IfD4SPg1zkPftgSduUL5+pjXDEEuM3gO0OQruIyuGcypSh7xBBLDrnUYE/3xBnzbX7ruu55bOcbHVlXI5YccmGc7ovA/81FXJf+lunEk9aoQS0d/h/pAwlu3rYpxwAAAABJRU5ErkJggg==">
						<img width="26" height="25" class="review_star3" alt="별 " src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAcCAYAAAB2+A+pAAAAAXNSR0IArs4c6QAAAqNJREFUSA2tVk1rE0EYzrYbSKQXRYIfCaUiggaJJiH+AIsnL1poRQ+CBy8VvOivUA8evHgoeNCbRz3pH5B8HlIvYpG0VULxJBqMZn2eZWc7O5nZ7I5deJl33vf5yMzsTpvJWD6tVussw5KembMlgnc9CCsJa2PP81YYVq4gOTbEXq+3NB6PP5ObzWZPVSqVrbQ6ViuGKbfZf+Rc1JKMVsaO44RbLOdJDAUm9Va32+0TONtthM+FsYcoVqvVXSGaZEy9YhheE6Y0YM5aEjMZk9oY5PB8JSFdTWpPp6m2utlsHoXEN8S8IvUX82P1en1PqRunbrfbvYitOmRESI3JZLIMrGpKxDzOeb3T6byT4MYU2J8Orz2IvQLqghF5sI0ujG/O1Wq1j/l8/hImjxHewXrsq1GbHvSiZ+SM8alcxupfIE7uU/4/g+EO4jY+ufdCLWLMYr/fPzIajZ7DPLwkBNhmhOHrXC53t1wuf5f5U8aiidXfgflTxIKopRlh+ANxH6vc0PGMxgTjxTsN45dIGzpyTO0DTG/hLD+ZMLHGJMHYxep7GM+ZROQ6DDexygrGP3JdzWfeXPg2D8P0jEo0zYklx9QX9ZnGAPIlcwUhwUjszBdzpjFWcCOBWQSShBN7xribj+Os+Cdw6gei7l+P6C1HXDFBb4J6EXf3V7Un5lOCohGMq6opRH+j9wAv0BUG86AWUgPOaljQJLHGEFyTOZhvIhpYyROMvAK9IG+wp2AjXLnH3LjV+IQW8cu3ED4Gws8KhcLDUqn0SxXhfDAY5IfD4SPg1zkPftgSduUL5+pjXDEEuM3gO0OQruIyuGcypSh7xBBLDrnUYE/3xBnzbX7ruu55bOcbHVlXI5YccmGc7ovA/81FXJf+lunEk9aoQS0d/h/pAwlu3rYpxwAAAABJRU5ErkJggg==">
						<img width="26" height="25" class="review_star4" alt="별 " src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAcCAYAAAB2+A+pAAAAAXNSR0IArs4c6QAAAqNJREFUSA2tVk1rE0EYzrYbSKQXRYIfCaUiggaJJiH+AIsnL1poRQ+CBy8VvOivUA8evHgoeNCbRz3pH5B8HlIvYpG0VULxJBqMZn2eZWc7O5nZ7I5deJl33vf5yMzsTpvJWD6tVussw5KembMlgnc9CCsJa2PP81YYVq4gOTbEXq+3NB6PP5ObzWZPVSqVrbQ6ViuGKbfZf+Rc1JKMVsaO44RbLOdJDAUm9Va32+0TONtthM+FsYcoVqvVXSGaZEy9YhheE6Y0YM5aEjMZk9oY5PB8JSFdTWpPp6m2utlsHoXEN8S8IvUX82P1en1PqRunbrfbvYitOmRESI3JZLIMrGpKxDzOeb3T6byT4MYU2J8Orz2IvQLqghF5sI0ujG/O1Wq1j/l8/hImjxHewXrsq1GbHvSiZ+SM8alcxupfIE7uU/4/g+EO4jY+ufdCLWLMYr/fPzIajZ7DPLwkBNhmhOHrXC53t1wuf5f5U8aiidXfgflTxIKopRlh+ANxH6vc0PGMxgTjxTsN45dIGzpyTO0DTG/hLD+ZMLHGJMHYxep7GM+ZROQ6DDexygrGP3JdzWfeXPg2D8P0jEo0zYklx9QX9ZnGAPIlcwUhwUjszBdzpjFWcCOBWQSShBN7xribj+Os+Cdw6gei7l+P6C1HXDFBb4J6EXf3V7Un5lOCohGMq6opRH+j9wAv0BUG86AWUgPOaljQJLHGEFyTOZhvIhpYyROMvAK9IG+wp2AjXLnH3LjV+IQW8cu3ED4Gws8KhcLDUqn0SxXhfDAY5IfD4SPg1zkPftgSduUL5+pjXDEEuM3gO0OQruIyuGcypSh7xBBLDrnUYE/3xBnzbX7ruu55bOcbHVlXI5YccmGc7ovA/81FXJf+lunEk9aoQS0d/h/pAwlu3rYpxwAAAABJRU5ErkJggg==">
						<img width="26" height="25" class="review_star5" alt="별 " src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAcCAYAAAB2+A+pAAAAAXNSR0IArs4c6QAAAqNJREFUSA2tVk1rE0EYzrYbSKQXRYIfCaUiggaJJiH+AIsnL1poRQ+CBy8VvOivUA8evHgoeNCbRz3pH5B8HlIvYpG0VULxJBqMZn2eZWc7O5nZ7I5deJl33vf5yMzsTpvJWD6tVussw5KembMlgnc9CCsJa2PP81YYVq4gOTbEXq+3NB6PP5ObzWZPVSqVrbQ6ViuGKbfZf+Rc1JKMVsaO44RbLOdJDAUm9Va32+0TONtthM+FsYcoVqvVXSGaZEy9YhheE6Y0YM5aEjMZk9oY5PB8JSFdTWpPp6m2utlsHoXEN8S8IvUX82P1en1PqRunbrfbvYitOmRESI3JZLIMrGpKxDzOeb3T6byT4MYU2J8Orz2IvQLqghF5sI0ujG/O1Wq1j/l8/hImjxHewXrsq1GbHvSiZ+SM8alcxupfIE7uU/4/g+EO4jY+ufdCLWLMYr/fPzIajZ7DPLwkBNhmhOHrXC53t1wuf5f5U8aiidXfgflTxIKopRlh+ANxH6vc0PGMxgTjxTsN45dIGzpyTO0DTG/hLD+ZMLHGJMHYxep7GM+ZROQ6DDexygrGP3JdzWfeXPg2D8P0jEo0zYklx9QX9ZnGAPIlcwUhwUjszBdzpjFWcCOBWQSShBN7xribj+Os+Cdw6gei7l+P6C1HXDFBb4J6EXf3V7Un5lOCohGMq6opRH+j9wAv0BUG86AWUgPOaljQJLHGEFyTOZhvIhpYyROMvAK9IG+wp2AjXLnH3LjV+IQW8cu3ED4Gws8KhcLDUqn0SxXhfDAY5IfD4SPg1zkPftgSduUL5+pjXDEEuM3gO0OQruIyuGcypSh7xBBLDrnUYE/3xBnzbX7ruu55bOcbHVlXI5YccmGc7ovA/81FXJf+lunEk9aoQS0d/h/pAwlu3rYpxwAAAABJRU5ErkJggg==">
					</div>
				</div>
				<div class="reviewTextContent">
					<textarea class="reviewTextarea" placeholder="거래와 관련없는 후기는 삭제될 수 있습니다. 최소 20자 이상 입력해주세요."></textarea>
				</div>
				<div class="reviewRegis">
					<div class="numOfChar">0/200&ensp;<div id='reviewTextareaDiv' style="display:inline-block;"></div></div>
					<button class="reviewRegisBtn">
						<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAgCAYAAAAFQMh/AAAAAXNSR0IArs4c6QAABFdJREFUSA3Nl11MVEcUgPfnIj8B1kRi4AFI9cEiITFGfZXUYNWKxJ9CtBqC0WCMuoEGgfIPBsVsU7MpVdRV0qZpgkZLjU2qrYD6oCTw4A+YoGktTQhiIE1hC7td8Dsb7ua6ruxd2IdOMsy5Z84535wzM/cuRkOYW0tLS8zw8PCR6enpfKPRaCH865mZmRuKolysrKx8qeKMqhCO0WazJUxMTNwBlAF0gJjXkBGNHzN+wHi4pqbme2GFDexwOOIGBwf/JHgccW0pKSm1BQUFkwKRVl9fv4cqnDWZTNbq6urWsIA7OjqUrq6uH4DmwFDI7nRtbW2Zl6j509DQ8JHH42k3m83rzBr9vMS2tjZzT0+PlG9LVFTURrJahvxZZmZmdGdn56/aoCzwd/Qr0a0yaSdClQXa39//HRlm4fvH5ORkc0xMzKdk3kU/Ttan/GOS7RXsc+YNxtnU19fXSuBNERERWfHx8euBucfHx38LAv8PO8u8wAKtq6u7TIBsMthYUVHRW1xcPBoZGbmBhTjngrMVW7F5FfLhAmrkhDoYd3I3s7ib3QTytebm5tiRkZGbKBbHxsZucDqdUtr19NMs9CH6K4zHQgLjLNALOOdKpkAf+IgaQV4iQ0ND7aiW+sE9QG+npaVl6y61QCnvOcY8oJveBxV+YWGhMzU1NRvxLyk75e0Wf9rfsv+5ubkeXRnPQr8h0F7KuxnofQEEa5z6RZz6XvzTgV7nuuWXlpb+I3667jFvm69xzAf6CdB7wYDqfEZGRgnQ3QJNTEzMs1qt/6pzQUtNee04FwDfCvSu6hhsxK+EEp9UoZTfrfWZE8wL4CuMD7Cn2VVVVZ1ax7lkDmAxi5VT7M3UHyq+7wWzYhvzh+g5QO+IsZ6Gn5VMv5wLKnGUQMHItAn9EZxz+IzdDmQTSAf0KJmeCQYV33cyBir7YmVuO9BfAgEC6SjvYaB2PVDxf+s6seITOJfgvAOovH10NfwKMTxL/1FOb6A99Q/kKzWZ1jF5nIO0iz3VDSXTAyw2JKgswpsxH+hdHIg2AoyQ7QDjIAu4zAJu+a9U+wx0P7YX0enOVPX37jHQJBQu+nkCyX3bhq5SNQo0Ut58bC4wFzJU4nlLDWwNcj/lrhIlmXxB0OUiB2rM72X+EtVp17un/nHUPRZwrzpJ0BUEnZJSIqch/8xh65B5dHtYaOtCoBLHJN9Pxg8J9EQUs20ZwQ8CdaDfhywfCAPlzUP+FvGn+WY6G9+gjI2NreaBV7HpqU+pKJ8DSIiOju52u92LXS7XM6C7BcpCFgwVjkJWUmYDXx5fxnwMfL8q7Ha7a2pqygxQoDcWmqmwpAl4LeN4WVnZy/LyckNTU1McoJVkJz9D00dHR9PFkOfepKQkXS8HsQ/WjJzkAYwS6A/IKB1Asjghexie0x+he2GxWOxFRUVDMheOJqd6EV3usMhX2etHjI+Tk5Ofav8FQRfe1tjYuCS8Ef/n0d4Ah7Y0Xn+VgFMAAAAASUVORK5CYII=" width="15" height="16" alt="문의등록버튼 아이콘">
					</button>
				</div><!-- //reviewRegis -->
			</div><!-- //reviewForm  -->
		</div><!-- //reviewFormWrap -->
	</c:if>
	<!-- reviews.js -->
</div>
<!-- 1개 이상 거래 시  -->
<div id="reviewModal">
	<div class="reviewModalWrap">
		<p class="reviewModalText">거래한 상품을 선택해주세요.</p>
		<!-- 거래한 물건 정보 -->
		<div class="itemDetailWrap">
		<!-- <div class="itemDetail">
			<div class="itemDetail">
				상품 이미지
				<div class="itemImgWrap">
					<img src="" alt="거래 상품 이미지">
				</div>
				<div class="itemContentWrap">
					<div class="itemName_Title"></div>
					<div class="itemName"></div>
				</div>
			</div>
		</div> -->
		</div>
		<!-- 확인/취소 버튼 -->
		<div class="reviewModalBtm">
			<!-- <button type="button" class="reviewModalOkBtn">확인</button> -->
			<button type="button" class="reviewModalCancelBtn">취소</button>
		</div>
	</div>
</div><!-- //soldOutModal -->











<!-- ************************ 신고하기 모달창 ************************ -->
<div id="reviewModal_singo">
   <div class="singoModalWrapR">
      <div id="singoModalTopR">
         <div class="title">신고하기</div>
         <button class="modalCloseBtnR">
            <!-- 닫기 버튼 아이콘 -->
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAiBJREFUaAXtmM1xwjAQRrFvcE+aSJoIPaSI5MCNHmC4caCK1ECaCE0kBTBccPxl0MyO0C6r1drkIF/Q6Gf3vbU9kplM6lUrUCtQK/BvK7Bard622+3DvQCRGwxS/pYbvCzcHY/H/T0kkBO5e76dJMEKzGazj6Zpvrquex5bIsAjNxjAwhW64QbQHweaTqfzxWLxI60pHcvNKQqMLZELD76bAmNJWODVAkNLWOGzBIaSKIHPFvCWKIU3CXhJeMCbBUolvOCLBKwSnvDFAgmJQ7/ZvXCb3QX+s99hn7DDemyMqn0AoNIVgSUlNHOkHNyYiwCCS4DSGAem7XcT4CTQ3x8Gw2OTvDta2NQ8VwEkiKuNvssz7w6P2O4CCEol/pI0zSDwiM1+D2DQep1Op6vCpPqs8em6q0R00NLebDaP5/N5Hx4bxAjttm3ny+Xy2xKXW+MqEMMDGImpkLeEm0AKPlRbGuMqq+13EdAAauZooem8YoEcsJy5FFJqFwlYgCxrBhEoASlZG8uY7oAHgEcMyGQLeCVGco9YWQIeCQFOr9KY6qNEaSIKTdvYK7C59R84B+zY2PRwlqJzpLZKAAGH3E1jCRy/tRI3HyF6skSVvI8CtLrxXZY+T8M6USCG1wQMga2/uTlZgdxAVuDUupzc7DvQP4ev4Rg8RuWpCP7VQM7wYoOFjqvb6/X6HdVQL3CeiHcCDM5ha7hagVqBWgHHCvwCWAH5e5bAf84AAAAASUVORK5CYII=" width="24" height="24" alt="닫기 버튼 아이콘">
       </button>
    </div>
    
    <div id="singoModalBottomR"> 
       <!-- 카테고리 (1) -->
       <div class="singoCategoryR">
          <div class="singoTitleR">
             <span>허위/거래와 무관한 내용</span>
             <button type="button" class="titleBtnR"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAQCAYAAAAI0W+oAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAXNJREFUeNqslK1Pw1AUxV9fmoq5Ldl/MCSaBLkEAQkIPgxzTUABjoRMsAJmCQ4HJGAAw8yCwGFQaCyOKSpgZmIGzk1OyU1Zu7fRm/yWvtvec1777p0XRVFgjLkGZ+DFFBtzYBeEPn5uwAZYAPPgrSCTGngAVRBY/HTBNxOPoFKASYVaVWp3xegWRGoX97KDf5gE1KhxfSwelosTGkrUwRXwpjDxWFvnWjSP5CIxktcLwRPXDdCawqjFWkOtkNq/RhJDsKaa4VAVuUSDNYYa69Q0aSOJL7AI4hGfIS/0546p8akfsCOKZDfLYMCD7aiDzWrjDp8dsPbPiNiMYhncLX7fsmrVdCQjUeaz21lDb3N2egeaqeErqfsl5pK3barOnchIog3O1d/JBc9BuGTO8LqdJ+Q7HPQemOGBS2e9M7+p2nhnnIiLkbToKngGs+BA3XvlveE4Ees4I32wBD5ULmau7yLgTzCQPbAC9rk+Zc4pfgQYAOZsSsrHKCoBAAAAAElFTkSuQmCC" width="13" height="8" alt="화살표 아이콘"></button>
          </div>
          <div class="singoContentR">
         	 <div class="contentListR">
                <button type="button">허위</button>
             </div>
             <div class="contentListR">
                <button type="button">광고</button>
             </div>
             <div class="contentListR">
                <button type="button">불건전한 내용</button>
             </div>
             <div class="contentListR">
                <button type="button">의미를 알 수 없는 내용</button>
             </div>
          </div>
       </div>
       <!-- 카테고리 (2) -->
       <div class="singoCategoryR">
          <div class="singoTitleR">
             <span>언어폭력(비방,욕설,성희롱)</span>
             <button type="button" class="titleBtnR"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAQCAYAAAAI0W+oAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAXNJREFUeNqslK1Pw1AUxV9fmoq5Ldl/MCSaBLkEAQkIPgxzTUABjoRMsAJmCQ4HJGAAw8yCwGFQaCyOKSpgZmIGzk1OyU1Zu7fRm/yWvtvec1777p0XRVFgjLkGZ+DFFBtzYBeEPn5uwAZYAPPgrSCTGngAVRBY/HTBNxOPoFKASYVaVWp3xegWRGoX97KDf5gE1KhxfSwelosTGkrUwRXwpjDxWFvnWjSP5CIxktcLwRPXDdCawqjFWkOtkNq/RhJDsKaa4VAVuUSDNYYa69Q0aSOJL7AI4hGfIS/0546p8akfsCOKZDfLYMCD7aiDzWrjDp8dsPbPiNiMYhncLX7fsmrVdCQjUeaz21lDb3N2egeaqeErqfsl5pK3barOnchIog3O1d/JBc9BuGTO8LqdJ+Q7HPQemOGBS2e9M7+p2nhnnIiLkbToKngGs+BA3XvlveE4Ees4I32wBD5ULmau7yLgTzCQPbAC9rk+Zc4pfgQYAOZsSsrHKCoBAAAAAElFTkSuQmCC" width="13" height="8" alt="화살표 아이콘"></button>
          </div>
          <div class="singoContentOtherR">
             <div class="contentListR">
                <button type="button">비방/욕설</button>
             </div>
             <div class="contentListR">
                <button type="button">성희롱</button>
             </div>
          </div>
       </div>
      
       <div class="singoCategoryR">
          <div class="singoTitleR">
             <span>기타사유(직접입력)</span>
             <button type="button" class="titleBtnR"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAQCAYAAAAI0W+oAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAXNJREFUeNqslK1Pw1AUxV9fmoq5Ldl/MCSaBLkEAQkIPgxzTUABjoRMsAJmCQ4HJGAAw8yCwGFQaCyOKSpgZmIGzk1OyU1Zu7fRm/yWvtvec1777p0XRVFgjLkGZ+DFFBtzYBeEPn5uwAZYAPPgrSCTGngAVRBY/HTBNxOPoFKASYVaVWp3xegWRGoX97KDf5gE1KhxfSwelosTGkrUwRXwpjDxWFvnWjSP5CIxktcLwRPXDdCawqjFWkOtkNq/RhJDsKaa4VAVuUSDNYYa69Q0aSOJL7AI4hGfIS/0546p8akfsCOKZDfLYMCD7aiDzWrjDp8dsPbPiNiMYhncLX7fsmrVdCQjUeaz21lDb3N2egeaqeErqfsl5pK3barOnchIog3O1d/JBc9BuGTO8LqdJ+Q7HPQemOGBS2e9M7+p2nhnnIiLkbToKngGs+BA3XvlveE4Ees4I32wBD5ULmau7yLgTzCQPbAC9rk+Zc4pfgQYAOZsSsrHKCoBAAAAAElFTkSuQmCC" width="13" height="8" alt="화살표 아이콘"></button>
          </div>
          <div class="singoContentR">
             <div class="contetnListTextareaR">
                <textarea id="complainReason"></textarea>
                <div id="textareaDiv"><span id="counter">0</span>자/200자</div>
                <div id="textCounterDiv" class="caution"></div>
                <button type="button" id="complainReasonBtn">등록</button>
             </div>
          </div>
       </div>
       <div class="singoCategoryR">
          <div class="singoTitleR">
              <button style="float:right" class="directAsk"
             			onclick="location.href='/market/notice/qna'">1:1문의하기</button>
          </div>
          <div class="singoContentR"></div>
       </div>
    </div><!-- //singoModalBottom -->
 </div><!-- singoModalWrap -->
</div><!-- //modalHidden -->























