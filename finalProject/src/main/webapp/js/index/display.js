//광고 창 띄우기
$('#ad1').click(
		function() {
			window.open("/market/index/ad1.jsp", "ad1",
					"width=660 height=800 scrollbars=yes");
		});

$('#ad2').click(
		function() {
			window.open("/market/index/ad2.jsp", "ad2",
					"width=660 height=800 scrollbars=yes");
		});

$('#ad3').click(
		function() {
			window.open("/market/index/ad3.jsp", "ad3",
					"width=660 height=800 scrollbars=yes");
		});

var page = 0;

// list 출력
$(document).ready(function() {

	//console.log(" ready ! ")
	getList(page);
});

function addPage() {
	page = page + 1;
	getList(page);
}

function getList(page) {

	//console.log('getList ')
	//console.log('page :' + page)

	$.ajax({
		type : 'post',
		url : '/market/index/getProductList',
		dataType : 'json',
		data : {
			page : page
		},
		success : function(data) {
			// alert(JSON.stringify(data.list));
			// console.log(data);

			if (data.list.length == 0) {
				$("#pe-auto").hide();
			} else {
				$.each(data.list, function() {
					var html = "";
					var time = Number(this.product_logtime);
					var time_unit = "분 전";

					if (time > (60 * 24)) {
						time = Math.round(time / (60 * 24));
						time_unit = "일 전"
					} else if (time > 60) {
						time = Math.round(time / 60);
						time_unit = "시간 전"
					}

					html = '<div class="item col-3"' + 'onclick="productDetailSeq('
							+ this.product_seq + ');"'
							+ 'style="cursor: pointer;">'
							+ '<div class="item">' + '<div id="itemSolid">'
							+ '<div class="img-box">'
							+ '<img src="/market/storage/' + this.product_img1
							+ '" class="rounded float-start" alt="'
							+ this.product_subject + '">' + '</div>'
							+ '<div class="text-box">'
							+ '<div class="displayName">'
							+ this.product_subject + '</div>'
							+ '<div class="price-time">'
							+ '<div class="displayPrice">' + this.product_price
							+ '</div>' + '<div class="displayTime"><span>'
							+ time + time_unit + '<span></div>' + '</div>'
							+ '</div>' + '</div>' + '</div>' + '</div>'
					$("#display-list").append(html)
				})
			}
		},
		error : function(err) {
			console.log(err);
		}
	});

}

function productDetailSeq(seq) {
	location.href = "/market/product/productDetail?seq=" + seq
}


