var userId = $('.loginId').val();

$(document).ready(function(){
	$.ajax({
		type: 'GET',
		url: '/market/store/purchaseList',
		data: {'my_id' : userId, // 상점 주인 아이디
			   'pg' : $('#pg').val()},
		dataType: 'json',
		success : function(data){
			$('#purchaseTbody > tr').remove();
			
			$.each(data.purchaseList, function(index, items){
				$('<tr/>').append($('<td/>' // td1 : 상품 이미지
				).append($('<div/>', {
					class: 'completedImg'
			   }).append($('<img/>',{
					src: '/market/storage/'+items.product_img1, 
					alt: '상품이미지',
					width: '152px',
					height: '152px'
			  })).append($('<span/>',{
					class: 'completedImgBack'
			   }).append($('<img/>',{
			   	    src: 'https://assets.bunjang.co.kr/img/trade/ic-circle-tick@3x.png',
				    alt: '거래완료',
				    width: '20px',
				    height: '20px'
			 })).append('거래완료'
		    )))).append($('<td/>',{ //td2 : 상품명
				    text: items.product_subject
			 })).append($('<td/>', { //td3 : 상품가격
				    text: items.product_price+'원'
			  })).append($('<td/>', { //td4: 거래상점
				    text: items.store_nickname
			  })).append($('<td/>', { //td5: 거래일시
				    text: items.purchase_logtime
			  })).appendTo($('#purchaseTbody'))
			  
			// # 페이징 처리				
			$('#purchasePagingDiv').html(data.purchasePaging.pagingHTML);	
				
			});//each
			// 구매내역 총 개수
			$('.purchasesNum').text(data.purchaseTotalA);
		},error: function(err){
			console.log(err);
		}
	});// ajax
});

// 페이징 처리
function purchasePaging(pg){
	$.ajax({
		type: 'GET',
		url: '/market/store/purchaseList',
		data: {'my_id' : userId, // 상점 주인 아이디
			   'pg' : pg},
		dataType: 'json',
		success : function(data){
			$('#purchaseTbody > tr').remove();
			
			$.each(data.purchaseList, function(index, items){
				$('<tr/>').append($('<td/>' // td1 : 상품 이미지
				).append($('<div/>', {
					class: 'completedImg'
			   }).append($('<img/>',{
					src: '/market/storage/'+items.product_img1, 
					alt: '상품이미지',
					width: '152px',
					height: '152px'
			  })).append($('<span/>',{
					class: 'completedImgBack'
			   }).append($('<img/>',{
			   	    src: 'https://assets.bunjang.co.kr/img/trade/ic-circle-tick@3x.png',
				    alt: '거래완료',
				    width: '20px',
				    height: '20px'
			 })).append('거래완료'
		    )))).append($('<td/>',{ //td2 : 상품명
				    text: items.product_subject
			 })).append($('<td/>', { //td3 : 상품가격
				    text: items.product_price+'원'
			  })).append($('<td/>', { //td4: 거래상점
				    text: items.store_nickname
			  })).append($('<td/>', { //td5: 거래일시
				    text: items.purchase_logtime
			  })).appendTo($('#purchaseTbody'))
			  
			// # 페이징 처리				
			$('#purchasePagingDiv').html(data.purchasePaging.pagingHTML);	
				
			});//each
		},error: function(err){
			console.log(err);
		}
	});// ajax
}