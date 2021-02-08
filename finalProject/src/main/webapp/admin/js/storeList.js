$(document).ready(function(){
	$.ajax({
		type: 'get',
		url: '/market/admin/getStoreList',
		data: {'pg': $('#pg').val(),
			'viewNum': $('#viewNum').val()},
		dataType: 'json',
		success: function(data){
			$("#tbody tr:gt(0)").remove();
			$.each(data.storeList, function(index, items){
				$('<tr/>').append($('<td/>',{
						text: items.mem_id,
					})).append($('<td/>',{
		            }).append($('<a/>',{
		            	href: '#',
						text: items.store_nickname,
						id: 'subjectA',
						class: items.seq+""
		            }))
		            ).append($('<td/>',{
		            	text: items.store_echo
		            })).appendTo($('#tbody'));
			});//each
			//페이징처리
	         $('#boardPagingDiv').html(data.adminStoreBP.pagingHTML);
			
//	         //클릭
	         $('#storeTable').on('click','#subjectA',function(){
	        	 let id = $(this).parent().prev().text();
	        	 $.ajax({
	        		 type: 'post',
	        		 url: '/market/admin/getStoreView',
	        		 data: {'id': id},
	        		 dataType: 'json',
	        		 success: function(data){
	        			 alert(JSON.stringify(data));
	        			 //1명의 데이터를 위에다 뿌리기
	        			 $('#nameSpan').text(data.adminMembersDTO.mem_name)
	        			 $('#storeNameSpan').text(data.adminMembersDTO.store_nickname)
	        			 //$('#sellProductSpan').text(data.storeDTO.)
	        			 //$('#repleSpan').text(data.storeDTO.)
	        			 $('#pictureSpan').text(data.adminMembersDTO.store_img)
	        			 $('#echoSpan').text(data.adminMembersDTO.store_echo)
	        			 $('#introSpan').text(data.adminMembersDTO.store_intro)
	        			 $('#totalSellProduct1Span').text(data.totalSellProduct)
	        			 $('#totalSellProduct2Span').text(data.totalSellProduct)
	        			 //
	        			 $("#store_product_tbody tr:gt(0)").remove();
	        			 $.each(data.productList, function(index, items){
	        				 $('<tr/>').append($('<td/>',{
	     						text: items.product_seq
	     					})).append($('<td/>',{
	     						text: items.product_subject
	     		            })).append($('<td/>',{
	     		            	text: items.product_delivery_fee
	     		            })).append($('<td/>',{
	     		            	text: items.product_price
	     		            })).appendTo($('#store_product_tbody'));
	        			 });//each
	        		 }
	        	 });
	         });
		},
		error: function(err){
        	 console.log(err);
        }

	});
	
});

//selectPrint눌렀을때 (20개보기 50개보기..)
$('#selectPrint').change(function(){
	var viewNum = $(this).val();
	$('#viewNum').val(viewNum);
	
	$.ajax({
		type: 'get',
		url: '/market/admin/getStoreList',
		data: {'pg': $('#pg').val(),
			'viewNum': $('#viewNum').val()},
		dataType: 'json',
		success: function(data){
			//alert(JSON.stringify(data));
			$("#tbody tr:gt(0)").remove();
			$.each(data.storeList, function(index, items){
				$('<tr/>').append($('<td/>',{
						text: items.mem_id,
					})).append($('<td/>',{
		            }).append($('<a/>',{
		            	href: '#',
						text: items.store_nickname,
						id: 'subjectA',
						class: items.seq+""
		            }))
		            ).append($('<td/>',{
		            	text: items.store_echo
		            })).appendTo($('#tbody'));
			});//each
			//페이징처리
	         $('#boardPagingDiv').html(data.adminStoreBP.pagingHTML);
			
//	         //클릭
	         $('#storeTable').on('click','#subjectA',function(){
	        	 let id = $(this).parent().prev().text();
	        	 $.ajax({
	        		 type: 'post',
	        		 url: '/market/admin/getStoreView',
	        		 data: {'id': id},
	        		 dataType: 'json',
	        		 success: function(data){
	        			 //alert(JSON.stringify(data));
	        			 //1명의 데이터를 위에다 뿌리기
	        			 $('#nameSpan').text(data.adminMembersDTO.mem_name)
	        			 $('#storeNameSpan').text(data.adminMembersDTO.store_nickname)
	        			 //$('#sellProductSpan').text(data.storeDTO.)
	        			 //$('#repleSpan').text(data.storeDTO.)
	        			 $('#pictureSpan').text(data.adminMembersDTO.store_img)
	        			 $('#echoSpan').text(data.adminMembersDTO.store_echo)
	        			 $('#introSpan').text(data.adminMembersDTO.store_intro)
	        		 }
	        	 });
	         });
		},
	});//ajax
	
});

//검색
$('#storeSearchBtn').click(function(event, str){
	if(str != 'research'){
		$('input[name=searchPg]').val(1);
	}
	if($('#storeKeyword').val() == ''){
		alert('검색어를 입력하세요');
	}else{
		$.ajax({
			type: 'post',
			url: '/market/admin/getSearchStoreList',
			data: {'pg': $('#pg').val(),
				   'searchType':$('#searchType').val(),
				   'storeKeyword':$('#storeKeyword').val(),
				   'viewNum': $('#viewNum').val()},
			dataType: 'json',
			success: function(data){
				$("#tbody tr:gt(0)").remove();
				//alert(JSON.stringify(data));
				$.each(data.storeList, function(index, items){
					$('<tr/>').append($('<td/>',{
							text: items.mem_id,
						})).append($('<td/>',{
			            }).append($('<a/>',{
			            	href: '#',
							text: items.store_nickname,
							id: 'subjectA',
							class: items.seq+""
			            }))
			            ).append($('<td/>',{
			            	text: items.store_echo
			            })).appendTo($('#tbody'));
				});//each
				//페이징처리
		         $('#boardPagingDiv').html(data.adminStoreBP.pagingHTML);
				
//		         //클릭
		         $('#storeTable').on('click','#subjectA',function(){
		        	 let id = $(this).parent().prev().text();
		        	 $.ajax({
		        		 type: 'post',
		        		 url: '/market/admin/getStoreView',
		        		 data: {'id': id},
		        		 dataType: 'json',
		        		 success: function(data){
		        			 alert(JSON.stringify(data));
		        			 //1명의 데이터를 위에다 뿌리기
		        			 $('#nameSpan').text(data.adminMembersDTO.mem_name)
		        			 $('#storeNameSpan').text(data.adminMembersDTO.store_nickname)
		        			 //$('#sellProductSpan').text(data.storeDTO.)
		        			 //$('#repleSpan').text(data.storeDTO.)
		        			 $('#pictureSpan').text(data.adminMembersDTO.store_img)
		        			 $('#echoSpan').text(data.adminMembersDTO.store_echo)
		        			 $('#introSpan').text(data.adminMembersDTO.store_intro)
		        		 }
		        	 });
		         });
			}
		});//ajax
	}
	
});




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

