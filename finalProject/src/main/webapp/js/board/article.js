$(document).ready(function(){
	var comment_writer; //댓글 쓴 사람
	$('#commentListTable tr:eq(0)').remove();
	$('#commentListTable tr:gt(0)').remove();
	
	
	//글 화면 출력
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
	
			//작성자 본인일 경우 : 신고버튼X. OWNER쪽 O
			if(data.sessionId == data.boardDTO.mem_id){
				$('#owner').show();	
				$('.singoBtn').hide();	
			//작성자 아닐 경우 : 신고버튼O. OWNER쪽 X
			}else {
				$('.singoBtn').show();	
				$('#owner').hide();	
			}
		},error: function(err){
			console.log(err);
		}
	});
	
	//댓글 출력
	$('#triggerList').change(function(){
		$.ajax({
			type : 'post',
			url : '/market/board/showComment',
			data : 'board_seq='+$('#board_seq').val(), 
			dataType : 'json',
			success: function(data){
				$.each(data.list, function(index, items){
					$('#comment_seq').val(items.comment_seq);
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
			                href: 'javascript:;',
			                id:'moreBtn'+items.comment_seq
			                }).append($('<img/>',{
			                    src: '../image/board/moreBtn.png',
			                    viewBox:"0 0 3 15"
			                }))
			            ).append($('<div/>',{//더보기 클릭시 나오는 곳
			                id:'writerVersion',//내가 댓글 작성자일때, 
			                class:'writerVersion'+items.comment_seq,
			                }).append($('<a/>',{
			                    text: '수정',
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
				});//each
			},error: function(err){
				console.log(err)
			}
		});	
	});//트리거!!!!!!
	$('#triggerList').trigger('change');//댓글 출력
	
	
	//더보기 버튼 이후
	$.ajax({
		type : 'post',
		url : '/market/board/showComment',
		data : 'board_seq='+$('#board_seq').val(), 
		dataType : 'json',
		success: function(data){
			//더보기 버튼 클릭
			$.each(data.list, function(index, items){
				$('#commentListTable').on('click', '#moreBtn'+items.comment_seq, function(){
					//댓글쓴이와 세션아이디가 같다면(==내가 댓글 쓴 사람이라면), 수정/삭제버튼
					if($('#sessionId').val() == items.mem_id){//items.mem_id=댓글쓴이
						console.log("세션아이디:"+$('#sessionId').val());
						console.log("댓글쓴이:"+items.mem_id);
						console.log("writerVersion"+items.comment_seq);
						$('.writerVersion'+items.comment_seq).show();
						$('.notWriterVersion'+items.comment_seq).hide();
						
						//댓글 삭제
						$('#commentListTable').on('click', '#deleteCommentBtn'+items.comment_seq, function(){
							$.ajax({
								type : 'post',
								url : '/market/board/deleteComment',
								data : 'comment_seq='+items.comment_seq,
								success: function(){
									alert("성공적으로 삭제했습니다.");
									$('#commentListTable tr:gt(0)').remove(); //gt(0) -> eq(0) 순으로!
									$('#commentListTable tr:eq(0)').remove();
									$('#triggerList').trigger('change');
								},error: function(err){
									console.log(err);
								}
							});
						});//-end 댓글삭제
						
						//댓글 수정
						$('#commentListTable').on('click', '#modifyCommentBtn'+items.comment_seq, function(){
							//수정 창으로 변환
							$('#commentListTable .commentArea'+items.comment_seq).attr('class', 'commentModifyArea'+items.comment_seq);
							$('.commentModifyArea'+items.comment_seq).html(
								"<textarea id='modifyContent'></textarea><button type='button' id='sendModifyBtn'>수정</button>");
							
							//기존 댓글 불러오기
							$.ajax({
								type : 'post',
								url : '/market/board/getAComment',
								data : 'comment_seq='+items.comment_seq,
								dataType:'text',
								success: function(data){//data=comment content
									$('#commentListTable #modifyContent').val(data);
								},error: function(err){
									console.log(err);
								}
							});
							//수정 update
							$('#sendModifyBtn').click(function(){
								$.ajax({
									type : 'post',
									url : '/market/board/modifyComment',
									data : 'comment_seq='+items.comment_seq+"&comment_content="+$('#modifyContent').val(),
									success: function(data){
										$('#commentListTable tr:gt(0)').remove();
										$('#commentListTable tr:eq(0)').remove();
										
										$('#triggerList').trigger('change');
									},error: function(err){
										console.log(err);
									}
								});
							});
						});//end 댓글 수정
					}//if
					//작성자가 다르다면, 신고버튼
					else{
						console.log("세션아이디:"+$('#sessionId').val());
						console.log("댓글쓴이:"+items.mem_id);
						console.log("notwriterVersion"+$('#comment_seq').val());
						$('.notWriterVersion'+items.comment_seq).show();
						$('.writerVersion'+items.comment_seq).hide();
						
						//댓글 신고
						$('#commentListTable').on('click', '#singoBtn'+items.comment_seq, function(){
							 $("#modalHidden").attr('id','modalDisplay'); 
							   $('.contentList>button').mouseenter(function(){
							      $(this).css('text-decoration', 'underline');
							      
							      $(this).click(function(){
							         alert("신고가 접수되었습니다.(test)"); //Q. 왜 여러번 뜨는?ㅋ
							      });
							      
							      $(this).mouseleave(function(){
							         $(this).css('text-decoration', 'none');
							      });
							      
							   });
							   
							   // 신고 카테고리 펼치기
							   $('#singoModalBottom').on("click", '.singoTitle > .titleBtn', function(){
							      $(this).parent().attr('class','singoTitleOpen'); //$(this).parent() == $(".singoTitle")
							      
							      var className = $(this).parent().next().attr('class');
							      // height=180;인 애만 따로 처리
							      if(className == 'singoContentOther'){
							         $(this).parent().next().attr('class','singoContentOtherOpen');
							      }else if(className == 'singoContent') {
							         $(this).parent().next().attr('class','singoContentOpen'); 
							      }
							      
							      // 닫히는 방법 2가지
							      // (1) 펼친 상태에서 다른 카테고리 버튼 눌리면 알아서 접히기
							      
							      // (2) 닫기 (다시 클릭)
							      $('#singoModalBottom').on("click", '.singoTitleOpen > .titleBtn', function(){
							         $(this).parent().attr('class','singoTitle');
							         
							         if(className == 'singoContentOtherOpen' || className =='singoContentOther'){
							            $(this).parent().next().attr('class', 'singoContentOther');
							         }else if(className == 'singoContentOpen' || className=='singoContent'){
							            $(this).parent().next().attr('class', 'singoContent');            
							         }
							      });//(2)닫기
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
							});//댓글신고
						}//else
					});
				});
			
			}//success
			,error: function(err){
				console.log(err);
			}
	});//end더보기버
	
	//댓글쓰기
	$('.textarea_input').on('click', '#commentBtn', function(){
//	$('#commentBtn').click(function(){
		if ($('#comment_content').val()==''){
			$('#commentAreaDiv').text("댓글을 입력하세요");
		}
		//세션만료로 인해 로그아웃되었을때
		else if ($('#memId').val()==''){
			$('#loginModalHidden').css('display','flex');
		}else{
			$.ajax({
				type : 'post',
				url : '/market/board/writeComment',
				data: {'comment_content': $('#comment_content').val(),
					'board_seq': $('#board_seq').val()
				},success: function(){
					$('#commentListTable tr:gt(0)').remove();
					$('#commentListTable tr:eq(0)').remove();
					$('#triggerList').trigger('change');
					$('#comment_content').val('');
				},error: function(err){
					console.log(err)
				}
			});
		}
	});//-end 댓글쓰기
	
//===================================================================================
		//글 수정하기
		$('#articleModifyBtn').click(function(){
			document.article.method="post"
			document.article.action="../board/modifyArticleForm";
			document.article.submit();
			
		});//--end글 수정
		
		//글 삭제하기
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
		});//--end글 삭제
	
		//답글쓰기
		$('#replyBtn').click(function(){
			document.article.method="post";
			document.article.action="../board/replyForm";//controller
			document.article.submit();
		});//--end 답글쓰기
	
		//글 신고하기
		
		$('.section2-5-1').on('click', '.singoBtn', function(){
			 $("#modalHidden").attr('id','modalDisplay'); 
			   $('.contentList>button').mouseenter(function(){
			      $(this).css('text-decoration', 'underline');
			      
			      $(this).click(function(){
			         alert("신고가 접수되었습니다.(test)"); //Q. 왜 여러번 뜨는?ㅋ
			      });
			      
			      $(this).mouseleave(function(){
			         $(this).css('text-decoration', 'none');
			      });
			      
			   });
			   
			   // 신고 카테고리 펼치기
			   $('#singoModalBottom').on("click", '.singoTitle > .titleBtn', function(){
			      $(this).parent().attr('class','singoTitleOpen'); //$(this).parent() == $(".singoTitle")
			      
			      var className = $(this).parent().next().attr('class');
			      // height=180;인 애만 따로 처리
			      if(className == 'singoContentOther'){
			         $(this).parent().next().attr('class','singoContentOtherOpen');
			      }else if(className == 'singoContent') {
			         $(this).parent().next().attr('class','singoContentOpen'); 
			      }
			      
			      // 닫히는 방법 2가지
			      // (1) 펼친 상태에서 다른 카테고리 버튼 눌리면 알아서 접히기
			      
			      // (2) 닫기 (다시 클릭)
			      $('#singoModalBottom').on("click", '.singoTitleOpen > .titleBtn', function(){
			         $(this).parent().attr('class','singoTitle');
			         
			         if(className == 'singoContentOtherOpen' || className =='singoContentOther'){
			            $(this).parent().next().attr('class', 'singoContentOther');
			         }else if(className == 'singoContentOpen' || className=='singoContent'){
			            $(this).parent().next().attr('class', 'singoContent');            
			         }
			      });//(2)닫기
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
			
		});//--end 글 신고하기
			
		
});