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


var recentylePage = 1;
var recentyleTotalPage = 1;

var recentyleCount;
var recentylePageSize = 3;

var recentyleList;

$(document).ready(function(){
	
	// 최근본상품 목록 조회
	getRecenltyList();
	

});

function getRecenltyList(){
	
	$.ajax({
		type : 'post',
		url : '/market/index/recentlyProduct',
		dataType : 'json',
		success : function(data) {
			recentyleList = data.recentlyList;
			if ( data.recentlyList != null){
				recentyleCount = data.recentlyList.length
				$("#recentlyCnt").text(recentyleCount).css('color','red');
				recentyleTotalPage = Math.floor(recentyleCount / recentylePageSize);
				recentyleTotalPage = recentyleCount % recentylePageSize == 0 ? recentyleTotalPage : recentyleTotalPage + 1
				recentlyContent( recentylePage, recentyleList)
				if ( recentyleTotalPage >= 2){
					$('#recentlySubPage').html('<i class="fas fa-chevron-left"></i>');
					$('#recentlyAddPage').html('<i class="fas fa-chevron-right"></i>');
				}
				$("#recentlyPaging").show();
			} else {
				$("#recentlyPaging").hide();
				$("#recentlyCnt").text("").css('color','red');
				$("#recentlyArea").css('margin-left','0px');
				$("#noList").html('<br><img src="/market/image/index/eyes.png" style="weight:30px; height:30px;"><a style="color:#dbdbdb;"><br>최근 본<br>상품이<br>없습니다.<br><br></a>')
			}
		},
		error : function(err) {
			console.log(err);
		}
	});	
	
	
}


//세션 삭제
function recentlyProductDelete(seq){

	$.ajax({
		type : 'post',
		url : '/market/index/recentlyProductDelete',
		data : {
			seq : seq
		},
		dataType : 'json',
		success : function(data) {
			recentyleList = data.recentlyList;
			if ( data.recentlyList != null){
				recentyleCount = data.recentlyList.length
				$("#recentlyCnt").text(recentyleCount).css('color','red');
				recentyleTotalPage = Math.floor(recentyleCount / recentylePageSize);
				recentyleTotalPage = recentyleCount % recentylePageSize == 0 ? recentyleTotalPage : recentyleTotalPage + 1
				recentlyContent( recentylePage, recentyleList)
				if ( recentyleTotalPage >= 2){
					$('#recentlySubPage').html('<i class="fas fa-chevron-left"></i>');
					$('#recentlyAddPage').html('<i class="fas fa-chevron-right"></i>');
				}
				$("#recentlyPaging").show();
			} else {
				$("#recentlyList").empty();
				$("#recentlyPaging").hide();
				$("#recentlyCnt").text("").css('color','red');
				$("#recentlyArea").css('margin-left','0px');
				$("#noList").html('<br><img src="/market/image/index/eyes.png" style="weight:30px; height:30px;"><a style="color:#dbdbdb;"><br>최근 본<br>상품이<br>없습니다.<br><br></a>')
			}
		},
		error : function(err) {
			console.log(err);
		}
	});	
	

	
	
}


function recentlyContent(page, list){

	var view = $("#recentlyList");
	var start = (page -1) * recentylePageSize ;
	var end = (page) * recentylePageSize;

	//console.log("page :" + page);
	//console.log("start :" + start);
	//console.log("end 	:" + end);
	
	$("#currentPage").text(page + "/" +  recentyleTotalPage)
	view.empty();
	$.each(list, function(index){
		if ( index >= end )
			return false
		if ( index < start )
			return true;
		var html ="";
		
		//<img class='recentlyImage' onclick='recentlyProductDetail("+this.product_seq+");' src=/market/storage/"+ this.product_img1 + ">" + '</img><i class="fas fa-times" onclick="deleteRecentlyProduct(' + this.product_seq + ')"></i><br>'
		html += "<div class='recentlyProduct'>";
		html += "<img class='recentlyImage' onclick='recentlyProductDetail("+this.product_seq+");'";
		html += "src='/market/storage/"+ this.product_img1 + "'>";
			html += "<div class='recentlyInfo'>";
				html += "<p>"+ this.product_subject + "</p>";
				html += "<span>"+ this.product_price + "</span>";
				html += "<button class='close' onclick='recentlyProductDelete("+this.product_seq+")'>X</button>";
			html += "</div>";
		html += "</div>";
		view.append(html)
	})
	
	
	$(".recentlyProduct").hover(function(){
		// recentlyInfo
		$(this).children(".recentlyInfo").show();
	}, function(){
		$(this).children(".recentlyInfo").hide();
	})
	

}



function recentlyProductDetail(seq) {
	location.href = "/market/product/productDetail?seq="+seq;
	
}

function recentlySubPage() {
	recentylePage = recentylePage - 1;
	if ( recentylePage < 1){
		recentylePage = 1;
	}
	recentlyContent(recentylePage, recentyleList);
}

function recentlyAddPage() {
	recentylePage = recentylePage + 1;
	if ( recentylePage > recentyleTotalPage){
		recentylePage = recentyleTotalPage;
	}
	recentlyContent(recentylePage, recentyleList);
}





