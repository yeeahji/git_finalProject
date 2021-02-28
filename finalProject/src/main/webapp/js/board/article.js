//담당 : 김명경

let writer;//글쓴 사람
let comment_writer; //댓글 쓴 사람

$(document).ready(function(){
	//댓글 영역 초기화
	$('#commentListTable tr:eq(0)').remove();
	$('#commentListTable tr:gt(0)').remove();
	
	//[작성한 글 출력]
	$.ajax({
		type : 'post',
		url : '/market/board/getArticle',
		data : 'seq='+$('#seq').val(), 
		dataType : 'json', //sessionId, boardDTO
		success : function(data){
			
			$('#board_subject').text(data.boardDTO.board_subject);
			$('#mem_id').text(data.boardDTO.mem_id);
			$('#board_logtime').text(data.boardDTO.board_logtime);
			$('#board_hit').text(data.boardDTO.board_hit);
			$('#board_content').text(data.boardDTO.board_content);
			writer=data.boardDTO.mem_id;//글쓴 사람
			
			//작성자 본인일 경우 : 신고버튼X. OWNER쪽(수정,삭제) O
			if($('#sessionId').val() == data.boardDTO.mem_id){
				$('#owner').show();	
				$('.singoBtn').hide();	
			//작성자 아닐 경우 : 신고버튼O. OWNER쪽 X
			}else {
				$('.singoBtn').show();	
				$('#owner').hide();	
			}
		},error: function(err){
			console.log(err);
		}});//ajax
	
	//[댓글 출력]
	$('#commentList').change(function(){
		$.ajax({
			type : 'post',
			url : '/market/board/showComment',
			data : 'board_seq='+$('#board_seq').val(), 
			dataType : 'json',
			success: function(data){
				$.each(data.list, function(index, items){
					$('<tr/>',{
			        	class: 'commentArea'+items.comment_seq
			        }).append($('<td/>',{
			            align: 'center',
			            text: items.mem_id,
			            width: 300
			        })).append($('<td/>',{
			            text: items.comment_content,
			            width: 900,
			        })).append($('<td/>',{
			            align: 'center',
			            text: items.comment_logtime,
			            height: 70,
			            width: 110
			        })).append($('<td/>',{
			            width: 100,
			            align: 'right',
			            }).append($('<a/>',{
			                href: 'javascript:;', //클릭 시 스크롤바 올라가는 거 방지
			                id:'moreBtn'+items.comment_seq
			                }).append($('<img/>',{
			                    src: '../image/board/moreBtn.png',
			                    viewBox:"0 0 3 15"
			                }))
			            ).append($('<div/>',{//더보기 클릭시 나오는 곳
			                id:'writerVersion',//내가 댓글 작성자일때, 
			                class:'writerVersion'+items.comment_seq,
			                }).append($('<a/>',{
			                    text: '수정  |  ',
			                    href: 'javascript:;',
			                    id:'modifyCommentBtn'+items.comment_seq
			                })).append($('<a/>',{
			                    text: '삭제',
			                    href: 'javascript:;',
			                    id:'deleteCommentBtn'+items.comment_seq
			                }))
			            ).append($('<div/>',{//내가 댓글 작성자가 아닐때
			                id:'notWriterVersion',
			                class:'notWriterVersion'+items.comment_seq,
			            }).append($('<a/>',{
			                text: '신고',
			                href: 'javascript:;',
			                id:'singoBtn'+items.comment_seq
			            })))).appendTo($('#commentListTable'));
			        
			        $('.writerVersion'+items.comment_seq).hide();
					$('.notWriterVersion'+items.comment_seq).hide();
					console.log($('#comment_seq').val());
				
				
					//[더보기 버튼 클릭]
					$('#commentListTable').on('click', '#moreBtn'+items.comment_seq, function(){
						//세션 만료로 인해 로그아웃 시, 로그인 페이지로 이동
						if ($('#sessionId').val()=='' || $('#sessionId').val()=='none'){
							location.href='/market/member/loginForm';
						}
						//댓글쓴이와 세션아이디가 같다면(==내가 댓글 쓴 사람이라면), 수정/삭제버튼 활성화(신고버튼 안보임)
						if($('#sessionId').val() == items.mem_id){//items.mem_id=댓글쓴이
							console.log("세션아이디:"+$('#sessionId').val()+"/댓글쓴이:"+items.mem_id );
							console.log("writerVersion"+items.comment_seq);
							$('.writerVersion'+items.comment_seq).show();
							$('.notWriterVersion'+items.comment_seq).hide();
							
							//[댓글 삭제]
							deleteComment(items);
							
							//[댓글 수정]
							modifyComment(items);
						}
						//작성자가 다르다면, 신고버튼
						else{
							console.log("세션아이디:"+$('#sessionId').val()+"/댓글쓴이:"+items.mem_id );
							console.log("notWriterVersion"+$('#comment_seq').val());
							$('.notWriterVersion'+items.comment_seq).show();
							$('.writerVersion'+items.comment_seq).hide();
							
							//[댓글 신고]
							$('#commentListTable').on('click', '#singoBtn'+items.comment_seq, function(){
								$("#modalHidden").attr('id','modalDisplay'); //신고 모달창이 뜬다.
								
								$('.contentList>button').mouseenter(function(){//특정 버튼(신고 사유)에 마우스를 갖다대면
									 $(this).css('text-decoration', 'underline'); //밑줄이 생긴다.
									 $(this).mouseleave(function(){
								        $(this).css('text-decoration', 'none'); //마우스 떼면 밑줄 사라지는 효과
									 });
									 
									 //[댓글 신고접수]
									 $(this).off('click').on('click',function(){
										if($('#sessionId').val()==null){ //세션 만료로 인해 로그인 풀렸을때
											location.href="/market/member/loginForm";
										}else{
											$.ajax({
												type : 'post',
												url : '/market/member/complain',
												data: {reporter_id: $('#sessionId').val(),
														complain_content : $(this).text(),
														comment_seq : items.comment_seq, //댓글 seq
														complain_category : '댓글 신고',
														mem_id: items.mem_id //댓글쓴 사람(==신고당할 사람)
												},success: function(){
													alert("신고가 성공적으로 접수되었습니다.")
												},error: function(err){
													console.log(err)
												}});//ajax
										}//else
									 });//click
								});//mouseenter
								
								//댓글 신고접수 - 기타 사유 서술했을 때(this.text()대신에 직접쓴 내용이 content로 전달되어야 한다)
							   $('#complainReasonBtn').click(function(){
								 //입력값 유효성 검사
									if($('#complainReason').text()==''){
										$('#textCounterDiv').text('신고 사유를 입력하세요');
									}else{
									   $.ajax({
											type : 'post',
											url : '/market/member/complain',
											data: {reporter_id: $('#sessionId').val(),
													complain_content : $('#complainReason').val(),
													comment_seq : items.comment_seq,
													complain_category : '댓글 신고',
													mem_id:items.mem_id //댓글쓴 사람(==신고당할 사람)
											},success: function(){
												alert("신고가 성공적으로 접수되었습니다.")
											},error: function(err){
												console.log(err)
										}});//ajax
									}
							   });
						// 신고 카테고리 펼치기
						openSingoCate()
						// 모달 창 닫기 modalCloseBtn
						closeSingoModal();
						//글자수 카운팅
						countLetters();	
						});//신고끝
					}//else
				});
				});//each
			},error: function(err){
				console.log(err)
			}});	
	});
	$('#commentList').trigger('change');//댓글 출력
	
	//[댓글쓰기]
	writeComment();
//===========================================================================================================================
	//[글 수정하기]
	modifyArticle();
	
	//[글 삭제하기]
	deleteArticle();

	//[답글쓰기]
	replyArticle();

	//[글 신고하기]
	$('.section2-5-1').on('click', '.singoBtn', function(){
		$("#modalHidden").attr('id','modalDisplay'); //신고 모달창이 뜬다.
		
		$('.contentList>button').mouseenter(function(){
			 $(this).css('text-decoration', 'underline');
			 $(this).mouseleave(function(){
		        $(this).css('text-decoration', 'none');
			 });
			 
			 $(this).off('click').on('click',function(){
				if($('#sessionId').val()==null){ //세션 만료로 인해 로그인 풀렸을때, 로그인 폼으로 이동
					location.href="/market/member/loginForm";
				}else{
					//[글 신고 접수]
					$.ajax({
						type : 'post',
						url : '/market/member/complain',
						data: {reporter_id: $('#sessionId').val(),
								complain_content : $(this).text(),
								board_seq : $('#board_seq').val(),
								mem_id: writer, //글쓴 사람
								complain_category : '게시글 신고'
						},success: function(){
							alert("신고가 성공적으로 접수되었습니다.")
						},error: function(err){
							console.log(err)
						}});//ajax
					}
			 });//click
		});//mouseenter
		
		//글 신고 - 기타 사유 서술했을 때
		$('#complainReasonBtn').click(function(){
			//입력값 유효성 검사
			if($('#complainReason').text()==''){
				$('#textCounterDiv').text('신고 사유를 입력하세요');
			}else{
				$.ajax({
					type : 'post',
					url : '/market/member/complain',
					data: {reporter_id: $('#sessionId').val(),
							complain_content : $('#complainReason').val(),
							board_seq : $('#board_seq').val(),
							complain_category : '게시글 신고', 
							mem_id: writer,
					},success: function(){
						alert("신고가 성공적으로 접수되었습니다.")
					},error: function(err){
						console.log(err)
					}
				});//ajax
			}
		});
	    // 신고 카테고리 펼치기
		openSingoCate();
		// 모달 창 닫기 modalCloseBtn
		closeSingoModal();
		//글자수 카운팅
		countLetters();
	});//--end 글 신고하기
});//ready



//[글 관련 function]===================================================================================================
//글 수정
function modifyArticle(){
	$('#articleModifyBtn').click(function(){
		document.article.method="post"
		document.article.action="../board/modifyArticleForm";
		document.article.submit();
	});
}

//글삭제
function deleteArticle(){
	$('#articleDeleteBtn').click(function(){
		$.ajax({
			type : 'post',
			url : '/market/board/deleteArticle',
			data: 'seq='+$('#seq').val(),
			success: function(){
				if(confirm("정말 삭제하시겠습니까?")){
					("작성하신 글이 성공적으로 삭제되었습니다.");
					location.href="/market/board/list";	
				}
			},error: function(err){
				console.log(err)
			}
		});
	});
}

//답글쓰기
function replyArticle(){
	$('#replyBtn').click(function(){
		if ($('#sessionId').val()=='' || $('#sessionId').val()=='none'){
			location.href='/market/member/loginForm';
		}else{
			document.article.method="post";
			document.article.action="../board/replyForm";//controller
			document.article.submit();
		}
	});//--end 답글쓰기
}

//[댓글 관련 function]===================================================================================================
//댓글 쓰기
function writeComment(){
	$('.textarea_input').on('click', '#commentBtn', function(){
		
		//미입력 유효성 검사
		if ($('#comment_content').val()=='')
			$('#commentAreaDiv').text("댓글을 입력하세요");
		
		//세션만료로 인해 로그아웃되었을때, 로그인 페이지로 이동
		else if ($('#sessionId').val()=='' || $('#sessionId').val()=='none')
			location.href='/market/member/loginForm';
		
		else{
			$.ajax({
				type : 'post',
				url : '/market/board/writeComment',
				data: {'comment_content': $('#comment_content').val(),
					'board_seq': $('#board_seq').val()
				},success: function(){
					$('#commentListTable tr:gt(0)').remove();//┐댓글 테이블 전체 초기화(하지않으면 기존 리스트에 이어서 붙어나옴)
					$('#commentListTable tr:eq(0)').remove();//┘
					$('#commentList').trigger('change'); //새 댓글 작성 후, 댓글 리스트 재출력
					$('#comment_content').val('');//입력창 초기화
				},error: function(err){
					console.log(err)
				}
			});
		}
	});
}

//댓글 수정
function modifyComment(items){
	$('#commentListTable').on('click', '#modifyCommentBtn'+items.comment_seq, function(){
		//수정 창으로 변환
		$('#commentListTable .commentArea'+items.comment_seq).attr('class', 'commentModifyArea'+items.comment_seq);
		$('.commentModifyArea'+items.comment_seq).html(
			"<td style='width:800px' colspan='3'>" +
			"<textarea class='textarea_input' id='modifyContent'></textarea></td>" +
			"<td><input type='button' id='sendModifyBtn' value='수정'></td>");
		
		//기존 댓글 불러오기
		$.ajax({
			type : 'post',
			url : '/market/board/getAComment',
			data : 'comment_seq='+items.comment_seq,
			dataType:'text',
			success: function(data){//data=comment content(댓글 내용)
				$('#commentListTable #modifyContent').val(data);
			},error: function(err){
				console.log(err);
			}
		});
		
		//댓글 수정
		$('#sendModifyBtn').click(function(){
			$.ajax({
				type : 'post',
				url : '/market/board/modifyComment',
				data : 'comment_seq='+items.comment_seq+"&comment_content="+$('#modifyContent').val(),
				success: function(data){
					$('#commentListTable tr:gt(0)').remove();//┐댓글 테이블 전체 초기화
					$('#commentListTable tr:eq(0)').remove();//┘
					$('#commentList').trigger('change');//수정 후, 댓글 재출력
				},error: function(err){
					console.log(err);
				}
			});
		});
	});
}

//댓글삭제
function deleteComment(items){
	//댓글 삭제
	$('#commentListTable').on('click', '#deleteCommentBtn'+items.comment_seq, function(){
		$.ajax({
			type : 'post',
			url : '/market/board/deleteComment',
			data : 'comment_seq='+items.comment_seq, //삭제할 댓글 번호
			success: function(){
				alert("성공적으로 삭제했습니다.");
				$('#commentListTable tr:gt(0)').remove(); //┐댓글 테이블 전체 초기화. gt(0) -> eq(0) 순으로!
				$('#commentListTable tr:eq(0)').remove(); //┘
				$('#commentList').trigger('change'); //삭제 후, 댓글 재출력
			},error: function(err){
				console.log(err);
			}
		});
	});//-end 댓글삭제
}


//[신고 관련 function]===================================================================================================
//신고 카테고리 펼치기
function openSingoCate(){
	$('#singoModalBottom').on("click", '.singoTitle > .titleBtn', function(){
	     $(this).parent().attr('class','singoTitleOpen'); //$(this).parent() == $(".singoTitle")
	      
	     var className = $(this).parent().next().attr('class');
	     // height=180;인 애만 따로 처리
	     if(className == 'singoContentOther'){
	    	 $(this).parent().next().attr('class','singoContentOtherOpen');
	     }else if(className == 'singoContent') {
	    	 $(this).parent().next().attr('class','singoContentOpen'); 
	     }
	      
	     // 신고 카테고리 닫기 
	     $('#singoModalBottom').on("click", '.singoTitleOpen > .titleBtn', function(){
	         $(this).parent().attr('class','singoTitle');
	         
	         if(className == 'singoContentOtherOpen' || className =='singoContentOther'){
	            $(this).parent().next().attr('class', 'singoContentOther');
	         }else if(className == 'singoContentOpen' || className=='singoContent'){
	            $(this).parent().next().attr('class', 'singoContent');            
	         }
	     });//(2)닫기
	 });
}

//신고 사유 직접 서술 글자수 카운팅
function countLetters(){
	$('#complainReason').keyup(function(){
		let content = $(this).val();
		$('#counter').html(content.length);
		
		if(content.length>200){
			$('#textCounterDiv').text("입력 가능한 글자 수를 초과했습니다.");
			$(this).val(content.substring(0, 200)); //글자수 초과하면 안써지게
		}
	});
}

//신고 모달창 닫기
function closeSingoModal(){
	$('.singoModalWrap').on("click", '.modalCloseBtn', function(){
	      var openInBtn = $('.singoTitleOpen>button');
	      var className = openInBtn.parent().next().attr('class'); 
	      
	      $(openInBtn).parent().attr('class','singoTitle');
	      
	      if(className == 'singoContentOtherOpen' || className =='singoContentOther'){
	         $(openInBtn).parent().next().attr('class', 'singoContentOther');
	      }else if(className == 'singoContentOpen' || className=='singoContent'){
	         $(openInBtn).parent().next().attr('class', 'singoContent');            
	      }
	      $("#modalDisplay").attr('id','modalHidden'); 
	 });
}

