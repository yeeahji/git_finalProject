$(document).ready(function() {
		$.ajax({
			type: 'get',
			url: '/market/admin/getMemberList',
			data: {'pg': $('#pg').val(),
				'viewNum': $('#viewNum').val()},
				dataType: 'json',
				success: function(data){
					$("#tbody tr:gt(0)").remove();
					$.each(data.list, function(index, items){
						$('<tr/>').append($('<td/>',{
							text: items.mem_id
						})).append($('<td/>',{
						}).append($('<a/>',{
							href: '#',
							text: items.mem_name,
							id: 'subjectA',
							class: items.seq+""
						}))
						).append($('<td/>',{
							text: items.mem_email
						})).append($('<td/>',{
							text: items.mem_tel1
						})).append($('<td/>',{
							text: items.mem_add1
						})).appendTo($('#tbody'));
					});
					$('#totalMember').text(data.totalMember)
					//페이징처리
					$('#boardPagingDiv').html(data.adminBoardPaging.pagingHTML);
					
					//클릭
					$('#memberTable').on('click','#subjectA',function(){
						let id = $(this).parent().prev().text();
						$.ajax({
							type: 'post',
							url: '/market/admin/memberView',
							data: {'id': id},
							dataType: 'json',
							success: function(data){
								alert(JSON.stringify(data));
								//1명의 데이터를 위에다 뿌리기
								$('#nameSpan').text(data.adminMembersDTO.mem_name)
								$('#HpSpan').text(data.adminMembersDTO.mem_tel)
								$('#birthSpan').text(data.adminMembersDTO.mem_pwd)
								$('#add1Span').text(data.adminMembersDTO.mem_add1)
								$('#add2Span').text(data.adminMembersDTO.mem_add2)
								$('#store1NameSpan').text(data.adminMembersDTO.store_nickname)
								$('#store2NameSpan').text(data.adminMembersDTO.store_nickname)
								$('#echo1Span').text(data.adminMembersDTO.store_echo)
								$('#echo2Span').text(data.adminMembersDTO.store_echo)
								$('#emailSpan').text(data.adminMembersDTO.mem_email)
								$('#logSpan').text(data.adminMembersDTO.mem_logtime)
								$('#productSellSpan').text(data.totalSellProduct)
								
								
							}
						});
						
					});
					
				}
		
		});
	
});//ready

//selectPrint눌렀을때 (20개보기 50개보기..)
$('#selectPrint').change(function(){
	var viewNum = $(this).val();
	$('#viewNum').val(viewNum);
	
	$.ajax({
		type: 'get',
		url: '/market/admin/getMemberList',
		data: {'pg': $('#pg').val(),
			'viewNum': $('#viewNum').val()},
			dataType: 'json',
			success: function(data){
				$("#tbody tr:gt(0)").remove();
				$.each(data.list, function(index, items){
					$('<tr/>').append($('<td/>',{
						text: items.mem_id
					})).append($('<td/>',{
					}).append($('<a/>',{
						href: '#',
						text: items.mem_name,
						id: 'subjectA',
						class: items.seq+""
					}))
					).append($('<td/>',{
						text: items.mem_email
					})).append($('<td/>',{
						text: items.mem_tel1
					})).append($('<td/>',{
						text: items.mem_add1
					})).appendTo($('#tbody'));
				});
				
				//페이징처리
				$('#boardPagingDiv').html(data.adminBoardPaging.pagingHTML);
				
				//클릭
				$('#memberTable').on('click','#subjectA',function(){
					let id = $(this).parent().prev().text();
					$.ajax({
						type: 'post',
						url: '/market/admin/memberView',
						data: {'id': id},
						dataType: 'json',
						success: function(data){
							//alert(JSON.stringify(data));
							//1명의 데이터를 위에다 뿌리기
							$('#nameSpan').text(data.adminMembersDTO.mem_name)
							$('#HpSpan').text(data.adminMembersDTO.mem_tel)
							$('#birthSpan').text(data.adminMembersDTO.mem_pwd)
							$('#add1Span').text(data.adminMembersDTO.mem_add1)
							$('#add2Span').text(data.adminMembersDTO.mem_add2)
							$('#store1NameSpan').text(data.adminMembersDTO.store_nickname)
							$('#store2NameSpan').text(data.adminMembersDTO.store_nickname)
							$('#echo1Span').text(data.adminMembersDTO.store_echo)
							$('#echo2Span').text(data.adminMembersDTO.store_echo)
							$('#emailSpan').text(data.adminMembersDTO.mem_email)
							$('#logSpan').text(data.adminMembersDTO.mem_logtime)
							$('#productSellSpan').text(data.totalSellProduct)
						}
					});
				});
			}
	});
});

//검색
$('#memberSearchBtn').click(function(event, str){
	if(str != 'research'){
		$('input[name=searchPg]').val(1);
	}
	if($('#keyword').val() == ''){
		alert('검색어를 입력하세요');
	}else{
		$.ajax({
			type: 'post',
			url: '/market/admin/getSearchMember',
			data: {'pg': $('#pg').val(),
				   'searchType':$('#searchType').val(),
				   'keyword':$('#keyword').val(),
				   'viewNum': $('#viewNum').val()},
			dataType: 'json',
			success: function(data){
				$("#tbody tr:gt(0)").remove();
				$.each(data.list, function(index, items){
					$('<tr/>').append($('<td/>',{
						text: items.mem_id
					})).append($('<td/>',{
					}).append($('<a/>',{
						href: '#',
						text: items.mem_name,
						id: 'subjectA',
			            class: items.seq+""
					}))
					).append($('<td/>',{
						text: items.mem_email
					})).append($('<td/>',{
						text: items.mem_tel1
					})).append($('<td/>',{
						text: items.mem_add1
					})).appendTo($('#tbody'));
				});//each
				
				//페이징처리
		         $('#boardPagingDiv').html(data.adminBoardPaging.pagingHTML);
		         
		         //클릭
		         $('#memberTable').on('click','#subjectA',function(){
		        	 let id = $(this).parent().prev().text();
		        	 //let pg = data.pg;
		        	 $.ajax({
		        		 type: 'post',
		        		 url: '/market/admin/memberView',
		        		 data: {'id': id},
		        		 dataType: 'json',
		        		 success: function(data){
		        			 //alert(JSON.stringify(data));
		        			 //1명의 데이터를 위에다 뿌리기
		        			 $('#nameSpan').text(data.adminMembersDTO.mem_name)
								$('#HpSpan').text(data.adminMembersDTO.mem_tel)
								$('#birthSpan').text(data.adminMembersDTO.mem_pwd)
								$('#add1Span').text(data.adminMembersDTO.mem_add1)
								$('#add2Span').text(data.adminMembersDTO.mem_add2)
								$('#store1NameSpan').text(data.adminMembersDTO.store_nickname)
								$('#store2NameSpan').text(data.adminMembersDTO.store_nickname)
								$('#echo1Span').text(data.adminMembersDTO.store_echo)
								$('#echo2Span').text(data.adminMembersDTO.store_echo)
								$('#emailSpan').text(data.adminMembersDTO.mem_email)
								$('#logSpan').text(data.adminMembersDTO.mem_logtime)
								$('#productSellSpan').text(data.totalSellProduct)
		        		 }
		        	 });
		        	 
		         });
			}
		});
	}
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

   
 