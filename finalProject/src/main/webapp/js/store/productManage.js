// 기본
$(document).ready(function(){
	$.ajax({
		type: 'GET',
		url: '/market/store/productManageList',
		data: {'mem_id' : $('.loginId').val(), // 상점 주인의 아이디
			   'pg' : $('#pg').val(),
			   'product_manage': $('.hiddenProdMange').val()}, 
		dataType: 'json',
		success : function(data){ 
			
			$('#prodMangeTbody > tr').remove();
			
			// 상품 리스트 
			$.each(data.productManageList, function(index, items){
				   $('<tr/>').append($('<td/>'
					).append($('<a/>', {
						href: '#'
				   }).append($('<img/>',{
						src: '/market/storage/'+items.product_img1, 
						alt: '상품이미지'
				})))).append($('<td/>'
					).append($('<div/>', {
						class: 'tabSortProdWrap1_'+index,
						style: 'position: relative;box-sizing: border-box;'
				   }).append($('<div/>', {
						class: 'tabSortProdWrap2_'+index, 
						style: 'width: 100%;height: 3rem;display: flex;border: 1px solid rgb(195, 194, 204);border-radius: 2px;'
				   }).append($('<div/>', {
						class: 'tabSortProdTitle'
				   }).append($('<div/>', {
						class: 'tabSortProdText'+index, // 현재 상품 상태
						style: 'color: rgb(51, 51, 51);margin-left: 2px; margin-right: 2px;max-width: calc(100% - 8px);overflow: hidden;position: absolute;text-overflow: ellipsis;white-space: nowrap;top: 50%;transform: translateY(-50%);box-sizing: border-box;'
				  })).append($('<input/>', {
				 }))).append($('<div/>', {
						class: 'tabSortProdBtn'+index,
						style: 'background-position: 0px center; background-repeat: no-repeat; background-size: 1rem 1rem;width: 2rem;height: 100%;background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDE2IDE2Ij4KICAgIDxwYXRoIGZpbGw9IiM1RTVDNkIiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTAgNC44YzAgLjIyOS4wOTguNDQ2LjI3LjU5OGw3LjIgNi40YS44LjggMCAwIDAgMS4wNjEgMGw3LjItNi40YS44LjggMCAxIDAtMS4wNjItMS4xOTVMOCAxMC4xMyAxLjMzMSA0LjIwM2EuOC44IDAgMCAwLTEuMzMuNTk3Ii8+Cjwvc3ZnPgo=);'
			   }))))).append($('<td/>'
				    ).append($('<a/>', {
						href: '#',
						text: items.product_subject
				 }))).append($('<td/>', {
						text: items.product_price.toLocaleString()+'원'
				  })).append($('<td/>', {
					    class: 'favorites'+index
				  })).append($('<td/>', {
						text: items.product_logtime
				  })).append($('<td/>'
					).append($('<button/>', {
						type: 'button',
						class: 'upBtn'+index,
						text: 'UP'
				  })).append($('<a/>', {
						class: 'editBtn',
						href: '#',
						text: '수정'
				  })).append($('<button/>',{
						type: 'button',
						class: 'deleteBtn'+index,
						text: '삭제'
				 }))).appendTo($('#prodMangeTbody'))
				
				var product_img1 = items.product_img1;
				 
				// 페이징 처리				
				$('#storePagingDiv').html(data.storePaging.pagingHTML);	
				
				// [UP]버튼  
				$('.upBtn'+index).css({'width': '3.25rem',
									   'height': '2rem',
									   'text-align': 'center',
									   'border-radius': '2px',
									   'border': '1px solid rgb(195, 194, 204)',
									   'color': 'rgb(255, 80, 88)',
									   'margin-bottom': '0.5rem' });	
				
				$('.upBtn'+index).click(function(){
					// 상태변경 모달  
					$('#conditionModal').css('display', 'flex');
					
					if(items.product_manage == 2 || items.product_manage == 3){
						$('.condiModalTopText > p').html('<h6>예약 중/판매완료 상품은<br><strong>UP하기</strong>를 이용할 수 없습니다.</h6>');
					}else if(items.product_manage == 1){ // 판매 중
						$.ajax({
							type: 'get',
							url: '/market/store/productUp',
							dataType: 'json',
							data: { 'mem_id': userId, // 상점 주인의 아이디 
							        'product_seq': items.product_seq}, // UP할 상품의 번호items.product_seq
							success : function(data){ 
								if(data.cookieNum == '0'){
									$('.condiModalTopText > p').html('<h5>오늘의 <strong>UP하기</strong>를<br>모두 사용하였습니다.</h5>');
								}else if(data.cookieNum != '0'){
									$('.condiModalTopText > p').html('<h4><strong>UP하기 사용!</strong></h4><h5>(오늘 남은 UP하기 <strong>'+data.cookieNum+'</strong>개)</h5>');
								}
							},error: function(err){
								console.log(err);
							}
						});//ajax
					}
				 	// 확인 버튼 클릭 (모달 닫기)
					$('.modalBottomBtn').on({
						click : function(){
							$('#conditionModal').css('display', 'none');
							return false; // 새로고침 방지
						}
					});
				});// [UP] 버튼
				
				// [삭제] 버튼 
				$('.deleteBtn'+index).css({'width': '3.25rem',
									    'height': '2rem',
									    'text-align': 'center',
									    'border-radius': '2px',
									    'border': '1px solid rgb(195, 194, 204)',
									    'color': 'black',
									    'font-size': '10pt'});
				$('.deleteBtn'+index).click(function(){
					$.ajax({
						type: 'get',
						url: '/market/store/existProd',
						dataType: 'json',
						data: { 'mem_id': userId, // 상점 주인의 아이디 
						        'product_seq': items.product_seq},
						success : function(data){
							if(data.productDTO == null){
								$('#conditionModal').css('display', 'flex');	
								$('.condiModalTopText > p').text('삭제된 상품입니다.');
								
							}else if(data.productDTO != null){
								$('#deleteModal').css('display', 'flex'); // '상품을 삭제하시겠습니까?' 
								
								// [취소][확인] 
							 	$('.dltModalCancelBtn, .dltModalOkBtn').on({
									click : function(){
										$('#deleteModal').css('display', 'none');

										// [확인] - 삭제하겠다
										if($(this).attr('class') == 'dltModalOkBtn'){
											$.ajax({
												type: 'get',
												url: '/market/store/productDlt',
												dataType: 'json',
												data: { 'mem_id': userId, // 상점 주인의 아이디 
												        'product_seq': items.product_seq},
												success : function(data){
													console.log(data);
												},error: function(err){
													console.log(err);
												}
											});
											// 두 번째 모달
											$('#conditionModal').css('display', 'flex');	
											$('.condiModalTopText > p').text('상품이 삭제되었습니다');
										}// if
									}// click
								});	// [취소][확인]
							}
							// [확인] 버튼 클릭
							$('.modalBottomBtn').on({
								click : function(){
									$('#conditionModal').css('display', 'none');
									return false; // 새로고침 방지
								}
							});
						},error: function(err){
							console.log(err);
						}
					});
				});// [삭제] 버튼
				
				// 각 상품의 찜 개수 - DB
				$.ajax({
					type: 'post',
					url: '/market/store/favoritesOfProd',
					data: { 'mem_id': userId, // 상점 주인의 아이디 
						    'product_seq': items.product_seq}, // 찜 수 구할 상품의 번호
					success : function(data){
						$('.favorites'+index).text(data);
					},
					error: function(err){
						console.log(err);
					}
				});
	
				// [판매상태] input 테두리 마우스 오버  & 포커스  
				$('.tabSortProdWrap2_'+index).on({
				    mouseenter : function (){
						$(this).css('border', '1px solid black');
					},//mouseenter				
					mouseleave : function (){
						$(this).css('border', '1px solid rgb(195, 194, 204)');
					}
				});		
	 	
				// [판매상태] 클릭 - 상태리스트 띄우기, 상태변경
				$('.tabSortProdWrap1_'+index).on("click", '.tabSortProdWrap2_'+index, function(){
					// 화살표 ∨ --> ∧
					$('.tabSortProdBtn'+index).css('background-image', 'url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDE2IDE2Ij4KICAgIDxwYXRoIGZpbGw9IiM1RTVDNkIiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTE2IDExLjJhLjc5NS43OTUgMCAwIDAtLjI2OS0uNTk4bC03LjItNi40YS44LjggMCAwIDAtMS4wNjIgMGwtNy4yIDYuNGEuOC44IDAgMSAwIDEuMDYyIDEuMTk1TDggNS44NjlsNi42NjkgNS45MjhhLjguOCAwIDAgMCAxLjMzLS41OTgiLz4KPC9zdmc+Cg==)');
					
					// wrap2 -> wrap2_click
					$('.tabSortProdWrap2_'+index).attr('class', 'tabSortProdWrap2_'+index+'_click');
					$('.tabSortProdWrap2_'+index+'_click').css({'width' : '100%',
																'height' : '3rem',
																'display' : 'flex',
																'border' : '1px solid rgb(30, 29, 41)',
																'border-radius' : '2px'});	
					// 상태 List
					$('.tabSortProdWrap2_'+index+'_click').append($('<div/>', {
						class: 'btnListWrap'
					}).append($('<div/>', {
						class: 'btnList'+index,
						style: 'max-height: 12.5rem;overflow-y: scroll;'
					}).append($('<div/>', {
						class: 'nowCondition'+index,
						text: '판매 중',
						tabindex: '-1',
					})).append($('<div/>', {
						class: 'defaultList'+index, 
						text: '예약 중',
						tabindex: '-1',
					})).append($('<div/>', {
						class: 'defaultList'+index, 
						text: '판매완료',
						tabindex: '-1',
					}))));
					
					// # nowCondition & defaultList CSS
					$('.nowCondition'+index).css({'width': '100%',
												  'height': '2.5rem',
											      'display': 'flex',
											      '-webkit-box-align': 'center',
											      'align-items': 'center',
											      'padding': '0px 0.7rem',
											      'background': 'rgb(234, 233, 241)',
											      'color': 'rgb(30, 29, 41)'});
					
					$('.defaultList'+index).css({'width': '100%',
											     'height': '2.5rem',
											     'display': 'flex',
											     '-webkit-box-align': 'center',
											     'align-items': 'center',
											     'padding': '0px 0.7rem',
											     'color': 'rgb(94, 92, 107)' });

					
					// [판매 상태] - defaultList -> nowCondition + 현재 상태 찐회색 배경
					var listChildren = $('.tabSortProdWrap2_'+index+'_click .btnList'+index).children('div');
					var divChange = 0;
					if(items.product_manage == 2){
						divChange = 1; // 예약 중
					}else if(items.product_manage == 3){
						divChange = 2; // 판매완료
					}
					
					listChildren.eq(divChange).attr('class', 'nowCondition'+index);
					listChildren.eq(divChange).css('background', 'rgb(234, 233, 241)');
					listChildren.eq(divChange).css('color', 'rgb(30, 29, 41)');
					
					listChildren.eq(divChange).prevAll().attr('class', 'defaultList'+index);
					listChildren.eq(divChange).nextAll().attr('class', 'defaultList'+index);
					
					$('.defaultList'+index).css('background', 'rgb(255, 255, 255)');
					$('.defaultList'+index).css('color', 'rgb(94, 92, 107)');
					
					// 상태 리스트 마우스 오버  & 마우스리브
					// ( 현재 상태 : nowList(찐회색) -> 마우스오버(연회색) / 기본 : defaultList(흰색) -> 마우스오버(연회색) )
					$('.nowCondition'+index+', .defaultList'+index).on({
						mouseenter : function (){
							$(this).css('background', 'rgb(246, 245, 250)');
							$(this).css('color', 'rgb(30, 29, 41)');
							
							// 클릭 시 바로 리스트 사라짐-> 모달 창 띄우기
							$(this).click(function(){
								
								// 판매상태 변경 
								var submit_product_manage = items.product_manage; //디폴트는 기존 상태 값
								
								if($(this).attr('class') == 'nowCondition'+index){
									$('.condiModalTopText > p').html('상품이 삭제되었거나<br>상품의 판매 상태가 변경하시려는 <br>판매 상태와 같습니다.'); 
								}else if($(this).text() == '판매 중'){ 
									$('.condiModalTopText > p').html('상태가 변경되었습니다.');
									submit_product_manage = 1;
								}else if($(this).text() == '예약 중'){
									$('.condiModalTopText > p').html('상태가 변경되었습니다.');
									submit_product_manage = 2;
								}else if($(this).text() == '판매완료'){
									submit_product_manage = 3;
									
									// 판매완료 모달 ================================================================
									$('#soldOutModal').css('display', 'flex');
									// 상품 이미지, 상품명
									$('.itemImgWrap > img').attr('src', '/market/storage/'+items.product_img1);
									$('.itemName').text(items.product_subject);
									// 상품번호 
									var chat_product_seq= items.product_seq;
									
									// 채팅방 리스트 
									$.ajax({
										type: 'get',
										url: '/market/store/getChatList',
										data: { 'mem_id': userId }, 
										dataType: 'json',
										success : function(data){ //chatList
											
											if(data.chatList == ''){
												// 대화목록 없음
												$('.chatListWrap').append($('<div/>',{
													class: 'noChatList',
													text: '대화 목록이 없습니다.'
												}))
												$('.soldOutModalCancelBtn').click(function(){
													$('#soldOutModal').css('display', 'none');
												})
											}else if(data.chatList != ''){
												// 대화목록 있음
												$('.chatListWrap > .chatOne').remove();
												
												$.each(data.chatList, function(index, items){
													$('.chatListWrap').append($('<div/>', {
														class: 'chatOne'
													}).append($('<div/>', {
														class: 'chat_storeImg'
													}).append($('<img/>', {
														src: '/market/storage/'+items.other_store_img,
														width: '48',
														alt: '프로필 이미지', // style="height: 48px;">
														id: 'storeImg'+index
													}))).append($('<div/>', {
														class: 'chat_storeInfo'
													}).append($('<div/>', {
														class: 'chat_storeName'+index,
														text: items.other_store_nickname
													})).append($('<div/>', {
														class: 'chat_lastLogtime',
														text: '마지막 대화 '+items.chat_logtime
													}))))
													
													$('.chat_storeName'+index).css({'margin-top': '10px',
																					'display': 'block',
																					'font-weight': 'bold',
																					'cursor': 'pointer'});
													
													
													$('.chat_storeName'+index+', #storeImg'+index).click(function(){
														
														$('#soldOutModal').css('display', 'none');
														
														// 상점명으로 상대방 상점 아디 구하기
														$.ajax({
															type: 'get',
															url: '/market/store/getStoreNick',
															data: {'other_store_nickname': items.other_store_nickname},
															dataType: 'json',
															success : function(data){ 
																console.log(data.other_mem_id); // 채팅리스트에서 선택한 사람의 아이디
																var other_mem_id = data.other_mem_id;
																// purchase 거래 완료했는지 테이블 조회 ====================================
																$.ajax({
																	type: 'get',
																	url: '/market/store/purchaseCompleted',
																	data: { 'seller_id': userId, // 내아이디(판매자)
																		    'pur_nick': other_mem_id, // 구매자 아이디
																		    'product_seq': chat_product_seq}, // 해당 상품 번호
																	dataType: 'json',
																	success : function(data){ 
																		if(data.purchaseExistDTO == null){
																			// 거래 내역 테이블에 없으면
																			// purchase - DB 테이블 데이터 삽입
																			$.ajax({
																				type: 'get',
																				url: '/market/store/purchaseInsert',
																				data: { 'seller_id': userId, // 내아이디(판매자)
																					    'pur_nick': other_mem_id, // 구매자 아이디
																					    'product_seq': chat_product_seq}, // 해당 상품 번호
																				success : function(data){ 
																					// 거래 완료
																					// 확인 모달
																					$('.condiModalTopText > p').html('<strong>'+items.other_store_nickname+'</strong>님과의<br>거래가 완료되었습니다.');
																					$('#conditionModal').css('display', 'flex');
																				},
																				error: function(err){
																					console.log(err);
																				}
																			});// ajax
																		}else if( data.purchaseExistDTO!=null){ 
																			// 이미 거래내역 테이블에 있으면
																			alert("거래내역이 존재합니다.");
																		}
																		
																		
																	},
																	error: function(err){
																		console.log(err);
																	}
																});// ajax
																														
															},
															error: function(err){
																console.log(err);
															}
														});// ajax
														
														/*// 확인 모달
														$('.condiModalTopText > p').html('<strong>'+items.other_store_nickname+'</strong>님과의<br>거래가 완료되었습니다.');
														$('#conditionModal').css('display', 'flex');*/
													})
													
												});// each
												
												$('.soldOutModalCancelBtn').click(function(){
													$('#soldOutModal').css('display', 'none');
												})
											}//else if
											
										},
										error: function(err){
											console.log(err);
										}
									});// ajax\
								}// 판매 완료 클릭 =================================================================
			
								// DB
								$.ajax({
									type: 'get',
									url: '/market/store/prodManageUpdate',
									data: { 'mem_id': userId, // 상점 주인의 아이디 
										    'product_seq': items.product_seq, // 해당 상품
										    'product_manage' : submit_product_manage}, // 해당 상품의 변경 상태
									success : function(data){
										//console.log(data); //업뎃확인용
									},
									error: function(err){
										console.log(err);
									}
								});// ajax

								// 리스트 닫기
								$('.tabSortProdWrap2_'+index+'_click > .btnListWrap').remove();
								$('.tabSortProdWrap2_'+index+'_click').attr('class', 'tabSortProdWrap2_'+index);
								$('.tabSortProdWrap2_'+index).css('border', '1px solid rgb(195, 194, 204)');
								$('.tabSortProdBtn'+index).css('background-image', 'url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDE2IDE2Ij4KICAgIDxwYXRoIGZpbGw9IiM1RTVDNkIiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTAgNC44YzAgLjIyOS4wOTguNDQ2LjI3LjU5OGw3LjIgNi40YS44LjggMCAwIDAgMS4wNjEgMGw3LjItNi40YS44LjggMCAxIDAtMS4wNjItMS4xOTVMOCAxMC4xMyAxLjMzMSA0LjIwM2EuOC44IDAgMCAwLTEuMzMuNTk3Ii8+Cjwvc3ZnPgo=)');
																
								// 모달 - 판매완료 제외
								if(submit_product_manage!=3){
									$('#conditionModal').css('display', 'flex');
								}
								
								$('.modalBottomBtn').on({
									click : function(){
										$('#conditionModal').css('display', 'none');
										return false; // 새로고침 방지
									}
								});	
								
								
							});// 상태 클릭
						}, // mouseenter		
						mouseleave : function (){
							if($(this).attr('class') == 'nowCondition'+index){
								$(this).css('background', 'rgb(234, 233, 241)');
							}else if($(this).attr('class') == 'defaultList'+index){
								$(this).css({'background':'rgb(255, 255, 255)',
											 'color':'rgb(94, 92, 107)'});
							}
						}//mouseleave
					});	//마우스오버  & 마우스리브
					
					// 리스트 닫기 (2가지)
					// - [판매상태] 한번 더 클릭 시 리스트 닫기
					$('.tabSortProdWrap1_'+index).on("click", '.tabSortProdWrap2_'+index+'_click', function(){
						$('.tabSortProdWrap2_'+index+'_click > .btnListWrap').remove();
						$('.tabSortProdWrap2_'+index+'_click').attr('class', 'tabSortProdWrap2_'+index);
						$('.tabSortProdBtn'+index).css('background-image', 'url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDE2IDE2Ij4KICAgIDxwYXRoIGZpbGw9IiM1RTVDNkIiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTAgNC44YzAgLjIyOS4wOTguNDQ2LjI3LjU5OGw3LjIgNi40YS44LjggMCAwIDAgMS4wNjEgMGw3LjItNi40YS44LjggMCAxIDAtMS4wNjItMS4xOTVMOCAxMC4xMyAxLjMzMSA0LjIwM2EuOC44IDAgMCAwLTEuMzMuNTk3Ii8+Cjwvc3ZnPgo=)');
					});
					// - 다른 영역 클릭 시 리스트 닫기
					$(document).click(function(e){
						var parent = $(e.target).parent()[0].className;
						if(parent == 'tabSortProdWrap2_'+index+'_click' || parent == 'tabSortProdTitle' || parent == 'btnList'){
							return false;
							}
						else{
						$('.tabSortProdWrap2_'+index+'_click > .btnListWrap').remove();
						$('.tabSortProdWrap2_'+index+'_click').attr('class', 'tabSortProdWrap2_'+index);
						$('.tabSortProdBtn'+index).css('background-image', 'url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDE2IDE2Ij4KICAgIDxwYXRoIGZpbGw9IiM1RTVDNkIiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTAgNC44YzAgLjIyOS4wOTguNDQ2LjI3LjU5OGw3LjIgNi40YS44LjggMCAwIDAgMS4wNjEgMGw3LjItNi40YS44LjggMCAxIDAtMS4wNjItMS4xOTVMOCAxMC4xMyAxLjMzMSA0LjIwM2EuOC44IDAgMCAwLTEuMzMuNTk3Ii8+Cjwvc3ZnPgo=)');
						}
					 });
				}); // [판매상태] 클릭 이벤트
				
				// 판매상태  - 타이틀 설정
				// product_manage 별 분류 1:판매중 2:예약중 3:판매완료
				if( items.product_manage == 1 ){
					$('.tabSortProdText'+index).text('판매 중');
				// 기본 nowCondition은 판매중
				}else if(items.product_manage == 2 ){
					$('.tabSortProdText'+index).text('예약 중');
					$('.tabSortProdWrap2_'+index+'_click .btnList'+index).children('div').eq(1).attr('class', 'nowCondition'+index);
				}else if( items.product_manage == 3 ){
					$('.tabSortProdText'+index).text('판매완료');
				}
			});//each
		},//success
		error: function(err){
			console.log(err);
		}
	});//ajax
	
	
});// $(document).ready - 상품 리스트 출력


// 2. 검색 ******************************************************************************************************
$('#productSearchBtn').click(function(event, str){
	if($('input[name=hiddenVal]').val() != 'research') {
		// 직접 검색 버튼 눌렀을 때
		$('input[name=pg]').val(1);
	}else {
		// research일 때
		// 페이징 넘겼을 때 검색과 같은 효과
		$('input[name=hiddenVal]').val('');
		$('input[name=pg]').val($('input[name=pg]').val());
	}
	
	$.ajax({
		type: 'get',
		url: '/market/store/productManageSearch',
		data: { 'mem_id' : userId,// 상점 주인의 아이디
				'searchKeyword' : $('.prodSearchInput').val(),// 검색어
				'pg' : $('input[name=pg]').val(), //	'pg' : $('#pg').val()}, // 페이지
				'product_manage' : $('.hiddenProdMange').val()},
		dataType: 'json',
		success : function(data){ //prodSearchList
			if(data.prodSearchList == ''){
				// 검색한 상품이 없음
				$('#prodMangeTable tbody').empty();
				$('.noRegistered').remove();
				
				$('#prodMangeTable').after($("<div class='noRegistered'>등록된 상품이 없습니다</div>"));
				$('#storePagingDiv').hide();
			}else {
				//  검색한 상품 있음
				$('#storePagingDiv').show();
				
				$('.noRegistered').remove();
				
				$('#prodMangeTable tr:gt(0)').remove(); //기존 상품 리스트는 삭제
				
				$.each(data.prodSearchList, function(index, items){
					$('<tr/>').append($('<td/>'
					).append($('<a/>', {
						href: '#'
				   }).append($('<img/>',{
						src: '/market/storage/'+items.product_img1, 
						alt: '상품이미지'
				})))).append($('<td/>'
					).append($('<div/>', {
						class: 'tabSortProdWrap1_'+index,
						style: 'position: relative;box-sizing: border-box;'
				   }).append($('<div/>', {
						class: 'tabSortProdWrap2_'+index, 
						style: 'width: 100%;height: 3rem;display: flex;border: 1px solid rgb(195, 194, 204);border-radius: 2px;'
				   }).append($('<div/>', {
						class: 'tabSortProdTitle'
				   }).append($('<div/>', {
						class: 'tabSortProdText'+index, // 현재 상품 상태
						style: 'color: rgb(51, 51, 51);margin-left: 2px; margin-right: 2px;max-width: calc(100% - 8px);overflow: hidden;position: absolute;text-overflow: ellipsis;white-space: nowrap;top: 50%;transform: translateY(-50%);box-sizing: border-box;'
				  })).append($('<input/>', {
				 }))).append($('<div/>', {
						class: 'tabSortProdBtn'+index,
						style: 'background-position: 0px center; background-repeat: no-repeat; background-size: 1rem 1rem;width: 2rem;height: 100%;background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDE2IDE2Ij4KICAgIDxwYXRoIGZpbGw9IiM1RTVDNkIiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTAgNC44YzAgLjIyOS4wOTguNDQ2LjI3LjU5OGw3LjIgNi40YS44LjggMCAwIDAgMS4wNjEgMGw3LjItNi40YS44LjggMCAxIDAtMS4wNjItMS4xOTVMOCAxMC4xMyAxLjMzMSA0LjIwM2EuOC44IDAgMCAwLTEuMzMuNTk3Ii8+Cjwvc3ZnPgo=);'
			   }))))).append($('<td/>'
				    ).append($('<a/>', {
						href: '#',
						text: items.product_subject
				 }))).append($('<td/>', {
						text: items.product_price.toLocaleString()+'원'
				  })).append($('<td/>', {
					    class: 'favorites'+index
				  })).append($('<td/>', {
						text: items.product_logtime
				  })).append($('<td/>'
					).append($('<button/>', {
						type: 'button',
						class: 'upBtn'+index,
						text: 'UP'
				  })).append($('<a/>', {
						class: 'editBtn',
						href: '#',
						text: '수정'
				  })).append($('<button/>',{
						type: 'button',
						class: 'deleteBtn'+index,
						text: '삭제'
				 }))).appendTo($('#prodMangeTbody'))
				
				var product_img1 = items.product_img1;
				 
				// 페이징 처리				
				$('#storePagingDiv').html(data.storePaging.pagingHTML);	
				
				// [UP]버튼  
				$('.upBtn'+index).css({'width': '3.25rem',
									   'height': '2rem',
									   'text-align': 'center',
									   'border-radius': '2px',
									   'border': '1px solid rgb(195, 194, 204)',
									   'color': 'rgb(255, 80, 88)',
									   'margin-bottom': '0.5rem' });	
				
				$('.upBtn'+index).click(function(){
					// 상태변경 모달  
					$('#conditionModal').css('display', 'flex');
					
					if(items.product_manage == 2 || items.product_manage == 3){
						$('.condiModalTopText > p').html('<h6>예약 중/판매완료 상품은<br><strong>UP하기</strong>를 이용할 수 없습니다.</h6>');
					}else if(items.product_manage == 1){ // 판매 중
						$.ajax({
							type: 'get',
							url: '/market/store/productUp',
							dataType: 'json',
							data: { 'mem_id': userId, // 상점 주인의 아이디 
							        'product_seq': items.product_seq}, // UP할 상품의 번호items.product_seq
							success : function(data){ 
								if(data.cookieNum == '0'){
									$('.condiModalTopText > p').html('<h5>오늘의 <strong>UP하기</strong>를<br>모두 사용하였습니다.</h5>');
								}else if(data.cookieNum != '0'){
									$('.condiModalTopText > p').html('<h4><strong>UP하기 사용!</strong></h4><h5>(오늘 남은 UP하기 <strong>'+data.cookieNum+'</strong>개)</h5>');
								}
							},error: function(err){
								console.log(err);
							}
						});//ajax
					}
				 	// 확인 버튼 클릭 (모달 닫기)
					$('.modalBottomBtn').on({
						click : function(){
							$('#conditionModal').css('display', 'none');
							return false; // 새로고침 방지
						}
					});
				});// [UP] 버튼
				
				// [삭제] 버튼 
				$('.deleteBtn'+index).css({'width': '3.25rem',
									    'height': '2rem',
									    'text-align': 'center',
									    'border-radius': '2px',
									    'border': '1px solid rgb(195, 194, 204)',
									    'color': 'black',
									    'font-size': '10pt'});
				$('.deleteBtn'+index).click(function(){
					$.ajax({
						type: 'get',
						url: '/market/store/existProd',
						dataType: 'json',
						data: { 'mem_id': userId, // 상점 주인의 아이디 
						        'product_seq': items.product_seq},
						success : function(data){
							if(data.productDTO == null){
								$('#conditionModal').css('display', 'flex');	
								$('.condiModalTopText > p').text('삭제된 상품입니다.');
								
							}else if(data.productDTO != null){
								$('#deleteModal').css('display', 'flex'); // '상품을 삭제하시겠습니까?' 
								
								// [취소][확인] 
							 	$('.dltModalCancelBtn, .dltModalOkBtn').on({
									click : function(){
										$('#deleteModal').css('display', 'none');

										// [확인] - 삭제하겠다
										if($(this).attr('class') == 'dltModalOkBtn'){
											$.ajax({
												type: 'get',
												url: '/market/store/productDlt',
												dataType: 'json',
												data: { 'mem_id': userId, // 상점 주인의 아이디 
												        'product_seq': items.product_seq},
												success : function(data){
													console.log(data);
												},error: function(err){
													console.log(err);
												}
											});
											// 두 번째 모달
											$('#conditionModal').css('display', 'flex');	
											$('.condiModalTopText > p').text('상품이 삭제되었습니다');
										}// if
									}// click
								});	// [취소][확인]
							}
							// [확인] 버튼 클릭
							$('.modalBottomBtn').on({
								click : function(){
									$('#conditionModal').css('display', 'none');
									return false; // 새로고침 방지
								}
							});
						},error: function(err){
							console.log(err);
						}
					});
				});// [삭제] 버튼
				
				// 각 상품의 찜 개수 - DB
				$.ajax({
					type: 'post',
					url: '/market/store/favoritesOfProd',
					data: { 'mem_id': userId, // 상점 주인의 아이디 
						    'product_seq': items.product_seq}, // 찜 수 구할 상품의 번호
					success : function(data){
						$('.favorites'+index).text(data);
					},
					error: function(err){
						console.log(err);
					}
				});
	
				// [판매상태] input 테두리 마우스 오버  & 포커스  
				$('.tabSortProdWrap2_'+index).on({
				    mouseenter : function (){
						$(this).css('border', '1px solid black');
					},//mouseenter				
					mouseleave : function (){
						$(this).css('border', '1px solid rgb(195, 194, 204)');
					}
				});		
	 	
				// [판매상태] 클릭 - 상태리스트 띄우기, 상태변경
				$('.tabSortProdWrap1_'+index).on("click", '.tabSortProdWrap2_'+index, function(){
					// 화살표 ∨ --> ∧
					$('.tabSortProdBtn'+index).css('background-image', 'url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDE2IDE2Ij4KICAgIDxwYXRoIGZpbGw9IiM1RTVDNkIiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTE2IDExLjJhLjc5NS43OTUgMCAwIDAtLjI2OS0uNTk4bC03LjItNi40YS44LjggMCAwIDAtMS4wNjIgMGwtNy4yIDYuNGEuOC44IDAgMSAwIDEuMDYyIDEuMTk1TDggNS44NjlsNi42NjkgNS45MjhhLjguOCAwIDAgMCAxLjMzLS41OTgiLz4KPC9zdmc+Cg==)');
					
					// wrap2 -> wrap2_click
					$('.tabSortProdWrap2_'+index).attr('class', 'tabSortProdWrap2_'+index+'_click');
					$('.tabSortProdWrap2_'+index+'_click').css({'width' : '100%',
																'height' : '3rem',
																'display' : 'flex',
																'border' : '1px solid rgb(30, 29, 41)',
																'border-radius' : '2px'});	
					// 상태 List
					$('.tabSortProdWrap2_'+index+'_click').append($('<div/>', {
						class: 'btnListWrap'
					}).append($('<div/>', {
						class: 'btnList'+index,
						style: 'max-height: 12.5rem;overflow-y: scroll;'
					}).append($('<div/>', {
						class: 'nowCondition'+index,
						text: '판매 중',
						tabindex: '-1',
					})).append($('<div/>', {
						class: 'defaultList'+index, 
						text: '예약 중',
						tabindex: '-1',
					})).append($('<div/>', {
						class: 'defaultList'+index, 
						text: '판매완료',
						tabindex: '-1',
					}))));
					
					// # nowCondition & defaultList CSS
					$('.nowCondition'+index).css({'width': '100%',
												  'height': '2.5rem',
											      'display': 'flex',
											      '-webkit-box-align': 'center',
											      'align-items': 'center',
											      'padding': '0px 0.7rem',
											      'background': 'rgb(234, 233, 241)',
											      'color': 'rgb(30, 29, 41)'});
					
					$('.defaultList'+index).css({'width': '100%',
											     'height': '2.5rem',
											     'display': 'flex',
											     '-webkit-box-align': 'center',
											     'align-items': 'center',
											     'padding': '0px 0.7rem',
											     'color': 'rgb(94, 92, 107)' });

					
					// [판매 상태] - defaultList -> nowCondition + 현재 상태 찐회색 배경
					var listChildren = $('.tabSortProdWrap2_'+index+'_click .btnList'+index).children('div');
					var divChange = 0;
					if(items.product_manage == 2){
						divChange = 1; // 예약 중
					}else if(items.product_manage == 3){
						divChange = 2; // 판매완료
					}
					
					listChildren.eq(divChange).attr('class', 'nowCondition'+index);
					listChildren.eq(divChange).css('background', 'rgb(234, 233, 241)');
					listChildren.eq(divChange).css('color', 'rgb(30, 29, 41)');
					
					listChildren.eq(divChange).prevAll().attr('class', 'defaultList'+index);
					listChildren.eq(divChange).nextAll().attr('class', 'defaultList'+index);
					
					$('.defaultList'+index).css('background', 'rgb(255, 255, 255)');
					$('.defaultList'+index).css('color', 'rgb(94, 92, 107)');
					
					// 상태 리스트 마우스 오버  & 마우스리브
					// ( 현재 상태 : nowList(찐회색) -> 마우스오버(연회색) / 기본 : defaultList(흰색) -> 마우스오버(연회색) )
					$('.nowCondition'+index+', .defaultList'+index).on({
						mouseenter : function (){
							$(this).css('background', 'rgb(246, 245, 250)');
							$(this).css('color', 'rgb(30, 29, 41)');
							
							// 클릭 시 바로 리스트 사라짐-> 모달 창 띄우기
							$(this).click(function(){
								
								// 판매상태 변경 
								var submit_product_manage = items.product_manage; //디폴트는 기존 상태 값
								
								if($(this).attr('class') == 'nowCondition'+index){
									$('.condiModalTopText > p').html('상품이 삭제되었거나<br>상품의 판매 상태가 변경하시려는 <br>판매 상태와 같습니다.'); 
								}else if($(this).text() == '판매 중'){ 
									$('.condiModalTopText > p').html('상태가 변경되었습니다.');
									submit_product_manage = 1;
								}else if($(this).text() == '예약 중'){
									$('.condiModalTopText > p').html('상태가 변경되었습니다.');
									submit_product_manage = 2;
								}else if($(this).text() == '판매완료'){
									submit_product_manage = 3;
									
									// 판매완료 모달 ================================================================
									$('#soldOutModal').css('display', 'flex');
									// 상품 이미지, 상품명
									$('.itemImgWrap > img').attr('src', '/market/storage/'+items.product_img1);
									$('.itemName').text(items.product_subject);
									// 상품번호 
									var chat_product_seq= items.product_seq;
									
									// 채팅방 리스트 
									$.ajax({
										type: 'get',
										url: '/market/store/getChatList',
										data: { 'mem_id': userId }, 
										dataType: 'json',
										success : function(data){ //chatList
											
											if(data.chatList == ''){
												// 대화목록 없음
												$('.chatListWrap').append($('<div/>',{
													class: 'noChatList',
													text: '대화 목록이 없습니다.'
												}))
												$('.soldOutModalCancelBtn').click(function(){
													$('#soldOutModal').css('display', 'none');
												})
											}else if(data.chatList != ''){
												// 대화목록 있음
												$('.chatListWrap > .chatOne').remove();
												
												$.each(data.chatList, function(index, items){
													$('.chatListWrap').append($('<div/>', {
														class: 'chatOne'
													}).append($('<div/>', {
														class: 'chat_storeImg'
													}).append($('<img/>', {
														src: '/market/storage/'+items.other_store_img,
														width: '48',
														alt: '프로필 이미지', // style="height: 48px;">
														id: 'storeImg'+index
													}))).append($('<div/>', {
														class: 'chat_storeInfo'
													}).append($('<div/>', {
														class: 'chat_storeName'+index,
														text: items.other_store_nickname
													})).append($('<div/>', {
														class: 'chat_lastLogtime',
														text: '마지막 대화 '+items.chat_logtime
													}))))
													
													$('.chat_storeName'+index).css({'margin-top': '10px',
																					'display': 'block',
																					'font-weight': 'bold',
																					'cursor': 'pointer'});
													
													
													$('.chat_storeName'+index+', #storeImg'+index).click(function(){
														
														$('#soldOutModal').css('display', 'none');
														
														// 상점명으로 상대방 상점 아디 구하기
														$.ajax({
															type: 'get',
															url: '/market/store/getStoreNick',
															data: {'other_store_nickname': items.other_store_nickname},
															dataType: 'json',
															success : function(data){ 
																console.log(data.other_mem_id); // 채팅리스트에서 선택한 사람의 아이디
																var other_mem_id = data.other_mem_id;
																// purchase 거래 완료했는지 테이블 조회 ====================================
																$.ajax({
																	type: 'get',
																	url: '/market/store/purchaseCompleted',
																	data: { 'seller_id': userId, // 내아이디(판매자)
																		    'pur_nick': other_mem_id, // 구매자 아이디
																		    'product_seq': chat_product_seq}, // 해당 상품 번호
																	dataType: 'json',
																	success : function(data){ 
																		if(data.purchaseExistDTO == null){
																			// 거래 내역 테이블에 없으면
																			// purchase - DB 테이블 데이터 삽입
																			$.ajax({
																				type: 'get',
																				url: '/market/store/purchaseInsert',
																				data: { 'seller_id': userId, // 내아이디(판매자)
																					    'pur_nick': other_mem_id, // 구매자 아이디
																					    'product_seq': chat_product_seq}, // 해당 상품 번호
																				success : function(data){ 
																					// 거래 완료
																					// 확인 모달
																					$('.condiModalTopText > p').html('<strong>'+items.other_store_nickname+'</strong>님과의<br>거래가 완료되었습니다.');
																					$('#conditionModal').css('display', 'flex');
																				},
																				error: function(err){
																					console.log(err);
																				}
																			});// ajax
																		}else if( data.purchaseExistDTO!=null){ 
																			// 이미 거래내역 테이블에 있으면
																			alert("거래내역이 존재합니다.");
																		}
																		
																		
																	},
																	error: function(err){
																		console.log(err);
																	}
																});// ajax
																														
															},
															error: function(err){
																console.log(err);
															}
														});// ajax
														
														/*// 확인 모달
														$('.condiModalTopText > p').html('<strong>'+items.other_store_nickname+'</strong>님과의<br>거래가 완료되었습니다.');
														$('#conditionModal').css('display', 'flex');*/
													})
													
												});// each
												
												$('.soldOutModalCancelBtn').click(function(){
													$('#soldOutModal').css('display', 'none');
												})
											}//else if
											
										},
										error: function(err){
											console.log(err);
										}
									});// ajax\
								}// 판매 완료 클릭 =================================================================
			
								// DB
								$.ajax({
									type: 'get',
									url: '/market/store/prodManageUpdate',
									data: { 'mem_id': userId, // 상점 주인의 아이디 
										    'product_seq': items.product_seq, // 해당 상품
										    'product_manage' : submit_product_manage}, // 해당 상품의 변경 상태
									success : function(data){
										//console.log(data); //업뎃확인용
									},
									error: function(err){
										console.log(err);
									}
								});// ajax

								// 리스트 닫기
								$('.tabSortProdWrap2_'+index+'_click > .btnListWrap').remove();
								$('.tabSortProdWrap2_'+index+'_click').attr('class', 'tabSortProdWrap2_'+index);
								$('.tabSortProdWrap2_'+index).css('border', '1px solid rgb(195, 194, 204)');
								$('.tabSortProdBtn'+index).css('background-image', 'url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDE2IDE2Ij4KICAgIDxwYXRoIGZpbGw9IiM1RTVDNkIiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTAgNC44YzAgLjIyOS4wOTguNDQ2LjI3LjU5OGw3LjIgNi40YS44LjggMCAwIDAgMS4wNjEgMGw3LjItNi40YS44LjggMCAxIDAtMS4wNjItMS4xOTVMOCAxMC4xMyAxLjMzMSA0LjIwM2EuOC44IDAgMCAwLTEuMzMuNTk3Ii8+Cjwvc3ZnPgo=)');
																
								// 모달 - 판매완료 제외
								if(submit_product_manage!=3){
									$('#conditionModal').css('display', 'flex');
								}
								
								$('.modalBottomBtn').on({
									click : function(){
										$('#conditionModal').css('display', 'none');
										return false; // 새로고침 방지
									}
								});	
								
								
							});// 상태 클릭
						}, // mouseenter		
						mouseleave : function (){
							if($(this).attr('class') == 'nowCondition'+index){
								$(this).css('background', 'rgb(234, 233, 241)');
							}else if($(this).attr('class') == 'defaultList'+index){
								$(this).css({'background':'rgb(255, 255, 255)',
											 'color':'rgb(94, 92, 107)'});
							}
						}//mouseleave
					});	//마우스오버  & 마우스리브
					
					// 리스트 닫기 (2가지)
					// - [판매상태] 한번 더 클릭 시 리스트 닫기
					$('.tabSortProdWrap1_'+index).on("click", '.tabSortProdWrap2_'+index+'_click', function(){
						$('.tabSortProdWrap2_'+index+'_click > .btnListWrap').remove();
						$('.tabSortProdWrap2_'+index+'_click').attr('class', 'tabSortProdWrap2_'+index);
						$('.tabSortProdBtn'+index).css('background-image', 'url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDE2IDE2Ij4KICAgIDxwYXRoIGZpbGw9IiM1RTVDNkIiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTAgNC44YzAgLjIyOS4wOTguNDQ2LjI3LjU5OGw3LjIgNi40YS44LjggMCAwIDAgMS4wNjEgMGw3LjItNi40YS44LjggMCAxIDAtMS4wNjItMS4xOTVMOCAxMC4xMyAxLjMzMSA0LjIwM2EuOC44IDAgMCAwLTEuMzMuNTk3Ii8+Cjwvc3ZnPgo=)');
					});
					// - 다른 영역 클릭 시 리스트 닫기
					$(document).click(function(e){
						var parent = $(e.target).parent()[0].className;
						if(parent == 'tabSortProdWrap2_'+index+'_click' || parent == 'tabSortProdTitle' || parent == 'btnList'){
							return false;
							}
						else{
						$('.tabSortProdWrap2_'+index+'_click > .btnListWrap').remove();
						$('.tabSortProdWrap2_'+index+'_click').attr('class', 'tabSortProdWrap2_'+index);
						$('.tabSortProdBtn'+index).css('background-image', 'url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDE2IDE2Ij4KICAgIDxwYXRoIGZpbGw9IiM1RTVDNkIiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTAgNC44YzAgLjIyOS4wOTguNDQ2LjI3LjU5OGw3LjIgNi40YS44LjggMCAwIDAgMS4wNjEgMGw3LjItNi40YS44LjggMCAxIDAtMS4wNjItMS4xOTVMOCAxMC4xMyAxLjMzMSA0LjIwM2EuOC44IDAgMCAwLTEuMzMuNTk3Ii8+Cjwvc3ZnPgo=)');
						}
					 });
				}); // [판매상태] 클릭 이벤트
				
				// 판매상태  - 타이틀 설정
				// product_manage 별 분류 1:판매중 2:예약중 3:판매완료
				if( items.product_manage == 1 ){
					$('.tabSortProdText'+index).text('판매 중');
				// 기본 nowCondition은 판매중
				}else if(items.product_manage == 2 ){
					$('.tabSortProdText'+index).text('예약 중');
					$('.tabSortProdWrap2_'+index+'_click .btnList'+index).children('div').eq(1).attr('class', 'nowCondition'+index);
				}else if( items.product_manage == 3 ){
					$('.tabSortProdText'+index).text('판매완료');
				}
			});//each
				
				
				}//else
			},//success
			error: function(err){
				console.log(err);
			}
		});//ajax
	return false;//새로고침 방지
});// [상품명검색] 클릭


// 3. 페이징처리 ***********************************************************************************************
function storePaging(pg){
	var searchKeyword = $('.prodSearchInput').val();
	
	if(searchKeyword == ''){ // 검색어 없을 때 (기본) -> 그냥 페이지 넘어가도록
		
		$.ajax({
			type: 'get',
			url: '/market/store/productManageList',
			data: {'mem_id' : userId, // 상점 주인의 아이디
				   'pg' : pg,// 페이지
				   'product_manage': $('.hiddenProdMange').val()}, // 상품 판매 상태
			dataType: 'json',
			success : function(data){ 
				
				$('#prodMangeTbody > tr').remove();
				
				// # 상품 리스트 
				$.each(data.productManageList, function(index, items){
					$('<tr/>').append($('<td/>'
					).append($('<a/>', {
						href: '#'
				   }).append($('<img/>',{
						src: '/market/storage/'+items.product_img1, 
						alt: '상품이미지'
				})))).append($('<td/>'
					).append($('<div/>', {
						class: 'tabSortProdWrap1_'+index,
						style: 'position: relative;box-sizing: border-box;'
				   }).append($('<div/>', {
						class: 'tabSortProdWrap2_'+index, 
						style: 'width: 100%;height: 3rem;display: flex;border: 1px solid rgb(195, 194, 204);border-radius: 2px;'
				   }).append($('<div/>', {
						class: 'tabSortProdTitle'
				   }).append($('<div/>', {
						class: 'tabSortProdText'+index, // 현재 상품 상태
						style: 'color: rgb(51, 51, 51);margin-left: 2px; margin-right: 2px;max-width: calc(100% - 8px);overflow: hidden;position: absolute;text-overflow: ellipsis;white-space: nowrap;top: 50%;transform: translateY(-50%);box-sizing: border-box;'
				  })).append($('<input/>', {
				 }))).append($('<div/>', {
						class: 'tabSortProdBtn'+index,
						style: 'background-position: 0px center; background-repeat: no-repeat; background-size: 1rem 1rem;width: 2rem;height: 100%;background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDE2IDE2Ij4KICAgIDxwYXRoIGZpbGw9IiM1RTVDNkIiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTAgNC44YzAgLjIyOS4wOTguNDQ2LjI3LjU5OGw3LjIgNi40YS44LjggMCAwIDAgMS4wNjEgMGw3LjItNi40YS44LjggMCAxIDAtMS4wNjItMS4xOTVMOCAxMC4xMyAxLjMzMSA0LjIwM2EuOC44IDAgMCAwLTEuMzMuNTk3Ii8+Cjwvc3ZnPgo=);'
			   }))))).append($('<td/>'
				    ).append($('<a/>', {
						href: '#',
						text: items.product_subject
				 }))).append($('<td/>', {
						text: items.product_price.toLocaleString()+'원'
				  })).append($('<td/>', {
					    class: 'favorites'+index
				  })).append($('<td/>', {
						text: items.product_logtime
				  })).append($('<td/>'
					).append($('<button/>', {
						type: 'button',
						class: 'upBtn'+index,
						text: 'UP'
				  })).append($('<a/>', {
						class: 'editBtn',
						href: '#',
						text: '수정'
				  })).append($('<button/>',{
						type: 'button',
						class: 'deleteBtn'+index,
						text: '삭제'
				 }))).appendTo($('#prodMangeTbody'))
				
				var product_img1 = items.product_img1;
				 
				// 페이징 처리				
				$('#storePagingDiv').html(data.storePaging.pagingHTML);	
				
				// [UP]버튼  
				$('.upBtn'+index).css({'width': '3.25rem',
									   'height': '2rem',
									   'text-align': 'center',
									   'border-radius': '2px',
									   'border': '1px solid rgb(195, 194, 204)',
									   'color': 'rgb(255, 80, 88)',
									   'margin-bottom': '0.5rem' });	
				
				$('.upBtn'+index).click(function(){
					// 상태변경 모달  
					$('#conditionModal').css('display', 'flex');
					
					if(items.product_manage == 2 || items.product_manage == 3){
						$('.condiModalTopText > p').html('<h6>예약 중/판매완료 상품은<br><strong>UP하기</strong>를 이용할 수 없습니다.</h6>');
					}else if(items.product_manage == 1){ // 판매 중
						$.ajax({
							type: 'get',
							url: '/market/store/productUp',
							dataType: 'json',
							data: { 'mem_id': userId, // 상점 주인의 아이디 
							        'product_seq': items.product_seq}, // UP할 상품의 번호items.product_seq
							success : function(data){ 
								if(data.cookieNum == '0'){
									$('.condiModalTopText > p').html('<h5>오늘의 <strong>UP하기</strong>를<br>모두 사용하였습니다.</h5>');
								}else if(data.cookieNum != '0'){
									$('.condiModalTopText > p').html('<h4><strong>UP하기 사용!</strong></h4><h5>(오늘 남은 UP하기 <strong>'+data.cookieNum+'</strong>개)</h5>');
								}
							},error: function(err){
								console.log(err);
							}
						});//ajax
					}
				 	// 확인 버튼 클릭 (모달 닫기)
					$('.modalBottomBtn').on({
						click : function(){
							$('#conditionModal').css('display', 'none');
							return false; // 새로고침 방지
						}
					});
				});// [UP] 버튼
				
				// [삭제] 버튼 
				$('.deleteBtn'+index).css({'width': '3.25rem',
									    'height': '2rem',
									    'text-align': 'center',
									    'border-radius': '2px',
									    'border': '1px solid rgb(195, 194, 204)',
									    'color': 'black',
									    'font-size': '10pt'});
				$('.deleteBtn'+index).click(function(){
					$.ajax({
						type: 'get',
						url: '/market/store/existProd',
						dataType: 'json',
						data: { 'mem_id': userId, // 상점 주인의 아이디 
						        'product_seq': items.product_seq},
						success : function(data){
							if(data.productDTO == null){
								$('#conditionModal').css('display', 'flex');	
								$('.condiModalTopText > p').text('삭제된 상품입니다.');
								
							}else if(data.productDTO != null){
								$('#deleteModal').css('display', 'flex'); // '상품을 삭제하시겠습니까?' 
								
								// [취소][확인] 
							 	$('.dltModalCancelBtn, .dltModalOkBtn').on({
									click : function(){
										$('#deleteModal').css('display', 'none');

										// [확인] - 삭제하겠다
										if($(this).attr('class') == 'dltModalOkBtn'){
											$.ajax({
												type: 'get',
												url: '/market/store/productDlt',
												dataType: 'json',
												data: { 'mem_id': userId, // 상점 주인의 아이디 
												        'product_seq': items.product_seq},
												success : function(data){
													console.log(data);
												},error: function(err){
													console.log(err);
												}
											});
											// 두 번째 모달
											$('#conditionModal').css('display', 'flex');	
											$('.condiModalTopText > p').text('상품이 삭제되었습니다');
										}// if
									}// click
								});	// [취소][확인]
							}
							// [확인] 버튼 클릭
							$('.modalBottomBtn').on({
								click : function(){
									$('#conditionModal').css('display', 'none');
									return false; // 새로고침 방지
								}
							});
						},error: function(err){
							console.log(err);
						}
					});
				});// [삭제] 버튼
				
				// 각 상품의 찜 개수 - DB
				$.ajax({
					type: 'post',
					url: '/market/store/favoritesOfProd',
					data: { 'mem_id': userId, // 상점 주인의 아이디 
						    'product_seq': items.product_seq}, // 찜 수 구할 상품의 번호
					success : function(data){
						$('.favorites'+index).text(data);
					},
					error: function(err){
						console.log(err);
					}
				});
	
				// [판매상태] input 테두리 마우스 오버  & 포커스  
				$('.tabSortProdWrap2_'+index).on({
				    mouseenter : function (){
						$(this).css('border', '1px solid black');
					},//mouseenter				
					mouseleave : function (){
						$(this).css('border', '1px solid rgb(195, 194, 204)');
					}
				});		
	 	
				// [판매상태] 클릭 - 상태리스트 띄우기, 상태변경
				$('.tabSortProdWrap1_'+index).on("click", '.tabSortProdWrap2_'+index, function(){
					// 화살표 ∨ --> ∧
					$('.tabSortProdBtn'+index).css('background-image', 'url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDE2IDE2Ij4KICAgIDxwYXRoIGZpbGw9IiM1RTVDNkIiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTE2IDExLjJhLjc5NS43OTUgMCAwIDAtLjI2OS0uNTk4bC03LjItNi40YS44LjggMCAwIDAtMS4wNjIgMGwtNy4yIDYuNGEuOC44IDAgMSAwIDEuMDYyIDEuMTk1TDggNS44NjlsNi42NjkgNS45MjhhLjguOCAwIDAgMCAxLjMzLS41OTgiLz4KPC9zdmc+Cg==)');
					
					// wrap2 -> wrap2_click
					$('.tabSortProdWrap2_'+index).attr('class', 'tabSortProdWrap2_'+index+'_click');
					$('.tabSortProdWrap2_'+index+'_click').css({'width' : '100%',
																'height' : '3rem',
																'display' : 'flex',
																'border' : '1px solid rgb(30, 29, 41)',
																'border-radius' : '2px'});	
					// 상태 List
					$('.tabSortProdWrap2_'+index+'_click').append($('<div/>', {
						class: 'btnListWrap'
					}).append($('<div/>', {
						class: 'btnList'+index,
						style: 'max-height: 12.5rem;overflow-y: scroll;'
					}).append($('<div/>', {
						class: 'nowCondition'+index,
						text: '판매 중',
						tabindex: '-1',
					})).append($('<div/>', {
						class: 'defaultList'+index, 
						text: '예약 중',
						tabindex: '-1',
					})).append($('<div/>', {
						class: 'defaultList'+index, 
						text: '판매완료',
						tabindex: '-1',
					}))));
					
					// # nowCondition & defaultList CSS
					$('.nowCondition'+index).css({'width': '100%',
												  'height': '2.5rem',
											      'display': 'flex',
											      '-webkit-box-align': 'center',
											      'align-items': 'center',
											      'padding': '0px 0.7rem',
											      'background': 'rgb(234, 233, 241)',
											      'color': 'rgb(30, 29, 41)'});
					
					$('.defaultList'+index).css({'width': '100%',
											     'height': '2.5rem',
											     'display': 'flex',
											     '-webkit-box-align': 'center',
											     'align-items': 'center',
											     'padding': '0px 0.7rem',
											     'color': 'rgb(94, 92, 107)' });

					
					// [판매 상태] - defaultList -> nowCondition + 현재 상태 찐회색 배경
					var listChildren = $('.tabSortProdWrap2_'+index+'_click .btnList'+index).children('div');
					var divChange = 0;
					if(items.product_manage == 2){
						divChange = 1; // 예약 중
					}else if(items.product_manage == 3){
						divChange = 2; // 판매완료
					}
					
					listChildren.eq(divChange).attr('class', 'nowCondition'+index);
					listChildren.eq(divChange).css('background', 'rgb(234, 233, 241)');
					listChildren.eq(divChange).css('color', 'rgb(30, 29, 41)');
					
					listChildren.eq(divChange).prevAll().attr('class', 'defaultList'+index);
					listChildren.eq(divChange).nextAll().attr('class', 'defaultList'+index);
					
					$('.defaultList'+index).css('background', 'rgb(255, 255, 255)');
					$('.defaultList'+index).css('color', 'rgb(94, 92, 107)');
					
					// 상태 리스트 마우스 오버  & 마우스리브
					// ( 현재 상태 : nowList(찐회색) -> 마우스오버(연회색) / 기본 : defaultList(흰색) -> 마우스오버(연회색) )
					$('.nowCondition'+index+', .defaultList'+index).on({
						mouseenter : function (){
							$(this).css('background', 'rgb(246, 245, 250)');
							$(this).css('color', 'rgb(30, 29, 41)');
							
							// 클릭 시 바로 리스트 사라짐-> 모달 창 띄우기
							$(this).click(function(){
								
								// 판매상태 변경 
								var submit_product_manage = items.product_manage; //디폴트는 기존 상태 값
								
								if($(this).attr('class') == 'nowCondition'+index){
									$('.condiModalTopText > p').html('상품이 삭제되었거나<br>상품의 판매 상태가 변경하시려는 <br>판매 상태와 같습니다.'); 
								}else if($(this).text() == '판매 중'){ 
									$('.condiModalTopText > p').html('상태가 변경되었습니다.');
									submit_product_manage = 1;
								}else if($(this).text() == '예약 중'){
									$('.condiModalTopText > p').html('상태가 변경되었습니다.');
									submit_product_manage = 2;
								}else if($(this).text() == '판매완료'){
									submit_product_manage = 3;
									
									// 판매완료 모달 ================================================================
									$('#soldOutModal').css('display', 'flex');
									// 상품 이미지, 상품명
									$('.itemImgWrap > img').attr('src', '/market/storage/'+items.product_img1);
									$('.itemName').text(items.product_subject);
									// 상품번호 
									var chat_product_seq= items.product_seq;
									
									// 채팅방 리스트 
									$.ajax({
										type: 'get',
										url: '/market/store/getChatList',
										data: { 'mem_id': userId }, 
										dataType: 'json',
										success : function(data){ //chatList
											
											if(data.chatList == ''){
												// 대화목록 없음
												$('.chatListWrap').append($('<div/>',{
													class: 'noChatList',
													text: '대화 목록이 없습니다.'
												}))
												$('.soldOutModalCancelBtn').click(function(){
													$('#soldOutModal').css('display', 'none');
												})
											}else if(data.chatList != ''){
												// 대화목록 있음
												$('.chatListWrap > .chatOne').remove();
												
												$.each(data.chatList, function(index, items){
													$('.chatListWrap').append($('<div/>', {
														class: 'chatOne'
													}).append($('<div/>', {
														class: 'chat_storeImg'
													}).append($('<img/>', {
														src: '/market/storage/'+items.other_store_img,
														width: '48',
														alt: '프로필 이미지', // style="height: 48px;">
														id: 'storeImg'+index
													}))).append($('<div/>', {
														class: 'chat_storeInfo'
													}).append($('<div/>', {
														class: 'chat_storeName'+index,
														text: items.other_store_nickname
													})).append($('<div/>', {
														class: 'chat_lastLogtime',
														text: '마지막 대화 '+items.chat_logtime
													}))))
													
													$('.chat_storeName'+index).css({'margin-top': '10px',
																					'display': 'block',
																					'font-weight': 'bold',
																					'cursor': 'pointer'});
													
													
													$('.chat_storeName'+index+', #storeImg'+index).click(function(){
														
														$('#soldOutModal').css('display', 'none');
														
														// 상점명으로 상대방 상점 아디 구하기
														$.ajax({
															type: 'get',
															url: '/market/store/getStoreNick',
															data: {'other_store_nickname': items.other_store_nickname},
															dataType: 'json',
															success : function(data){ 
																console.log(data.other_mem_id); // 채팅리스트에서 선택한 사람의 아이디
																var other_mem_id = data.other_mem_id;
																// purchase 거래 완료했는지 테이블 조회 ====================================
																$.ajax({
																	type: 'get',
																	url: '/market/store/purchaseCompleted',
																	data: { 'seller_id': userId, // 내아이디(판매자)
																		    'pur_nick': other_mem_id, // 구매자 아이디
																		    'product_seq': chat_product_seq}, // 해당 상품 번호
																	dataType: 'json',
																	success : function(data){ 
																		if(data.purchaseExistDTO == null){
																			// 거래 내역 테이블에 없으면
																			// purchase - DB 테이블 데이터 삽입
																			$.ajax({
																				type: 'get',
																				url: '/market/store/purchaseInsert',
																				data: { 'seller_id': userId, // 내아이디(판매자)
																					    'pur_nick': other_mem_id, // 구매자 아이디
																					    'product_seq': chat_product_seq}, // 해당 상품 번호
																				success : function(data){ 
																					// 거래 완료
																					// 확인 모달
																					$('.condiModalTopText > p').html('<strong>'+items.other_store_nickname+'</strong>님과의<br>거래가 완료되었습니다.');
																					$('#conditionModal').css('display', 'flex');
																				},
																				error: function(err){
																					console.log(err);
																				}
																			});// ajax
																		}else if( data.purchaseExistDTO!=null){ 
																			// 이미 거래내역 테이블에 있으면
																			alert("거래내역이 존재합니다.");
																		}
																		
																		
																	},
																	error: function(err){
																		console.log(err);
																	}
																});// ajax
																														
															},
															error: function(err){
																console.log(err);
															}
														});// ajax
														
														/*// 확인 모달
														$('.condiModalTopText > p').html('<strong>'+items.other_store_nickname+'</strong>님과의<br>거래가 완료되었습니다.');
														$('#conditionModal').css('display', 'flex');*/
													})
													
												});// each
												
												$('.soldOutModalCancelBtn').click(function(){
													$('#soldOutModal').css('display', 'none');
												})
											}//else if
											
										},
										error: function(err){
											console.log(err);
										}
									});// ajax\
								}// 판매 완료 클릭 =================================================================
			
								// DB
								$.ajax({
									type: 'get',
									url: '/market/store/prodManageUpdate',
									data: { 'mem_id': userId, // 상점 주인의 아이디 
										    'product_seq': items.product_seq, // 해당 상품
										    'product_manage' : submit_product_manage}, // 해당 상품의 변경 상태
									success : function(data){
										//console.log(data); //업뎃확인용
									},
									error: function(err){
										console.log(err);
									}
								});// ajax

								// 리스트 닫기
								$('.tabSortProdWrap2_'+index+'_click > .btnListWrap').remove();
								$('.tabSortProdWrap2_'+index+'_click').attr('class', 'tabSortProdWrap2_'+index);
								$('.tabSortProdWrap2_'+index).css('border', '1px solid rgb(195, 194, 204)');
								$('.tabSortProdBtn'+index).css('background-image', 'url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDE2IDE2Ij4KICAgIDxwYXRoIGZpbGw9IiM1RTVDNkIiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTAgNC44YzAgLjIyOS4wOTguNDQ2LjI3LjU5OGw3LjIgNi40YS44LjggMCAwIDAgMS4wNjEgMGw3LjItNi40YS44LjggMCAxIDAtMS4wNjItMS4xOTVMOCAxMC4xMyAxLjMzMSA0LjIwM2EuOC44IDAgMCAwLTEuMzMuNTk3Ii8+Cjwvc3ZnPgo=)');
																
								// 모달 - 판매완료 제외
								if(submit_product_manage!=3){
									$('#conditionModal').css('display', 'flex');
								}
								
								$('.modalBottomBtn').on({
									click : function(){
										$('#conditionModal').css('display', 'none');
										return false; // 새로고침 방지
									}
								});	
								
								
							});// 상태 클릭
						}, // mouseenter		
						mouseleave : function (){
							if($(this).attr('class') == 'nowCondition'+index){
								$(this).css('background', 'rgb(234, 233, 241)');
							}else if($(this).attr('class') == 'defaultList'+index){
								$(this).css({'background':'rgb(255, 255, 255)',
											 'color':'rgb(94, 92, 107)'});
							}
						}//mouseleave
					});	//마우스오버  & 마우스리브
					
					// 리스트 닫기 (2가지)
					// - [판매상태] 한번 더 클릭 시 리스트 닫기
					$('.tabSortProdWrap1_'+index).on("click", '.tabSortProdWrap2_'+index+'_click', function(){
						$('.tabSortProdWrap2_'+index+'_click > .btnListWrap').remove();
						$('.tabSortProdWrap2_'+index+'_click').attr('class', 'tabSortProdWrap2_'+index);
						$('.tabSortProdBtn'+index).css('background-image', 'url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDE2IDE2Ij4KICAgIDxwYXRoIGZpbGw9IiM1RTVDNkIiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTAgNC44YzAgLjIyOS4wOTguNDQ2LjI3LjU5OGw3LjIgNi40YS44LjggMCAwIDAgMS4wNjEgMGw3LjItNi40YS44LjggMCAxIDAtMS4wNjItMS4xOTVMOCAxMC4xMyAxLjMzMSA0LjIwM2EuOC44IDAgMCAwLTEuMzMuNTk3Ii8+Cjwvc3ZnPgo=)');
					});
					// - 다른 영역 클릭 시 리스트 닫기
					$(document).click(function(e){
						var parent = $(e.target).parent()[0].className;
						if(parent == 'tabSortProdWrap2_'+index+'_click' || parent == 'tabSortProdTitle' || parent == 'btnList'){
							return false;
							}
						else{
						$('.tabSortProdWrap2_'+index+'_click > .btnListWrap').remove();
						$('.tabSortProdWrap2_'+index+'_click').attr('class', 'tabSortProdWrap2_'+index);
						$('.tabSortProdBtn'+index).css('background-image', 'url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDE2IDE2Ij4KICAgIDxwYXRoIGZpbGw9IiM1RTVDNkIiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTAgNC44YzAgLjIyOS4wOTguNDQ2LjI3LjU5OGw3LjIgNi40YS44LjggMCAwIDAgMS4wNjEgMGw3LjItNi40YS44LjggMCAxIDAtMS4wNjItMS4xOTVMOCAxMC4xMyAxLjMzMSA0LjIwM2EuOC44IDAgMCAwLTEuMzMuNTk3Ii8+Cjwvc3ZnPgo=)');
						}
					 });
				}); // [판매상태] 클릭 이벤트
				
				// 판매상태  - 타이틀 설정
				// product_manage 별 분류 1:판매중 2:예약중 3:판매완료
				if( items.product_manage == 1 ){
					$('.tabSortProdText'+index).text('판매 중');
				// 기본 nowCondition은 판매중
				}else if(items.product_manage == 2 ){
					$('.tabSortProdText'+index).text('예약 중');
					$('.tabSortProdWrap2_'+index+'_click .btnList'+index).children('div').eq(1).attr('class', 'nowCondition'+index);
				}else if( items.product_manage == 3 ){
					$('.tabSortProdText'+index).text('판매완료');
				}
			});//each
			},//success
			error: function(err){
				console.log(err);
			}
		});//ajax
	}else {
		console.log("***2. 검색어가있을때   "+pg+","+searchKeyword);
		$('input[name=pg]').val(pg);
		
		$('input[name=hiddenVal]').val('research');
		
		$('#productSearchBtn').trigger('click', 'str');
	}
}

//[전체] - 판매상태 별 정렬  ********************************************************************************
$('.productManageWrap').on('click', '.sortProdManageWrap3', function(){
	// 화살표 변경 ∨ --> ∧
	$('.sortProdManageBtn').css('background-image', 'url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDE2IDE2Ij4KICAgIDxwYXRoIGZpbGw9IiM1RTVDNkIiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTE2IDExLjJhLjc5NS43OTUgMCAwIDAtLjI2OS0uNTk4bC03LjItNi40YS44LjggMCAwIDAtMS4wNjIgMGwtNy4yIDYuNGEuOC44IDAgMSAwIDEuMDYyIDEuMTk1TDggNS44NjlsNi42NjkgNS45MjhhLjguOCAwIDAgMCAxLjMzLS41OTgiLz4KPC9zdmc+Cg==)');
	
	$('.sortProdManageWrap3').attr('class', 'sortProdManageWrap3_click');
	$('.sortProdManageWrap3_click').css({'width' : '100%',
								  'height' : '3rem',
								  'display' : 'flex',
								  'border' : '1px solid rgb(30, 29, 41)',
								  'border-radius' : '2px'});	
	// 정렬 리스트
	$('.sortProdManageWrap3_click').append($('<div/>', {
		class: 'btnListWrap'
	}).append($('<div/>', {
		class: 'btnList'
	}).append($('<div/>', {
		class: 'nowCondition', 
		text: '전체', 
		tabindex: '-1'
	})).append($('<div/>', {
		class: 'defaultList', 
		text: '판매 중',
		tabindex: '-1'
	})).append($('<div/>', {
		class: 'defaultList', 
		text: '예약 중',
		tabindex: '-1'
	})).append($('<div/>', {
		class: 'defaultList', 
		text: '판매완료',
		tabindex: '-1'
	}))));
	
	var listChildren = $('.sortProdManageWrap3_click .btnList').children('div');
	var divChange=$('.hiddenProdMange').val();
	
	listChildren.eq(divChange).attr('class', 'nowCondition');
	listChildren.eq(divChange).css('background', 'rgb(234, 233, 241)');
	listChildren.eq(divChange).css('color', 'rgb(30, 29, 41)');
	
	listChildren.eq(divChange).prevAll().attr('class', 'defaultList');
	listChildren.eq(divChange).nextAll().attr('class', 'defaultList');
	
	$('.nowCondition, .defaultList').on({
		mouseenter : function (){
			$(this).css('background', 'rgb(246, 245, 250)');
			$(this).css('color', 'rgb(30, 29, 41)');
			
			$(this).click(function(){
				
				console.log('divChange -->'+divChange);
				if($(this).text() == '전체'){
					console.log('전체정렬클릭');
					divChange = 0;
					$('.sortProdManageText').text('전체');
				}else if($(this).text() == '판매 중'){
					console.log('판매중정렬클릭');
					divChange = 1;
					$('.sortProdManageText').text('판매 중');
				}else if($(this).text() == '예약 중'){
					console.log('예약중정렬클릭');
					divChange = 2;
					$('.sortProdManageText').text('예약 중');
				}else if($(this).text() == '판매완료'){
					console.log('판매완료정렬클릭');
					divChange = 3;
					$('.sortProdManageText').text('판매완료');
				}
				
				if($('.hiddenProdMange').val() != divChange){
					$('.hiddenProdMange').val(divChange);
				}
				
				//검색햇을떄와 같은효과 - 트리거
				$('#productSearchBtn').trigger('click', 'str');
				
				$('.defaultList').css('background', 'rgb(255, 255, 255)');
				$('.defaultList').css('color', 'rgb(94, 92, 107)');
				
				// 클릭 시 바로 리스트 사라짐
				$('.sortProdManageWrap3_click > .btnListWrap').remove();
				$('.sortProdManageWrap3_click').attr('class', 'sortProdManageWrap3');
				$('.sortProdManageWrap3').css('border', '1px solid rgb(195, 194, 204)');
				$('.sortProdManageBtn').css('background-image', 'url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDE2IDE2Ij4KICAgIDxwYXRoIGZpbGw9IiM1RTVDNkIiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTAgNC44YzAgLjIyOS4wOTguNDQ2LjI3LjU5OGw3LjIgNi40YS44LjggMCAwIDAgMS4wNjEgMGw3LjItNi40YS44LjggMCAxIDAtMS4wNjItMS4xOTVMOCAxMC4xMyAxLjMzMSA0LjIwM2EuOC44IDAgMCAwLTEuMzMuNTk3Ii8+Cjwvc3ZnPgo=)');

			});
		}, //mouseenter		
		mouseleave : function (){
			if($(this).attr('class') == 'nowCondition'){
				$(this).css('background', 'rgb(234, 233, 241)');
			}else if($(this).attr('class') == 'defaultList'){
				$(this).css({'background':'rgb(255, 255, 255)',
							 'color':'rgb(94, 92, 107)'});
			}
		}//mouseleave
	});	//마우스오버  & 마우스리브
	
	// # 리스트 닫기 
	// (1) [전체] 한번 더 클릭 시 리스트 닫기
	$('.sortProdManageWrap1').on("click", '.sortProdManageWrap3_click', function(){
		$('.sortProdManageWrap3_click > .btnListWrap').remove();
		$('.sortProdManageWrap3_click').attr('class', 'sortProdManageWrap3');
		$('.sortProdManageBtn').css('background-image', 'url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDE2IDE2Ij4KICAgIDxwYXRoIGZpbGw9IiM1RTVDNkIiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTAgNC44YzAgLjIyOS4wOTguNDQ2LjI3LjU5OGw3LjIgNi40YS44LjggMCAwIDAgMS4wNjEgMGw3LjItNi40YS44LjggMCAxIDAtMS4wNjItMS4xOTVMOCAxMC4xMyAxLjMzMSA0LjIwM2EuOC44IDAgMCAwLTEuMzMuNTk3Ii8+Cjwvc3ZnPgo=)');
	});
	
	// (2) 다른 영역 클릭 시 리스트 닫기
	$(document).click(function(e){
		var parent = $(e.target).parent()[0].className;
		//console.log(parent);
		if(parent == 'sortProdManageTitle' || parent == 'sortProdManageWrap3_click' || parent == 'btnList'){
			return false;
		}
		else{
			$('.sortProdManageWrap3_click > .btnListWrap').remove();
			$('.sortProdManageWrap3_click').attr('class', 'sortProdManageWrap3');
		$('.sortProdManageBtn').css('background-image', 'url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDE2IDE2Ij4KICAgIDxwYXRoIGZpbGw9IiM1RTVDNkIiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTAgNC44YzAgLjIyOS4wOTguNDQ2LjI3LjU5OGw3LjIgNi40YS44LjggMCAwIDAgMS4wNjEgMGw3LjItNi40YS44LjggMCAxIDAtMS4wNjItMS4xOTVMOCAxMC4xMyAxLjMzMSA0LjIwM2EuOC44IDAgMCAwLTEuMzMuNTk3Ii8+Cjwvc3ZnPgo=)');
		}//else
	 });
});


//공통 (상품기본리스트 & 검색어리스트)  **********************************************************************************
// #input 마우스 오버  & 포커스 
// 	[상품명 입력], [10개씩], [전체]
$('.prodSearchInput, .sortProdManageWrap3').on({
    mouseenter : function (){
		$(this).css('border', '1px solid black');
		
		// [상품명 입력] 포커스(검정테두리유지) & 포커스아웃
		$('.prodSearchInput').on({
			focus : function(){
				$(this).off('mouseleave');
			},
			focusout : function(){
				$(this).css('border', '1px solid rgb(195, 194, 204)');
			}
		});
		
		$(this).mouseleave(function(){
			$(this).css('border', '1px solid rgb(195, 194, 204)');
		});
	}			
});	


