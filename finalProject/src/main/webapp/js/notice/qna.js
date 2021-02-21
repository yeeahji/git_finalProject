$('#qnaCate_parent').hover(function(){
	$(this).css('border','2px solid');
},function(){
	$(this).css('border','0.5px solid lightgray');
});


var uploadFile = $('.fileBox .uploadBtn');
uploadFile.on('change', function(){
	if(window.FileReader){
		var filename = $(this)[0].files[0].name;
	} else {
		var filename = $(this).val().split('/').pop().split('\\').pop();
	}
	$(this).siblings('.fileName').val(filename);
});


$(document).ready(function(){
	console.log($('#mem_id').val());
	if($('#mem_id').val()=='비회원'){
		location.href="/market/member/loginForm";
	}
	//대분류
	$.ajax({
		type: 'post',
		url: '/market/notice/getMainCate',
		dataType: 'json',
		success: function(data){
			$.each(data.list, function(index, items){
				$('#qnaCate_main').append("<option value='"+items.qnaCate_code+"' " 
										+ "name='"+items.qnaCate_name+"'>"
										+ items.qnaCate_name+"</option>");
				$('#qnaCate_mainName').val(items.qnaCate_name);
			})
			
		}
	});
	//소분류
	$(document).on("change","#qnaCate_main",function(){
		$("option:selected", this).each(function(){
			let selectValue = $(this).val();//main에서 선택한값(코드값)
			$('#qnaCate_mainName').val( $(this).text());
			$.ajax({
				type: 'post',
				url: '/market/notice/getSubCate',
				data: 'qnaCate_mainCode='+selectValue,
				dataType: 'json',
				success: function(data){
					$("select[name='qnaCate_sub']").children().remove();//기존리스트삭제
					$.each(data.list, function(index, items){
						$("select[name='qnaCate_sub']").append("<option value='"+items.qnaCate_name+"' name='"+items.qnaCate_name+"'>"+items.qnaCate_name+"</option>");
					})
				}
			});		
		});
	});
});//ready

$("#qnaBtn").click(function(){
	if($('#qnaCate_main').val()=='' ||$('#qnaCate_sub').val()==''){
		$('#qna_contentDiv').text("카테고리를 선택하세요.");
	}else if($('#qna_content').val()==''){
		$('#qna_contentDiv').text("문의 내용을 입력하세요");
	}else{
		let formData = new FormData($('#QnaWriteForm')[0]);
		console.log(formData);
		$.ajax({
			type: 'post',
			enctype: 'multipart/form-data',
			processData: false, 
			contentType: false, 
			url: '/market/notice/writeQna',
			data: formData,
			success: function(data){
				alert("상담 신청이 완료되었습니다." +
						"빠른 시일 안에 확인 후 답변 드리겠습니다. 감사합니다.");
				location.href = '/market/notice/qnaList';
			},error:function(err){
				console.log(err);
			}
		});//ajax
	}
	
});









