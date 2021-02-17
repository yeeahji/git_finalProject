$(document).ready(function(){
	
	//글자수 카운팅
	$('#withdraw_detailReason').keyup(function(){
		let content = $(this).val();
		$('#counter').html(content.length);
		
		if(content.length>1000){
			$('.caution').text("입력 가능한 글자 수를 초과했습니다.");
			$(this).val(content.substring(0, 1000)); //글자수 초과하면 안써지게
		}
	});
	
	//탈퇴 신청
	$('#withdrawBtn').click(function(){
		if(! $('#confirm:checked').val())
			$('#confirmDiv').text("탈퇴 처리 내용을 확인하고 체크해주세요");
		else if(! ($('#withdraw_lowFrequency:checked').val() || $('#withdraw_rejoin:checked').val() 
				|| $('#withdraw_lowContents:checked').val() || $('#withdraw_protectInfo:checked').val()
				|| $('#withdraw_lowBenefit:checked').val()|| $('#withdraw_others:checked').val()))
			$('#reasonDiv').text("1가지 이상의 항목에 꼭 체크하셔야합니다");
		else{

			$('form[name=withdrawForm]').submit();
			alert("탈퇴 신청이 성공적으로 이루어졌습니다.");
		//탈퇴사유 6항목 + 개선사항(주관식) 
		}
	});
	
	
});