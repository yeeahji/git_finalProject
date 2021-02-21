$(document).ready(function(){
	$('#writeBtn').click(function(){
		if($('#subjectArea').val()== '')
			$('#subjectAreaDiv').text("제목을 입력하세요");
		else if($('#contentArea').val()== '')
			$('#contentAreaDiv').text("내용을 입력하세요");
		else{
			
			$.ajax({
				type : 'post',
				url : '/market/board/write',
				data : 'subject='+$('#subjectArea').val()+'&content='+$('#contentArea').val(),
				success : function(){
					location.href='/market/board/list';
				}, error :  function(request, err){
					alert(err);
					console.log(request.status + "\n message : " +request.responseText +"\n err:");
				}
			});//ajax
		}
			
		
	});
});

