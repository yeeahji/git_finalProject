$(document).ready(function(){
	$.ajax({
		type: 'post',
		url: '/market/store/productManageList',
		data: 'mem_id='+'test1', // 상점 주인의 아이디
		dataType: 'json',
		success : function(data){
			console.log(data); // test
			
			$('#prodMangeTbody > tr').remove();
			
			$.each(data.productManageList, function(index, items){
				
				$('<tr/>').append($('<td/>'
				).append($('<a/>', {
					href: '#'
			   }).append($('<img/>',{
					src: '/market/storage/'+items.product_img1, 
					alt: '상품이미지'
			})))).append($('<td/>'
				).append($('<div/>', {
					class: 'tabSortProdWrap1'+index,
					style: 'position: relative;box-sizing: border-box;'
			   }).append($('<div/>', {
					class: 'tabSortProdWrap2_'+index, //수정부분 
					style: 'width: 100%;height: 3rem;display: flex;border: 1px solid rgb(195, 194, 204);border-radius: 2px;'
			   }).append($('<div/>', {
					class: 'tabSortProdTitle'
			   }).append($('<div/>', {
					class: 'tabSortProdText',
					text: '판매 중'
			  })).append($('<input/>', {
					//id: 'tabSortProdTextInner',
					//readonly: '',
					//tabindex: '0',
					//aria-autocomplete: 'list', //자동완성?
					//class: 'css-tabSortProdTextInner',
					//value: ''
			 }))).append($('<div/>', {
					class: 'tabSortProdBtn'
		   }))))).append($('<td/>'
			    ).append($('<a/>', {
					href: '#',
					text: items.product_subject
			 }))).append($('<td/>', {
					text: items.product_price.toLocaleString()+'원'
			  })).append($('<td/>', {
				    class: 'favorites'+index
				    // 찜 개수
					//text: '0' 
			  })).append($('<td/>', {
					text: items.product_logtime
			  })).append($('<td/>'
				).append($('<button/>', {
					type: 'button',
					class: 'upBtn',
					text: 'UP'
			  })).append($('<a/>', {
					class: 'editBtn',
					href: '#',
					text: '수정'
			  })).append($('<button/>',{
					type: 'button',
					class: 'deleteBtn',
					text: '삭제'
			 }))).appendTo($('#prodMangeTbody'))
				
				  
			 // 각 상품의 찜 개수 구하기
			 $.ajax({
				type: 'post',
				url: '/market/store/favoritesOfProd',
				data: { 'mem_id': 'test1', // 상점 주인의 아이디 
					    'product_seq': items.product_seq}, // 찜 수 구할 상품의 번호
				//dataType: 'json',
				success : function(data){
					console.log(index+'번의 찜 수 '+data); // favoritesOfProd
					//td안에 text로 찜 수 뿌려주기
					$('.favorites'+index).text(data);
				},
				error: function(err){
					console.log(err);
				}
			 }); //ajax 찜 개수 
				
			
			// 마우스 오버 효과
			// 상품명 입력
			$('.productSearchForm > input').on({
				mouseenter : function (){
					$('.productSearchForm > input').css('border', '1px solid black');
				},					
				mouseleave : function (){
					$('.productSearchForm > input').css('border', '1px solid rgb(195, 194, 204)');
				}
			});	
			// 10개씩
			$('.sortNumWrap3').on({
				mouseenter : function (){
					$('.sortNumWrap3').css('border', '1px solid black');
				},					
				mouseleave : function (){
					$('.sortNumWrap3').css('border', '1px solid rgb(195, 194, 204)');
				}
			});	
			// 전체
			$('.sortProdManageWrap3').on({
				mouseenter : function (){
					$('.sortProdManageWrap3').css('border', '1px solid black');
				},					
				mouseleave : function (){
					$('.sortProdManageWrap3').css('border', '1px solid rgb(195, 194, 204)');
				}
			});	
			// 상품상태
			$('.tabSortProdWrap2_'+index).on({
					mouseenter : function (){
						$('.tabSortProdWrap2_'+index).css('border', '1px solid black');
					},					
					mouseleave : function (){
						$('.tabSortProdWrap2_'+index).css('border', '1px solid rgb(195, 194, 204)');
					}
			});
			
			
			$('.tabSortProdWrap2_'+index).click(function(){
				console.log(index + '버튼클릭');
				//wrap1 아래에 span태그 추가
				$('.tabSortProdWrap2_'+index).attr('class', 'tabSortProdWrap2_'+index+'click');
				$('.tabSortProdWrap2_'+index+'click').css('width', '100%');
				$('.tabSortProdWrap2_'+index+'click').css('height', '3rem');
				$('.tabSortProdWrap2_'+index+'click').css('display', 'flex');
				$('.tabSortProdWrap2_'+index+'click').css('border', '1px solid rgb(30, 29, 41)');
				$('.tabSortProdWrap2_'+index+'click').css('border-radius', '2px');

				// 상태 종류
				$('.tabSortProdWrap2_'+index+'click').append($('<div/>', {
					class: 'btnListWrap'
				}).append($('<div/>', {
					class: 'btnList'
				}).append($('<div/>', {
					class: 'nowList', // 판매 중
					text: '판매 중'
				})).append($('<div/>', {
					class: 'default', // 예약 중
					text: '예약 중'
				})).append($('<div/>', {
					class: 'default', // 삭제
					text: '삭제'
				})).append($('<div/>', {
					class: 'default', // 판매완료
					text: '판매완료'
				}))));
				
				
				
			});
			
			
			});//each
			
		},//success
		error: function(err){
			console.log(err);
		}
	});//ajax
	
	
	
	
	
});// 상품 리스트 출력

















