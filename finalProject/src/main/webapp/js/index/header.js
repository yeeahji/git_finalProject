//바다톡
$('#chat').click(
		function() {
			window.open("/market/chat/chatList", "chat",
					"width=500 height=650 scrollbars=yes");
		});

function search() {
	var keyword = $("#searchProduct").val()
	location.href = '/market/index/searchDisplay?keyword=' + keyword
}

// 카테고리 첫번째 마우스 오버 이벤트
$("#btn_menu").hover(function() {
	// 카테고리 첫번째만 보이기
	$(".dropmenu").show();
	$(".dropmenu ul > li").hide();
	$(".dropmenu ul > li").first().show();
})

// 첫번째 카테고리 마우스 오버 이벤트
$(".dropmenu li").first().hover(function() {
	$(".dropmenu ul > li").eq(1).show();
})

// 첫번째 카테고리 항목 마우스 오버 이벤트
$(".dropmenu ul > li > ul >a").hover(function() {
	console.log(this.id)
	// 카테고리 항목을 가져와서
	// 두번째 카테고리 항목 모두 제거 후
	// 다시 생성 해준다.
	
	// 두번쨰 카테고리 
	// 부모 ul 부모 li 다음 li 즉 두번쨰 li
	var next_cat = $(this).parents().parents().next();
	
})

// 카테고리 창 마우스 벗어나면
// 모든 카테고리 숨김
$(".dropmenu").hover(function() {
}, function() {
	$(".dropmenu").hide();
	$(".dropmenu ul > li").hide();
})