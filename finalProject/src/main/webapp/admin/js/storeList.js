$(document).ready(function(){
	$.ajax({
		type: 'get',
		url: '/market/admin/getStoreList',
		data: {'pg' : $('#pg').val()},
		dataType: 'json',
		success: function(data){
			alert(JSON.stringify(data));
			$.each(data.storeList, function(index, items){
				$('<tr/>').append($('<td/>',{
						text: items.mem_ID,
					})).append($('<td/>',{
		            	text: items.store_NICKNAME
		            }))
//		            .append($('<td/>',{
//		            	text: items.mem_NAME
//		            }))
		            .append($('<td/>',{
		            	text: items.store_ECHO
		            })).appendTo($('#tbody'));
			});//each
			//페이징처리
	         $('#boardPagingDiv').html(data.adminStoreBP.pagingHTML);
			
//	         //클릭
//	         $('#storeTable').on('click','#subjectA',function(){
//	        	 let id = $(this).parent().text();
//	        	 $.ajax({
//	        		 type: 'post',
//	        		 url: '/market/admin/getStoreView',
//	        		 data: {'id': id},
//	        		 dataType: 'json',
//	        		 success: function(data){
//	        			 //alert(JSON.stringify(data));
//	        			 //1명의 데이터를 위에다 뿌리기
//	        			 $('#nameSpan').text(data.storeDTO.mem_name)
//	        			 $('#storeNameSpan').text(data.storeDTO.store_nickname)
//	        			 //$('#sellProductSpan').text(data.storeDTO.)
//	        			 //$('#repleSpan').text(data.storeDTO.)
//	        			 $('#pictureSpan').text(data.storeDTO.store_img)
//	        			 $('#echoSpan').text(data.storeDTO.store_echo)
//	        			 $('#introSpan').text(data.storeDTO.store_intro)
//	        		 }
//	        	 });
//	         });
		},
		error: function(err){
        	 console.log(err);
        }

	});
	
});




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

