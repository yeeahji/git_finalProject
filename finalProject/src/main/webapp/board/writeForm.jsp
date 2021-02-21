<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="sec" %>
    
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>아나바다 자유게시판</title>
	<link rel="stylesheet" href="../css/board/write.css?ver=1">
	<script type="text/javascript" src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
	<script type="text/javascript" src="../js/board/write.js"></script>

</head>
<body>
<div id="root">
<div class="section1">
<div class="section2">
  	<div class="section2-1"></div>
  	<div class="section2-2"></div>
  	<div class="section2-3"></div>
  	<div class="section2-4"></div>
  	<div class="section2-5"><br><br><br>
  		<div class="section2-5-1">
  			<div class="row">
  			<div class="FlexableTextArea">
  			<textarea placeholder="제목을 입력해주세요." class="textarea_input" id="subjectArea" style="height: 40px;"></textarea>
  			<div id="subjectAreaDiv" class="caution"></div>
  			<br>
  			
  			<textarea placeholder="내용을 입력해주세요." rows = "30" class="textarea_input" id="contentArea" style="height: 300px;"></textarea>
  			
  			
<!--   			<input type = "file" name = "image[]" id = "img3" accept ="image/*" multiple> -->
  			<br>
  			<div id="contentAreaDiv" class="caution"></div>
  			<br><br>
  	</div></div>
  			<div align="center">
  			<sec:authentication property="principal" var="member"/> <!-- 사용자 정보 가져오기 -->
  			<!-- 비회원 (세션 시간 만료)-->
  			<sec:authorize access="isAnonymous()">
  			<input value="등록" type="button" onclick="location.href='/market/member/loginForm'">
  			</sec:authorize>
  			<!-- 권한이 있을 때(회원) -->
			<sec:authorize access="isAuthenticated()"> 
			<input value="등록" type="button" id="writeBtn">
			</sec:authorize>
			<br><br><br>
  			</div>
  			
		</div><!-- section2-5-1 -->
  	</div>
  	</div><!-- section2 -->
  	<div class="section2-6"></div>
  	<div class="section2-7"></div>
  	<div class="section2-8"></div>
  	<div class="section2-9"></div>
 </div> <%-- section1--%>
 </div>

</body>
</html>