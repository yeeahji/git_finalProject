
$(document).ready(function(){

	$('#withdrawBtn').click(function(){
		if(confirm("회원정보를 탈퇴하면, 모든 기록이 사라집니다. 정말 탈퇴하시겠습니까?")){
			$.ajax({
				type : 'post',
				url : '/market/member/withdrawForm',
	// 			data :, //???,
				success : function(){
					alert("회원정보를 성공적으로 삭제했습니다.");
					location.href="/market/index.jsp";
				}, error :  function(request, err){
					console.log(request.status + "\n message : " +request.responseText +"\n err:");
					alert(err);
				}
			});
		}else
			return;
	});
	
	
	$('#myboardBtn').click(function(){
		alert("aaa");
		location.href="/market/board/list";
		$.ajax({
			type : 'post',
			url : '/market/board/getBoardSearch',
			data : {
				pg: 1,
				searchType : 'mem_id',
				searchText : $('#memId').val()
			},dataType : 'json',
			success: function(result){
				alert("성공?");
//				- 검색결과 출력
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
					
					
//					▶ 답글 화살표 이미지 추가
					for(i=0; i<items.board_lev; i++){
						$('.'+items.board_seq).before('&emsp;');
					}
					if(items.board_pseq != 0) {//답글인 경우(pseq가 0이면 원글이다)
						$('.'+items.board_seq).before($('<img/>',{
							src : '../image/board/reply.gif'
						}));
					}
				});//each
				
			}, error: function(err){
				console.log("err"+err);
			}
		
			
		});
	});
	
});