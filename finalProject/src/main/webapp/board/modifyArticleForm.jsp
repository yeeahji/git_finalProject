<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
    
<!DOCTYPE html>
<!-- 담당 : 김명경 -->
<html>
<head>
<meta charset="UTF-8">
<title>아나바다 자유게시판</title>
	<link rel="stylesheet" href="../css/board/write.css?ver=1">
	<script type="text/javascript" src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
	<script type="text/javascript" src="../js/board/modify.js"></script>
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
  		<input type = "hidden" name="seq" id="seq" value="${seq }">
		<input type = "hidden" name="pg" id="pg" value="${pg }">
  			<div class="row">
  			<div class="FlexableTextArea">
	  			<textarea placeholder="제목을 입력해주세요." class="textarea_input" 
	  					id="subjectArea" style="height: 40px;"></textarea>
  			<div id="subjectAreaDiv" class="caution"></div>
  			<br>
	  			<textarea placeholder="내용을 입력해주세요." class="textarea_input" 
	  					id="contentArea" style="height: 300px;"></textarea>
  			<div id="contentAreaDiv" class="caution"></div>
  			</div></div>
  			<div align="center">
  				<input value="등록" type="button" id="modifyBtn"></div>
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