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
 	
	<!-- hidden -->
	<div class="onlyHidden" style="display: none;"></div>
	
	<!-- 채팅방 목록 -->
	<div class="chatRoomWrap"></div>
	
</div>	
</form>
</body>