<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>아나바다 자유게시판</title>
<link rel="stylesheet" href="../css/board/article.css">
<script type="text/javascript" src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
<script type="text/javascript" src="../js/board/article.js"></script>
</head>
<body>
<div id="root">
 <div class="section1">
  <div class="section2">
  	<div class="section2-1"></div>
  	<div class="section2-2"></div>
  	<div class="section2-3"></div>
  	<div class="section2-4"></div><br><br>
  	<div class="section2-5">
	<div class="section2-5-1">
	<form name = "article" method="post" >
	<article><!-- list.js에서 받은 값 -->
	<input type="hidden" name="seq" id="seq" value="${seq}"> <!-- 게시글 seq -->
	<input type="hidden" name="pg" id="pg" value="${pg }">
	<input type="hidden" name="sessionId" id="sessionId" value="${sessionId }">	<!-- 세션아이디 -->
	<input type="hidden" name="comment_seq" id="comment_seq">	
		<h3 id="board_subject" name="board_subject"></h3>
		<div>
			<span id="mem_id"></span>
		</div>
		<div >
			<span id="board_logtime"></span>&emsp;조회 <span id="board_hit"></span>
			
		</div>
<hr><!-- 내용 -->
		<div id="board_content" name="board_content" style="height:100px;">
		</div>
		</article>
		</form>
		<form name="commentForm" id="commentForm" method="post">
<hr><!-- 댓글 -->
		<div class="textarea_input">
		
		댓글 <hr>
			<table id="commentListTable" ></table><div id="triggerList"></div>
			<input name="board_seq" id="board_seq" type="hidden" value="${seq}">
			<textarea id="comment_content" name="comment_content" placeholder="댓글을 남겨보세요" class="textarea_input" ></textarea>
			<input value="등록" type="button" id="commentBtn">
			<div id="commentAreaDiv" class="caution"></div><br>
		</div>
		
		</form>
		
<hr><!-- 하단 버튼 -->
		<div style="text-align:right;"><span>
			<input value="답글 쓰기" type="button" id="replyBtn"></span>
			<span id="owner" style="text-align:right;" >
				<input value="수정" type="button" id="articleModifyBtn">
				<input value="삭제" type="button" id="articleDeleteBtn">
			</span>
			<a class="singoBtn">
				<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAAAXNSR0IArs4c6QAAAgtJREFUSA3tVrtOAkEUdQnKkvADFGtpIR01DYXyMLGwVisLjFEbE42FhYWJiY0YEwsqtLYwkZcFf2C3FJZuwQdIAvgAz8EdGHZZwpJIInGS3blzzzn3zty5m6wyM8Iol8tqs9lca7Vaq6CHFUUJUtZut6uYnj0ez4PP57uPRqMN+ocNZRhILJ/Pr2M6Q3BtGBebMIAfJxKJu6E8JxCn8tbr9SvgKXIQsIIpg7kUCARe6avVavPYyDLMLcyL9GHc+P3+XZz282fZ//b2L3srkQwJPuA9iMfj17C/eoyOpeOtI1m6UCjswL6AnYKW4DZf1jGwpCwjhLdMhvtZicViT1bhoHWxWFzCPT9COwvtxqDy2hKyQRqNxgtEGkT7EKVFcF3X5wzDOAW2SR/wrKZpJ6FQ6F1wsNk94JfADFVVF6yN5BFEMbMbzWQVllH4OTMZTnAIPMiHNn0yxyx9hTEYS8Zo2xKarU+MDdJ3ZwjSORlBMaw+U5MhLsUSdHtCIGGiEJa6LJeGpO3EkuW2E4Lc+ahF68tkYFl5TXuQT2hFLFljS4gSBUiIRCJvMpE2GwRde45AVT606bPyhFbEknHH71AmCdvsxiOs+Yw1bCccK4oL0X9CF8UajTr9JXX8LHK5XHu0IrljTbyk7rb3F9nKb92VUzEmfofdLk0mk7bfDaddjuMXlZz4Caf/Dr8BRaXTUmgtW58AAAAASUVORK5CYII=" width="14" height="14" alt="신고하기 아이콘">
			<span style="color:rgb(136, 136, 136);">신고하기</span>
			</a>
		</div>
	</div>
  	</div>
  	<div class="section2-6"></div>
  	<div class="section2-4"></div>
  	<div class="section2-4"></div>
  	<div class="section2-4"></div>
  </div> <%-- revel2--%>
 </div>
</div>

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
                     <button type="button">상업성 광고</button>
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
                  <span>불법/부적절</span>
                  <button type="button" class="titleBtn"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAQCAYAAAAI0W+oAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAXNJREFUeNqslK1Pw1AUxV9fmoq5Ldl/MCSaBLkEAQkIPgxzTUABjoRMsAJmCQ4HJGAAw8yCwGFQaCyOKSpgZmIGzk1OyU1Zu7fRm/yWvtvec1777p0XRVFgjLkGZ+DFFBtzYBeEPn5uwAZYAPPgrSCTGngAVRBY/HTBNxOPoFKASYVaVWp3xegWRGoX97KDf5gE1KhxfSwelosTGkrUwRXwpjDxWFvnWjSP5CIxktcLwRPXDdCawqjFWkOtkNq/RhJDsKaa4VAVuUSDNYYa69Q0aSOJL7AI4hGfIS/0546p8akfsCOKZDfLYMCD7aiDzWrjDp8dsPbPiNiMYhncLX7fsmrVdCQjUeaz21lDb3N2egeaqeErqfsl5pK3barOnchIog3O1d/JBc9BuGTO8LqdJ+Q7HPQemOGBS2e9M7+p2nhnnIiLkbToKngGs+BA3XvlveE4Ees4I32wBD5ULmau7yLgTzCQPbAC9rk+Zc4pfgQYAOZsSsrHKCoBAAAAAElFTkSuQmCC" width="13" height="8" alt="화살표 아이콘"></button>
               </div>
               <div class="singoContent">
                  <div class="contentList">
                     <button type="button">명예훼손/사생활침해</button>
                  </div>
                  <div class="contentList">
                     <button type="button">불법촬영물/음란성</button>
                  </div>
                  <div class="contentList">
                     <button type="button">언어폭력(비방, 욕설, 성희롱)</button>
                  </div>
                  <div class="contentList">
                     <button type="button">게시글 도배</button>
                  </div>
               </div>
            </div> <!-- //거래비매너(거래파기, 늦은배송) -->
           
            <div class="singoCategory">
               <div class="singoTitle">
                  <span>기타사유(직접입력)</span>
                  <button type="button" class="titleBtn"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAQCAYAAAAI0W+oAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAXNJREFUeNqslK1Pw1AUxV9fmoq5Ldl/MCSaBLkEAQkIPgxzTUABjoRMsAJmCQ4HJGAAw8yCwGFQaCyOKSpgZmIGzk1OyU1Zu7fRm/yWvtvec1777p0XRVFgjLkGZ+DFFBtzYBeEPn5uwAZYAPPgrSCTGngAVRBY/HTBNxOPoFKASYVaVWp3xegWRGoX97KDf5gE1KhxfSwelosTGkrUwRXwpjDxWFvnWjSP5CIxktcLwRPXDdCawqjFWkOtkNq/RhJDsKaa4VAVuUSDNYYa69Q0aSOJL7AI4hGfIS/0546p8akfsCOKZDfLYMCD7aiDzWrjDp8dsPbPiNiMYhncLX7fsmrVdCQjUeaz21lDb3N2egeaqeErqfsl5pK3barOnchIog3O1d/JBc9BuGTO8LqdJ+Q7HPQemOGBS2e9M7+p2nhnnIiLkbToKngGs+BA3XvlveE4Ees4I32wBD5ULmau7yLgTzCQPbAC9rk+Zc4pfgQYAOZsSsrHKCoBAAAAAElFTkSuQmCC" width="13" height="8" alt="화살표 아이콘"></button>
               </div>
               <div class="singoContent">
                  <div class="contentListTextarea">
                     <textarea id="complainReason"></textarea>
                     <div id="textareaDiv"><span id="counter">0</span>자/200자</div>
                     <div id="textCounterDiv" class="caution"></div>
                     <button type="button" id="complainReasonBtn">등록</button>
                  </div>
               </div>
            </div>
            <div class="singoCategory">
               <div class="singoTitle" >
                  <button style="float:right" class="directAsk"
                  			onclick="location.href='/market/notice/qna'">1:1문의하기</button>
               </div>
               <div class="singoContent"></div>
            </div>
         </div><!-- //singoModalBottom -->
      </div><!-- singoModalWrap -->
   </div><!-- //modalHidden -->

 </body>
</html>















