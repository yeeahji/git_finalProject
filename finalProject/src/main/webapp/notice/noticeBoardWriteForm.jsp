<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<body>
<form id="noticeBoardWriteForm">
<h3>공지사항 작성</h3>
<hr>
	<table border="1" cellpadding="3" cellspacing="0" align="center" >
		<tr>
			<td>
			<select id='select1' name='select1' style='width:100px;'>
				<optgroup label='대분류'>
				<option value='1'>공지사항</option>
				<option value='2'>자주묻는 질문</option>
				</optgroup>
			</select>
			</td>
			
			<td>
			<select id='select2' name='select2' style='width:150px;'>
				<optgroup label='소분류'>
					<option value='0'>--</option>
					<option value='1'>상점/상품</option>
					<option value='2'>거래</option>
					<option value='3'>번개페이</option>
					<option value='4'>회원정보(계정)</option>
					<option value='5'>택배서비스</option>
					<option value='6'>제재정책</option>
				</optgroup>
			</select>
			</td>
		</tr>
		
		<tr>
			<td width="100" align="center">제목</td>
			<td>
				<input type="text" id="subject" name="subject" placeholder="제목입력" width="300">
				<div id="subjectDiv"/>
			</td>
		</tr>
		
		<tr>
			<td width="100" align="center">작성자</td>
			<td>
				<input type="text" id="adminName" name="adminName" placeholder="작성자"  width="300">
				<div id="adminNameDiv"/>
			</td>
		</tr>
		
		<tr>
			<td align="center">내용</td>
			<td>
				<textarea id="content" name="content" cols="100" rows="30" placeholder="내용입력"></textarea>
			</td>
		</tr>
		
		<tr>
			<td colspan="2" align="center">
			<input type="button" value="등록" id="noticeBoardWriteBtn">
			<input type="reset" value="다시작성">
		</tr>
	</table>
</form>
<script type="text/javascript" src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
<script type="text/javascript">

$('#noticeBoardWriteBtn').click(function() {
	
	$.ajax({
		type: 'post',
		url: '/market/notice/noticeBoardWrite',
		data: {'select1': $('#select1').val(),
		   	   'select2': $('#select2').val(),
		       'subject': $('#subject').val(),
		       'adminName': $('#adminName').val(),
		   	   'content': $('#content').val()},
		success: function(){
			alert('등록 성공');
		}
	});
});
</script>


</body>
