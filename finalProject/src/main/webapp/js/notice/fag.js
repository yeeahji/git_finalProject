$(document).ready(function(){
	 $.ajax({
			type: 'post',
			url: '/market/notice/getFagContent',
			data: {'option2_id': 1},
			dataType: 'json',
			success: function(data){
				//alert(JSON.stringify(data));
				
				var html=""; 
				$.each(data.list, function(index, items){
					html += "<div class='a'>";
					html += "<input type='checkbox' id='answer"+index+"'>";
					html += "<label for='answer"+index+"'><h1>"+items.notice_subject+"</h1><em></em></label>";
					html += "<div><p>"+items.notice_content+"</p></div>";
					html += "</div>";
				});
				
				$('.fmi_div_accordion').append(html);
			}
		}); 
});
$('.f_revel2_5_1').on('click', '.fmi_nav_up', function(){
	   var check = $(this).attr('class','fmi_nav_down');
	   
	   check.prevAll().attr('class','fmi_nav_up');
	   check.nextAll().attr('class','fmi_nav_up');
	   $('.a').remove(); 
	   $.ajax({
			type: 'post',
			url: '/market/notice/getFagContent',
			data: {'option2_id': $(this).attr('id')},
			dataType: 'json',
			success: function(data){
				//alert(JSON.stringify(data));
				
				var html=""; 
				$.each(data.list, function(index, items){
					html += "<div class='a'>";
					html += "<input type='checkbox' id='answer"+index+"'>";
					html += "<label for='answer"+index+"'><h1>"+items.subject+"</h1><em></em></label>";
					html += "<div><p>"+items.content+"</p></div>";
					html += "</div>";
				});
				
				$('.fmi_div_accordion').append(html);
			}
			
		}); //ajax
	  
});
$('.fag_main_inner').on('click','span',function(){
	//$('.f_artP').hide();
	//alert($(this).parent().next().prop('tagName'));
	$(this).parent().next().slideToggle();
});
