<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>

<link rel="stylesheet" href="${pageContext.request.contextPath}/css/chat/chatList.css">

<script src="https://code.jquery.com/jquery-3.5.1.min.js"></script> 
<script>
//바다톡
$('#chatRoomBtn').click(function(){
	window.open("/market/chat/chatRoom?chat_seq="+${chat_seq}, "chat", "width=370 height=670 scrollbars=yes");
});
</script>

<body>

<c:set var="profile" value='<%=session.getAttribute("login")%>' />
<div id="chatListBody">
 	<div class="chatTitle"><h2>바다톡</h2></div>
 	<hr class="chatTitleUnderline">
	
	<!-- 채팅방 목록 -->
	<div class="chatRoomWrap">
	
		<div class="chatRoomBox">
			<!-- 프사 넣을 공간 -->
			<div class="chatRoom_profile"> 
				<img id="OTHER_store_img" src="path"></img>
			</div> 
			
			<!-- 닉네임, 메시지, 로그타임 넣을 공간 -->
			<div class="chatRoom_content"> 
				<span id="OTHER_store_nickname">상점이름</span>
				<span id="last_message">마지막 메시지</span>
				<span id="chat_logtime">로그타임</span>
			</div>
			
			<!-- 버튼(:) 넣을 공간 -->
			<div class="chatRoom_btns"> 
				<button id="chatComplainBtn"></button>
				<button id="chatDeleteBtn"></button>
			</div>
		</div>
		
	</div>	

	<input type="button" value="채팅방 입장" id="chatRoomBtn">

	<img id="profileImg" class="img-fluid" src="/displayFile?fileName=${userImage}&directory=profile" style = "display:none">
	<input type="text" id="nickname" value = "${user_name}" style = "display:none">
	<input type="button" id="enterBtn" value="입장" style = "display:none">
	<input type="button" id="exitBtn" value="나가기" style = "display:none">
</div>	
</body>
