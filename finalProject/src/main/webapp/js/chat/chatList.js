//채팅 리스트 불러오기
$.ajax({
	type: 'post',
	url: '/market/chat/getChatList',
	dataType: 'json',
	success:function(data){
		$.each(data.chatList, function(index, items){
			//마지막 메시지 나타내기 - XMLHttpRequest의 응답이 늦어 연동이 조금 느림(태그 생성문에 if문 설정해줘도 소용없음)
			//마지막 메시지를 자바에서 해결할까?
			var loadMsg;
			var xhttp = new XMLHttpRequest();

			xhttp.onreadystatechange = callFunction; 
			xhttp.open("GET", "/market/storageMsg/"+items.chat_seq+".txt", true); //서버에 GET방식으로 파일을 비동기 요청
			xhttp.send(null);
			      
			function callFunction(){
				if(xhttp.readyState == 4) {
					if(xhttp.status == 200){ 
						loadMsg = xhttp.responseText;
						$('.onlyHidden').html(loadMsg);
						var last_message = $('.onlyHidden').find('div:eq(-1)').text();
						
						$.ajax({
							type: 'post',
							url: '/market/chat/getLastMessage',
							data: { 'last_message' : last_message,
									'chat_seq' : items.chat_seq },
							success:function(){
								loading = true;
							},
							error:function(error){
								console.log(error);
							}
						});
					}
				}
			}			

			//태그 생성
			$('<button/>', { //1단계
				class: 'chatRoomBox',
				id: items.chat_seq
			
			}).append($('<div/>', { //2단계 --- profile
				class: 'chatRoom_profile'
					
				}).append($('<img/>', { //3단계
					id: 'other_store_img',
					src: '/market/storage/'+items.other_store_img,
				})

			)).append($('<div/>', { //2단계 --- content
				class: 'chatRoom_content'
					
				}).append($('<span/>', { //3단계
					id: 'other_store_nickname',
					text: items.other_store_nickname
						
				})).append($('<span/>', { //3단계
					id: 'chat_logtime',
					text: items.chat_logtime
						
				})).append($('<span/>', { //3단계
					id: 'last_message',
					text: items.last_message
				})
				
			)).append($('<div/>', { //2단계 --- btns
				class: 'chatRoom_btns'
					
				}).append($('<button/>', { //3단계
					id: 'chatComplainBtn',
					text: '신고'
						
				})).append($('<button/>', { //3단계
					id: 'chatDeleteBtn',
					text: '나가기',
					style: 'z-index: 9999;'
				})
				
			)).appendTo($('.chatRoomWrap'));
			
			//변수 설정
			if($('.chatRoomWrap').find('input').length == 0) { //중복 설정 방지
				$('.chatRoomWrap').append($('<input/>', {
					type: 'hidden',
					id: 'hiddenVal',
					name: 'other_store_nickname',
					value: items.other_store_nickname
				}))
			}
			
			//채팅방 연결(post방식으로 팝업창)
			$('#'+items.chat_seq).click(function() {
				$('#hiddenVal').val(items.other_store_nickname); //선택한 방번호의 닉네임 변수값으로 설정
				
				window.open('', 'chatRoom', 'width=370 height=670');
				$('#chatList').submit();
			});
			
			//채팅방 나가기
			//전체 채팅방 클릭되니까 버튼 따로 나타내기.. 모달이든 뭐든
			$('#'+items.chat_seq+' > #chatDeleteBtn').click(function() {
				alert('나갈래?');
				
				$.ajax({
					type: 'post',
					url: '/market/chat/deleteChatRoom',
					data: { 'chat_seq' : items.chat_seq },
					success:function(){
						loading = true;
					},
					error:function(error){
						console.log(error);
					}					
				});//ajax
			});
			

		});//each
    },
	error: function(error) {
		alert('error : ', error)
	}
});


function loadLstMessage(chat_seq){
	var loadMsg;
	var xhttp = new XMLHttpRequest();
	var loadMsg;

	xhttp.onreadystatechange = callFunction; 
	xhttp.open("GET", "/market/storageMsg/"+chat_seq+".txt", true); //서버에 GET방식으로 파일을 비동기 요청
	xhttp.send(null);
	      
	function callFunction(){
		if(xhttp.readyState == 4) { //서버-클라이언트 간의 통신 완료
			if(xhttp.status == 200){ 
				loadMsg = xhttp.responseText;
				$('.onlyHidden').prepend(loadMsg);
				
				alert($('.onlyHidden:eq(-1)').children('div'));
			}
		}
	}
};




	