$(document).ready(function(){
	var pop = win.open("about:blank", "chat", "width=370 height=670 scrollbars=yes");
	
	$.ajax({
		type: 'post',
		url: '/market/chat/getChatList',
		dataType: 'json',
		success:function(data){
			$.each(data.list, function(index, items){
				$('<div/>', { //1단계
					class: 'chatRoomBox'
						
				}).append($('<div/>', { //2단계 --- profile
					class: 'chatRoom_profile'
						
					}).append($('<img/>'),{ //3단계
						id: 'OTHER_store_img',
						src: items.OTHER_store_img
						
				})).append($('<div/>', { //2단계 --- content
					class: 'chatRoom_content'
						
					}).append($('<span/>'),{ //3단계
						id: 'OTHER_store_nickname',
						text: items.OTHER_store_nickname
							
					}).append($('<span/>'),{ //3단계
						id: 'last_message',
						text: items.last_message
							
					}).append($('<span/>'),{ //3단계
						id: 'chat_logtime',
						text: items.chat_logtime
					
				})).append($('<div/>', { //2단계 --- btns
					class: 'chatRoom_btns'
						
					}).append($('<button/>'),{ //3단계
						id: 'chatComplainBtn'
							
					}).append($('<button/>'),{ //3단계
						id: 'chatDeleteBtn'
					
				})).appendTo($('.chatRoomWrap'));
				
			});//each
	    },
		error: function(error) {
			alert('error : ', error)
		}
	});//ajax
});