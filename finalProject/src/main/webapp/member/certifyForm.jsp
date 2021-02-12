<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="sec" %>

<link rel="stylesheet" type = "text/css" href="../css/member/member.css">

<body>
<script defer src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
<script defer src="../js/member/certify.js"></script>

<form id ="certifyForm" name="certifyForm" ></form>
<sec:authentication property="principal" var="member"/> <!-- 사용자 정보 가져오기 -->
	<div align="center">
	<br><br><br><br><br><br>
	<table border="1" cellpadding="50">
	<tr>
		<td>
			<h5><strong>비밀번호 재확인</strong></h5><br>
			개인 정보 보호를 위해 비밀번호를 다시 확인합니다<br><br>
			<div>
			<input placeholder="비밀번호" id="certifyPwd" name="certifyPwd" type="password" style="width:200px">
			<input id="certifyBtn" type="button" value="본인인증" >
			</div>
			<input type="hidden" id="certifyId" name="certifyId" value="${member.username}">
			<div class="caution" id="certifyPwdDiv"></div> 
		</td>
	</tr>
	</table>
	<br><br><br><br><br><br>
	</div>
</body>