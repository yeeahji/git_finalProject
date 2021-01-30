//$('#usedCondition').prop('checked', true);
//	var radioVal = $('input[name="conditions"]:checked').val();
//if($('#usedCondition').prop('checked')) {}

//default : 중고 상품 버튼 활성
$('#usedCondition').prop('checked', true);
$('.usedCondition').addClass('usedActive');

//상태 : 라디오 버튼
if($('#usedConditionSpan').click(function(){ //중고 상품 - 텍스트
	$('.usedCondition').addClass('usedActive'); //선택된 버튼 빨간색(활성)으로 변경
	$('.newCondition').removeClass('newActive'); // 다른 버튼 회색(비활성)으로 변경
	
	$('#usedCondition').prop('checked', true); //해당 버튼에 checked 속성 부여
}));
if($('.usedCondition').click(function(){ //중고 상품 - 이미지
	$('.usedCondition').addClass('usedActive');
	$('.newCondition').removeClass('newActive');
	
	$('#usedCondition').prop('checked', true);
}));

if($('#newConditionSpan').click(function(){ //새 상품 - 텍스트
	$('.newCondition').addClass('newActive');
	$('.usedCondition').removeClass('usedActive');

	$('#newCondition').prop('checked', true);
}));
if($('.newCondition').click(function(){ //새 상품 - 이미지
	$('.newCondition').addClass('newActive');
	$('.usedCondition').removeClass('usedActive');

	$('#newCondition').prop('checked', true);
}));


//가격 : 체크버튼
if($('#freeDelivery').click(function(){
	$('.freeDelivery').toggleClass('deliveryActive');
}));