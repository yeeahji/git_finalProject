$(document).ready(function(){
	$.ajax({
		type: 'get',
		url: '/market/admin/getProductAllList',
		data: {'pg': $('#pg').val(),
			   'viewNum': $('#viewNum').val()},
		dataType: 'json',
		success: function(data){
			$("#tbody tr:gt(0)").remove();
			productListPrint(data);
			//alert(JSON.stringify(data));
		}
	});
});

//selectPrint눌렀을때 (20개보기 50개보기..)
$('#selectPrint').change(function(){
	var viewNum = $(this).val();
	$('#viewNum').val(viewNum);
	
	$.ajax({
		type: 'get',
		url: '/market/admin/getProductAllList',
		data: {'pg': $('#pg').val(),
			'viewNum': $('#viewNum').val()},
		dataType: 'json',
		success: function(data){
			$("#tbody tr:gt(0)").remove();
			productListPrint(data)
		},
	});//ajax
	
});

//검색
$('#productSearchBtn').click(function(event, str){
	if(str != 'research'){
		$('input[name=searchPg]').val(1);
	}
	if($('#productKeyword').val() == ''){
		alert('검색어를 입력하세요');
	}else{
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
			   			 clickEvent(data);
			   		 }
			   	 	});
			    });
			}
		});//ajax
	}
});



function productListPrint(data){
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
	   			 clickEvent(data);
	   		 }
	   	 	});
	    });
	//실제 페이지로 이동
    $('#moveProductPageBtn').click(function(){
		window.open("/market/product/productDetail?seq="+seq,"PopupWin","width=800,height=800");
	});
}

function clickEvent(data){
	 $('#mem_idSpan').text(data.adminMembersDTO.mem_id)
	 $('#storeNameSpan').text(data.adminMembersDTO.store_nickname)
//	 $('#category1Span').text(data.)
//	 $('#category2Span').text(data.)
	 $('#priceSpan').text(data.adminMembersDTO.product_price)
	 //$('#amountSpan').text(data.adminMembersDTO.product_price)
	 $('#product_contentSpan').text(data.adminMembersDTO.product_condition)
	 $('#product_imgSpan').text(data.adminMembersDTO.product_img1)
	 
	 
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

