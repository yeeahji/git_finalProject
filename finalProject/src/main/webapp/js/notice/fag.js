//$(document).ready(function(){
//	$('.f_artP').hide();
//});

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
				alert(JSON.stringify(data));
				resultHtml(data);
			}
		});
//	   $('.fmi_ul').on('click','span',function(){
//			$(this).find('.f_artP').slideToggle();
//		});
});

function resultHtml(data){
	var html;
	$.each(data.list, function(index, items){
		html += "<li class='inner_li'>";
		html += "<article class='f01'>";
		html += "<button class='f_artBtn'>";
		html += "<div class='f_artBtn_subject'>";
		html += "<h1>"+items.subject+"</h1></div>";
		html += "<span class='f_artBtn_arrow'></span></button>";
		html += "<span class='f_artP'>";
		html += "<p>"+items.content+"</p>";
		html += "</span></article></li>";
	});
	$('.fmi_ul').append(html);
	
	$('.f_artP').hide();
	$('.fmi_ul').on('click','button',function(){
		$(this).next().slideToggle();
		//alert($(this).attr("class"));
	});
}

