<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>

<link rel="stylesheet" href="${pageContext.request.contextPath}/css/chat/chatList.css">

<body style="margin: 0;">
<script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
<script defer src="../js/chat/chatList.js"></script>

<form id="chatList" method="post" action="chatRoom" target="chatRoom">
<div id="chatListBody">
 	<div class="chatTitle"><h2>바다톡</h2></div>
 	<hr class="chatTitleUnderline">

	<!-- 채팅방 목록 -->	
	<div class="chatRoomWrap">
		<div class="chatRoom_profile" onclick="href='/market/store/store'">
         	<img id="other_store_img" src="/market/storage/logo_black.png">
      	</div>
		<a href="/market/chat/chatRoom" class="chatRoomList">
			<div class="chatRoom_content">
				<div class="chatRoomTitle" id="other_store_nickname">상대방 닉네임
				</div>
				<div class="chatRoomContent" id="last_message">마지막 멘트 나오기
				</div>
			</div>
		</a>
		<div class="chatRoomSysdate" id="chat_logtime">2021. 1. 11 월요일	
			<a class="chatRoomReport" id="chatComplainBtn" onclick="location.href='/market/index'">
			<img src="/market/image/chat/bell.JPG"
			style="weight:11px; height: 11px; cursor: pointer;" alt="신고">신고하기</a>
		</div>
	</div>
	
	<div class="chatRoomWrap">
		<div class="chatRoom_profile" onclick="href='/market/store/store'">
         	<img id="other_store_img" src="/market/storage/logo_black.png">
      	</div>
		<a href="/market/chat/chatRoom" class="chatRoomList">
			<div class="chatRoom_content">
				<div class="chatRoomTitle" id="other_store_nickname">상대방 닉네임
				</div>
				<div class="chatRoomContent" id="last_message">마지막 멘트 나오기
				</div>
			</div>
		</a>
		<div class="chatRoomSysdate" id="chat_logtime">2021. 1. 11 월요일	
			<a class="chatRoomReport" id="chatComplainBtn" onclick="location.href='/market/index'">
			<img src="/market/image/chat/bell.JPG"
			style="weight:11px; height: 11px; cursor: pointer;" alt="신고">신고하기</a>
		</div>
	</div>
	
	<div class="chatRoomWrap">
		<div class="chatRoom_profile" onclick="href='/market/store/store'">
         	<img id="other_store_img" src="/market/storage/logo_black.png">
      	</div>
		<a href="/market/chat/chatRoom" class="chatRoomList">
			<div class="chatRoom_content">
				<div class="chatRoomTitle" id="other_store_nickname">상대방 닉네임
				</div>
				<div class="chatRoomContent" id="last_message">마지막 멘트 나오기
				</div>
			</div>
		</a>
		<div class="chatRoomSysdate" id="chat_logtime">2021. 1. 11 월요일	
			<a class="chatRoomReport" id="chatComplainBtn" onclick="location.href='/market/index'">
			<img src="/market/image/chat/bell.JPG"
			style="weight:11px; height: 11px; cursor: pointer;" alt="신고">신고하기</a>
		</div>
	</div>
	
	<!-- hidden -->
	<div class="onlyHidden"></div>
</div>	
</form>
</body>
