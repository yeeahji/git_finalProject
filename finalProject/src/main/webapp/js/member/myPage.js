
$(document).ready(function(){
	//삭제
//	$('#withdrawBtn').click(function(){
//		if(confirm("회원정보를 탈퇴하면, 모든 기록이 사라집니다. 정말 탈퇴하시겠습니까?")){
//			$.ajax({
//				type : 'post',
//				url : '/market/member/withdrawForm',
////	 			data :, //???,
//				success : function(){
//					alert("회원정보를 성공적으로 삭제했습니다.");
//					location.href="/market/index.jsp";
//				}, error :  function(request, err){
//					console.log(request.status + "\n message : " +request.responseText +"\n err:");
//					alert(err);
//				}
//			});
//		}else
//			return;
//	});
	
	//내 게시글 확인
	$('#myboardBtn').click(function(){
		location.href="/market/board/list" //위치 이동만 하고 아래 getBoardSearch ajax 작업 x. alert이 뜨는데... alert이 먼저 뜨고 위치 이동으한다.
//		$.ajax({
//			type : 'get',
//			url : '/market/board/list',
//			dataType: 'html',
//			success: function(){
				$.ajax({
					type : 'post',
					url : '/market/board/getBoardSearch',
					data : {
						pg: 1,
						searchType : 'mem_id',
						searchText : $('#sessionId').val()
					},dataType : 'json',
					success: function(result){
						alert("aaa");
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
				});//ajax getBoardSearch
//			},error: function(err){
//				console.log("err"+err);
//			}
//			
//		});
		

	});
	
});