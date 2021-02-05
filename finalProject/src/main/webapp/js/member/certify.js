$('#certifyBtn').click(function(){
	if($('#certifyPwd').val()== '')
		$('#certifyPwdDiv').text("비밀번호를 입력하세요");
	else
		$.ajax({
			type : 'post',
			url : '/market/member/certify',
			data : 'mem_id='+$('#certifyId').val()+'&mem_pwd='+$('#certifyPwd').val(),
			dataType : 'text',
			success : function(result){
				if(result == 'yes'){
					location.href='/market/member/myPage';
				}else if(result =='no'){
					alert("올바르지 않은 비밀번호입니다.");
				}
			}, error :  function(request, err){
				alert(err);
				console.log(request.status + "\n message : " +request.responseText +"\n err:");
			}
		});
	
});

