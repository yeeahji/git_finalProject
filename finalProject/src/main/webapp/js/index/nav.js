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
	
	
	$.ajax({
		type : 'post',
		url : '/market/index/recentlyProduct',
		dataType : 'json',
		success : function(data) {
			var list = data.recentlyList;
			var count = data.recentlyList.length
			$("#recentlyCnt").text(count).css('text-align','center');
			if ( count != 0){
				var view = $("#recentlyList");
				
				$.each(list, function(){
					var html ="";
					html += "<img style='height: 60px; width: 60px; cursor: pointer; float: left;' src=/market/storage/"+ this.product_img1 + ">" + '</img><br>';
					html += "";
					html += "";
					html += "";
					
					view.append(html)
				})
				
			}
			
			//alert(JSON.stringify(data));
			
		},
		error : function(err) {
			console.log(err);
		}
	});	
	
});