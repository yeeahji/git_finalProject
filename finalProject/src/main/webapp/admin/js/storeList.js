$(document).ready(function(){
	$.ajax({
		type: 'get',
		url: '/market/admin/getStoreList',
		data: {'pg': $('#pg').val(),
			'viewNum': $('#viewNum').val()},
		dataType: 'json',
		success: function(data){
			$("#tbody tr:gt(0)").remove();
			storeListPrint(data)
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
			$("#tbody tr:gt(0)").remove();
			storeListPrint(data)
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
		        			 clickEvent(data);
		        		 }
		        	 });
		         });
			}
		});//ajax
	}
	
});

//상점리스트 출력
function storeListPrint(data){
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
	
     //클릭_오른쪽에 정보나타나게
     $('#storeTable').on('click','#subjectA',function(){
    	 let id = $(this).parent().prev().text();
    	 $.ajax({
    		 type: 'post',
    		 url: '/market/admin/getStoreView',
    		 data: {'id': id},
    		 dataType: 'json',
    		 success: function(data){
    			 clickEvent(data);
    		 }
    	 });
     });
}
//클릭시 상세보기
function clickEvent(data){
	//alert(JSON.stringify(data));
	 $('#nameSpan').text(data.adminMembersDTO.mem_name)
	 $('#storeNameSpan').text(data.adminMembersDTO.store_nickname)
	 $('#pictureSpan').text(data.adminMembersDTO.store_img)
	 $('#echoSpan').text(data.adminMembersDTO.store_echo)
	 $('#introSpan').text(data.adminMembersDTO.store_intro)
	 $('#total_Product1Span').text(data.totalSellProduct)
	 $('#total_Product2Span').text(data.totalSellProduct)
	 
	 //상점이름 누르면 옆에 나오는 물품 테이블
	 $("#store_product_tbody tr:gt(0)").remove();
	 $.each(data.productList, function(index, items){
		 var product_manage = items.product_manage;
		 if(product_manage === 1){
			 product_manage = '판매중'
		 }else if(product_manage === 2){
			 product_manage = '예약중'
		 }else if(product_manage === 3){
			 product_manage = '판매완료'
		 }
		 
		 $('<tr/>').append($('<td/>',{
		 }).prepend($('<input/>',{
				type: 'checkbox',
				name: 'check',
				value: items.product_seq
			}))
		 ).append($('<td/>',{
			text: items.product_seq
		 })).append($('<td/>',{
        }).append($('<a/>',{
			href: '#',
			text: items.product_subject,
			value: items.product_seq,
			id: 'subjectA',
			class: items.seq+""
		}))
        ).append($('<td/>',{
        	text: items.product_delivery_fee
        })).append($('<td/>',{
        	text: items.product_price
        })).append($('<td/>',{
        	text: product_manage
        })).appendTo($('#store_product_tbody'));
	 });//each
	 
	//전체 선택 또는 해제
	$('#all').click(function(){
		if($('#all').prop('checked'))
			$('input[name=check]').prop('checked', true);
		else
			$('input[name=check]').prop('checked', false);
	});
	 
	//선택 삭제
	$('#choiceDeleteBtn').click(function(){
		let count = $('input[name=check]:checked').length;
		
		if(count == 0)
			alert('삭제할 항목을 선택하세요');
		else{
			if(confirm('정말로 삭제하시겠습니까?')){
				$('#store_productListForm').submit();
			}
		}
	});
	 
//글 클릭하면 넘어가게 할거임
	 $('#store_product_Table').on('click','#subjectA',function(){
		 let seq = $(this).parent().prev().text();
		window.open("/market/product/productDetail?seq="+seq,"PopupWin","width=800,height=800");
	});
	 
}



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

