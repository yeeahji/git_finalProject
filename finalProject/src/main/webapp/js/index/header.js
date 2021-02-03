//바다톡
$('#chat').click(function(){
	window.open("/market/chat/chatList", "chat" ,"width=500 height=650 scrollbars=yes");
});


function search(){
	var keyword = $("#searchProduct").val()
	location.href='/market/index/searchDisplay?keyword=' + keyword
}