var webSocket = {
	//sockjs 관련 스크립트
	init: function(param) { 
		this._url = param.url;
		this._initSocket();
	},
	
	//메시지 세팅
	sendChat: function() {
		this._sendMessage('${chat_seq}', 'CMD_MSG_SEND', $('#inputMessage').val()); //메시지 창에 있는 값으로 세팅
		$('#inputMessage').val(''); //메시지 창 비우기
	},	
	sendEnter: function() {
		this._sendMessage('${chat_seq}', 'CMD_ENTER', $('#inputMessage').val());
		$('#inputMessage').val('');
	},
	
	//메시지 보낼 때
	_sendMessage: function(chat_seq, cmd, msg, checkId) {
		var msgData = {
				chat_seq : chat_seq,
				cmd : cmd,
				msg : msg,
				checkId : checkId
		};
		var jsonData = JSON.stringify(msgData);
		this._socket.send(jsonData);
	},	
	
	//메시지 받을 때 (정의된 CMD 코드에 따라서 분류함)
	receiveMessage: function(msgData) {
		//메시지
		if(msgData.cmd == 'CMD_MSG_SEND') {
			if(msgData.msg.trim() == '') return; //받은 메시지가 공백일 시 벗어나기
			
			if(msgData.checkId == '${member.username}') { //내가 보낸 메세지일 때
				$('#chat-container').append('<div class="my-chat-box"><div class="chat my-chat">' + msgData.msg + '</div>');
			}
			else { //상대방이 보낸 메세지일 때
				$('#chat-container').append('<div class="chat-box"><div class="chat">' + msgData.msg + '</div>');
			}
			$('#chat-container').scrollTop($('#chat-container')[0].scrollHeight+20);
		}
		//입장
		else if(msgData.cmd == 'CMD_ENTER') {
			$('#chat-container').append('<div class="chat notice">' + msgData.msg + '</div>');
			$('#chat-container').scrollTop($('#chat-container')[0].scrollHeight+20);
		}
		//퇴장
		else if(msgData.cmd == 'CMD_EXIT') {					
			$('#chat-container').append('<div class="chat notice">' + msgData.msg + '</div>');
			$('#chat-container').scrollTop($('#chat-container')[0].scrollHeight+20);
		}
	},
	
	//연결이 끊겼을 때 메시지 띄우기
	closeMessage: function(str) {
		$('#chat-container').append('<div class="chat notice">' + msgData.msg + '</div>');
	},
	
	//소켓 종료
	disconnect: function() {
		this._socket.close();
	},
	
	//sockjs 관련 스크립트
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