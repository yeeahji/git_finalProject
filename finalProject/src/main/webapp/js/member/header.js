//바다톡
$('#chat').click(function(){
	window.open("/market/chat/chatList", "chat" ,"width=370 height=670 scrollbars=yes");
});

/*
$(document).ready(function(){
	var pop = win.open("about:blank", "chat", "width=370 height=670 scrollbars=yes");
	
	$.ajax({
		type: 'post',
		url: '/market/chat/chatList',
		dataType: 'json',
		success:function(data){
			
			
			
			
			
			pop.location.href="/market/chat/chatList";
	    },
		error: function(error) {
			alert('error : ', error)
		}
	});//ajax
});
*/

function search(){
	var keyword = $("#searchProduct").val()
	location.href='/market/index/searchDisplay?keyword=' + keyword
}