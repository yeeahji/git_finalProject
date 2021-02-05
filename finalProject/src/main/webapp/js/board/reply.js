$(document).ready(function(){
	$('#replyBtn').click(function(){
		$('#subjectDiv').empty();
		$('#contentDiv').empty();
		
		if($('#subject').val()=='')
			$('#subjectDiv').text("제목을 입력하세요.").css('color','red');
		else if($('#content').val()=='')
			$('#contentDiv').text("내용을 입력하세요.").css('color','red');
		else{
			$.ajax({
				type:'post',
				url: '/market/board/reply',
				data: {'pseq' :$('#pseq').val(),//원글번호
						'pg': $('#pg').val(),//원글의 페이지 번호
						'subject': $('#subject').val(), 
						'content': $('#content').val()},
				success : function(){
					alert("작성하신 답글이 성공적으로 등록되었습니다.");
					location.href="/market/board/list";
				},error:function(err){
					console.log("err"+err);
				}
			});
		}
	});
});