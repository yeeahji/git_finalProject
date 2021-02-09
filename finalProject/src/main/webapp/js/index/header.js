//바다톡

// 카테고리 목록 담는 변수
var categoray_list

$(document).ready(function() {

	// 카테고리 목록 조회
	$.ajax({
		type : 'post',
		url : '/market/index/categoryList',
		dataType : 'json',
		success : function(data) {
			categoray_list = data.list;
		},
		error : function(data) {
			console.log("data:" + data);
		}
	});// 세부카테고리 리스트

})

$('#chat').click(function(){
	window.open("/market/chat/chatList", "chatList" ,"width=370 height=670 scrollbars=yes");
});

function search() {
	var keyword = $("#searchProduct").val()
	location.href = '/market/index/searchDisplay?keyword=' + keyword
}

// 카테고리 첫번째 마우스 오버 이벤트
$("#btn_menu").hover(function() {
	// 카테고리 첫번째만 보이기
	$(".dropmenu").show();
	// $(".dropmenu ul > li").hide();
	// $(".dropmenu ul > li").first().show();
})

// 첫번째 카테고리 마우스 오버 이벤트
$(".dropmenu li:first a").hover(function() {
	$(".dropmenu ul > li").eq(1).show();
	$(".dropmenu li:first a").removeClass("active");
	$(this).addClass("active");
})

// 첫번째 카테고리 항목 마우스 오버 이벤트
$(".dropmenu ul > li > ul > a").hover(
		function() {
			// mouseover
			var upper_cate_code = $(this).attr("data-category")
			var upper_cate_name = $(this).text();
			// 두번쨰 li
			// p 제목
			var next_li_p = $(this).parents().parents().next().children("p");
			// ul 카테고리 목록
			var next_li_ul = $(this).parents().parents().next().children("ul")

			$(next_li_p).text(upper_cate_name)
			$(next_li_ul).empty();
			// 두번째 카테고리 항목 모두 제거 후
			// 다시 생성 해준다.
			// ul 하위에 a 로 카테고리 목록 추가
			$.each(categoray_list, function() {
				if (this.cate_parent == upper_cate_code)
					$(next_li_ul).append(
							'<a href="/market/index/cateDisplay?cate_code='
									+ this.cate_code + ' ">' + this.cate_name
									+ '</a>')
			})

		}, function() {
			// mouseout
		})

// 카테고리 창 마우스 벗어나면
// 모든 카테고리 숨김
$(".dropmenu").mouseleave(function() {
	console.log(this.className)
	$(".dropmenu li:first a").removeClass("active");
	$(".dropmenu").hide();
})
