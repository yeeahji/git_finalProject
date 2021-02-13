<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>

<link rel="stylesheet" href="${pageContext.request.contextPath}/css/chat/chatList.css">

<body>
<script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
<script defer src="../js/chat/chatList.js"></script>

<form id="chatList" method="post" action="chatRoom" target="chatRoom">
<div id="chatListBody">
 	<div class="chatTitle"><h2>바다톡</h2></div>
 	<hr class="chatTitleUnderline">

	<!-- 채팅방 목록 -->	
	<div class="chatRoomWrap">
		<a href="/market/store/store" class="chatImage">
		<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0OCIgaGVpZ2h0PSI0OCIgdmlld0JveD0iMCAwIDQ4IDQ4Ij4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGNpcmNsZSBjeD0iMjQiIGN5PSIyNCIgcj0iMjQiIGZpbGw9IiNEQ0RCRTQiLz4KICAgICAgICA8ZyBmaWxsPSIjRkZGIiBmaWxsLXJ1bGU9Im5vbnplcm8iPgogICAgICAgICAgICA8cGF0aCBkPSJNMjUgMjNjNi4xNDIgMCAxMSA0LjM4NyAxMSA5LjY2NyAwIC43MzYtLjU4IDEuMzMzLTEuMjk0IDEuMzMzSDE1LjI5NEMxNC41OCAzNCAxNCAzMy40MDMgMTQgMzIuNjY3IDE0IDI3LjM4IDE4Ljg1NCAyMyAyNSAyM3pNMjUgMTFhNSA1IDAgMSAxIDAgMTAgNS4wMSA1LjAxIDAgMCAxLTUtNSA1IDUgMCAwIDEgNS01eiIvPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+Cg==" 
		width="48" height="48" alt="프로필 이미지"></a>
		<a href="/market/chat/chatRoom" class="chatRoomList">
			<div class="chatRoomTab">
				<div class="chatRoomTitle">상대방 닉네임
				</div>
				<div class="chatRoomContent">마지막 멘트 나오기
				</div>
			</div>
		</a>
		<div class="chatRoomSysdate">2021. 1. 11 월요일	
			<a class="chatRoomReport" onclick="location.href='/market/index'">
			<img src="/market/image/chat/bell.JPG"
			style="weight:11px; height: 11px; cursor: pointer;" alt="신고"></i>신고하기</a>
		</div>
	</div>
	
	<!-- hidden -->
	<div class="onlyHidden"></div>
</div>	
</form>
</body>
