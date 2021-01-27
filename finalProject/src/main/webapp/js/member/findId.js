$(document).ready(function(){
	$('#findPwdFormDiv').hide();
	$('#findIdFormDiv').show();
	
	
	
	//아이디 찾기
	$('#chooseIdForm').click(function(){
		$('#findPwdFormDiv').hide();
		$('#findIdFormDiv').show();
		
		$('#find_nameDiv').empty();
		$('#find_emailDiv').empty();
		
		if($('#find_name').val()=='')
			$('#find_nameDiv').text('아이디를 입력하세요');
		else if($('#find_email').val()=='')
			$('#failLoginDiv').text('이메일을 입력하세요');
		
		$('#find_id_Btn').click(function(){
			$('#send_emailDiv').text('이메일로 아이디를 발송했습니다.');
			location.href='/market/member/login';
		})
		
	});

//=============================================================================================
	//비밀번호 찾기
	$('#choosePwdForm').click(function(){
		$('#findIdFormDiv').hide();
		$('#findPwdFormDiv').show();
		
		$('#modiFyPwdFormDiv').hide();
		
		$('#find_IdDiv').empty();
		$('#find_emailDiv').empty();
		$('#send_emailDiv').empty();
		$('#certify_pwdDiv').empty();
		$('#certifyNumDiv').empty();
		$('#modify_pwd').empty();
		
		$('find_pwd_Btn').click(function(){
			if($('#find_Id').val()=='')
				$('#find_IdDiv').text('아이디를 입력하세요');
			else if($('#find_email').val()==''){
				$('#find_emailDiv').text('이메일을 입력하세요');
				
//				if(!(($('#find_Id') == || 디비 아이디) && ($('#find_Email') == || 디비 이메일)))
//					$('#find_emailDiv').text('올바르지 않은 계정 정보입니다');
				
//				else if($('#certifyNumBtn').click(function(){
//					$('#send_emailDiv').text('이메일로 본인 인증 코드를 발송했습니다.');
//					
//					if($('#certifyNum'!=이메일 인증코드)){
//						$('certify_pwdDiv').text('올바르지 않은 인증번호입니다.');
				
//					}else{ //인증번호가 일치하면, 비밀번호 수정 폼 등장
					modifyPwdForm.show();
					if($('#modifyPwd').val()=='')
						$('#modifyPwdDiv').text('비밀번호를 입력하세요');
					else if($('#modifyRepwd').val()=='')
						$('#modifyRepwdDiv').text('비밀번호를 다시 입력하세요');
					else{
						if($('#modifyPwd').val()==$('#modifyRepwd').val()){
							$('#modifyRepwdDiv').text('비밀번호가 일치합니다');
						}else{
							$('#modifyRepwdDiv').text('비밀번호가 일치하지 않습니다');
						}
					}
//				}))//certify else if
			}
		});
	});
});














