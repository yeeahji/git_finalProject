/*
$(document).ready(function(){
	//현재 사용불가.
	$.ajax({
		type : 'post',
		url : '/market/board/getBoardSearch',
		data : {
			pg: 1,
			searchType : 'mem_id',
			searchText : $('#sessionId').val()
		},dataType : 'json',
		success: function(result){
			$('#boardListTable tr:gt(0)').remove();
		
//						- 검색결과 출력
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
				
//							▶ 답글 화살표 이미지 추가
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
			alert("ddd");
		}, error: function(err){
			console.log("err"+err);
			alert("bbbb");
		}
	});
	
});
*/