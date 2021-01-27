/*
//등록하기
$('#registBtn').click(function(){
	$('#subjectDiv').hide();
	$('#priceDiv').hide();
	
	//if($('이미지').val()=='') $('#priceDiv').show();
	if($('#subject').val()=='') $('#subjectDiv').show();
	//else if($('카테고리').val()=='') $('#priceDiv').show();
	else if($('#location').val()=='') $('#locationDiv').show();
	else if($('#price').val()=='') $('#priceDiv').show();
	
	else{
		let formData = new FormData($('#registForm')[0]); //form 안의 모든 데이터 읽기
		$.ajax({
			type: 'post',
			enctype: 'multipart/form-data',
			processData: false, //데이터를 컨텐트 타입에 맞게 변환 여부
			contentType: false, //요청 컨텐트 타입
			url: '/market/product/regist',
			data: formData,
			success: function(data){
				alert("상품 등록 완료");
				location.href = '/market/product/productDetail'; //해당 상품의 seq 써주기
			},
			error: function(err){
				console.log(err);
			}
			
		});
	}
});
*/


$('#registForm').ready(function(){
	$('#subjectDiv').hide();
	$('#priceDiv').hide();

});

//라디오버튼 체크
/*
if($('input[name="conditions"]').change()) {
	console.log("라디오 버튼 클릭");
	
	if($('#usedCondition').click()) { //중고상품
		$('#usedCondition').prop('checked', true);
		$('#newCondition').prop('checked', false);
		console.log("used");
		
		//선택된 버튼 빨간색으로 변경
		$('.usedConditionBefore').css('background-image', 'url("/market/image/product/red_radioBtn.svg")');
		$('.usedConditionBefore').hover(function() {
			$(this).css('background-color', 'rgba(255, 80, 88, 0.08)');
		}, function(){
			$(this).css('background-color', '');
		});
	}

	else if($('#newCondition').click()) { //새 상품
		$('#newCondition').prop('checked', true);
		$('#usedCondition').prop('checked', false);
		console.log("new");
		
		$('.newConditionBefore').css('background-image', 'url("/market/image/product/red_radioBtn.svg")');
		$('.newConditionBefore').hover(function() {
			$(this).css('background-color', 'rgba(255, 80, 88, 0.08)');
		}, function(){
			$(this).css('background-color', '');
		});
	}
};
*/



