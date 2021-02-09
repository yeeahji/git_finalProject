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

	$(".dropSearch").hide();

})

$('#chat').click(
		function() {
			window.open("/market/chat/chatList", "chat",
					"width=500 height=650 scrollbars=yes");
		});

function search() {
	var keyword = $("#searchProduct").val();
	// 쿠기에 추가하기
	addCookie(keyword);
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

var expire = 1; // 쿠키값을 저장할 기간

// 검색
$("#searchProduct").focus(function() {
	console.log("포커스 인")
	$(".dropSearch").show();
	add_recentlySearch();
});

$("#searchProduct").blur(function() {
	console.log("포커스 아웃")
	// $(".dropSearch").hide();
});

// 최근 검색어 전체 삭제
// 쿠기 전체 초기화
function recentlySearch_deleteAll() {
	setCookie('recentlySearch', "", expire);
	add_recentlySearch();
}

// 최근 검색어 닫기
function recentlySearch_close() {
	$(".dropSearch").hide();
}

/* 쿠기 관련 */
/* https://webisfree.com/2015-02-04/[%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8]-%EC%BF%A0%ED%82%A4(cookie)-%EC%A0%80%EC%9E%A5-%EB%B0%8F-%EC%82%AD%EC%A0%9C-%EC%98%88%EC%A0%9C%EB%B3%B4%EA%B8%B0 */
function setCookie(cookie_name, value, days) {
	var exdate = new Date();
	exdate.setDate(exdate.getDate() + days);
	// 설정 일수만큼 현재시간에 만료값으로 지정
	var cookie_value = escape(value) +'; path=/' +((days == null) ? '' : '; expires=' + exdate.toUTCString());
	// 삭제 후 다시 생성
	document.cookie = cookie_name + '=' + cookie_value;
}

// 쿠기 가져오기
function getCookie(cookie_name) {
	var x, y;
	var val = document.cookie.split(';');
	for (var i = 0; i < val.length; i++) {
		x = val[i].substr(0, val[i].indexOf('='));
		y = val[i].substr(val[i].indexOf('=') + 1);
		x = x.replace(/^\s+|\s+$/g, ''); // 앞과 뒤의 공백 제거하기
		if (x == cookie_name) {
			return unescape(y); // unescape로 디코딩 후 값 리턴
		}
	}
}

// 최근 검색어 쿠기에서 삭제
function deleteCookie(keyword) {
	var items = getCookie('recentlySearch'); // 이미 저장된 값을 쿠키에서 가져오기
	if (items) {
		var itemArray = items.split(',');
		if (itemArray.indexOf(keyword) != -1) {
			// 이미 존재하는 경우 종료
			itemArray.splice(itemArray.indexOf(keyword), 1);
			console.log('delete cookie :' + keyword);
			items = itemArray.join(',');
			setCookie('recentlySearch', items, expire);
		}
		add_recentlySearch();
	}
}

// 최근 검색어 쿠기에 추가
function addCookie(keyword) {
	console.log("addCookie :" + keyword)
	var items = getCookie('recentlySearch'); // 이미 저장된 값을 쿠키에서 가져오기
	var maxItemNum = 20; // 최대 저장 가능한 아이템개수
	if (items) {
		
		console.log("쿠기 이미 존재")
		
		var itemArray = items.split(',');
		if (itemArray.indexOf(keyword) != -1) {
			// 이미 존재하는 경우 종료
			console.log('Already exists.');
		} else {
			// 새로운 값 저장 및 최대 개수 유지하기
			itemArray.unshift(keyword);
			if (itemArray.length > maxItemNum)
				itemArray.length = 30;
			items = itemArray.join(',');
			setCookie('recentlySearch', items, expire);
		}
	} else {
		console.log("쿠기 이미 없음")
		// 신규 id값 저장하기
		setCookie('recentlySearch', keyword, expire);
	}
}

// 최근 검색어 클릭
function recenltyKeyword(keyword) {
	location.href = '/market/index/searchDisplay?keyword=' + keyword
}

// 최근 검색어 추가
function add_recentlySearch() {
	var searchList = getCookie("recentlySearch")
	$("#recentlySearchList").empty();
	if (searchList != null) {
		var itemArray = searchList.split(',');
		console.log(itemArray)
		$.each(itemArray, function(index) {
			if ( index > 9)
				return false;
			if (this != '' && this != null){
				var html = '<div><a onclick="recenltyKeyword(\'' + this + '\')">' + this
						+ '</a><i class="fas fa-times" onclick="deleteCookie(\'' + this + '\')"></i></div>'
				$("#recentlySearchList").append(html)
			}
		})
	}
}
