//담당 : 김명경

$(document).ready(function(){
	//글쓰기 버튼 눌렀을 때
	$('#writeBtn').click(function(){
		//입력 유효성 검사
		if($('#subjectArea').val()== '')
			$('#subjectAreaDiv').text("제목을 입력하세요");
		else if($('#contentArea').val()== '')
			$('#contentAreaDiv').text("내용을 입력하세요");
		else{
			//작성한 글 db에 저장
			$.ajax({
				type : 'post',
				url : '/market/board/write',
				data : 'subject='+$('#subjectArea').val()+'&content='+$('#contentArea').val(),
				success : function(){
					location.href='/market/board/list';
				}, error :  function(request, err){
					console.log(request.status + "\n message : " +request.responseText +"\n err:");
				}
			});//ajax
		}
		
	});
});

