<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>우편번호 찾기</title>
<link rel="stylesheet" type = "text/css" href="../css/member/member.css?ver=4">
</head>
<body>
<form id="postForm">
	<table id="postTable" border="1" width="100%" cellpadding="1" cellspacing="0">
	<tr>
		<td align="center">시도</td>
		<td><select name="sido" id="sido" style="width : 100px" align="center">
			<option>시도선택</option>
				<option value="서울">서울
			    <option value="인천">인천
	            <option value="대전">대전
	            <option value="대구">대구
	            <option value="울산">울산
	            <option value="세종">세종
	            <option value="광주">광주
	            <option value="경기">경기
	            <option value="강원">강원
	            <option value="전남">전남
	            <option value="전북">전북
	            <option value="경남">경남
	            <option value="경북">경북
	            <option value="충남">충남
	            <option value="충북">충북
	            <option value="부산">부산
	            <option value="제주">제주
		</select>	
		</td>
		
		<td align="center">시.군.구</td>
		<td><input type="text" name="sigungu" id="sigungu"></td>
	</tr>
	
	<tr>
		<td align="center">도로명</td>
		<td colspan="3"><input type="text" name="roadname" id="roadname">
						<input type="button" value="검색" id="searchPostBtn"></td>	
	</tr>
	
	<tr>
		<td align="center">우편번호</td>
		<td colspan="3" align="center">주소</td>
	</tr>
	</table>
</form>
<script type="text/javascript" src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
<script type="text/javascript" src="../js/member/join.js?ver=2"></script>
</body>
</html>