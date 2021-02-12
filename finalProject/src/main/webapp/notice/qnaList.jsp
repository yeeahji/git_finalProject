<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%><%@ taglib uri="http://www.springframework.org/security/tags" prefix="sec" %>
    
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>아나바다 마켓 1:1 상담 내역</title>
<link rel="stylesheet" href="../css/notice/qnaList.css">
</head>
<body>
<sec:authentication property="principal" var="member"/>
<sec:authentication property="principal" var="member"/>
<!-- 회원/비회원 구분 -->
<sec:authorize access="isAnonymous()">
	<input type="hidden" id="mem_id" name="mem_id" value="비회원">
</sec:authorize>
<sec:authorize access="hasRole('ROLE_USER')">
	<input type="hidden" id="mem_id" name="mem_id" value="${member.username}">
</sec:authorize><div id="root">
 <div class="qL_revel1">
  <div class="qL_revel2">
  	<div class="qL_revel2-1"></div>
  	<div class="qL_revel2-2"></div>
  	<div class="qL_revel2-3"></div>
  	<div class="qL_revel2-4"></div>
  	<div class="qL_revel2-5">
  		<main class="revel2_5_main">
  			<nav class="main_nav">
	  			<a class="notice_none" href="/market/notice/qna">1:1문의하기</a>
	  			<a class="notice_qnsList" href="/market/notice/qnaList">
	  			상담내역
	  			<div class="notice_qnaList_inner"></div>
	  			</a>
  			</nav>
  			<ul class="main_ul">
  			</ul>
  		</main><br>
  		<div class="revel2_5_div"></div>
  	</div>
  	<div class="qL_revel2-6"></div>
  	<div class="qL_revel2-4"></div>
  	<div class="qL_revel2-4"></div>
  	<div class="qL_revel2-4"></div>
  </div> <%-- qL_revel2 --%>
 </div> <%-- qL_revel1 --%>
</div> <%-- root --%>

<script type="text/javascript" src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
<script type="text/javascript" src="../js/notice/qnaList.js"></script>
</body>
</html>