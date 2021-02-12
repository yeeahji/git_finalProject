//채팅 리스트 불러오기
$.ajax({
	type: 'post',
	url: '/market/chat/getChatList',
	dataType: 'json',
	success:function(data){
		$.each(data.chatList, function(index, items){
			$('<button/>', { //1단계
				class: 'chatRoomBox'
			
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
					text: '나가기'
				})

			)).append($('<input/>', { //2단계 --- hidden
				type: 'hidden',
				name: 'other_store_nickname',
				value: items.other_store_nickname

			})).appendTo($('.chatRoomWrap'));
			 
			//채팅방 연결(post방식으로 팝업창)
			$('.chatRoomBox').click(function() {
				window.open('', 'chatRoom', 'width=370 height=670');
				$('#chatList').submit();
			});		
			
		});//each
    },
	error: function(error) {
		alert('error : ', error)
	}
});


// resizable=no





	