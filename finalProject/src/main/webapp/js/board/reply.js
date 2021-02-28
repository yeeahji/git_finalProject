//담당 : 김명경

$(document).ready(function(){
	$('#replyBtn').click(function(){
		//경고 div 초기화
		$('#subjectDiv').empty();
		$('#contentDiv').empty();
		
		//미입력 유효성 검사
		if($('#subject').val()=='')
			$('#subjectDiv').text("제목을 입력하세요.").css('color','red');
		else if($('#content').val()=='')
			$('#contentDiv').text("내용을 입력하세요.").css('color','red');
		else{
			//답글 쓰기
			$.ajax({
				type:'post',
				url: '/market/board/reply',
				data: {'pseq' :$('#pseq').val(),//원글번호
						'pg': $('#pg').val(),//원글의 페이지 번호
						'subject': $('#subject').val(), 
						'content': $('#content').val()},
				success : function(){
					alert("작성하신 답글이 성공적으로 등록되었습니다.");
					location.href="/market/board/list?pg="+$('#pg').val();//저장된 pg값으로 이동하되, 없을 경우 기본페이지값 1
				},error:function(err){
					console.log("err"+err);
				}
			});
		}
	});
});