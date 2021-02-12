<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="sec" %>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>아나바다 1:1문의하기</title>
<link rel="stylesheet" href="../css/notice/qna.css?ver=1">
</head>
<body>

<div id="root">
 <div class="q_revel1">
  <div class="q_revel2">
  	<div class="q_revel2-1"></div>
  	<div class="q_revel2-2"></div>
  	<div class="q_revel2-3"></div>
  	<div class="q_revel2-4"></div>
  	<div class="q_revel2-5">
  		<main class="section2-5-1" align="center">
		<nav class="qmain_nav">
			<a class="notice_qna" href="/market/notice/qna">
				1:1문의하기
			<div class="notice_qna_inner"></div>
			</a>
			<a class="notice_none" href="/market/notice/qnaList">상담내역</a>
		</nav>
  		<form id="QnaWriteForm">
  		<sec:authentication property="principal" var="member"/>
		<!-- 사용자정보 가져오기 -->
		<sec:authorize access="isAnonymous()">
			<input type="hidden" id="mem_id" name="mem_id" value="비회원">
		</sec:authorize>
		<sec:authorize access="hasRole('ROLE_USER')">
			<input type="hidden" id="mem_id" name="mem_id" value="${member.username}">
		</sec:authorize>
  		
  			<div class="qmain_div">
  				<div class="qmd_nav">
  				<div class="qmd_nav1">
  				<div class="qmd_nav2">
  					<div class="qmd_nav3">
						<select id='qnaCate_main' name='qnaCate_main'>
						<option value="">선택</option>
						</select>
						<input type="hidden" id="qnaCate_mainName" name="qnaCate_mainName">
  					</div>
  					<div class="qmd_nav4"></div>
  				</div>
  				</div>
  				</div>
  				<div class="qmd_nav">
  					<div class="qmd_nav1">
  					<div class="qmd_nav2">
  					<div class="qmd_nav3">
  						<select id='qnaCate_sub' name='qnaCate_sub'>
							<option value="">선택</option>
						</select>
  					</div>
  					<div class="qmd_nav4"></div>
  					</div>
  					</div>
  				</div>
  				<textarea rows="20" id="qna_content" name="qna_content" class="qmd_textarea"></textarea>
  				<div id="qna_contentDiv" class="caution"></div>
  				<div class="qmd_div">
  					<input id="fileUp" name="img[]" multiple="" type="file" accept="image/jpg, image/jpeg, image/png" class="sc-hgeeVt">
<!--   					<button class="qmd_divPictureBtn" for="fileUp">사진첨부</button> -->
  					<input value="문의글 등록"type="button" class="qmd_divQnaBtn" id="qnaBtn">
  				</div>
  			</div>
  		</form>
  			
  			</main></div>
  		<div class="q_revel2-5_div">사진첨부하면나오는 수정하는 부분</div>
  	<div class="q_revel2-6"></div>
  	<div class="q_revel2-4"></div>
  	<div class="q_revel2-4"></div>
  	<div class="q_revel2-4"></div>
  </div> <%-- q_revel2 --%>
 </div> <%-- q_revel1 --%>
</div> <%-- root --%>

<script type="text/javascript" src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
<script type="text/javascript" src="../js/notice/qna.js"></script>
</body>
</html>