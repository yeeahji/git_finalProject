$(document).ready(function(){//처음들어가자마자 테이블 출력
	storeListPrint();
});

//selectPrint눌렀을때 (20개보기 50개보기..)
$('#selectPrint').change(function(){
	var viewNum = $(this).val();
	$('#viewNum').val(viewNum);
	
	storeListPrint();
});

//상점리스트 출력
function storeListPrint(){
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
			
		     //클릭_오른쪽에 정보나타나게
		     let id;
		     $('#storeTable').on('click','#subjectA',function(){
		    	 id = $(this).parent().prev().text();
		    	 $.ajax({
		    		 type: 'get',
		    		 url: '/market/admin/getStoreView',
		    		 data: {'id': id},
		    		 dataType: 'json',
		    		 success: function(data){
		    			 clickEvent(data);
		    		 }
		    	 });
		    	 //판매중, 예약중, 판매완료 - 정렬버튼
				 $('.btn-group>button').click(function(){
					 let product_manage= $(this).attr('value');
					 $.ajax({
			    		 type: 'get',
			    		 url: '/market/admin/getStoreViewOrderby',
			    		 data: {'id': id,
			    			 	'product_manage': product_manage},
			    		 dataType: 'json',
			    		 success: function(data){
			    			 $("#store_product_tbody tr:gt(0)").remove();
			    			 clickEvent_2(data);
			    		 }
			    	 });
				 });
		   });
		}
	});
}


//조건검색======================================================

//검색
$('#storeSearchBtn').click(function(event, str){
	if(str != 'research'){
		$('input[name=searchPg]').val(1);
	}
	if($('#storeKeyword').val() == ''){
		alert('검색어를 입력하세요');
	}else{
		search_viewNum_change();
		
		//조건 검색후 selectPrint눌렀을때 (20개보기 50개보기..)
		$('#selectPrint').change(function(){
			var viewNum = $(this).val();
			$('#viewNum').val(viewNum);
			
			search_viewNum_change();
		});
	}
});

function search_viewNum_change(data){
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
			
		     //클릭
		     $('#storeTable').on('click','#subjectA',function(){
		    	 let id = $(this).parent().prev().text();
		    	 $.ajax({
		    		 type: 'get',
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

//공통================================================================

//클릭시 상세보기
function clickEvent(data){
	 $('#nameSpan').text(data.adminMembersDTO.mem_name)
	 $('#storeNameSpan').text(data.adminMembersDTO.store_nickname)
	 if(data.adminMembersDTO.store_img != null){
		 $('#pictureSpan').text(data.adminMembersDTO.store_img)
	 }else{
		 $('#pictureSpan').text('사진없음')
	 }
	 $('#echoSpan').text(data.adminMembersDTO.store_echo)
	 $('#introSpan').text(data.adminMembersDTO.store_intro)
	 $('#reviewSpan').text(data.reviewTotalA)
	 $('#total_Product1Span').text(data.totalSellProduct)
	 $('#total_Product2Span').text(data.totalSellProduct)
	 $('#sale_productSpan').text(data.sale_productSpan)
	 $('#reservation_productSpan').text(data.reservation_productSpan)
	 $('#sold_productSpan').text(data.sold_productSpan)
	 
	 //상점이름 누르면 옆에 나오는 물품 테이블
	 $("#store_product_tbody tr:gt(0)").remove();
	 clickEvent_2(data);
}
//상세보기 아래에 있는 물품 테이블
function clickEvent_2(data){
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
