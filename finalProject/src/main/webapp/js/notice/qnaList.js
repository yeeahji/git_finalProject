$('.revel2_5_main').on('click', 'article', function(){
	var check = $(this);
	console.log(check.attr('class'));
	if(check.attr('class') == 'qnaListOpen'){
		$(this).attr('class','qnaListClose');
	}else if(check.attr('class') == 'qnaListClose'){
		$(this).attr('class','qnaListOpen');
		//클래스 속성을 변경
	}
});

$(document).ready(function(){
	if($('#mem_id').val()=='비회원'){
		location.href="/market/member/loginForm";
	}
	$.ajax({
		type: 'post',
		url: '/market/notice/getQnaList',
		data: 'mem_id='+$('#mem_id').val(),
		dataType: 'json',
		success: function(data){
			console.log(JSON.stringify(data));
			resultHtml(data);
		}
	});		
});

function resultHtml(data){
	var html;
	$.each(data.list, function(index, items){
		html += "<article id='qnaListClose' class='qnaListClose'>";
		html += "<button class='article_btn'>";
		html += "<div class='aticle_btn_subject' style='width:900px'>"
		html += "<h1>"+items.qnaCate_main+" > "+items.qnaCate_sub+"</h1>";
		html += "<time class='article_time'></time></div>";	
		if(items.qna_answer !=null){
			html += "<div class='article_btn_status'>답변완료</div>";	
		}else{
			html += "<div class='article_btn_status'>확인중</div>";	
		}
		html += "<span class='btn_arrow'></span></button>";	
		html += "<div class='qnaListClose_div'>";	
		html += "<section class='qnaListClose_div_section'>";	
		html += "<div class='qds_div'>";	
		html += "<img class'+div_img' src='/market/image/member/logo_image.png' width='40' height='40'>";	
		html += "<div class='div_subject'>";	
		html += "<h2 class='div_subject_h2'>&nbsp;&nbsp;문의내용</h2>";	
		html += "<time class='div_subject_time'>&nbsp;&nbsp;"+items.qna_logtime+"</time></div></div>";	
		html += "<p class='qnaListClose_div_section_content'>"+items.qna_content+"</p>";	
			if(items.qna_img1 != null){
				html += "<div class='qnaListClose_div_section_file'>";
				html += "<button class='fileBtn'>";
				html += "<img src='/market/storage/"+items.qna_img1+"' alt='상담첨부파일'>";
				html += "</button></div>";
			}
		html += "</section>";
			if(items.qna_answer !=null){
				html +=	"<div class='qna_answerDiv'> <br>";
				html +=	"<img class'+div_img' src='/market/image/member/logo_image.png' width='20' height='20'> <span class='marketAnswer'>아나바다 마켓 답변</span>";
				html += "<p class='qna_anwerContent'>"+items.qna_answer;
				
				html += "</p></div>";
			}
		
			
		html +=	"</div></article>";	
		});
		$('.main_ul').append(html);
}






