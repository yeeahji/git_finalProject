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

   
//$(document).ready(function() {
//	$("#example").DataTable({	
//		"serverSide" : true,
//		"processing" : true,
////		"destroy" : true,
//		"ajax" : {
//			type : "post",
//			url : "/market/admin/getMemberList",
//			dataSrc : ''
//			},
//			"columns" : [
//					{data: "mem_id"},
//					{data: "mem_pwd"},
//					{data: "mem_name"},
//					{data: "mem_tel"},
//					{data: "mem_location"}
//				]
//	});
//} );
 