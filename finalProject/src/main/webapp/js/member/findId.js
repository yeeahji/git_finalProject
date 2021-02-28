//담당 : 김명경

let pwd_rule=/^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[.!@#$%^&+=]).*$/; 
let email_rule=/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;


$(document).ready(function(){
	
	//처음 페이지 입장하여 버튼 클릭 전까지는 '아이디or비번찾기 폼' 숨기기
	$('#findIdFormDiv').hide();
	$('#findPwdFormDiv').hide();
	
	//아이디 찾기 버튼을 눌렀을 때
	$('#chooseIdForm').click(function(){
		$('#findPwdFormDiv').hide(); //id 찾기 폼만 보이고
		$('#findIdFormDiv').show();  //pwd 찾기 폼은 숨긴다
		
		//입력창 초기화
		$('#findNameDiv').empty();
		$('#findEmailDiv').empty();
		
		//'아이디 찾기' 버튼 클릭했을 떄,
		$('#findIdBtn').click(function(){
			//이메일 입력 유효성 검사(이메일(unique)값으로 확인한다)
			if($('#email1').val()==''||$('#email2').val()=='')
				$('#emailDiv').text('이메일을 입력하세요');
			else{
				$('#email').val($('#email1').val() + '@' + $('#email2').val()); 
				$.ajax({
					type: 'post',
					url: '/market/member/findId',
					data: 'mem_email='+$('#email').val(),
					dataType : 'json',
					success: function(result){
						if (JSON.stringify(result.findId)=="null"){//일치하는 이메일 없음
							$('#emailDiv').text('등록되지 않은 이메일입니다.');
						}else{//일치하는 데이터있음
							$('#emailDiv').text('작성하신 이메일로 아이디를 발송하였습니다');
						}
					},error: function(err){
						console.log(err);
					}
				});
			}
		})
	});//chooseIdForm

//=============================================================================================
	//비밀번호 찾기 버튼을 눌렀을때(이메일 인증 -> 비밀번호 수정)
	//아이디 찾기의 변수와 구분하기 위해 변수명 끝에 'P'를 붙임
	$('#choosePwdForm').click(function(){
		$('#findIdFormDiv').hide();
		$('#findPwdFormDiv').show();
		
		//입력창 초기화
		$('#idDivP').empty();
		$('#emailDivP').empty();
		$('#certifyNumDiv').empty();
		$('#modify_pwd').empty();
		
		//인증번호 발송 버튼 클릭
		$('#sendNumBtnP').click(function(){
			//입력 유효성 검사
			if($('#idP').val()=='')
				$('#idDivP').text('아이디를 입력하세요');
			else if($('#email1P').val()==''||$('#email2P').val()=='')
				$('#emailDivP').text('이메일을 입력하세요');
			
			//본인 인증 확인 + 인증번호 메일 발송
			else{
				$('#emailP').val($('#email1P').val() + '@' + $('#email2P').val()); 
				
				$.ajax({
					type: 'post',
					url: '/market/member/findPwd',//메일로 인증번호 발송
					data: 'mem_email='+$('#emailP').val()+'&mem_id='+$('#idP').val(),
					dataType : 'json',
					success: function(result){
						if (JSON.stringify(result.member)=="null"){//일치하는 이메일 없음
							$('#emailDivP').text('등록되지 않은 이메일입니다.');
						}else{//일치하는 데이터있음
							$('#emailDivP').text('작성하신 이메일로 인증번호를 발송하였습니다').css('color','#0a58ca');
							$('#randomNum').val(result.randomNum);
							
							//인증번호 확인 버튼 클릭 시, 인증번호 일치 여부 체크
							$("#certifyNumBtn").click(function(){
								let certifyNum = $(this).val();
								$.ajax({
									type: 'post',
									url: '/market/member/confirmPwdcode',
									data: 'randomNum='+$('#randomNum').val()+"&certifyNum="+$('#certifyNum').val(),
									dataType: 'json',
									success: function(result){
										//인증번호 불일치 시
										if(result.certifyNum != result.randomNum){
											$('#certifyNumDiv').text('인증번호가 일치하지 않습니다!');
										}else {//인증번호 일치 시
											$('#certifyNumDiv').text('인증 완료되었습니다. 비밀번호를 재설정하세요.').css('color','#0a58ca');
											
											//비밀번호 재설정	
											$('#resetPwdBtn').click(function(){
												//입력 유효성 검사
												if($('#resetPwd').val()==''){
													$('#resetPwdDiv').text('재설정할 비밀번호를 입력하세요');
													if(!pwd_rule.test($('#resetPwd').val())) //8-15글자. 특문+영문+숫자 조합
														$('#resetPwdDiv').text('올바르지 않은 비밀번호 형식입니다.');
												}else if($('#certifyPwd').val()==''){
													$('certifyPwdDiv').text('비밀번호를 다시 입력하세요');
													if($('#resetPwd').val() != $('#certifyPwd').val())
														$('#certifyPwdDiv').text('비밀번호가 일치하지 않습니다');
												}else{
													if($('#resetPwd').val() != $('#certifyPwd').val())
														$('#certifyPwdDiv').text('비밀번호가 일치하지 않습니다');
													
													//새 비밀번호 변경
													else{
														$('#certifyPwdDiv').text('비밀번호가 일치합니다');
															$.ajax({
																type: 'post',
																url: '/market/member/resetPwd',
																data: 'mem_email='+$('#emailP').val()+'&mem_pwd='+$('#resetPwd').val(),
																dataType : 'text',
																success: function(result){
																	$('#certifyPwdDiv').text('비밀번호가 성공적으로 설정되었습니다.').css('color','#0a58ca');
																},error: function(err){
																	console.log(err);
																}
															});//ajax
														}
													}
												});//#resetPwdBtn
										}
									}
								});
							});
							
						}
					},error: function(err){
						console.log(err);
					}
				});
			}	//else
		});//sendNumBtnP
	});//choosePwdForm
});	//document.ready











