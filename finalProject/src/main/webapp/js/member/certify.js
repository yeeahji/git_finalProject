//담당 : 김명경

$(document).ready(function(){
//	아이디를 기반으로 수시로 회원 정보를 이용할 수 있게 세션 저장
	$.ajax({
		type: 'post',
		url: '/market/member/sessionLogin',
		success: function(){// 글 리스트. 페이지. 세
			console.log("세션 아이디, 이메일, 카카오 구분 정보 저장 완료");
		}, error:function(err){
			console.log("세션 안생김! err"+err);
		}
	});

});


$('#certifyBtn').click(function(){
	//유효성 검사
	if($('#certifyPwd').val()== '')
		$('#certifyPwdDiv').text("비밀번호를 입력하세요");
	else
		$.ajax({
			type : 'post',
			url : '/market/member/certify',
			data : 'mem_id='+$('#certifyId').val()+'&mem_pwd='+$('#certifyPwd').val(),
			dataType : 'text',
			success : function(result){
				if(result == 'yes'){//아이디/비번 일치 시
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

