<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>마이페이지</title>
<link rel="stylesheet" type = "text/css" href="../css/member/member.css?ver=1">

</head>
<body>
<form id="myPageForm">
<div align="center">
	<br><br><br><br><br><br>
	<ul>
	<input type="button" value="회원정보수정" id="modifyBtn"><br><br>
	<input type="button" value="회원탈퇴" id="withdrawBtn"><br><br>
	<input type="button" value="1:1 문의내역" id="qnaBtn"><br><br>
	<input type="button" value="내 게시글" id="myboardBtn"><br><br>
	
	<h5><strong><a href="/market/member/updateForm">회원정보수정</a></strong></h5><br>
	<h5><strong><a href="#" id="withdrawBtn">회원탈퇴</a></strong></h5><br>
	<h5><strong><a href="/market/notice/qna" id="">1:1 문의 내역(링크바꿔야함)</a></strong></h5>
	<h5><strong>내 게시글</strong></h5>
	</ul>
	<br><br><br><br><br><br>
</div>	
</form>
<script type = "text/javascript" src = "https://code.jquery.com/jquery-3.5.1.min.js"></script>
<script type = "text/javascript">
$('#withdrawBtn').click(function(){
	if(confirm("회원정보를 탈퇴하면, 모든 기록이 사라집니다. 정말 탈퇴하시겠습니까?")){
		$.ajax({
			type : 'post',
			url : '/market/member/withdrawForm',
// 			data :, //???,
			success : function(){
				alert("회원정보를 성공적으로 삭제했습니다.");
				location.href="/market/index.jsp";
			}, error :  function(request, err){
				console.log(request.status + "\n message : " +request.responseText +"\n err:");
				alert(err);
			}
		});
	}else
		return;
});
</script>
</body>

</html>