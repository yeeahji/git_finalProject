$(document).ready(function() {
	$.ajax({
		type: 'get',
		url: '/market/admin/getMemberList',
		data: {'pg': $('#pg').val()},
		dataType: 'json',
		success: function(data){
			$.each(data.list, function(indx, items){
				$('<tr/>').append($('<td/>',{
					text: items.mem_id
				})).append($('<td/>',{
					text: items.mem_pwd
				})).append($('<td/>',{
					text: items.mem_name
				})).append($('<td/>',{
					text: items.mem_tel
				})).append($('<td/>',{
					text: items.mem_location
				})).appendTo($('#tobody'));
			});
			
			 //페이징처리
	         $('#boardPagingDiv').html(data.boardPaging.pagingHTML);
		}
	});
} );

 (function($) {
    "use strict";

    // Add active state to sidbar nav links
    var path = window.location.href; // because the 'href' property of the DOM element is the absolute path
        $("#layoutSidenav_nav .sb-sidenav a.nav-link").each(function() {
            if (this.href === path) {
                $(this).addClass("active");
            }
        });

    // Toggle the side navigation
    $("#sidebarToggle").on("click", function(e) {
        e.preventDefault();
        $("body").toggleClass("sb-sidenav-toggled");
    });
})(jQuery);

   
 