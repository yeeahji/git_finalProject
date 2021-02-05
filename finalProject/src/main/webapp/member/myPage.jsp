<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>마이페이지</title>
<link rel="stylesheet" type="text/css" href="../css/member/member.css?ver=1">
<script type="text/javascript" src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
<script type="text/javascript" src="../js/member/myPage.js"></script>

</head>
<body>
<form id="myPageForm">
<div align="center">
	<br><br><br><br><br><br>
	<ul>
		<input type="hidden" value="${sessionScope.memId}" id="memId">
		<a href="/market/member/updateForm"><input type="button" value="회원정보수정" id="modifyBtn"></a><br><br>
		<input type="button" value="회원탈퇴" id="withdrawBtn"><br><br>
		<a href="/market/notice/qnaList" id=""><input type="button" value="1:1 문의내역" id="qnaBtn"></a><br><br>
		<input type="button" value="내 게시글" id="myboardBtn"><br><br>
	</ul>
	<br><br><br><br><br><br>
</div>	
</form>

</body>

</html>