$(document).ready(function(){
	$.ajax({
		type: 'post',
		url: '/market/store/storeFavoritesList',
		data: 'mem_id='+'test1', // 상점 주인의 아이디
		dataType: 'json',
		success : function(data){
			console.log(data); // test

			$('.favoritesNum').text(data.favoritesTotalA);
			
			$.each(data.favoritesList, function(index, items){
				$('.favoriteOneWrap'+index).remove();
				
				$("<div class='favoriteOneWrap"+index+"'/>").append($('<a/>', {
					class: 'favoriteOneLink',
					href: '#',
				}).append($('<div/>', {
					class: 'favoriteOneCheckWrap'
				}).append($('<div/>', {
					class: 'favoriteOneCheck'
				}))).append($('<div/>', {
					class: 'favoriteOneImg'
				}).append($('<img/>', {
					src: '/market/storage/'+items.product_img1, 
					alt: '상품이미지'
				})).append($('<div/>',{
					// 배송비
					class: 'deliveryFee'+index // 해당 index에만 효과 적용하기 위해
				})).append($('<div/>',{
					//판매 상태
					class: 'sellCheck'+index
				}).append($('<div/>',{
					//children().first()
				})).append($('<img/>',{
//					width: '11',
//					height: '18'
				})).append($('<div/>', {
					//children().last()
				}))).append($('<div/>', {
					class: 'favoriteOneImgInner'
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
				}))).append($('<div/>', {
					class: 'favoriteOneLocation'
				}).append($('<img/>', {
					src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAiCAYAAABIiGl0AAAAAXNSR0IArs4c6QAAA6xJREFUWAm1l01IVFEUx51xNAtxIcEENuQIrqTxO8OEmj5IAncVUS2E2kS0axO4C5KiFi0lXIh9QBC1kKgwclNGjaNOSUEapVRiUSHoTOo4/c743vjem/vGp8xcuHPu+Z//Of9778y9740rz0EbGxsrjsViQait9JpEIuF1uVzbGCfo0/jT2GGwx6WlpQN+vz+Gn7G5MkXD4fAOil6C047dlImrxxCfg9tVUFBwtbq6ekbHrVYpzAoLo9FoJ+QL9AJrkkN/3u12d9bW1l5hMsvWnDTh4eHh8uXl5fvMutFK3qD/jLxTDQ0Nv4z5JuHR0VH/4uLiKwjy/WWtseJPLKTZKO7Wq4dCoa1LS0tP8bMqKvURrcT0TU1NbRZfWkqYWXVrhJVI9j+bZmZmbuplk1s9NDR0GNEnOpgrKz8ydBrZ8rBHRHCur0MsCvc1Pazl1GF301PbqOFpBh3Z4Rv0oIvVBgBG01hqYKCwsPBMIBD4bAxHIpGKhYWFbrB9RtxuzDEr9yB6zI5gwV/U19cfYLvktjI1mQh19rOI5wSCpqDC4bgelaXvUcRMEGJzAO0qUZ2oxdrx53XMzsI9KMJldgQDPsgPYtLgK4fCoeigMmgA2R2fCG83YMohxCFlQAHCDSlgE8Tkytx8yDZmbHCKMxIMQSdcJueWFU8Y8pRDiA3KgAJ0yJ1wJMwqGrlSWxQ6Jkg4wjWBamfCzQzfqmOrqGwNXo/c56uoeaTFejSuOWjxmNx7KXiHwYIlpnIr4I1xVo9TPF8nyFgwiYFV6LidhZfgJaFXv6vvUeCEHVmBy7UZ0fAAds3rUq+BcD8X0SFZcR5XWJcecGhFqEnrjkW12rfEJoV5PRlgJg+1QM4MGqG6uroHKWEZsNXnCfzNmWpe3iL1z9LjJmGuux+AF3MlTO1rrDb1FExutS5GQB5tj3Q/WxbRSElJyWVjPZOwBLxe70mI8sKXrTaZn59/pLKy8p+xYJqwz+eLFhUVtUH6aCRuZMwC/tBba2pqvlnz04SFUFVV9Zsj1krSd2vCOvwYNdo4sx9UOUphIfJ9f8XsRXxclbgGNiuiHNOXdjxbYUlgtuMINzN8Y1dAgU+BtTDxfkUsBWUUFhYFfmKCTKAvlWU/kDfPJo7mO3vKSiR5V69Fkrg8DPj32IHtwE2+FhvzmFivx+M5xz/ENV8sJM+xsC4yMjKyKx6P32YC8rdE2iz9HKu8m/QcfqxbWOry7N2CkRfznZzR0/yIvjBeV/sPFdozA8TD8zUAAAAASUVORK5CYII=',
					width: '15',
					height: '17',
					alt: '위치 아이콘'
				})).append(items.product_location)
				))).appendTo($('.favoritesContentList'));
				
				
				$('.favoriteOneWrap'+index).css('width', '502px');
				$('.favoriteOneWrap'+indexzsw  ).css('margin-bottom', '20px');
		
	
				// 배송비 *배송비 별도는 표시 없음
				if(items.product_delivery_fee == 1){
					$('.deliveryFee'+index).text('배송비포함');
					$('.deliveryFee'+index).css({'background':'rgba(0, 0, 0, 0.4)', 
												'font-size':'13px',
												'padding':'2px 3px 3px',
												'position':'absolute',
												'left':'10px',
												'bottom':'10px',
												'color':'rgb(255, 255, 255)'});
				}
				
				if(items.product_manage == 2) {
					// 예약 완료 상품 화면 
					console.log(items.product_manage);
					$('.sellCheck'+index).css({'position':'absolute',
											   'top':'0px',
											   'left':'0px',
											   'width':'100%',
											   'height':'100%',
											   'background':'rgba(0, 0, 0, 0.6)',
											   'display':'flex',
											   '-webkit-box-pack':'center',
											   'justify-content':'center',
											   '-webkit-box-align':'center',
											   'align-items':'center',
											   'color':'rgb(255, 255, 255)'});
					$('.sellCheck'+index).children().first().text('예약');
					$('.sellCheck'+index).children().last().text('완료');
					$('.sellCheck'+index+' > img').attr('src','data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAkCAYAAACNBsqdAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAa1JREFUeNq0lrtLA0EQhy+rja2VDxQRwcpSooWgAUGwsPDRSFoLO221Fzux9V3oHyAIChZiZ9p0Kko0QVQUC0lEMfob2INl2fddBj7C3V4+hrnZ2cvUImVcgpHILzbAUnzBFA90B0gp2sULlXg0CosDm3gsQFoCZ43IeA/UxRsZ6eX1gHtPaZ3/79GUcUi2p7JUJQ6p747qplyKEm8313gGXeDHlHGvp5RiXyWVxb5l+AO7ukWW4MVdgOtGiLdNi/HL6wM3HtJ30Am+dA80B9a3FdQM6wWWcPBoE45LUQEdKUk/wCBl3J+i9BfMgluWchmWwXncbmmJt8Cm2G5P+G1LKKUzchx8ixvkIaGU5veMKI3FWcpcw4lF+gmmwKttHovRAnKWITQPirZZIUeOy3WxCo5dhpAck4a1I7DmMoR0R7pq8Bf4bKmaxLqMBzTSMpi2SU1iVRmqvK3KLj3oKqYOWABXrs3NNLN2WLq3Dg59do1KPAGahGtqqRXf7cgsZaDmz8vfZS4htxtl+sLLQdt0CNyFDBA54yyX0kCZC5WqxHSsvIFF/t0QHP8CDAB7e1HgMlcs6AAAAABJRU5ErkJggg==');					
					$('.sellCheck'+index+' > img').css('width', '11');
					$('.sellCheck'+index+' > img').css('height', '18');
				}else if(items.product_manage == 3){ // 상태가 판매완료로 바뀐 상품
					// 찜 테이블에서 삭제
					$.ajax({
						type: 'post',
						url: '/market/store/storeSoldOutDelete',
						success : function(){
							console.log('판매완료 상품 삭제'); 
							$('.favoriteOneWrap'+index).remove(); // 찜 리스트 화면에서 삭제
						},
						error: function(err){
							console.log(err);
						}
					});// ajax
				}// if
			});// each
		},
		error: function(err){
			console.log(err);
		}
	});// ajax
});