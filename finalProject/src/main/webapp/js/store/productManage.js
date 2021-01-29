$(document).ready(function(){
	$.ajax({
		type: 'post',
		url: '/market/store/productManageList',
		data: 'mem_id='+'test1', // 상점 주인의 아이디
		dataType: 'json',
		success : function(data){
			console.log(data); // test
			
			$('tbody > tr').remove();
			
			$.each(data.productManageList, function(index, items){
				
				$('<tr/>').append($('<td/>'
				).append($('<a/>', {
					href: '#'
			   }).append($('<img/>',{
					src: '/market/storage/'+items.product_img1, 
					alt: '상품이미지'
			})))).append($('<td/>'
				).append($('<div/>', {
					class: 'tabSortProdWrap1'
			   }).append($('<div/>', {
					class: 'tabSortProdWrap2'
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
			 }))).appendTo($('tbody'))
				
				  
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
				
			});//each
			
		},
		error: function(err){
			console.log(err);
		}
		
	});//ajax
	
});