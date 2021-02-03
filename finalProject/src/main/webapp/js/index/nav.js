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
			$("#recentlyCnt").text(count);
			if ( count != 0){
				var view = $("#recentlyList");
				
				$.each(list, function(){
					var html ="";
					html += "<img src=/marget/' +  + '>" + '' + this.product_subject + '</img>';
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