$(document).ready(function(){
	$('.f_artP').hide();
	
	for(i=1;i<4;i++){
		$('li .f0'+i).click(function(){
			$(this).find('.f_artP').slideToggle();
		});
	}
});
$('.f_revel2_5_1').on('click', '.fmi_nav_up', function(){
	   var check = $(this).attr('class','fmi_nav_down');
	   
	   check.prevAll().attr('class','fmi_nav_up');
	   check.nextAll().attr('class','fmi_nav_up');
	   alert($(this).attr('id'));
	   $.ajax({
			type: 'post',
			url: '/market/notice/getFagContent',
			data: {'select2': $(this).attr('id')},
			dataType: 'json',
			success: function(data){
				alert('a');
				alert(JSON.stringify(data.list));
			}
		});
});