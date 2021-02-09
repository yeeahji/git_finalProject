<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>바다톡</title>

<link rel="stylesheet" href="${pageContext.request.contextPath}/css/chat/chatRoom.css">

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/sockjs-client/1.4.0/sockjs.js"></script>
<!-- <script defer src="../js/chat/chatRoom.js"></script> -->
<script type="text/javascript">
	var webSocket = {
		init: function(param) {
			this._url = param.url;
			this._initSocket();
		},
		sendChat: function() {
			this._sendMessage('${chat_seq}', 'CMD_MSG_SEND', $('#message').val());
			$('#message').val('');
		},
		sendEnter: function() {
			this._sendMessage('${chat_seq}', 'CMD_ENTER', $('#message').val());
			$('#message').val('');
		},
		receiveMessage: function(msgData) {

			// 정의된 CMD 코드에 따라서 분기 처리
			if(msgData.cmd == 'CMD_MSG_SEND') {					
				$('#divChatData').append('<div>' + msgData.msg + '</div>');
			}
			// 입장
			else if(msgData.cmd == 'CMD_ENTER') {
				$('#divChatData').append('<div>' + msgData.msg + '</div>');
			}
			// 퇴장
			else if(msgData.cmd == 'CMD_EXIT') {					
				$('#divChatData').append('<div>' + msgData.msg + '</div>');
			}
		},
		closeMessage: function(str) {
			$('#divChatData').append('<div>' + '연결 끊김 : ' + str + '</div>');
		},
		disconnect: function() {
			this._socket.close();
		},
		_initSocket: function() {
			this._socket = new SockJS(this._url);
			this._socket.onopen = function(evt) {
				webSocket.sendEnter();
			};
			this._socket.onmessage = function(evt) {
				webSocket.receiveMessage(JSON.parse(evt.data));
			};
			this._socket.onclose = function(evt) {
				webSocket.closeMessage(JSON.parse(evt.data));
			}
		},
		_sendMessage: function(chat_seq, cmd, msg) {
			var msgData = {
					chat_seq : chat_seq,
					cmd : cmd,
					msg : msg
			};
			var jsonData = JSON.stringify(msgData);
			this._socket.send(jsonData);
		}
	};
</script>	
<script type="text/javascript">
       $(window).on('load', function () {
		webSocket.init({ url: '<c:url value="/chat" />' });	
	});
</script>
</head>

<body>
	<input type="button" value="목록" id="chatListBtn">
	<div class="col-12" style="clear: both;">
		<div class="col-10" id="chatRoomSubject">
			${other_store_nickname}님과 대화
		</div>
	</div>

	<div id="chatContent">
		<div id="divChatData"></div>
	</div>
	<div id="chatInputArea">
		<input type="text" id="message" size="50" onkeypress="if(event.keyCode==13){webSocket.sendChat();}" autofocus/>
		<input type="button" id="btnSend" value="채팅 전송" onclick="webSocket.sendChat()"/>
	</div>
</body>
</html>