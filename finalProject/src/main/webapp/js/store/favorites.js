$(document).ready(function(){
	$.ajax({
		type: 'post',
		url: '/market/store/storeFavoritesList',
		data: 'mem_id='+'eunk', // 현재 멤아이디 없으니 테스트용으로 직접 문자열 보냄
		dataType: 'json',
		success : function(data){
			console.log(data); // favoritesList
			
			$("<div class='favoriteOneWrap'/>").append($('<a/>', {
				class: 'favoriteOneLink',
				href: '#'
			}).append($('<div/>', {
				class: 'favoriteOneCheckWrap'
			}).append($('<div/>', {
				class: 'favoriteOneCheck'
			}))).append($('<div/>', {
				class: 'favoriteOneImg'
			}).append($('<img/>', {
				src: '/market/storage/'+items.product_img1, 
				alt: '상품이미지'
			})).append($('<div/>', {
				class: 'favoriteOneImgInner',
				
			}))).append($('<div/>', {
				class: 'favoriteOneDetailWrap'
			}).append($('<div/>', {
				class: 'favoriteOneDetail'
			}).append($('<div/>', {
				class: 'favoriteOneName', // 상품 이름
				text: items.product_subject
			})).append($('<div/>',{
				class: 'favoriteOnePrice'
			}).append($('<div/>', {
				text: items.product_price.toLocaleString()
			}))).append($('<div/>', {
				class: 'favoriteOneDate',
				text: items.product_logtime
			})))
			
			));
			
			
			//마지막에 여기에 붙이기
			//.appendTo($('.favoritesContentList'));
			
		},
		error: function(err){
			console.log(err);
		}
	});
	
});