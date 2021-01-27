//$('#qnaListA').on('click',function(){
//	document.getElementById("qnaListA").className="qnaListB";
//	
//});

$(document).ready(function(){
	$.ajax({
		type: 'post',
		url: '/market/notice/getQnaList',
		dataType: 'json',
		success: function(data){
			alert(JSON.stringify(data));
			$.each(data.list, function(index, items){
				$('<tr/>').append($('<td/>',{
					//제목
					text: items.qnaCate_main_name
				})).append($('<td/>',{
					//로그타임
					text: items.logtime
				})).appendTo($('#QnaBoardListTable'));
			});
			
		}
	});		
});