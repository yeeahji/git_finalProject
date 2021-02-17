let name_rule=/^[가-힣]+$/;
let id_rule=/^[0-9a-z]{7,20}$/;
let pwd_rule=/^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[.!@#$%^&+=]).*$/; 
let email_rule=/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
let phone_rule=/^\d{3}-\d{3,4}-\d{4}$/;

let emailRandom;


//회원가입 입력
$('#joinBtn').click(function(){
	$('#nameDiv').empty();
	$('#idDiv').empty();
	$('#pwdDiv').empty();
	$('#repwdDiv').empty();
	$('#emailDiv').empty();
	$('#emailNumDiv').empty();
	$('#telDiv').empty();
	$('#postcodeDiv').empty();
	$('#addDiv').empty();
	
	if($('#name').val()=='')
		$('#nameDiv').text('이름를 입력하세요');
	else if($('#id').val()=='')
		$('#idDiv').text('아이디를 입력하세요');
	else if($('#pwd').val()=='')
		$('#pwdDiv').text('비밀번호를 입력하세요');
	else if($('#repwd').val()=='')
		$('#repwdDiv').text('비밀번호를 확인하세요');
	else if($('#email1').val()=='')
		$('#emailDiv').text('이메일을 입력하세요').css('color', 'rgba(153, 0, 33, 0.781)');
	else if($('#email2').val()=='')
		$('#emailDiv').text('이메일을 입력하세요').css('color', 'rgba(153, 0, 33, 0.781)');
	else if($('#emailNum').val()=='')
		$('#emailNumDiv').text('');
	else if($("#emailNum").val() != emailRandom){
		$('#emailNumDiv').text('인증번호가 일치하지 않습니다!').css('color', 'rgba(153, 0, 33, 0.781)');
		console.log(emailRandom);
	}
	
	else if($('#tel2').val()==''|| $('#tel3').val()=='')
		$('#telDiv').text('전화번호를 입력하세요');
	else if($('#postcode').val()=='')
		$('#postcodeDiv').text('우편번호를 검색하여 입력하세요');
	else if($('#add1').val()==''||$('#add2').val()=='')
		$('#addDiv').text('주소를 입력하세요');
	else if(! $('#requirementCheck:checked').val())
		$('#checkboxDiv').text('필수동의사항에 체크하세요');
	else{
		$('#email').val($('#email1').val() + '@' + $('#email2').val()); 
		$('#tel').val($('#tel1').val() + '-' + $('#tel2').val() + '-' +$('#tel3').val()); 
		$('form[name=joinForm]').submit();
	}
});

//1. 이름 형식 검사
$('#name').focusout(function(){
	if(!name_rule.test($('#name').val())){
		$('#nameDiv').text('이름은 한글만 입력 가능합니다');
	}else if(name_rule.test($('#name').val())){
		$('#nameDiv').text('');
	}
});

//2. 아이디 형식검사 + 중복확인 (ajax) -> 데이터 베이스 작업
$('#id').focusout(function(){
//	아이디 형식 검사
	if(!id_rule.test($('#id').val()))
		$('#idDiv').text('아이디는 영문 소문자 + 숫자 조합 7-20글자로 작성하세요').css('color', 'rgba(153, 0, 33, 0.781)');
//	아이디 중복검사
	else{
		$.ajax({
			type: 'post',
			url: '/market/member/checkId',
			data: 'id='+$('#id').val(),
			dataType : 'text',
			success: function(result){
				if(result == "exist"){ //사용불가
					$('#idDiv').text('이미 사용 중인 아이디입니다.');
				}else if(result =='non_exist'){//사용가능
					$('#hiddenId').val($('#id').val()); 
					$('#idDiv').text('사용 가능한 아이디입니다').css('color', '#0a58ca');
				}
			}
		});
	}
});


//4. 비밀번호 형식 검사
$('#pwd').focusout(function(){
	if(!pwd_rule.test($('#pwd').val())) //8-15글자. 특문+영문+숫자 조합
		$('#pwdDiv').text('올바르지 않은 비밀번호 형식입니다.');
	else if(pwd_rule.test($('#pwd').val()))
		$('#pwdDiv').text('');
});

//5. 비밀번호 불일치
$('#repwd').focusout(function(){
	if($('#repwd').val()=='')
		$('#repwdDiv').text('비밀번호를 확인하세요');
	else if($('#repwd').val() != $('#pwd').val())
		$('#repwdDiv').text('비밀번호가 일치하지 않습니다').css('color', 'rgba(153, 0, 33, 0.781)');
	else if($('#repwd').val() == $('#pwd').val())
		$('#repwdDiv').text('비밀번호가 일치합니다').css('color', '#0a58ca');
});

//6. 이메일 형식 검사
$('#email1').focusout(function(){
	if($('#email1').val()=='')
		$('#emailDiv').text('이메일을 입력하세요').css('color', 'rgba(153, 0, 33, 0.781)');
	else if($('#email2').val()=='')
		$('#emailDiv').text('이메일을 입력하세요').css('color', 'rgba(153, 0, 33, 0.781)');
	else if(!($('#email1').val()==''||$('#email2').val()=='')){
		let emailForm = $("#email1").val()+"@"+$("#email2").val();
		if(!email_rule.test(emailForm)){
			$('#emailDiv').text("이메일을 형식에 맞게 입력해주세요.").css('color', 'rgba(153, 0, 33, 0.781)');
		}else{
			$('#emailDiv').text("");
		}
	}
});
$('#email2').focusout(function(){
	if($('#email1').val()=='')
		$('#emailDiv').text('이메일을 입력하세요').css('color', 'rgba(153, 0, 33, 0.781)');
	else if($('#email2').val()=='')
		$('#emailDiv').text('이메일을 입력하세요').css('color', 'rgba(153, 0, 33, 0.781)');
	else if(!($('#email1').val()==''||$('#email2').val()=='')){
		$('#emailDiv').text('');
		let emailForm = $("#email1").val()+"@"+$("#email2").val();
		if(!email_rule.test(emailForm)){
			$('#emailDiv').text("이메일을 형식에 맞게 입력해주세요.");
		}
	}else{
		$('#emailDiv').text("");
		//이메일 중복검사
		let email = $('#email').val($('#email1').val() + '@' + $('#email2').val()); 
		$.ajax({
			type: 'post',
			url: '/market/member/checkEmail',
			data: 'mem_email='+email,
			dataType : 'text',
			success: function(result){
				if(result == "exist"){ //사용불가
					$('#emailDiv').text('이미 가입된 이메일입니다.');
				}else if(result =='non_exist'){//사용가능
					$('#emailDiv').text('사용 가능한 이메일입니다').css('color', '#0a58ca');
				}
			}
		});//ajax
	}
	
});

//이메일 인증번호 버튼 클릭(인증번호 발송)
$('#certifyEmailBtn').click(function(){
	if($('#email1').val()=='')
		$('#emailNumDiv').text('먼저 이메일을 입력하세요').css('color', 'rgba(153, 0, 33, 0.781)');
	else if($('#email2').val()=='')
		$('#emailNumDiv').text('먼저 이메일을 입력하세요').css('color', 'rgba(153, 0, 33, 0.781)');
	else{
		$('#email').val($('#email1').val() + '@' + $('#email2').val()); 
		$.ajax({
			type: 'post',
			url: '/market/member/sendMail',
			data: 'mem_email='+$('#email').val(),
			dataType : 'json',
			success: function(result){
				$('#randomNum').val(result.randomNum); 
				$('#emailNumDiv').text('작성하신 이메일로 인증번호를 발송했습니다');
			},error: function(err){
				console.log(err);
			}
		});//ajax
	}
	
});

////이메일 인증 확인
$("#emailNum").on("keyup",function(){
	let emailNum = $(this).val();
	$.ajax({
		type: 'post',
		url: '/market/member/confirmMail',
		data: 'emailNum='+emailNum+"&randomNum="+$('#randomNum').val(),
		dataType: 'json',
		success: function(result){
			emailRandom=result.randomNum;
			if($("#emailNum").val() ==""){
				$('#emailNumDiv').text('이메일 인증은 가입 필수 사항입니다').css('color', 'rgba(153, 0, 33, 0.781)');
			}else if($("#emailNum").val() != result.randomNum){
				$('#emailNumDiv').text('인증번호가 일치하지 않습니다!').css('color', 'rgba(153, 0, 33, 0.781)');
			}else if($("#emailNum").val() == result.randomNum){
				$('#emailNumDiv').text('인증 완료되었습니다.').css('color','#0a58ca');
				 $("#tel1").focus();
			}
		}
	});
});


//7. 전화번호 4자리 숫자 다 쓰면 다음 칸으로 자동 포커스 넘어가기
$("#tel2").on("keyup",function(){
    var mch = $(this).val().match(/[0-9]/g);
    if( mch != null && mch.length == 4 )
       $("#tel3").focus();
});	
$("#tel3").on("keyup",function(){
    var mch = $(this).val().match(/[0-9]/g);
    if( mch != null && mch.length == 4 )
       $("#checkPostBtn").focus();
});	
// 휴대폰 번호 형식 검사
$('#tel2').focusout(function(){
	if(!($('#tel3').val()=='')){
		let phoneForm = $('#tel1').val() +"-"+ $('#tel2').val() + "-" + $('#tel3').val();
		
		if (!phone_rule.test(phoneForm))
			$('#telDiv').text('올바르지 않은 전화번호 형식입니다.');
		else
			$('#telDiv').text('');
	}
});
$('#tel3').focusout(function(){
	if(!($('#tel2').val()=='')||($('#tel3').val()=='')){
		let phoneForm = $('#tel1').val() +"-"+ $('#tel2').val() + "-" + $('#tel3').val();
		
		if (!phone_rule.test(phoneForm))
			$('#telDiv').text('올바르지 않은 전화번호 형식입니다.');
		else
			$('#telDiv').text('');
	}
});


//우편 번호
var mapContainer = document.getElementById('map'), // 지도를 표시할 div
mapOption = {
    center: new daum.maps.LatLng(37.537187, 127.005476), // 지도의 중심좌표
    level: 5 // 지도의 확대 레벨
};

//지도를 미리 생성
var map = new daum.maps.Map(mapContainer, mapOption);
//주소-좌표 변환 객체를 생성
var geocoder = new daum.maps.services.Geocoder();
//마커를 미리 생성
var marker = new daum.maps.Marker({
position: new daum.maps.LatLng(37.537187, 127.005476),
map: map
});


function sample5_execDaumPostcode() {
new daum.Postcode({
    oncomplete: function(data) {
        var addr = data.address; // 최종 주소 변수
        // 주소 정보를 해당 필드에 넣는다.
        document.getElementById('postcode').value = data.zonecode;
        document.getElementById("add1").value = addr;
        // 주소로 상세 정보를 검색
        geocoder.addressSearch(data.address, function(results, status) {
            // 정상적으로 검색이 완료됐으면
            if (status === daum.maps.services.Status.OK) {

                var result = results[0]; //첫번째 결과의 값을 활용

                // 해당 주소에 대한 좌표를 받아서
                var coords = new daum.maps.LatLng(result.y, result.x);
                // 지도를 보여준다.
                mapContainer.style.display = "block";
                map.relayout();
                // 지도 중심을 변경한다.
                map.setCenter(coords);
                // 마커를 결과값으로 받은 위치로 옮긴다.
                marker.setPosition(coords)
            }
        });
    }
}).open({
    popupName: 'postcodePopup' //팝업 이름을 설정(영문,한글,숫자 모두 가능, 영문 추천)
});
}
new daum.Postcode({
    onclose: function(state) {
        //state는 우편번호 찾기 화면이 어떻게 닫혔는지에 대한 상태 변수 이며, 상세 설명은 아래 목록에서 확인하실 수 있습니다.
        if(state === 'FORCE_CLOSE'){
            //사용자가 브라우저 닫기 버튼을 통해 팝업창을 닫았을 경우, 실행될 코드를 작성하는 부분입니다.

        } else if(state === 'COMPLETE_CLOSE'){
            //사용자가 검색결과를 선택하여 팝업창이 닫혔을 경우, 실행될 코드를 작성하는 부분입니다.
            //oncomplete 콜백 함수가 실행 완료된 후에 실행됩니다.
        }
    }
});


//약관동의--------------------------------------------------------------

$('#personalData').click(function(){
	window.open("/market/member/a_personalData.jsp", "personalData", "width=700 height= 500 scrollbars=yes");
});
$('#serviceTerm').click(function(){
	window.open("/market/member/a_serviceTerm.jsp", "serviceTerm", "width=700 height= 500 scrollbars=yes");
});

//▶ 체크박스 전체 선택 & 전체 해제
$('#all').click(function(){
 	if($('#all').prop('checked'))
 		$('.allcheck').prop('checked', true);
 	else
 		$('.allcheck').prop('checked', false);
 	if($('.allcheck').prop('checked'))
 			$('#all').prop('checked', true);
});
$(".allcheck").click(function(){
	if($(".allcheck:checked").length==4){
		$('#all').prop('checked', true);
	}else{
		$('#all').prop('checked', false);
	}
});
//선택사항에 체크했을때
function agree(obj){
	let checked=obj.checked;
	if(checked)//동의
		obj.value=1; 
	else
		obj.value=0;
}


