//[목록 출력]
$(document).ready(function(){
	$.ajax({
		type: 'post',
		url: '/market/board/showList',
		data: {'pg': $('#pg').val()},  //list.jsp의 히든 pg값
		dataType: 'json',
		success: function(data){// 글 리스트. 페이지. 세션 아이디. 보드페이징
			console.log("list.js -showList: "+data.sessionId);
			$.each(data.list, function(index, items){
				$('<tr/>').append($('<td/>',{
					align: 'center',
					text: items.board_seq
				})).append($('<td/>',{
					}).append($('<a/>',{
						href: '#',
						text: items.board_subject,
						id: 'subjectA', //아이디를 추가한다.
						class: items.board_seq+''
					}))
				).append($('<td/>',{
					align: 'center',
					text: items.mem_id
				})).append($('<td/>',{
					align: 'center',
					text: items.board_hit
				})).append($('<td/>',{
					align: 'center',
					text: items.board_logtime
				})).appendTo($('#boardListTable')); 
				
//				▶ 답글 화살표 이미지 추가
				for(i=0; i<items.board_lev; i++){
					$('.'+items.board_seq).before('&emsp;');
				}
				if(items.board_pseq != 0) {//답글인 경우(pseq가 0이면 원글이다)
					$('.'+items.board_seq).before($('<img/>',{
						src : '../image/board/reply.gif'
					}));
				}
				
			});//each
			
//			글 제목 클릭 시, 
			$('#boardListTable').on('click', '#subjectA', function(){
				
				//로그인 안되어 있다면 로그인하러 가기 
				if(data.sessionId == null){
					$('#loginModalHidden').css('display','flex');
					$('#loginModalWrap').on("click", '.loginModalCloseBtn', function(){
						$('#loginModalHidden').css('display','none');
						$('#id').val('');
						$('#pwd').val('');
					});
				}
				//로그인 되어 있다면, 글 보기 화면으로 가기
				else{
					let seq = $(this).parent().prev().text();
					let pg = data.pg;
					location.href = '/market/board/articleForm?seq='+seq+"&pg="+pg;
				}
			});
			
			//페이징 처리
			$('#boardPagingDiv').html(data.boardPaging.pagingHTML);
//											↑이 변수안에 페이지 넘버가 들어있다.
			//글쓰기 버튼 클릭 시
			$('#goWriteBtn').click(function(){
				if(data.sessionId == null){
					$('#loginModalHidden').css('display','flex');
					$('#loginModalWrap').on("click", '.loginModalCloseBtn', function(){
						$('#loginModalHidden').css('display','none');
						$('#id').val('');
						$('#pwd').val('');
					});
				}else{
					console.log("else:"+data.sessionId);
					location.href = '/market/board/writeForm';
				}
			});
			
			
		},error: function(data, status, opt){
			console.log("code:"+data.status+"\n"+"message:"+data.responseText+"\n"+"error:"+opt);

		}
	});//리스트 출력
	
	
	
	//[검색]======================================================================================================================
	$('#boardSearchBtn').click(function(event, str){ //paging함수에서 발생한 이벤트를 그대로 받아온다.

		if(str != 'research') {
			$('input[name=pg]').val(1); //직접 검색 버튼을 눌렀을 때
		}
		if($('#searchText').val()==''){
			$('#searchDiv').val("검색어를 입력하세요");
		}else{
			$.ajax({
				type:'post',
				url:'/market/board/getBoardSearch',
				data : $('#boardSearchForm').serialize(), //pg, searchType, searchText
				dataType : 'json',
				success:function(result){
//					alert(JSON.stringify(result));
					
					$('#boardListTable tr:gt(0)').remove();
					
//					- 검색결과 출력
					$.each(result.list, function(index, items){
						$('<tr/>').append($('<td/>',{
							align: 'center',
							text: items.board_seq
						})).append($('<td/>',{
							}).append($('<a/>',{
								href: '#',
								text: items.board_subject,
								id: 'subjectA', //아이디를 추가한다.
								class: items.board_seq+''
							}))
						).append($('<td/>',{
							align: 'center',
							text: items.mem_id
						})).append($('<td/>',{
							align: 'center',
							text: items.board_hit
						})).append($('<td/>',{
							align: 'center',
							text: items.board_logtime
						})).appendTo($('#boardListTable')); 
						
						
//						▶ 답글 화살표 이미지 추가
						for(i=0; i<items.board_lev; i++){
							$('.'+items.board_seq).before('&emsp;');
						}
						if(items.board_pseq != 0) {//답글인 경우(pseq가 0이면 원글이다)
							$('.'+items.board_seq).before($('<img/>',{
								src : '../image/board/reply.gif'
							}));
						}
					});//each
					//페이징 처리
					$('#boardPagingDiv').html(result.boardPaging.pagingHTML);
				}, error: function(err){
					console.log("err"+err);
					}
				})
			}
	});
	
});//document.ready

//페이지 이동
function boardPaging(pg){
	var searchText=$('#searchText').val();
	if(searchText == ''){//검색값이 없기 때문에 원래 리스트대로 처리하면 된다
		location.href="list?pg="+pg; 
	}else{
		$('input[name=pg]').val(pg);
		$('#boardSearchBtn').trigger('click','research');//검색버튼 눌렀을때 같은 효과
	}	
}



























