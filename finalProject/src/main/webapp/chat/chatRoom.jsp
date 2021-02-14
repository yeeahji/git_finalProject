<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="sec" %>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Ty pe" content="text/html; charset=UTF-8">
<title>바다톡</title>

<sec:authentication property="principal" var="member"/> <!-- 사용자 정보 가져오기 -->

<link rel="stylesheet" href="${pageContext.request.contextPath}/css/chat/chatRoom.css">

<script type="text/javascript" src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
<script src="../js/chat/chatRoom.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/sockjs-client/1.4.0/sockjs.js"></script>
<script type="text/javascript">
var webSocket = {
	//sockjs 관련 스크립트----------------------------------------------------------
	init: function(param) { 
		this._url = param.url;
		this._initSocket();
	},

	//메시지 세팅-----------------------------------------------------------------
	_sendMessage: function(chat_seq, cmd, msg, checkId, current_user_num) {
		var msgData = {
				chat_seq : chat_seq,
				cmd : cmd,
				msg : msg,
				checkId : checkId,
				current_user_num : current_user_num
		};
		var jsonData = JSON.stringify(msgData);
		this._socket.send(jsonData);
	},	
	
	//메시지 보낼 때------------------------------------------------------------------
	//----------- 일반 메시지 -------------
	sendChat: function() { 
		//공백 시 벗어나기
		if($('#inputMessage').val().trim() == '') {
			$('#inputMessage').val('');
			return;
		}
		
		//태그 사용 걸러내기
		if((tag = xss_check($('#inputMessage').val().trim())) != null) {
			alert('허용된 HTML 태그만 사용 가능 합니다.\n' + '금지태그 : [' + tag + ']');
			$('#inputMessage').val('');
			return;
		}
		
		//불건전 단어 체크
		if((word = word_check($('#inputMessage').val().trim())) != null) {
			alert('불건전한 단어 "' + word + '"은 입력할 수 없습니다.\n채팅 매너를 준수해주세요.');
			$('#inputMessage').val('');
			return;
		}
		
		// 명령 메세지
/* 		if($('#message').val().trim().charAt(0) == '/') {
			// 도움말
			if($('#message').val().trim().length >= 4 && $('#message').val().trim().substring(1) == '도움말') {
				$('#divChatData').append('<div style="margin-bottom: 10px;"><font color="orange">' + strHelp + '</font></div>');
				$("#divChat").scrollTop($("#divChat")[0].scrollHeight);
				$('#message').val('');
				$('#message').focus();
				return;
			}
		} */
		
		//메시지 보내기
		this._sendMessage('${chat_seq}', 'CMD_MSG_SEND', $('#inputMessage').val()); //메시지 창에 있는 값으로 세팅
		$('#inputMessage').val(''); //메시지 창 비우기
		$('#inputMessage').focus();
	},
	
	//----------- 입장 메시지 -------------
	sendEnter: function() {
		this._sendMessage('${chat_seq}', 'CMD_ENTER', $('#inputMessage').val());
	},
	
	//----------- 다른 메시지 -------------
	sendCmd: function(cmd, msg) {
		this._sendMessage('${chat_seq}', cmd, msg);
	},

	
	//메시지 받을 때 (정의된 CMD 코드에 따라서 분류함)-----------------------------------------
	receiveMessage: function(msgData) {
		//----------- 메세지 -------------
		if(msgData.cmd == 'CMD_MSG_SEND') {
			//내가 보낸 메세지일 때
			if(msgData.checkId == '${member.username}') { 
				$('#chat-container').append('<div class="my-chat-box"><div class="chat my-chat"><input type="hidden" value="${member.username}">'+msgData.msg+'</div>');
			}
			
			//상대방이 보낸 메세지일 때
			else { 
				$('#chat-container').append('<div class="chat-box"><div class="chat"><input type="hidden" value="${two_mem_id}">'+msgData.msg+'</div>');
			}
			$('#chat-container').scrollTop($('#chat-container')[0].scrollHeight+20);

			//메시지 저장
			var message_content = document.getElementById("chat-container").innerHTML;

			$.ajax({
				type: 'post',
				url: '/market/chat/saveMsg',
				data: {'message_content' : message_content,
					   'chat_seq' : msgData.chat_seq}
			});
			
			//알림
			if(typeof msgData.cmd != 'undefined' && msgData.cmd != null) {
				//창 활성화 되어 있을 때만 입력창에 포커스
				if(flagFocused == true) {
					$('#inputMessage').focus();
				}
				// 창 비활성화 상태에서는 알림
				else {
					if(flagAlram == true) {
						$('#chat_alram').trigger("play");
					}
					if(typeof timeoutId == 'undefined' || timeoutId == null || timeoutId == '') {
						timeoutId = setInterval( function() { opener.opener.document.title = opener.opener.document.title == ':: 새로운 메시지 ::' ? titleOrigin : ':: 새로운 메시지 ::'; }, 700);
						timeoutId = setInterval( function() { document.title = document.title == ':: 새로운 메시지 ::' ? titleOrigin : '::  새로운 메시지  ::'; }, 700);
					}
				}
				//스크롤바 이동
				setTimeout(function() {
					$('#chat-container').scrollTop($('#chat-container')[0].scrollHeight);
				}, 10);
			}
		}
		//------------ 입장 --------------
		else if(msgData.cmd == 'CMD_ENTER') {
			//온라인 변경
			if(msgData.current_user_num != '1') { //첫번째로 채팅방에 들어온게 아니라면(=이미 채팅방에 다른 유저가 있다면)
				$('#olineCheck').attr('src', '../image/chat/houseOpen.png');
			}
			
			//메세지 불러오기
			if(msgData.checkId == '${member.username}') {
				var loadMsg;
				var xhttp = new XMLHttpRequest();
				
				xhttp.onreadystatechange = callFunction; 
				xhttp.open("GET", "/market/storageMsg/"+msgData.chat_seq+".txt", true); //서버에 GET방식으로 파일을 비동기 요청
				xhttp.send(null);
				      
				function callFunction(){
					if(xhttp.readyState == 4) { //서버-클라이언트 간의 통신 완료
						if(xhttp.status == 200){ 
							loadMsg = xhttp.responseText;
							
							//문자열 치환(상대방과 나를 구분하는 CSS 뒤바꾸기)
							var otherChatBefore = '<div class="my-chat-box"><div class="chat my-chat"><input type="hidden" value="${two_mem_id}">';
							var otherChatAfter = '<div class="chat-box"><div class="chat"><input type="hidden" value="${two_mem_id}">';
							var myChatBefore = '<div class="chat-box"><div class="chat"><input type="hidden" value="${member.username}">';
							var myChatAfter = '<div class="my-chat-box"><div class="chat my-chat"><input type="hidden" value="${member.username}">';
							
							function replaceAll(str, searchStr, replaceStr) {
								  return str.split(searchStr).join(replaceStr);
							}
							
							loadMsg = replaceAll(loadMsg, otherChatBefore, otherChatAfter);
							loadMsg = replaceAll(loadMsg, myChatBefore, myChatAfter);
							
							$('#chat-container').prepend(loadMsg); //통신 종료 전에 불러온 메시지를 채팅방에 출력
						}
					}
				}
			}//if
			
			
			//상품 상세페이지를 통해 들어왔을 경우
			if('${product_seq}' != '0') {
				var likeMsg = "'${product_subject}'에 관심있어요!";
				var likeUrl = '<a class="productPage" href="http://localhost:8080/market/product/productDetail?seq=${product_seq}" target="_blank">상품 확인</a>';
				
				if(msgData.checkId == '${member.username}') { 
					$('#chat-container').append('<div class="my-chat-box"><div class="chat my-chat"><input type="hidden" value="${member.username}">'+likeMsg+'</div>');
					$('#chat-container').append('<div class="my-chat-box"><div class="chat my-chat"><input type="hidden" value="${member.username}">'+likeUrl+'</div>');
				}
			}
			
			//메시지 저장
			var message_content = document.getElementById("chat-container").innerHTML;

			$.ajax({
				type: 'post',
				url: '/market/chat/saveMsg',
				data: {'message_content' : message_content,
					   'chat_seq' : msgData.chat_seq}
			});
		}
		
		//------------ 퇴장 --------------
		else if(msgData.cmd == 'CMD_EXIT') {					
			//오프라인 변경
			$('#olineCheck').attr('src', '../image/chat/houseClose.png');
			/*$('#chat-container').append('<div class="chat notice">' + msgData.msg + '</div>');*/
		}
	},

	//연결이 끊겼을 때 메시지 띄우기--------------------------------------------------------
	closeMessage: function(str) {
		/* $('#chat-container').append('<div class="chat notice">' + msgData.msg + '</div>'); */
	},
	
	//소켓 종료---------------------------------------------------------------------
	disconnect: function() {
		this._socket.close();
	},
	
	//sockjs 관련 스크립트-----------------------------------------------------------
	_initSocket: function() { 
		//소켓 연결
		this._socket = new SockJS(this._url);
	
		//연결이 생성된 후 이벤트 처리
		this._socket.onopen = function(evt) { 
			webSocket.sendEnter();
		};
		
		//생성된 소켓에서 메시지가 들어오는 이벤트 처리
		this._socket.onmessage = function(evt) {
			webSocket.receiveMessage(JSON.parse(evt.data));
		};
		
		//연결이 끊겼을 경우 이벤트 처리하는 핸들러 각각 등록
		this._socket.onclose = function(evt) {
			webSocket.closeMessage(JSON.parse(evt.data));
		}
	}	
};
</script>
<script type="text/javascript">
//모듈 init(하단에 위치해야 함)-----------------------------------------------------------------
$(window).on('load', function () {
	webSocket.init({ url: '<c:url value="/chat" />' });
});
</script>
</head>

<body>
	<div class="chatRoomHeader">
		<div class="chatRoomSubject" id="chatRoomSubject">
			<img id="olineCheck" src="../image/chat/houseClose.png"> ${other_store_nickname}
		</div>
	</div>
	
	
	<div id="chat-container"></div>
	<div id="bottom-container">
		<input type="text" id="inputMessage" onkeypress="if(event.keyCode==13){webSocket.sendChat();}" autofocus/>
		<input type="button" id="sendBtn" value="전송" onclick="webSocket.sendChat()"/>
	</div>
	
	<!-- 알람 -->
	<button type="button" id="btn_alram_on">알림 켜기</button>
	<button type="button" id="btn_alram_off">알림 끄기</button>
	<div style="display: none;">
		<audio id="chat_alram"><source src="../image/chat/chat_alram.mp3" type="audio/mpeg"></audio>
	</div>
	
	<!-- 이모티콘 -->
	<img src="../image/chat/emoji_1.gif" id="emoji_1" style="padding-right: 8px; cursor: pointer; width: 30px; height: 30px;">
	<img src="../image/chat/emoji_2.gif" id="emoji_2" style="padding-right: 8px; cursor: pointer; width: 30px; height: 30px;">
	<img src="../image/chat/emoji_3.gif" id="emoji_3" style="padding-right: 8px; cursor: pointer; width: 30px; height: 30px;">
	
	<!-- 이미지 첨부 -->
	<input type="file" id="uploadImg">
	
</body>
</html>



