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

