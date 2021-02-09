$(document).ready(function(){
	$.ajax({
		type: 'get',
		url: '/market/admin/getProductAllList',
		data: {'pg': $('#pg').val(),
			   'viewNum': $('#viewNum').val()},
		dataType: 'json',
		success: function(data){
			$("#tbody tr:gt(0)").remove();
			//productListPrint(data);
			alert(JSON.stringify);
			$.each(data.productAllList , function(index, items){
				$('<tr/>').append($('<td/>',{
					text: items.product_seq
				})).append($('<td/>',{	
				  }).append($('<a/>',{
					 href: '#',
					 text: items.product_subject,
					 id: 'subjectA',
					 class: items.seq+""
				}))
				).append($('<td/>',{
					text: items.mem_id
				})).appendTo($('#tbody'));
			});
			//페이징처리
		    $('#boardPagingDiv').html(data.adminProductBP.pagingHTML);
		}
	});
});

//function productListPrint(data){
//	$.each(data.productAllList , function(index, items){
//		$('<tr/>').append($('<td/>',{
//			text: items.product_seq
//		})).append($('<td/>',{	
//		  }).append($('<a/>',{
//			 href: '#',
//			 text: items.product_subject,
//			 id: 'subjectA',
//			 class: items.seq+""
//		}))
//		).append($('<td/>',{
//			text: items.mem_id
//		})).appendTo($('#tbody'));
//	});
//	//페이징처리
//    $('#boardPagingDiv').html(data.adminProductBP.pagingHTML);
//}









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

