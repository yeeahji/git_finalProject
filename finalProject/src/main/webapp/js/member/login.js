//담당: 김명경

//카카오 로그인 버튼 누르면 내 정보/토큰값 출력
window.Kakao.init("a038dceda6f2c98fdcda082f8520e744");
function kakaoLogin(){
       window.Kakao.Auth.login({
           scope: 'profile, account_email, age_range' ,//카카오로부터 받는 정보: 프로필, 이메일, 나이대
           persistAccessToken: true, //세션이 만료되어도 토큰을 스토리지에 계속 저장
           persistRefreshToken: true,
           success : function(result){
               console.log(result);
               
               window.Kakao.API.request({//현재 로그인한 사용자의 정보를 가져온다
                   url :'/v2/user/me', //사용자 정보 요청 주소
                   success : function(res){
	                   	const kakao_account = res.kakao_account;
	                   	 
	                   	$.ajax({
	        				type : 'post',
	        				url : '/market/member/kakao',
	        				data : {'mem_id': kakao_account.email,//카카오 로그인 시, 아이디로 이메일을 사용한다.
	        						},
	        				dataType : 'text', 
	        				success : function(result){
	        					if(result == 'success')//로그인 성공
	        						location.href="/market/index";
	        					else if(result =='fail')//카카오 로그인 실패(실패할 경우 없음)
	        						$('#failLoginDiv').text("가입하지 않은 아이디이거나, 잘못된 계정 정보입니다.");
	        					
	        				},error : function(err){
	        					console.log(err);
	        				}
	        			})//ajax
	                   	console.log("정상적으로 로그인되었습니다");
                        console.log(kakao_account);
                        console.log("이메일: " +kakao_account.email);
                   },fail: function(err){
                   		console.log(err)
                   }
               });//window.Kakao.API.request
           }//상위 success
       });
   }
    
//저장된 카카오 계정 연결 끊기
function kakaoLogout(){
	Kakao.API.request({
	  url: '/v1/user/unlink',//연결 끊기
	  success: function(response) {
	    console.log(response);
	  },
	  fail: function(error) {
	    console.log(error);
	  },
	});
}

