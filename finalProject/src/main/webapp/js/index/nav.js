// 찜한 상품
$(document).ready(function() {

	$.ajax({
		type : 'post',
		url : '/market/index/wishProduct',
		dataType : 'json',
		success : function(data) {
			//alert(JSON.stringify(data));
			if (data.su != 0) {
				$("#toFavorites").css('color','red');			
				$('#wishProduct').html(data.su);
			}
		},
		error : function(err) {
			console.log(err);
		}
	});	
});

$(document).ready(function(){
	$.ajax({
		type : 'post',
		url : '/market/index/recentlyProduct',
		dataType : 'json',
		success : function(data) {
			var list = data.recentlyList;
			var count = data.recentlyList.length
			$("#recentlyCnt").text(count).css('color','red');
			if ( count != 0){
				var view = $("#recentlyList");
				
				$.each(list, function(){
					var html ="";
					html += "<img style='height: 60px; width: 60px; cursor: pointer; float: left; margin-bottom:5px;' onclick='recentlyProductDetail("+this.product_seq+");' src=/market/storage/"+ this.product_img1 + ">" + '</img><br>';

					view.append(html)
				})
				
			}
			
			if ( count >= 3){
				$('#recentlysubpage').html("이전");
				$('#recentlyaddpage').html("다음");
			}
			//alert(JSON.stringify(data));
			
		},
		error : function(err) {
			console.log(err);
		}
	});	
	
});

function recentlyProductDetail(seq) {
	location.href = "/market/product/productDetail?seq="+seq;
	
}


function recnetlySubPage() {
	page = page - 1;
	getList(page);
}

function recnetlyAddPage() {
	page = page + 1;
	getList(page);
}