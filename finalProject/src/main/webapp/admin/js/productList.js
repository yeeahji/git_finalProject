$(document).ready(function(){//처음들어가자마자 테이블 출력
	productListPrint();
});

//selectPrint눌렀을때 (20개보기 50개보기..)
$('#selectPrint').change(function(){
	var viewNum = $(this).val();
	$('#viewNum').val(viewNum);
	
	productListPrint();
});

function productListPrint(){
	$.ajax({
		type: 'get',
		url: '/market/admin/getProductAllList',
		data: {'pg': $('#pg').val(),
			   'viewNum': $('#viewNum').val()},
		dataType: 'json',
		success: function(data){
			$("#tbody tr:gt(0)").remove();
			$.each(data.productAllList , function(index, items){
				$('<tr/>').append($('<td/>',{
					text: items.product_seq
				})).append($('<td/>',{	
				  }).append($('<a/>',{
					 href: '#',
					 text: items.product_subject,
					 id: 'subjectA',
					 class: items.seq+""
				}))
				).append($('<td/>',{
					text: items.mem_id
				})).appendTo($('#tbody'));
			});
			//페이징처리
		    $('#boardPagingDiv').html(data.adminProductBP.pagingHTML);
		    
			    //클릭_오른쪽에 정보 나타나게
		        let seq;
			    $('#productTable').on('click','#subjectA',function(){
			   	 seq = $(this).parent().prev().text();
			   	 $.ajax({
			   		 type: 'get',
			   		 url: '/market/admin/getProductView',
			   		 data: {'seq': seq},
			   		 dataType: 'json',
			   		 success: function(data){
			   			 //alert(JSON.stringify(data));
			   			 //alert(data.adminProductDTO.cate_code);
			   			 //상품 상세보기에서 자식인 cate_code값을 이용해서 대분류 가져오기
					   		 $.ajax({
						   		 type: 'get',
						   		 url: '/market/admin/getCate_code',
						   		 data: {'cate_code': data.adminProductDTO.cate_code},
						   		 dataType: 'json',
						   		 success: function(result){
						   			 clickEvent(data,result);
						   		 }
						   	 });
			   		 	}
				   	});
				  });//(productTable).on('click','#subjectA',function()
			   
			//실제 페이지로 이동
		    $('#moveProductPageBtn').click(function(){
				window.open("/market/product/productDetail?seq="+seq,"PopupWin","width=800,height=800");
			});
		},
	});//ajax
}



//조건검색======================================================

//검색
$('#productSearchBtn').click(function(event, str){
	if(str != 'research'){
		$('input[name=searchPg]').val(1);
	}
	if($('#productKeyword').val() == ''){
		alert('검색어를 입력하세요');
	}else{
		search_viewNum_change()
		
		//조건 검색후 selectPrint눌렀을때 (20개보기 50개보기..)
		$('#selectPrint').change(function(){
			var viewNum = $(this).val();
			$('#viewNum').val(viewNum);
			
			search_viewNum_change()
		});
	}
});

//조건검색하고 나서 나오는 테이블
function search_viewNum_change(){
	$.ajax({
		type: 'post',
		url: '/market/admin/getSearchProductList',
		data: {'pg': $('#pg').val(),
			   'searchType':$('#searchType').val(),
			   'productKeyword':$('#productKeyword').val(),
			   'viewNum': $('#viewNum').val()},
		dataType: 'json',
		success: function(data){
			$("#tbody tr:gt(0)").remove();
			$.each(data.productList , function(index, items){
				$('<tr/>').append($('<td/>',{
					text: items.product_seq
				})).append($('<td/>',{	
				  }).append($('<a/>',{
					 href: '#',
					 text: items.product_subject,
					 id: 'subjectA',
					 class: items.seq+""
				}))
				).append($('<td/>',{
					text: items.mem_id
				})).appendTo($('#tbody'));
			});
			//페이징처리
			$('#boardPagingDiv').html(data.adminProductBP.pagingHTML);
			 //클릭_오른쪽에 정보 나타나게
		    $('#productTable').on('click','#subjectA',function(){
		   	 let seq = $(this).parent().prev().text();
		   	 $.ajax({
		   		 type: 'get',
		   		 url: '/market/admin/getProductView',
		   		 data: {'seq': seq},
		   		 dataType: 'json',
		   		 success: function(data){
		   			$.ajax({
				   		 type: 'get',
				   		 url: '/market/admin/getCate_code',
				   		 data: {'cate_code': data.adminProductDTO.cate_code},
				   		 dataType: 'json',
				   		 success: function(result){
				   			 clickEvent(data,result);
				   		 }
				   	 });
		   		 }
		   	 	});
		    });
		}
	});//ajax
}

//공통=========================================================


function clickEvent(data,result){
	//alert(JSON.stringify(data));
	$('#mem_idSpan').text(data.adminMembersDTO.mem_id)
	$('#storeNameSpan').text(data.adminMembersDTO.store_nickname)
	$('#category1Span').text(result.product_cate_code)
	$('#category2Span').text(data.adminProductDTO.cate_name)
	$('#priceSpan').text(data.adminMembersDTO.product_price)
	$('#product_contentSpan').text(data.adminMembersDTO.product_condition)
	$('#product_imgSpan').attr('src','/market/storage/'+data.adminMembersDTO.product_img1)
};



(function($) {
    "use strict";

    // Add active state to sidbar nav links
    var path = window.location.href; // because the 'href' property of the DOM element is the absolute path
        $("#layoutSidenav_nav .sb-sidenav a.nav-link").each(function() {
            if (this.href === path) {
                $(this).addClass("active");
            }
        });

    // Toggle the side navigation
    $("#sidebarToggle").on("click", function(e) {
        e.preventDefault();
        $("body").toggleClass("sb-sidenav-toggled");
    });
})(jQuery);

