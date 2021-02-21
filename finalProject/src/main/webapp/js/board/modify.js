$(document).ready(function(){
	$.ajax({
		type : 'post',
		url : '/market/board/getArticle',
		data : 'seq='+$('#seq').val(),
		dataType : 'json',
		success : function(result){
			
			$('#subjectArea').val(result.boardDTO.board_subject);
			$('#contentArea').val(result.boardDTO.board_content);
		}, error: function(err){
			console.log(err);
		}
	});//ajax
	
	
	$('#modifyBtn').click(function(){
		$('#subjectAreaDiv').empty();
		$('#contentAreaDiv').empty();
		
		if($('#subjectArea').val()=='')
			$('#subjectAreaDiv').text("제목을 입력하세요.").css('color','red');
		else if($('#contentArea').val()=='')
			$('#contentAreaDiv').text("내용을 입력하세요.").css('color','red');
		else{
			
			$.ajax({
				type:'post',
				url: '/market/board/modifyArticle',
				data: { 'subject':$('#subjectArea').val(),
						'content':$('#contentArea').val(),
						'seq':$('#seq').val(),
				},success : function(){
					alert("작성하신 글이 성공적으로 수정되었습니다.");
					location.href="/market/board/list?pg="+$('#pg').val(); //pg값이 없으면 기본 1페이지로 설정되어있다
				},error:function(err){
					console.log("err: "+err);
				}
			});
		}
	});
	
});



