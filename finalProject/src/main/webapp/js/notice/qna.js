$('#qnaCate_parent').hover(function(){
	$(this).css('border','2px solid');
},function(){
	$(this).css('border','0.5px solid lightgray');
});

$(document).ready(function(){
	//대분류
	$.ajax({
		type: 'post',
		url: '/market/notice/getMain_id',
		dataType: 'json',
		success: function(data){
			//alert(JSON.stringify(data));
			$.each(data.list, function(index, items){
				$("select[name='qnaCate_main_name']").append("<option value='"+items.qnaCate_main_id+"' name='"+items.qnaCate_main_name+"'>"+items.qnaCate_main_name+"</option>");
			})
		}
	});
	//소분류
	$(document).on("change","select[name='qnaCate_main_name']",function(){
		
		$("option:selected", this).each(function(){
			var selectValue = $(this).val();//main에서 선택한값
			$.ajax({
				type: 'post',
				url: '/market/notice/getSub_id',
				data: 'qnaCate_main_id='+selectValue,
				dataType: 'json',
				success: function(data){
					$("select[name='qnaCate_sub_name']").children().remove();//기존리스트삭제
					$.each(data.list, function(index, items){
						$("select[name='qnaCate_sub_name']").append("<option value='"+items.qnaCate_sub_id+"' name='"+items.qnaCate_sub_name+"'>"+items.qnaCate_sub_name+"</option>");
					})
				}
			});		
		});
	});
	//양식
	$(document).on("change","select[name='qnaCate_sub_name']",function(){
			
			$("option:selected", this).each(function(){
				var selectValue2 = $(this).val();//Sub에서 선택한값
				$.ajax({
					type: 'post',
					url: '/market/notice/qnaCate_Content',
					data: 'qnaCate_sub_id='+selectValue2,
					dataType: 'json',
					success: function(data){
						$(".qmd_textarea").val(data.qnaDTO.qnaCate_Content);
						}
				});	
			});
	});
});

$("#QnaBtn").click(function(){
	let formData = new FormData($('#QnaWriteForm')[0]);
	
	$.ajax({
		type: 'post',
		enctype: 'multipart/form-data',
		processData: false, 
		contentType: false, 
		url: '/market/notice/qnaWrite',
		data: formData,
		success: function(data){
			alert("상담 신청이 완료되었습니다." +
					"1~2일내에 확인후 답변을 드리겠습니다. 감사합니다.");
			location.href = '/market/notice/qnaList';
		},
		error:function(err){
			console.log(err);
		}
	});
});









