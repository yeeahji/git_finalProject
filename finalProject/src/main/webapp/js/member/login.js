//로그인하러 가는 버튼 
//let loginForm = $('form[name="loginForm"]').serilaize();
//로그인하러 가는 버튼 
$(document).ready(function(){
	$('#goLoginBtn').click(function(){
		$('#loginModalHidden').attr('id','loginModalDisplay');
	});
	$('#loginModalWrap').on("click", '.loginModalCloseBtn', function(){
		$('#loginModalDisplay').attr('id', 'loginModalHidden');
	});
	
	
	
	//로그인 ok
	$('#loginBtn').click(function(){
		$('#failLoginDiv').empty();
		if($('#id').val()=='')
			$('#failLoginDiv').text('아이디를 입력하세요');
		else if($('#pwd').val()=='')
			$('#failLoginDiv').text('비밀번호를 입력하세요');
		else{
			$.ajax({
				type : 'post',
				url : '/market/member/login',
				data : {'id': $('#id').val(), 'pwd': $('#pwd').val()},
				dataType : 'text', 
				success : function(result){
					if(result == 'success'){
						location.href = "/market/index.jsp";
					}else if(result =='fail'){
						$('#failLoginDiv').text("가입하지 않은 아이디이거나, 잘못된 계정 정보입니다.");
					}
				},error : function(err){
					console.log(err);
				}
			})//ajax
		}
	});
	
	
});
//$(document).ready(function(){
//	$('#goLoginBtn').click(function(){
//		$('#loginModalHidden').modal();
//		 $('#loginModalHidden').attr('id','loginModalDisplay');
//		$.ajax({
//			type:'get',
//			url : "/market/member/loginForm.jsp",
//			context:document.body, //success안의 this는 이제 document.body를 의미
//            success : function(data) {
//            	console.log(data);
////            	let modal = $(data).find($('#loginModalHidden'));
////              $('#aa').html(modal);
//            	$('#aa').html(data);
//            	alert("Aa");
//               $('#loginModalHidden').attr('id','loginModalDisplay');
//           }.bind(this) //이게 있어야 페이지 이동안하고 뜬다.
//           , error : function(err) {
//              console.log(err);
//           }
//		});
//	});
//	$('#loginModalWrap').on("click", '.loginModalCloseBtn', function(){
//		$('#loginModalDisplay').attr('id', 'loginModalHidden');
//	});
//	
//});


