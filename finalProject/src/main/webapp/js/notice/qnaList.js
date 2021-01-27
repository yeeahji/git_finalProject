$('.revel2_5_main').on('click', 'article', function(){
	var check = $(this);
	//alert(check.attr('class'));
	if(check.attr('class') == 'qnaListB'){
		$(this).attr('class','qnaListA');
	}else if(check.attr('class') == 'qnaListA'){
		$(this).attr('class','qnaListB');
		//클래스 속성을 변경
	}
});

$(document).ready(function(){
	$.ajax({
		type: 'post',
		url: '/market/notice/getQnaList',
		dataType: 'json',
		success: function(data){
			//alert(JSON.stringify(data));
			resultHtml(data);
		}
	});		
});

function resultHtml(data){
	var html;
	$.each(data.list, function(index, items){
				html += "<article id='qnaListA' class='qnaListA'>";
				html += "<button class='article_btn'>";
				html += "<div class='aticle_btn_subject' style='width:900px'>"
				html += "<h1>"+items.qnaCate_main_name+">"+items.qnaCate_sub_name+"</h1>";
				html += "<time class='article_time'></time></div>";	
				html += "<div class='article_btn_status'>확인중</div>";	
				html += "<span class='btn_arrow'></span></button>";	
				html += "<div class='qnaListA_div'>";	
				html += "<section class='qnaListA_div_section'>";	
				html += "<div class='qds_div'>";	
				html += "<img class'+div_img' src='https://hawaiiseoulcdn.bunjang.net/images/crop/199870305_w300.jpg' width='40' height='40'>";	
				html += "<div class='div_subject'>";	
				html += "<h2 class='div_subject_h2'>문의내용</h2>";	
				html += "<time class='div_subject_time'>"+items.logtime+"</time></div></div>";	
				html += "<p class='qnaListA_div_section_content'>"+items.qna_content+"</p>";	
				html += "</section></div></article>";	
				});
				$('.main_ul').append(html);
}