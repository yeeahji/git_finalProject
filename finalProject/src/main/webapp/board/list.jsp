<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="sec" %>
    
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>아나바다 커뮤니티</title>
	<link rel="stylesheet" href="../css/board/list.css">
	
	<script type="text/javascript" src="//developers.kakao.com/sdk/js/kakao.min.js"></script>
	<script type="text/javascript" src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
	
	<script type="text/javascript" src="../js/board/list.js"></script>
</head>
<body>

<div id="root">
 <div class="section1">
  <div class="section2">
  	<div class="section2-1"></div>
  	<div class="section2-2"></div>
  	<div class="section2-3"></div>
  	<div class="section2-4"></div>
  	<div class="section2-5">
  		<div class="section2-5-1" align="center">
  		<sec:authentication property="principal" var="member"/> <!-- 사용자 정보 가져오기 -->
  		
  			<nav class="notice_navBar"></nav>
  			<main class="notice_main">
				<h3 class="title"><strong>커뮤니티</strong></h3>
				<!-- 비회원 -->
				<sec:authorize access="isAnonymous()">	
				<input value="글쓰기" type="button" 
						onclick="location.href='/market/member/loginForm'"  style="float:right;">
				</sec:authorize>
				<br><br>
				<!-- 권한이 있을 때(회원) -->
				<sec:authorize access="isAuthenticated()">   
				<input value="글쓰기" type="button" id="goWriteBtn" style="float:right;">
				</sec:authorize>
				<br><br>
				<input type="hidden" id="pg" value ="${pg }"><!-- controller에서 넘어오는 pg값 -->
				<input type="hidden" id="memId" value ="${memId }">
	
<!-- - 리스트 -->
		<table class="table table-bordered table-hover" id="boardListTable" border="1" cellpadding="10" cellspacing="1" frame="hside" rules="rows" align="center">
			<tr align="center">
				<th width="100">글번호</th>
				<th width="700">제목</th>
				<th width="150">작성자</th>
				<th width="100">조회수</th>
				<th width="150">작성일</th>
			</tr>
			<!-- 비회원 -->
			<sec:authorize access="isAnonymous()">	
			<input id="subjectA" type="hidden" onclick="location.href='/market/member/loginForm'" >
			</sec:authorize>
			<!-- 권한이 있을 때(회원) -->
			<sec:authorize access="isAuthenticated()">   
			<input id="subjectA" type="hidden" >
			</sec:authorize>
		</table><br>
	
<!-- - 페이징 처리 -->
		<div id="boardPagingDiv" class="paging" align="center" cursor="point"></div><br><br>
		
<!-- - 검색 -->
		<form id="boardSearchForm" name="boardSearchForm">
			<div style="text-align:center;" >
			<select name="searchType" id="searchType" align="center">
				<option value="mem_id" selected> 아이디</option>
				<option value="board_subject"> 제목</option>
			</select>
			<input type="hidden" name="pg" value="1"> <!-- 기본페이지.boardSearchForm안에 있어야한다. -->
			<input type="search" name="searchText" id="searchText"align="center">
			<input type="button" id="boardSearchBtn" value="검색"><br><br>
			<div id="searchDiv"></div>
			</div>
		</form>
			
		
		</main>
		
		</div><!-- section2-5-1 -->
  	</div>
  	</div>
  	<div class="section2-6"></div>
  	<div class="section2-4"></div>
  	<div class="section2-4"></div>
  	<div class="section2-4"></div>
  </div> <%-- revel2--%>
 </div>
 <!-- 합쳐지고 최소화된 최신 CSS -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css">

<!-- 부가적인 테마 -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap-theme.min.css">

<!-- 합쳐지고 최소화된 최신 자바스크립트 -->
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js"></script>
</body>
</html>