var zzimNum;

$(document).ready(function(){
	// 상품 정보
	$.ajax({
		type: 'GET',
		url: '/market/product/getProductDetail',
		data: {'seq':$('.hiddenProdSeq').val()}, 
		dataType: 'json',
		success : function(data){ // productDTO
			console.log("[상세페이지]로그인 아이디 ->"+$('.loginId').val()); //test

			var dto = data.productDTO;
			
			$('.detail-info__text-title').text(dto.product_subject); // 상품명
			$('.detail-info__price').text(dto.product_price+'원'); // 상품가격
			$('#view').text(dto.product_view); // 상품 조회수
			$('#product_location').text(dto.product_location); // 거래지역
			$('.prodInfo_contentText').text(dto.product_content); // 하단 상품 정보 - 상품 내용
			$('.detailContent_location').text(dto.product_location); // 하단 상품 정보 - 거래 지역
			
			// 상품 상태 (0:중고상품 1:새상품)
			if(dto.product_condition == 0){
				$('#product_condition').text('중고');
			}else if(dto.product_condition == 1){
				$('#product_condition').text('새상품');
			}
			
			// 배송비 (0:불포함 1:포함)
			if(dto.product_delivery_fee == 0){
				$('#product_delivery_fee').text('배송비 별도');
			}else if(dto.product_delivery_fee == 1){
				$('#product_delivery_fee').text('배송비 포함');
			}
			

			// 상품 이미지 - 스와이퍼  (이미지 , dot버튼)
			var product_img = [{product_img : dto.product_img1}, 
							   {product_img : dto.product_img2}, 
							   {product_img : dto.product_img3},  
							   {product_img : dto.product_img4},  
							   {product_img : dto.product_img5}];
			
			// 확대 
			$('.dtailImg_prodName').text(dto.product_subject);

			
			$.each(product_img, function(index, items){
				if(items.product_img != ''){
					if(items.product_img == null){
						return false;
					}else {
						// ====================== 스와이퍼 ======================
						$('.swiper-wrapper').append($('<div/>', {
							class: 'swiper-slide'
						}).append($('<img/>',{
							src: '/market/storage/' + items.product_img,
							alt: '상세 상품 이미지',
							id:'product_img'+index
						})))
						
						// 첫 장 빼고 처음엔 display:none
						if(index != 0){
							$('#product_img'+index).parent().css('display','none');
							$('#product_img0').parent().css('display','block');
						}
						
						// 슬라이더 버튼 dot
						$('.paginationBtn').append($('<span/>', {
							class: 'dot',
							onclick: 'currentSlide('+(index)+')'
						}))
						
						// 첫 장만 도트 검정
						if( index == 0){
							$('.dot').attr('class', 'dot active');
						}
						
						// ====================== 확대 버튼 - 상세 이미지 ======================
						$('.detailImgList').append($('<div/>', {
							class: 'detailImg_wrap',
						}).append($('<img/>', {
							src: '/market/storage/' + items.product_img,
							alt: '리뷰 이미지'
						})).append($('<div/>', {
							class: 'detailImg_watermark'
						})))
						
						// 버튼
						$('.detailImg_buttonWrap').append($('<button/>', {
							class: 'detailImg_button'+index
						}));
						
						// 첫번째 버튼은 흰색
						if(index==0){
							$('.detailImg_button'+index).css('opacity', '0.6');
						}
	
						$('.detailImg_button'+index).click(function(){
							$(this).css('opacity', '0.6');
							$(this).prevAll().css('opacity', '0.2');
							$(this).nextAll().css('opacity', '0.2');
							
							
							$('.detailImgList').attr('class', 'detailImgList_'+index);
							
							if(index==0){
								for(var i=1; i<=4; i++){
									$('.detailImgList_'+i).attr('class', 'detailImgList_0');
								}
							}else if(index==1){
								$('.detailImgList_0, .detailImgList_2, .detailImgList_3, .detailImgList_4').attr('class', 'detailImgList_1');
							}else if(index==2){
								$('.detailImgList_0, .detailImgList_1, .detailImgList_3, .detailImgList_4').attr('class', 'detailImgList_2');
							}else if(index==3){
								$('.detailImgList_0, .detailImgList_1, .detailImgList_2, .detailImgList_4').attr('class', 'detailImgList_3');
							}else if(index==4){
								for(var i=0; i<=3; i++){
									$('.detailImgList_'+i).attr('class', 'detailImgList_4');
								}
							}// if-else
							
						});// 버튼 클릭 
					}//else
					
					
				}

				// 판매완료 상품 표시
				if(dto.product_manage==3){
					$('#product_img'+index).after($('<div/>', {
						class: 'soldOutIndi',
					}).append($('<div/>', {
						
					}).append($('<span/>', {
						id: 'soldOutText1',
						text: '판매'
					})).append($('<img/>', {
						src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAkCAYAAACNBsqdAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAa1JREFUeNq0lrtLA0EQhy+rja2VDxQRwcpSooWgAUGwsPDRSFoLO221Fzux9V3oHyAIChZiZ9p0Kko0QVQUC0lEMfob2INl2fddBj7C3V4+hrnZ2cvUImVcgpHILzbAUnzBFA90B0gp2sULlXg0CosDm3gsQFoCZ43IeA/UxRsZ6eX1gHtPaZ3/79GUcUi2p7JUJQ6p747qplyKEm8313gGXeDHlHGvp5RiXyWVxb5l+AO7ukWW4MVdgOtGiLdNi/HL6wM3HtJ30Am+dA80B9a3FdQM6wWWcPBoE45LUQEdKUk/wCBl3J+i9BfMgluWchmWwXncbmmJt8Cm2G5P+G1LKKUzchx8ixvkIaGU5veMKI3FWcpcw4lF+gmmwKttHovRAnKWITQPirZZIUeOy3WxCo5dhpAck4a1I7DmMoR0R7pq8Bf4bKmaxLqMBzTSMpi2SU1iVRmqvK3KLj3oKqYOWABXrs3NNLN2WLq3Dg59do1KPAGahGtqqRXf7cgsZaDmz8vfZS4htxtl+sLLQdt0CNyFDBA54yyX0kCZC5WqxHSsvIFF/t0QHP8CDAB7e1HgMlcs6AAAAABJRU5ErkJggg==',
						width: '22', //11
						height: '29', //18
						alt: '판매완료 이미지'
					})).append($('<span/>', {
						id: 'soldOutText2',
						text: '완료'
					}))))
					
					$('#soldOutText1, #soldOutText2').css({'font-size':'23px',
														   'font-weight':'bold'});
				} //if
			});// each - 상품 이미지
			
			
			// 연관상품 - 같은 카테고리 상품들, 페이징처리
			$.ajax({
				type: 'GET',
				url: '/market/product/getRelatedProducts',
				data: {'seq':$('.hiddenProdSeq').val(),
						'pg': $('#pg').val()}, 
				dataType: 'json',
				success : function(data){ // relProdList
					
					$('.relProd_ImgList > *').remove();
					
					$.each(data.relProdList, function(index, items){
							$('.relProd_ImgList').append($('<div/>',{
								class: 'relProd_ImgWrap'+index
							}).append($('<a/>',{
								href: '#',
								class: 'relProd_link'
							}).append($('<div/>', {
								class: 'relProd_Img'
							}).append($('<img/>', {
								src: '/market/storage/'+items.product_img1,
								widht: '155',
								height: '155',
								alt: '상품이미지'
							})).append($('<div/>',{
								class: 'relPord_ImgDiv'
							}))).append($('<div/>', {
								class: 'relProd_ImgTitle',
								text: items.product_subject
							}))))
							console.log("상품번호"+items.product_seq);
									
							$('.relProd_ImgWrap'+index).css({'width': '159px',
														     'margin-right': '14px',
														     'flex-shrink': '0'});	
							
							// 클릭 -> 상세페이지 이동
							$('.relProd_ImgWrap'+index).click(function(){
								$('.relProd_ImgWrap'+index+'> a').attr('href','/market/product/productDetail?seq=' + items.product_seq);
							});		
									
							// 6장 이하일때		
							if(data.relProdList.length>=6) $('#relProdPagingDiv').html(data.relProdPaging.pagingHTML);	
							
					});//each
					
				},error: function(err){
					console.log(err);
				}
			});// 연관상품 ajax
			
			// 해쉬 태그
			var product_hashtag = [{product_hashtag : dto.product_hashtag1}, 
								   {product_hashtag : dto.product_hashtag2}, 
								   {product_hashtag : dto.product_hashtag3},  
								   {product_hashtag : dto.product_hashtag4},  
								   {product_hashtag : dto.product_hashtag5}];

			$.each(product_hashtag, function(index, items){
				if(items.product_hashtag != ''){
					if(items.product_hashtag == null){
						return false;
					}else {
						$('.detailContentWrap_hash').append($('<a/>', {
							class: 'detailContent_hashtag',
							text: '#'+items.product_hashtag
						}))
					}//else 
				}
			});// each 해쉬태그
			
			// 상점 정보 (seq로 상점 조회)
			$.ajax({
				type: 'GET',
				url: '/market/product/getStoreInfo',
				data: {'seq':$('.hiddenProdSeq').val()}, 
				dataType: 'json',
				success : function(data){
					// 클릭하면 해당 상점으로 이동
					$('.storeInfo_name, .storeProfileImg_Link, .moreProdLink, .productNumLink').click(function(){
						location.href="/market/store/store?id="+data.storeDTO.mem_id;
					});
					
					$('.storeOwner').val(data.storeDTO.mem_id);

					// 상점 사진
					if(data.storeDTO.store_img==null){
						$('.storeProfileImg_Link').append($('<img/>', {
							src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAbQAAAG0CAYAAABaNNJGAAAAAXNSR0IArs4c6QAAHX1JREFUeAHt3Q1T28YWBmBD8wnT//87Ow2hJbS9OeTaCWCzli3Je84+mmFCkC3vPmfDG0nr9dXDw8N/GxsBAgQIEEgucJ28/ZpPgAABAgSeBASagUCAAAECJQQEWoky6gQBAgQICDRjgAABAgRKCAi0EmXUCQIECBAQaMYAAQIECJQQEGglyqgTBAgQICDQjAECBAgQKCEg0EqUUScIECBAQKAZAwQIECBQQkCglSijThAgQICAQDMGCBAgQKCEgEArUUadIECAAAGBZgwQIECAQAkBgVaijDpBgAABAgLNGCBAgACBEgICrUQZdYIAAQIEBJoxQIAAAQIlBARaiTLqBAECBAgINGOAAAECBEoICLQSZdQJAgQIEBBoxgABAgQIlBAQaCXKqBMECBAgINCMAQIECBAoISDQSpRRJwgQIEBAoBkDBAgQIFBCQKCVKKNOECBAgIBAMwYIECBAoISAQCtRRp0gQIAAAYFmDBAgQIBACQGBVqKMOkGAAAECAs0YIECAAIESAgKtRBl1ggABAgQEmjFAgAABAiUEBFqJMuoEAQIECAg0Y4AAAQIESggItBJl1AkCBAgQEGjGAAECBAiUEBBoJcqoEwQIECAg0IwBAgQIECghINBKlFEnCBAgQECgGQMECBAgUEJAoJUoo04QIECAgEAzBggQIECghIBAK1FGnSBAgAABgWYMECBAgEAJAYFWoow6QYAAAQICzRggQIAAgRICAq1EGXWCAAECBASaMUCAAAECJQQEWoky6gQBAgQICDRjgAABAgRKCAi0EmXUCQIECBAQaMYAAQIECJQQEGglyqgTBAgQICDQjAECBAgQKCEg0EqUUScIECBAQKAZAwQIECBQQkCglSijThAgQICAQDMGCBAgQKCEgEArUUadIECAAAGBZgwQIECAQAkBgVaijDpBgAABAgLNGCBAgACBEgICrUQZdYIAAQIEBJoxQIAAAQIlBARaiTLqBAECBAgINGOAAAECBEoICLQSZdQJAgQIEBBoxgABAgQIlBAQaCXKqBMECBAgINCMAQIECBAoISDQSpRRJwgQIEBAoBkDBAgQIFBCQKCVKKNOECBAgIBAMwYIECBAoISAQCtRRp0gQIAAAYFmDBAg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',
							widht: '48',
							height: '48',
							alt: '판매자 프로필 이미지'
						}))
					}else {
						$('.storeProfileImg_Link').append($('<img/>', {
							src: '/market/storage/' + data.storeDTO.store_img,
							widht: '48',
							height: '48',
							alt: '판매자 프로필 이미지'
						}))
					}
					
					// 상점 이름
					$('.storeInfo_name').text(data.storeDTO.store_nickname);
					
					// 에코지수
					$('.echoIndi_title').append($('<div/>',{
						text: '에코지수'
					})).append($('<img/>',{
						src: '/market/image/store/echo'+data.storeDTO.store_echo+'.svg',
						width: '237',
						height: '25'
					}))
					
					// 상점평점(별)
					var scoreAvg = data.storeDTO.store_scoreavg;
					switch(scoreAvg){
						case 0:
							$('.star1, .star2, .star3, .star4, .star5').attr('src','data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAcCAYAAAB2+A+pAAAAAXNSR0IArs4c6QAAAqNJREFUSA2tVk1rE0EYzrYbSKQXRYIfCaUiggaJJiH+AIsnL1poRQ+CBy8VvOivUA8evHgoeNCbRz3pH5B8HlIvYpG0VULxJBqMZn2eZWc7O5nZ7I5deJl33vf5yMzsTpvJWD6tVussw5KembMlgnc9CCsJa2PP81YYVq4gOTbEXq+3NB6PP5ObzWZPVSqVrbQ6ViuGKbfZf+Rc1JKMVsaO44RbLOdJDAUm9Va32+0TONtthM+FsYcoVqvVXSGaZEy9YhheE6Y0YM5aEjMZk9oY5PB8JSFdTWpPp6m2utlsHoXEN8S8IvUX82P1en1PqRunbrfbvYitOmRESI3JZLIMrGpKxDzOeb3T6byT4MYU2J8Orz2IvQLqghF5sI0ujG/O1Wq1j/l8/hImjxHewXrsq1GbHvSiZ+SM8alcxupfIE7uU/4/g+EO4jY+ufdCLWLMYr/fPzIajZ7DPLwkBNhmhOHrXC53t1wuf5f5U8aiidXfgflTxIKopRlh+ANxH6vc0PGMxgTjxTsN45dIGzpyTO0DTG/hLD+ZMLHGJMHYxep7GM+ZROQ6DDexygrGP3JdzWfeXPg2D8P0jEo0zYklx9QX9ZnGAPIlcwUhwUjszBdzpjFWcCOBWQSShBN7xribj+Os+Cdw6gei7l+P6C1HXDFBb4J6EXf3V7Un5lOCohGMq6opRH+j9wAv0BUG86AWUgPOaljQJLHGEFyTOZhvIhpYyROMvAK9IG+wp2AjXLnH3LjV+IQW8cu3ED4Gws8KhcLDUqn0SxXhfDAY5IfD4SPg1zkPftgSduUL5+pjXDEEuM3gO0OQruIyuGcypSh7xBBLDrnUYE/3xBnzbX7ruu55bOcbHVlXI5YccmGc7ovA/81FXJf+lunEk9aoQS0d/h/pAwlu3rYpxwAAAABJRU5ErkJggg==');
							break;
						case 1:
							$('.star1').attr('src','data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAcCAYAAAB2+A+pAAAAAXNSR0IArs4c6QAAArVJREFUSA2tVs1rE0EUf28TWr8uBQU/AqLGhAh+QWhrTECwePJiC1r0IHit4MU/Qw8evAoe9OZRTwqCNVEpaC+Wpqle4gfiURobdvN8b9JdZ7a7k822C8u++b3fx87sZFqAlBc1jpfkTikHJ60Qer1pdac0SB9MOANyp7wwjY7eF49Q1/0iWhzJHsWJ5a/D+qSbcdedDoL0OgAHF+mCUVtivR6cFzCGXmqaLx4EcNtEoLSIQADZHFaXvweuCYrhZ0zeFT9U/FXNWIIsgzJ8MNL/7+tbRWF+L+Y51FLTQmEvdLyfvLYZ3Y9NPNiZ2Y/l5m8dt9VZqufPAmZ22UhBb92bCodKTzBc781Ro/gy4NoK8tZQHXsePSWiMzbudvUQ8RO/5nUHz60swdjoBKJzr79DtyvC9BFvyVBZnGl8Y6oXLvL5+5hnf8iUbW3Es/wGjnMTK81XvpOxq1XDGT3FxGc+YatP5SWeWqh4GjPWQ+hN/haPHxDQHh1PWiPgH+bewVrrUZQmNljIVD+WBw+fcPh4lDgO49APkKEbWFltxXPiOhs40YUszLcXOfzEAKpqc+hnqOZOI752bXzjG0cSP7bHGC9E9qLBAvQ10d0NdHDwGs7wbLNWF62puKzRoMhycDDRbKTSBibQ2DfXQukA/O3Kn8BNL8hCdTzycTkVfgc+LHqwYySH5aUf4Z4/3mToN9Sz414Nh/Lvssuhd6HauiS31ILpOqVhrY6Fa3sw0jVdoHYsOeNYW73PYXwE8s01CCa7Wb9CWr0ldWwwvS0d5l/ypC/gkIeQ2VfGWnPRx/ynwqQnnOCiyb5HABhFbDCQWmb2gl/oOJex2rqNlUbHUGsD6SmOcFnT/88kfrktwTTLBi8Ad5/E8yvPtQxrqbiiEW2C3W2Y0bt8js/qOQNMMRAP8YqS/gMbzegG1X8tjgAAAABJRU5ErkJggg==');
							$('.star2, .star3, .star4, .star5').attr('src','data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAcCAYAAAB2+A+pAAAAAXNSR0IArs4c6QAAAqNJREFUSA2tVk1rE0EYzrYbSKQXRYIfCaUiggaJJiH+AIsnL1poRQ+CBy8VvOivUA8evHgoeNCbRz3pH5B8HlIvYpG0VULxJBqMZn2eZWc7O5nZ7I5deJl33vf5yMzsTpvJWD6tVussw5KembMlgnc9CCsJa2PP81YYVq4gOTbEXq+3NB6PP5ObzWZPVSqVrbQ6ViuGKbfZf+Rc1JKMVsaO44RbLOdJDAUm9Va32+0TONtthM+FsYcoVqvVXSGaZEy9YhheE6Y0YM5aEjMZk9oY5PB8JSFdTWpPp6m2utlsHoXEN8S8IvUX82P1en1PqRunbrfbvYitOmRESI3JZLIMrGpKxDzOeb3T6byT4MYU2J8Orz2IvQLqghF5sI0ujG/O1Wq1j/l8/hImjxHewXrsq1GbHvSiZ+SM8alcxupfIE7uU/4/g+EO4jY+ufdCLWLMYr/fPzIajZ7DPLwkBNhmhOHrXC53t1wuf5f5U8aiidXfgflTxIKopRlh+ANxH6vc0PGMxgTjxTsN45dIGzpyTO0DTG/hLD+ZMLHGJMHYxep7GM+ZROQ6DDexygrGP3JdzWfeXPg2D8P0jEo0zYklx9QX9ZnGAPIlcwUhwUjszBdzpjFWcCOBWQSShBN7xribj+Os+Cdw6gei7l+P6C1HXDFBb4J6EXf3V7Un5lOCohGMq6opRH+j9wAv0BUG86AWUgPOaljQJLHGEFyTOZhvIhpYyROMvAK9IG+wp2AjXLnH3LjV+IQW8cu3ED4Gws8KhcLDUqn0SxXhfDAY5IfD4SPg1zkPftgSduUL5+pjXDEEuM3gO0OQruIyuGcypSh7xBBLDrnUYE/3xBnzbX7ruu55bOcbHVlXI5YccmGc7ovA/81FXJf+lunEk9aoQS0d/h/pAwlu3rYpxwAAAABJRU5ErkJggg==');
							break;
						case 2:
							$('.star1, .star2').attr('src','data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAcCAYAAAB2+A+pAAAAAXNSR0IArs4c6QAAArVJREFUSA2tVs1rE0EUf28TWr8uBQU/AqLGhAh+QWhrTECwePJiC1r0IHit4MU/Qw8evAoe9OZRTwqCNVEpaC+Wpqle4gfiURobdvN8b9JdZ7a7k822C8u++b3fx87sZFqAlBc1jpfkTikHJ60Qer1pdac0SB9MOANyp7wwjY7eF49Q1/0iWhzJHsWJ5a/D+qSbcdedDoL0OgAHF+mCUVtivR6cFzCGXmqaLx4EcNtEoLSIQADZHFaXvweuCYrhZ0zeFT9U/FXNWIIsgzJ8MNL/7+tbRWF+L+Y51FLTQmEvdLyfvLYZ3Y9NPNiZ2Y/l5m8dt9VZqufPAmZ22UhBb92bCodKTzBc781Ro/gy4NoK8tZQHXsePSWiMzbudvUQ8RO/5nUHz60swdjoBKJzr79DtyvC9BFvyVBZnGl8Y6oXLvL5+5hnf8iUbW3Es/wGjnMTK81XvpOxq1XDGT3FxGc+YatP5SWeWqh4GjPWQ+hN/haPHxDQHh1PWiPgH+bewVrrUZQmNljIVD+WBw+fcPh4lDgO49APkKEbWFltxXPiOhs40YUszLcXOfzEAKpqc+hnqOZOI752bXzjG0cSP7bHGC9E9qLBAvQ10d0NdHDwGs7wbLNWF62puKzRoMhycDDRbKTSBibQ2DfXQukA/O3Kn8BNL8hCdTzycTkVfgc+LHqwYySH5aUf4Z4/3mToN9Sz414Nh/Lvssuhd6HauiS31ILpOqVhrY6Fa3sw0jVdoHYsOeNYW73PYXwE8s01CCa7Wb9CWr0ldWwwvS0d5l/ypC/gkIeQ2VfGWnPRx/ynwqQnnOCiyb5HABhFbDCQWmb2gl/oOJex2rqNlUbHUGsD6SmOcFnT/88kfrktwTTLBi8Ad5/E8yvPtQxrqbiiEW2C3W2Y0bt8js/qOQNMMRAP8YqS/gMbzegG1X8tjgAAAABJRU5ErkJggg==');
							$('.star3, .star4, .star5').attr('src','data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAcCAYAAAB2+A+pAAAAAXNSR0IArs4c6QAAAqNJREFUSA2tVk1rE0EYzrYbSKQXRYIfCaUiggaJJiH+AIsnL1poRQ+CBy8VvOivUA8evHgoeNCbRz3pH5B8HlIvYpG0VULxJBqMZn2eZWc7O5nZ7I5deJl33vf5yMzsTpvJWD6tVussw5KembMlgnc9CCsJa2PP81YYVq4gOTbEXq+3NB6PP5ObzWZPVSqVrbQ6ViuGKbfZf+Rc1JKMVsaO44RbLOdJDAUm9Va32+0TONtthM+FsYcoVqvVXSGaZEy9YhheE6Y0YM5aEjMZk9oY5PB8JSFdTWpPp6m2utlsHoXEN8S8IvUX82P1en1PqRunbrfbvYitOmRESI3JZLIMrGpKxDzOeb3T6byT4MYU2J8Orz2IvQLqghF5sI0ujG/O1Wq1j/l8/hImjxHewXrsq1GbHvSiZ+SM8alcxupfIE7uU/4/g+EO4jY+ufdCLWLMYr/fPzIajZ7DPLwkBNhmhOHrXC53t1wuf5f5U8aiidXfgflTxIKopRlh+ANxH6vc0PGMxgTjxTsN45dIGzpyTO0DTG/hLD+ZMLHGJMHYxep7GM+ZROQ6DDexygrGP3JdzWfeXPg2D8P0jEo0zYklx9QX9ZnGAPIlcwUhwUjszBdzpjFWcCOBWQSShBN7xribj+Os+Cdw6gei7l+P6C1HXDFBb4J6EXf3V7Un5lOCohGMq6opRH+j9wAv0BUG86AWUgPOaljQJLHGEFyTOZhvIhpYyROMvAK9IG+wp2AjXLnH3LjV+IQW8cu3ED4Gws8KhcLDUqn0SxXhfDAY5IfD4SPg1zkPftgSduUL5+pjXDEEuM3gO0OQruIyuGcypSh7xBBLDrnUYE/3xBnzbX7ruu55bOcbHVlXI5YccmGc7ovA/81FXJf+lunEk9aoQS0d/h/pAwlu3rYpxwAAAABJRU5ErkJggg==');
							break;
						case 3:
							$('.star1, .star2, .star3').attr('src','data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAcCAYAAAB2+A+pAAAAAXNSR0IArs4c6QAAArVJREFUSA2tVs1rE0EUf28TWr8uBQU/AqLGhAh+QWhrTECwePJiC1r0IHit4MU/Qw8evAoe9OZRTwqCNVEpaC+Wpqle4gfiURobdvN8b9JdZ7a7k822C8u++b3fx87sZFqAlBc1jpfkTikHJ60Qer1pdac0SB9MOANyp7wwjY7eF49Q1/0iWhzJHsWJ5a/D+qSbcdedDoL0OgAHF+mCUVtivR6cFzCGXmqaLx4EcNtEoLSIQADZHFaXvweuCYrhZ0zeFT9U/FXNWIIsgzJ8MNL/7+tbRWF+L+Y51FLTQmEvdLyfvLYZ3Y9NPNiZ2Y/l5m8dt9VZqufPAmZ22UhBb92bCodKTzBc781Ro/gy4NoK8tZQHXsePSWiMzbudvUQ8RO/5nUHz60swdjoBKJzr79DtyvC9BFvyVBZnGl8Y6oXLvL5+5hnf8iUbW3Es/wGjnMTK81XvpOxq1XDGT3FxGc+YatP5SWeWqh4GjPWQ+hN/haPHxDQHh1PWiPgH+bewVrrUZQmNljIVD+WBw+fcPh4lDgO49APkKEbWFltxXPiOhs40YUszLcXOfzEAKpqc+hnqOZOI752bXzjG0cSP7bHGC9E9qLBAvQ10d0NdHDwGs7wbLNWF62puKzRoMhycDDRbKTSBibQ2DfXQukA/O3Kn8BNL8hCdTzycTkVfgc+LHqwYySH5aUf4Z4/3mToN9Sz414Nh/Lvssuhd6HauiS31ILpOqVhrY6Fa3sw0jVdoHYsOeNYW73PYXwE8s01CCa7Wb9CWr0ldWwwvS0d5l/ypC/gkIeQ2VfGWnPRx/ynwqQnnOCiyb5HABhFbDCQWmb2gl/oOJex2rqNlUbHUGsD6SmOcFnT/88kfrktwTTLBi8Ad5/E8yvPtQxrqbiiEW2C3W2Y0bt8js/qOQNMMRAP8YqS/gMbzegG1X8tjgAAAABJRU5ErkJggg==');
							$('.star4, .star5').attr('src','data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAcCAYAAAB2+A+pAAAAAXNSR0IArs4c6QAAAqNJREFUSA2tVk1rE0EYzrYbSKQXRYIfCaUiggaJJiH+AIsnL1poRQ+CBy8VvOivUA8evHgoeNCbRz3pH5B8HlIvYpG0VULxJBqMZn2eZWc7O5nZ7I5deJl33vf5yMzsTpvJWD6tVussw5KembMlgnc9CCsJa2PP81YYVq4gOTbEXq+3NB6PP5ObzWZPVSqVrbQ6ViuGKbfZf+Rc1JKMVsaO44RbLOdJDAUm9Va32+0TONtthM+FsYcoVqvVXSGaZEy9YhheE6Y0YM5aEjMZk9oY5PB8JSFdTWpPp6m2utlsHoXEN8S8IvUX82P1en1PqRunbrfbvYitOmRESI3JZLIMrGpKxDzOeb3T6byT4MYU2J8Orz2IvQLqghF5sI0ujG/O1Wq1j/l8/hImjxHewXrsq1GbHvSiZ+SM8alcxupfIE7uU/4/g+EO4jY+ufdCLWLMYr/fPzIajZ7DPLwkBNhmhOHrXC53t1wuf5f5U8aiidXfgflTxIKopRlh+ANxH6vc0PGMxgTjxTsN45dIGzpyTO0DTG/hLD+ZMLHGJMHYxep7GM+ZROQ6DDexygrGP3JdzWfeXPg2D8P0jEo0zYklx9QX9ZnGAPIlcwUhwUjszBdzpjFWcCOBWQSShBN7xribj+Os+Cdw6gei7l+P6C1HXDFBb4J6EXf3V7Un5lOCohGMq6opRH+j9wAv0BUG86AWUgPOaljQJLHGEFyTOZhvIhpYyROMvAK9IG+wp2AjXLnH3LjV+IQW8cu3ED4Gws8KhcLDUqn0SxXhfDAY5IfD4SPg1zkPftgSduUL5+pjXDEEuM3gO0OQruIyuGcypSh7xBBLDrnUYE/3xBnzbX7ruu55bOcbHVlXI5YccmGc7ovA/81FXJf+lunEk9aoQS0d/h/pAwlu3rYpxwAAAABJRU5ErkJggg==');
							break;
						case 4:
							$('.star1, .star2, .star3, .star4').attr('src','data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAcCAYAAAB2+A+pAAAAAXNSR0IArs4c6QAAArVJREFUSA2tVs1rE0EUf28TWr8uBQU/AqLGhAh+QWhrTECwePJiC1r0IHit4MU/Qw8evAoe9OZRTwqCNVEpaC+Wpqle4gfiURobdvN8b9JdZ7a7k822C8u++b3fx87sZFqAlBc1jpfkTikHJ60Qer1pdac0SB9MOANyp7wwjY7eF49Q1/0iWhzJHsWJ5a/D+qSbcdedDoL0OgAHF+mCUVtivR6cFzCGXmqaLx4EcNtEoLSIQADZHFaXvweuCYrhZ0zeFT9U/FXNWIIsgzJ8MNL/7+tbRWF+L+Y51FLTQmEvdLyfvLYZ3Y9NPNiZ2Y/l5m8dt9VZqufPAmZ22UhBb92bCodKTzBc781Ro/gy4NoK8tZQHXsePSWiMzbudvUQ8RO/5nUHz60swdjoBKJzr79DtyvC9BFvyVBZnGl8Y6oXLvL5+5hnf8iUbW3Es/wGjnMTK81XvpOxq1XDGT3FxGc+YatP5SWeWqh4GjPWQ+hN/haPHxDQHh1PWiPgH+bewVrrUZQmNljIVD+WBw+fcPh4lDgO49APkKEbWFltxXPiOhs40YUszLcXOfzEAKpqc+hnqOZOI752bXzjG0cSP7bHGC9E9qLBAvQ10d0NdHDwGs7wbLNWF62puKzRoMhycDDRbKTSBibQ2DfXQukA/O3Kn8BNL8hCdTzycTkVfgc+LHqwYySH5aUf4Z4/3mToN9Sz414Nh/Lvssuhd6HauiS31ILpOqVhrY6Fa3sw0jVdoHYsOeNYW73PYXwE8s01CCa7Wb9CWr0ldWwwvS0d5l/ypC/gkIeQ2VfGWnPRx/ynwqQnnOCiyb5HABhFbDCQWmb2gl/oOJex2rqNlUbHUGsD6SmOcFnT/88kfrktwTTLBi8Ad5/E8yvPtQxrqbiiEW2C3W2Y0bt8js/qOQNMMRAP8YqS/gMbzegG1X8tjgAAAABJRU5ErkJggg==');
							$('.star5').attr('src','data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAcCAYAAAB2+A+pAAAAAXNSR0IArs4c6QAAAqNJREFUSA2tVk1rE0EYzrYbSKQXRYIfCaUiggaJJiH+AIsnL1poRQ+CBy8VvOivUA8evHgoeNCbRz3pH5B8HlIvYpG0VULxJBqMZn2eZWc7O5nZ7I5deJl33vf5yMzsTpvJWD6tVussw5KembMlgnc9CCsJa2PP81YYVq4gOTbEXq+3NB6PP5ObzWZPVSqVrbQ6ViuGKbfZf+Rc1JKMVsaO44RbLOdJDAUm9Va32+0TONtthM+FsYcoVqvVXSGaZEy9YhheE6Y0YM5aEjMZk9oY5PB8JSFdTWpPp6m2utlsHoXEN8S8IvUX82P1en1PqRunbrfbvYitOmRESI3JZLIMrGpKxDzOeb3T6byT4MYU2J8Orz2IvQLqghF5sI0ujG/O1Wq1j/l8/hImjxHewXrsq1GbHvSiZ+SM8alcxupfIE7uU/4/g+EO4jY+ufdCLWLMYr/fPzIajZ7DPLwkBNhmhOHrXC53t1wuf5f5U8aiidXfgflTxIKopRlh+ANxH6vc0PGMxgTjxTsN45dIGzpyTO0DTG/hLD+ZMLHGJMHYxep7GM+ZROQ6DDexygrGP3JdzWfeXPg2D8P0jEo0zYklx9QX9ZnGAPIlcwUhwUjszBdzpjFWcCOBWQSShBN7xribj+Os+Cdw6gei7l+P6C1HXDFBb4J6EXf3V7Un5lOCohGMq6opRH+j9wAv0BUG86AWUgPOaljQJLHGEFyTOZhvIhpYyROMvAK9IG+wp2AjXLnH3LjV+IQW8cu3ED4Gws8KhcLDUqn0SxXhfDAY5IfD4SPg1zkPftgSduUL5+pjXDEEuM3gO0OQruIyuGcypSh7xBBLDrnUYE/3xBnzbX7ruu55bOcbHVlXI5YccmGc7ovA/81FXJf+lunEk9aoQS0d/h/pAwlu3rYpxwAAAABJRU5ErkJggg==');
							break;
						case 5:
							$('.star1, .star2, .star3, .star4, .star5').attr('src','data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAcCAYAAAB2+A+pAAAAAXNSR0IArs4c6QAAArVJREFUSA2tVs1rE0EUf28TWr8uBQU/AqLGhAh+QWhrTECwePJiC1r0IHit4MU/Qw8evAoe9OZRTwqCNVEpaC+Wpqle4gfiURobdvN8b9JdZ7a7k822C8u++b3fx87sZFqAlBc1jpfkTikHJ60Qer1pdac0SB9MOANyp7wwjY7eF49Q1/0iWhzJHsWJ5a/D+qSbcdedDoL0OgAHF+mCUVtivR6cFzCGXmqaLx4EcNtEoLSIQADZHFaXvweuCYrhZ0zeFT9U/FXNWIIsgzJ8MNL/7+tbRWF+L+Y51FLTQmEvdLyfvLYZ3Y9NPNiZ2Y/l5m8dt9VZqufPAmZ22UhBb92bCodKTzBc781Ro/gy4NoK8tZQHXsePSWiMzbudvUQ8RO/5nUHz60swdjoBKJzr79DtyvC9BFvyVBZnGl8Y6oXLvL5+5hnf8iUbW3Es/wGjnMTK81XvpOxq1XDGT3FxGc+YatP5SWeWqh4GjPWQ+hN/haPHxDQHh1PWiPgH+bewVrrUZQmNljIVD+WBw+fcPh4lDgO49APkKEbWFltxXPiOhs40YUszLcXOfzEAKpqc+hnqOZOI752bXzjG0cSP7bHGC9E9qLBAvQ10d0NdHDwGs7wbLNWF62puKzRoMhycDDRbKTSBibQ2DfXQukA/O3Kn8BNL8hCdTzycTkVfgc+LHqwYySH5aUf4Z4/3mToN9Sz414Nh/Lvssuhd6HauiS31ILpOqVhrY6Fa3sw0jVdoHYsOeNYW73PYXwE8s01CCa7Wb9CWr0ldWwwvS0d5l/ypC/gkIeQ2VfGWnPRx/ynwqQnnOCiyb5HABhFbDCQWmb2gl/oOJex2rqNlUbHUGsD6SmOcFnT/88kfrktwTTLBi8Ad5/E8yvPtQxrqbiiEW2C3W2Y0bt8js/qOQNMMRAP8YqS/gMbzegG1X8tjgAAAABJRU5ErkJggg==');
							break;
					}
					
					// 상품 총 개수
					$('.productNumLink').text('상품'+data.storeProdNum);
					
					// -개 상품 더보기
					$('.moreProdLink_Num').text((data.storeProdNum-2)+'개');
				},error: function(err){
					console.log(err);
				}
			 });// ajax 상점정보
			
			// 상점정보 (최근 올린 상품 2개 상품 이미지+제목)
			$.ajax({
				type: 'GET',
				url: '/market/product/getStoreProduct',
				data: {'seq':$('.hiddenProdSeq').val()}, 
				dataType: 'json',
				success : function(data){
					$.each(data.getStoreProdList, function(index, items){
						
						$('.storeInfo_productWrap').append($('<div/>',{
							class: 'storeInfo_product'
						}).append($('<a/>',{
							class: 'storeInfo_productLink'+index,
							href: '#'
						}).append($('<img/>',{
							src: '/market/storage/'+items.product_img1,
							width: '120',
							height: '96',
							alt: '상품 이미지'
						})).append($('<div/>', {
							class: 'storeInfo_productPrice'
						}).append($('<span/>', {
							text: items.product_price+'원'
						}))).append($('<div/>', {
							class: 'storeInfo_productDiv'
						}))))
						
						$('.storeInfo_productLink'+index).css({
													'position' : 'relative',
											    	'cursor' : 'pointer',
											    	'display' : 'block' });
						
						$('.storeInfo_productLink'+index).click(function(){
							location.href="/market/product/productDetail?seq="+items.product_seq;
						});
						
					});// each
				},error: function(err){
					console.log(err);
				}
			}); //ajax 최근 올린 상품 2개
			
			// ====================== 내상점 / 남의 상점 구분 ======================
			// 내(내상품관리) - 남(찜/연락버튼) 
			if($('.loginId').val() == dto.mem_id){
				$('.detail-info__btn-list').append($('<a/>', {
					class:'myProdManageBtn',
					href: '#',
					text: '내 상품 관리'
				}))
				
				$('.myProdManageBtn').click(function(){
					// 내 상점 관리로 가게 고치기!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
					location.href='/market/store/store';
				});
			}else if($('.loginId').val() != dto.mem_id){
				//찜, 연락버튼
				$('.detail-info__btn-list').append($('<div/>', {
					class: 'detail-info__btn-zzim__div'
				}).append($('<button/>',{
					class: 'detail-info__btn-zzim',
					id: 'zzimBtn'
						
				}).append($('<img/>', {
					src: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDE2IDE2Ij4KICAgIDxwYXRoIGZpbGw9IiNGRkYiIGZpbGwtcnVsZT0ibm9uemVybyIgZD0iTTcuMDA1IDEuMDQ1aC4yMzNjLjI4LjIyOC41MzcuNDkuNzYyLjc3Ny4yMjUtLjI4OC40ODEtLjU0OS43NjItLjc3N2guMjMzYTYuMTYgNi4xNiAwIDAgMC0uMDktLjExM0M5LjY4NC4zNDQgMTAuNjI4IDAgMTEuNiAwIDE0LjA2NCAwIDE2IDIuMTEgMTYgNC43OTZjMCAzLjI5Ni0yLjcyIDUuOTgxLTYuODQgMTAuMDYyTDggMTZsLTEuMTYtMS4xNTFDMi43MiAxMC43NzcgMCA4LjA5MiAwIDQuNzk2IDAgMi4xMSAxLjkzNiAwIDQuNCAwYy45NzIgMCAxLjkxNi4zNDQgMi42OTUuOTMyYTYuMTYgNi4xNiAwIDAgMC0uMDkuMTEzeiIvPgo8L3N2Zz4K',
					width: '16',
					height: '16',
					alt: '찜 아이콘'
						
				})).append($('<span/>',{
					class: 'zzimSpan',
					text: '찜'
						
				})).append($('<span/>', {
					class: 'zzimSpanNum'
					// DB
				}))
				)).append($('<form/>', {
					id: 'productDetailForm',
					method: 'post',
					action: '/market/chat/chatRoom',
					target: 'chatRoom'

				}).append($('<div/>', {
					class: 'detail-call__btn',
					id: 'callBtn',
					type: 'button'
						
				}).append($('<img/>', {
					src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAAy1JREFUWAndmM1LFVEYxp2bVxDsA0GhIoygAo2I7EKLoKJsYZG7iDYG/QNCUZvctSkIAqVFCze1toIWrkqynUaJ0VKUSkr7okubpG6/J+Zc5w7jzJ1zxnulFx7O1/s+7zMzZ86cOV5DlVYqlfK4HgN9oBNsA9tBC4izIoMLPt5SPgbjnuctU7obwtrBEPgOsjJxibPdWiHBTWAQ/ABrZeJWjqZUQgloAxOgVqZcbVWJxLETzNVKWSCPcmpuV5gXbOGgq5gEHcH+GtbnyVXgBVoyOXOmgjjNg1FQL3GSotyjvha1G8oCqV8DR9SZsc3C9y0FpzRIy4qhWEvJWrytY/AOgLQmLStLEA2tSVnbTQhbwUdL4qF/t5DgPMhyEf4J33mRU94BtiZNeZH02DJExGmpOOCL20d9OcInTVePXhJ9W7OwCUgOsUS89smGKRsdifsksMuRROEj4CTiPqvBLdIjPqq6o3XpCrUrsbU/BF5F2O0QwR7a90J9+2kfDvUlNbfqaotpJkXAV0vB6aQMGsfvHNDLk9aKCraxWYISpwY+Hrhhk8DEiOALF9lazZ0I+IS/DtM85kuBcV34RtoPwNlgf8r6VxHNGLUO5fFgYnh2gTcOfCZ0Rm+xtuMu9oi798wQwHyC+iRInAImJqZckMCpGIekoV84XDFOiBugPgbSThlDES6n9IgL5n5alLfESFwzuG8RnxRS0EuiTes7oD+0NLaI826wBTwEB0GW9gGyHTnmT4mKPktpbZCAbvASZC1OWoZ9beVH9D7pfgfGp6lfBq6bgQBlRVVamqWybHT0V7jEN+bih51H+8vCghVoR5yp3Qm08Yg2uPWz/sI9hzWDcsf/xOOgbfpT6xT2gcpZ3fqJYyO4a58rdaRypd/cEtQLsvhWr6ZY3L3RE67KXghy4CJ4Dn4DVxOHuMSpT22sVRx9xHoyCKGORs4AnaFoJy5oW7UXrHZOOM6YNiSCzgefsAAvUdbOEH4dRJkOL+tvKNsM5iMUfqq/Ol8B4rpB+BRBn8IN60lkB4LCb/2FdSNQQhCovaEOjF4B2SI4ta5EGjEIawE7wSbT99+VfwFl/vSZOTmkgQAAAABJRU5ErkJggg==',
					width: '20',
					height: '19',
					alt: '바다톡 버튼 아이콘',
				})).append('바다톡')))

				
				// 바다톡 연결
				$('#callBtn').click(function(){
					//변수 설정
					if($('.storeInfo_name').find('input').length == 0) { //중복 설정 방지
						$('.storeInfo_name').append($('<input/>', {
							type: 'hidden',
							name: 'other_store_nickname',
							value: $('.storeInfo_name').text()
						}))
						$('.storeInfo_name').append($('<input/>', {
							type: 'hidden',
							name: 'product_seq',
							value: $('.hiddenProdSeq').val()
						}))
						$('.storeInfo_name').append($('<input/>', {
							type: 'hidden',
							name: 'product_subject',
							value: dto.product_subject
						}))
					}
					
					window.open('', 'chatRoom', 'width=370 height=670');
					$('#productDetailForm').submit();
				})			

				
				
				// 찜 버튼 css
				$('.zzimSpan').css({'font-weight':'600', 'font-size':'18px'});
				
				//신고하기 버튼
				$('.detail-info__text-body-top').append($('<button/>',{
					class: 'detail_SingoBtn',
				}).append($('<img/>', {
					src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAbBJREFUeNrsls9LAkEcxb+au+JSGIEQyGbBdg881CmConsE9Qd07S/p0qG69RcUdOzSoUt0UujS3c0kEQULU7R17c2wyhazNbvaesgHH9xZh3kzb35tpNfrUV/5fJ7+Stls9ks5FqCNKTDv/L6AjyAdiUrWi4AdcAXewDMwwTu4AQdAHbXxCrh3TJm55vpPAVvgHDyC7VEZM6M7sCbRlgGuwaGM8U9zvAkunbn0M/8nzvNpkBHr4MKnqVvHYDWI8RGY84wpFiNFUX5L8sxZlNJRL4E9UeVkMknpdJoSiQQvt9ttKpfLVK1WhVsXbIBb2RHvi96nUikyDGNgyhSPxymTyZCu614D2/UT9bqooqZpnrm6OyNYoNLGy6KKxWKRR/td3W6XCoWCV/sLfoyFJ5Bt29zAfbb3O9TpdLzaZzFND3NkcjUaDapUKoNyvV6nWq0ms7eHM2YqlUrUarXIsiwyTTPwbeX7dmJRs8hVVeXmoRkzNZtNzjCK0pg0MQ5NosX1BKwRetjCb6lcLje2ES+GHDk72G1m/MCu2hCNZ8HrZDv9j33MVtlMiJ58X38KMADfFnDPWur9bAAAAABJRU5ErkJggg==',
					width: '15',
					height: '15',
					alt: '신고 아이콘'
				})).append('신고하기'))
				
			}//if-else
			
			
			// 해당 상품이 찜 받은 수
			$.ajax({
				type: 'GET',
				url: '/market/product/getZzimNum',
				data: {'seq':$('.hiddenProdSeq').val()}, 
				dataType: 'json',
				success : function(data){ 
					// 찜 값 넣어주기
					$('#zzim').text(data.zzimNum); 
					$('.zzimSpanNum').text(data.zzimNum);
					zzimNum = data.zzimNum;
				},error: function(err){
					console.log(err);
				}
			});// ajax 해당 상품 찜 받은 수

		},error: function(err){
			console.log(err);
		}
		
	}); // ajax getProductDetail
	
	// 찜 ----------------------------------------------------------------------------
	$.ajax({
		type: 'GET',
		url: '/market/product/zzimExistCheck',
		data: {'mem_id' : $('.loginId').val(),
			   'seq': $('.hiddenProdSeq').val()},
		dataType: 'json',
		success : function(data){ 
			if(data.wishDTO != null){
				// 내가 찜한 상품 (검정 배경  + 빨강하트)
				$('.detail-info__btn-zzim').attr('class', 'detail-info__btn-zzim_click');
				$('.detail-info__btn-zzim_click img').attr('src', 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDE2IDE2Ij4KICAgIDxwYXRoIGZpbGw9IiNGNzJGMzMiIGZpbGwtcnVsZT0ibm9uemVybyIgZD0iTTcuMDA1IDEuMDQ1aC4yMzNjLjI4LjIyOC41MzcuNDkuNzYyLjc3Ny4yMjUtLjI4OC40ODEtLjU0OS43NjItLjc3N2guMjMzYTYuMTYgNi4xNiAwIDAgMC0uMDktLjExM0M5LjY4NC4zNDQgMTAuNjI4IDAgMTEuNiAwIDE0LjA2NCAwIDE2IDIuMTEgMTYgNC43OTZjMCAzLjI5Ni0yLjcyIDUuOTgxLTYuODQgMTAuMDYyTDggMTZsLTEuMTYtMS4xNTFDMi43MiAxMC43NzcgMCA4LjA5MiAwIDQuNzk2IDAgMi4xMSAxLjkzNiAwIDQuNCAwYy45NzIgMCAxLjkxNi4zNDQgMi42OTUuOTMyYTYuMTYgNi4xNiAwIDAgMC0uMDkuMTEzeiIvPgo8L3N2Zz4K');
			}
			
			// 찜 누름 
			$('.detail-info__btn-list').on("click", '.detail-info__btn-zzim', function(){
				// 검정 배경  + 빨강하트
				$('.detail-info__btn-zzim').attr('class', 'detail-info__btn-zzim_click');
				$('.detail-info__btn-zzim_click img').attr('src', 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDE2IDE2Ij4KICAgIDxwYXRoIGZpbGw9IiNGNzJGMzMiIGZpbGwtcnVsZT0ibm9uemVybyIgZD0iTTcuMDA1IDEuMDQ1aC4yMzNjLjI4LjIyOC41MzcuNDkuNzYyLjc3Ny4yMjUtLjI4OC40ODEtLjU0OS43NjItLjc3N2guMjMzYTYuMTYgNi4xNiAwIDAgMC0uMDktLjExM0M5LjY4NC4zNDQgMTAuNjI4IDAgMTEuNiAwIDE0LjA2NCAwIDE2IDIuMTEgMTYgNC43OTZjMCAzLjI5Ni0yLjcyIDUuOTgxLTYuODQgMTAuMDYyTDggMTZsLTEuMTYtMS4xNTFDMi43MiAxMC43NzcgMCA4LjA5MiAwIDQuNzk2IDAgMi4xMSAxLjkzNiAwIDQuNCAwYy45NzIgMCAxLjkxNi4zNDQgMi42OTUuOTMyYTYuMTYgNi4xNiAwIDAgMC0uMDkuMTEzeiIvPgo8L3N2Zz4K');
				
				// 찜(+1) 업데이트 DB
				$.ajax({
					type: 'get',
					url: '/market/product/zzimInsert',
					data: {'mem_id' : $('.loginId').val(),
						   'seq': $('.hiddenProdSeq').val()}, 
					success : function(data){
						// 버튼누르자마자 찜 +1
						$('#zzim').text(Number($('#zzim').text())+1); 
						$('.zzimSpanNum').text(Number($('.zzimSpanNum').text())+1);
						
					},error: function(err){
						console.log(err);
					}
				});
				
				$('.detail-info__btn-zzim__div').append($('<div/>', {
				class:'zzimCheckMsg'
				}).append($('<img/>', {
					src: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNCIgaGVpZ2h0PSIxNCIgdmlld0JveD0iMCAwIDE0IDE0Ij4KICAgIDxwYXRoIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlPSIjMzMzIiBzdHJva2Utd2lkdGg9IjEuNSIgZD0iTTIuMTA2IDdsMy42NjMgNCA3LjAxNS04IiBvcGFjaXR5PSIuNDA2Ii8+Cjwvc3ZnPgo=',
					widht: '14',
					height: '14',
					alt: '찜 아이콘'
				})).append($('<span/>', {
					class:'zzimCheckMsgText',
					text: '상품을 찜 했습니다'
				})))
				// 찜 메시지 사라짐
				$('.zzimCancelMsg').css('display', 'none');
				$('.zzimCheckMsg').css('display', 'flex').delay(500).fadeOut(1000);
			});
			
			// 찜 해제
			$('.detail-info__btn-list').on("click", '.detail-info__btn-zzim_click', function(){
				$('.detail-info__btn-zzim_click').attr('class', 'detail-info__btn-zzim');
				$('.detail-info__btn-zzim img').attr('src','data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDE2IDE2Ij4KICAgIDxwYXRoIGZpbGw9IiNGRkYiIGZpbGwtcnVsZT0ibm9uemVybyIgZD0iTTcuMDA1IDEuMDQ1aC4yMzNjLjI4LjIyOC41MzcuNDkuNzYyLjc3Ny4yMjUtLjI4OC40ODEtLjU0OS43NjItLjc3N2guMjMzYTYuMTYgNi4xNiAwIDAgMC0uMDktLjExM0M5LjY4NC4zNDQgMTAuNjI4IDAgMTEuNiAwIDE0LjA2NCAwIDE2IDIuMTEgMTYgNC43OTZjMCAzLjI5Ni0yLjcyIDUuOTgxLTYuODQgMTAuMDYyTDggMTZsLTEuMTYtMS4xNTFDMi43MiAxMC43NzcgMCA4LjA5MiAwIDQuNzk2IDAgMi4xMSAxLjkzNiAwIDQuNCAwYy45NzIgMCAxLjkxNi4zNDQgMi42OTUuOTMyYTYuMTYgNi4xNiAwIDAgMC0uMDkuMTEzeiIvPgo8L3N2Zz4K');
			
				$('.detail-info__btn-zzim__div').append($('<div/>', {
					class:'zzimCancelMsg'
				}).append($('<img/>', {
					src: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNCIgaGVpZ2h0PSIxNCIgdmlld0JveD0iMCAwIDE0IDE0Ij4KICAgIDxwYXRoIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlPSIjMzMzIiBzdHJva2Utd2lkdGg9IjEuNSIgZD0iTTIuMTA2IDdsMy42NjMgNCA3LjAxNS04IiBvcGFjaXR5PSIuNDA2Ii8+Cjwvc3ZnPgo=',
					widht: '14',
					height: '14',
					alt: '찜 아이콘'
				})).append($('<span/>', {
					class:'zzimCheckMsgText',
					text: '찜이 해제 되었습니다'
				})))
				
				// 찜(-1) 업데이트 DB
				$.ajax({
					type: 'get',
					url: '/market/product/zzimDelete',
					data: {'mem_id' : $('.loginId').val(),
						   'seq': $('.hiddenProdSeq').val()}, 
					success : function(data){ 
						$('#zzim').text(Number($('#zzim').text())-1); 
						$('.zzimSpanNum').text(Number($('.zzimSpanNum').text())-1);
					}
					,error: function(err){
						console.log(err);
					}
				});
				
				$('.zzimCheckMsg').css('display', 'none');
				$('.zzimCancelMsg').css('display', 'flex').delay(500).fadeOut(1000);
			});// 찜 해제

		},error: function(err){
			console.log(err);
		}
	}); // 찜 zzimExistCheck
	
	
	
	// 카테고리 (대분류/소분류) ---------------------------------------------------------
	$.ajax({
		type: 'GET',
		url: '/market/product/getProdCateName',
		data: {'seq':$('.hiddenProdSeq').val()}, 
		dataType: 'json',
		success : function(data){ // categoryDTO
			var cateDTO = data.categoryDTO;
			
			$('.cateSmallText').append(cateDTO.cate_name);
			
			// 소분류 - 대분류 이름으로 소분류 카테 조회
			$('.cateSmallSelect').on({
			    mouseenter : function (){
			    	$('.cateSmallOpen').css('display', 'block'); //리스트 펼치기
			    	
			    	$.ajax({
			    		type: 'POST',
			    		url: '/market/product/getSmallCategoryList',
			    		data: {'cate_parent':cateDTO.cate_parent}, 
			    		dataType: 'json',
			    		success : function(data){
			    			$('.cateSmallOpen > a').remove();
			    			
			    			$.each(data.list, function(index, items){
			    				$('.cateSmallOpen').append($('<a/>', {
			    					class: 'smallcate_open',
			    					text: items.cate_name
			    				}))
			    			});
			    			
			    			var smallcate = $('.cateSmallOpen').children('a');
							
							for(var i=0; i < $('.cateSmallOpen').children().length; i++){
								if(smallcate.eq(i).text() == cateDTO.cate_name) smallcate.eq(i).css('color', 'rgb(10, 88, 202)');
							}//for
			    		},error: function(err){
							console.log(err);
						}
					});
				},mouseleave : function (){
					$('.cateSmallOpen').css('display', 'none');
				}
			});	// 소분류 
			
			// 지금 보고있는 상품의 대분류 이름 
			$.ajax({
				type: 'GET',
				url: '/market/product/getProdBigCate',
				data: {'cate_code': cateDTO.cate_parent}, 
				dataType: 'json',
				success : function(data){
					$('.cateBigSelectText').append(data.bigCateName);

					// 대분류
					$('.cateBigSelect').on({
					    mouseenter : function (){
					    	$('.cateBigOpen').css('display', 'block'); //리스트 펼치기
					    	
					    	var cateList = $('.cateBigOpen').children('a');
						
							for(var i=0; i<12;i++){
								if(cateList.eq(i).text() == data.bigCateName) cateList.eq(i).css('color', 'rgb(10, 88, 202)');
							}//for
						},mouseleave : function (){
							$('.cateBigOpen').css('display', 'none');
						}
					});	// 대분류 
					
				},error: function(err){
					console.log(err);
				}
			});
			
			$('.detailContent_cate').text(cateDTO.cate_name); // 하단 상품정보 - 카테고리 이름
			
		},error: function(err){
			console.log(err);
		}
	});// 카테고리 ajax
	
	// 신고하기  모달 -------------------------------------------------------------------
	$('.detail-info__text-body').on("click", '.detail_SingoBtn', function(){		   
		   $("#modalHidden").attr('id','modalDisplay'); 
		  	   
		   $('.contentList>button').mouseenter(function(){
		      $(this).css('text-decoration', 'underline');
		     
		      $(this).off("click").click(function(){ //클릭 이벤트 중복호출 방지
		    	  $.ajax({
						type : 'post',
						url : '/market/member/complain',
						data: {reporter_id: $('.loginId').val(),
								complain_content : $(this).text(),
								product_seq : $('.hiddenProdSeq').val(),
								complain_category : '상품 신고',
								mem_id: $('.storeOwner').val(),
						},success: function(){
							alert("신고가 성공적으로 접수되었습니다.")
						},error: function(err){
							console.log(err)
						}
					});//ajax
		      });//this click
		   
		      $(this).mouseleave(function(){
		         $(this).css('text-decoration', 'none');
		      });
		   });//mouseenter
		   
		   //기타 사유 서술했을 때
		   $('#complainReasonBtn').click(function(){
			   $.ajax({
					type : 'post',
					url : '/market/member/complain',
					data: {reporter_id: $('.loginId').val(),
							complain_content : $('#complainReason').val(),
							product_seq : $('.hiddenProdSeq').val(),
							complain_category : '상품 신고',
							mem_id: $('.storeOwner').val(),
					},success: function(){
						alert("신고가 성공적으로 접수되었습니다.")
					},error: function(err){
						console.log(err)
					}
				});//ajax
		   });
		   
		   
		   
	   // 신고 카테고리 펼치기
	   $('#singoModalBottom').on("click", '.singoTitle > .titleBtn', function(){
	      $(this).parent().attr('class','singoTitleOpen'); //$(this).parent() == $(".singoTitle")
	      var className = $(this).parent().next().attr('class');
	     
	      if(className == 'singoContentOther'){ // height=180;인 애만 따로 처리
	         $(this).parent().next().attr('class','singoContentOtherOpen');
	      }else if(className == 'singoContent') {
	         $(this).parent().next().attr('class','singoContentOpen'); 
	      }
	      
	      // 닫기 (다시 클릭)
	      $('#singoModalBottom').on("click", '.singoTitleOpen > .titleBtn', function(){
	         $(this).parent().attr('class','singoTitle');
	         
	         if(className == 'singoContentOtherOpen' || className =='singoContentOther'){
	            $(this).parent().next().attr('class', 'singoContentOther');
	         }else if(className == 'singoContentOpen' || className=='singoContent'){
	            $(this).parent().next().attr('class', 'singoContent');            
	         }
	      });
	   });//신고 카테고리 펼치기
	   
	   // 모달 창 닫기 modalCloseBtn
	   $('.singoModalWrap').on("click", '.modalCloseBtn', function(){
	      var openInBtn = $('.singoTitleOpen>button');
	      var className = openInBtn.parent().next().attr('class'); //위의 className과 관련없음
	      
	      $(openInBtn).parent().attr('class','singoTitle');
	      
	      if(className == 'singoContentOtherOpen' || className =='singoContentOther'){
	         $(openInBtn).parent().next().attr('class', 'singoContentOther');
	      }else if(className == 'singoContentOpen' || className=='singoContent'){
	         $(openInBtn).parent().next().attr('class', 'singoContent');            
	      }
	      
	      $("#modalDisplay").attr('id','modalHidden'); 
	      });
	   
	   //글자수 카운팅
		$('#complainReason').keyup(function(){
			let content = $(this).val();
			$('#counter').html(content.length);
			
			if(content.length>200){
				$('#textCounterDiv').text("입력 가능한 글자 수를 초과했습니다.");
				$(this).val(content.substring(0, 200)); //글자수 초과하면 안써지게
			}
		});
	}); // 신고모달
	
	
	// 확대 버튼
	$('.detail-info__image--enlg').click(function(){
		console.log("확대버튼클릭..");
		$('.prodDetailImgWrap1').css('display', 'flex');
		
		$('.detailImg_closeBtn').click(function(){
			$('.detailImgList_0, .detailImgList_1, .detailImgList_2, .detailImgList_3, .detailImgList_3').attr('class', 'detailImgList');
			$('.prodDetailImgWrap1').css('display', 'none');
		})
	});
	
}) ;// $(document).ready







// 연관상품 - 페이징 처리
function relProdPaging(pg){
	// 연관상품 - 같은 카테고리 상품들, 페이징처리
	$.ajax({
		type: 'GET',
		url: '/market/product/getRelatedProducts',
		data: {'seq':$('.hiddenProdSeq').val(),
				'pg': pg}, 
		dataType: 'json',
		success : function(data){ // relProdList
			
			$('.relProd_ImgList > *').remove();
			
			$.each(data.relProdList, function(index, items){
					$('.relProd_ImgList').append($('<div/>',{
						class: 'relProd_ImgWrap'+index
					}).append($('<a/>',{
						href: '#',
						class: 'relProd_link'
					}).append($('<div/>', {
						class: 'relProd_Img'
					}).append($('<img/>', {
						src: '/market/storage/'+items.product_img1,
						widht: '155',
						height: '155',
						alt: '상품이미지'
					})).append($('<div/>',{
						class: 'relPord_ImgDiv'
					}))).append($('<div/>', {
						class: 'relProd_ImgTitle',
						text: items.product_subject
					}))))
					console.log("상품번호"+items.product_seq);
							
					$('.relProd_ImgWrap'+index).css({'width': '159px',
												     'margin-right': '14px',
												     'flex-shrink': '0'});	
					
					// 클릭 -> 상세페이지 이동
					$('.relProd_ImgWrap'+index).click(function(){
						$('.relProd_ImgWrap'+index+'> a').attr('href','/market/product/productDetail?seq=' + items.product_seq);
					});		
							
					// 6장 이하일때		
					if(data.relProdList.length>=6) $('#relProdPagingDiv').html(data.relProdPaging.pagingHTML);	
					
			});//each
			
		},error: function(err){
			console.log(err);
		}
	});// 연관상품 ajax
	
	
}


// ----------------- URL 공유 --------------------
// 공유 링크
function initShareBtn() {
	const $shareUrlBtn = $('#shareUrlBtn');
	const $shareTwitterBtn = $('#shareTwitterBtn');
	const $shareFacebookBtn = $('#shareFacebookBtn');
	
	$shareUrlBtn.click(copyUrl);
	
	const viewCount = $('#viewCount').text().trim();
	const commentCount = $('.detail-comment__header').children('.detail--empha').text().trim();
	const zzimCount = $('#zzimCount').text().trim();
	
	/* 카테고리를 해쉬태그로 바꾸는 부분 */
	let descriptionMsg = '';
	$('.detail-menu-cbox__display').each((i, e) => {
		descriptionMsg += '#'+e.innerText + ' '
	});
	descriptionMsg = descriptionMsg.substring(0, descriptionMsg.length-1);
		
	    
	/* url복사 */
	function copyUrl() {
		
		const msgArea = document.getElementsByClassName('url__msg')[0];
		msgArea.innerText = '복사중...';
		
		const tempInput = document.createElement('input');
		tempInput.value = window.document.location.href;
		this.appendChild(tempInput);
		tempInput.select();
		document.execCommand("copy"); // 클립보드에 복사합니다.
		
		this.removeChild(tempInput); // 선택된 것을 다시 선택안된 것으로 바꿈니다.
		msgArea.innerText = '복사 완료!';
	}
}




