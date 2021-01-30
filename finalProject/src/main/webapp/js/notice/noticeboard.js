$(document).ready(function(){
	$('.artP').hide();
	
	for(i=1;i<10;i++){
		$('li .a0'+i).click(function(){
			$(this).find('.artP').slideToggle();
		});
	}
});
