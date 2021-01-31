$('.f_revel2_5_1').on('click', '.fmi_nav_up', function(){
	   var check = $(this).attr('class','fmi_nav_down');
	   
	   check.prevAll().attr('class','fmi_nav_up');
	   check.nextAll().attr('class','fmi_nav_up');
	   $('.inner_li').remove(); 
	   $.ajax({
			type: 'post',
			url: '/market/notice/getFagContent',
			data: {'select2': $(this).attr('id')},
			dataType: 'json',
			success: function(data){
				//alert(JSON.stringify(data));
				
				
				var html="";
				$.each(data.list, function(index, items){
					html += "<li class='inner_li'>";
					html += "<article class='f01'>";
					
					html += "<button class='f_artBtn'>";
					html += "<span class='f_artBtn_subject'>";
					html += "<h1>"+items.subject+"</h1></span>";
					html += "<div class='f_artBtn_arrow'></div></button>";
					
					html += "<div class='f_artP_"+index+"'>";
					html += "<p>"+items.content+"</p>";
					html += "</div></article></li>";
				});
				
				$('.fmi_ul').append(html);
			}
		}); //ajax
	   
});
$('.fag_main_inner').on('click','span',function(){
	$('.f_artP').hide();
	//alert($(this).parent().next().prop('tagName'));
	$(this).parent().next().slideToggle();
});
