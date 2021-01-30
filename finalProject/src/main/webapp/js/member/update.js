let pwd_rule=/^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[.!@#$%^&+=]).*$/; 
let email_rule=/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
let phone_rule=/^\d{3}-\d{3,4}-\d{4}$/;

//회원정보수정
$('#updateBtn').click(function(){
	$('#pwdDiv').empty();
	$('#repwdDiv').empty();
	$('#telDiv').empty();
	$('#postcodeDiv').empty();
	$('#addDiv').empty();
	
	if($('input[name=pwd]').val()=='')
		$('#pwdDiv').text('비밀번호를 입력하세요').css('color', 'red');
	else if($('input[name=repwd]')==$('input[name=pwd]').val())
		$('#rePwdDiv').text('비밀번호가 일치하지 않습니다').css('color', 'red');
	
	else if($('#tel2').val()==''|| $('#tel3').val()=='')
		$('#telDiv').text('전화번호를 입력하세요');
	else if($('#postcode').val()=='')
		$('#postcodeDiv').text('우편번호를 검색하여 입력하세요');
	else if($('#add1').val()==''||$('#add2').val()=='')
		$('#addDiv').text('주소를 입력하세요');
	else{
		$('#mem_email').val($('#email1').val() + '@' + $('#email2').val()); 
		$('#mem_tel').val($('#tel1').val() + '-' + $('#tel2').val() + '-' +$('#tel3').val()); 
		
		$.ajax({
			type : 'post',
			url : '/market/member/update',
			data : $('#updateForm').serialize(),
			success : function(){
				alert("회원정보를 성공적으로 수정했습니다.");
				location.href="/market/index.jsp";
			}, error :  function(request, err){
				console.log(request.status + "\n message : " +request.responseText +"\n err:");
				alert(err);
			}
		});
	}
});
//우편 번호
$('#checkPostBtn').click(function(){
	window.open("/market/member/postForm.jsp", "postForm", "width=700 height= 500 scrollbars=yes");
});

//우편 번호 창 검색
$('#searchPostBtn').click(function(){
	$.ajax({
		type:'post',
		url:'/market/member/searchPost',
		data:$('#postForm').serialize(),
		dataType:'json',
		success:function(result){
			$('#postTable tr:gt(2)').remove(); 
			
//			▶ 검색결과 출력
			$.each(result.list, function(index, items){ 
				let address = items.sido+' '
							+ items.sigungu+' '
							+ items.yubmyundong+' '
							+ items.ri +' '
							+ items.roadname +' '
							+ items.buildingname;
				address = address.replace(/null/g, '');
				
				$('<tr/>').append($('<td/>',{ 
					align: 'center',
					text: items.zipcode
					})).append($('<td/>',{
						colspan:'3',
						}).append($('<a/>',{ 
							href:'#',
							id:'addressA',
							text: address
							}))
				).appendTo($('#postTable'));
			});//each
			
//			 ▶ 선택한 주소의 값을 회원가입 창에 전달하기
			$('a').click(function(){//클릭한 a태그
				$('#postcode', opener.document).val($(this).parent().prev().text());
				$('#add1', opener.document).val($(this).text());
				$('#add2', opener.document).focus();
				window.close();
			});
		},error: function(err){
			console.log(request.status + "\n message : " +request.responseText +"\n err:");
			alert(err);
		}
	});
});
