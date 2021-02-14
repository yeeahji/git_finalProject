//채팅 리스트 불러오기
$.ajax({
	type: 'post',
	url: '/market/chat/getChatList',
	dataType: 'json',
	success:function(data){
		$.each(data.chatList, function(index, items){
			//마지막 메시지 나타내기
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
					
				}).append($('<div/>', { //3단계
					id: 'other_store_nickname',
					text: items.other_store_nickname
						
				})).append($('<div/>', { //3단계
					id: 'last_message',
					text: items.last_message
				})
				
			)).append($('<div/>', { //2단계 --- logtime
				id: 'chat_logtime',
				text: items.chat_logtime
					
			})).appendTo($('.chatRoomWrap'));
			
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




	