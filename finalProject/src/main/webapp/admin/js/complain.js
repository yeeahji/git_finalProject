$(document).ready(function() {
	$.ajax({
		type: 'post',
		url: '/market/admin/getComplainList',
		data: {'pg': $('#pg').val(), 
				'viewNum': $('#viewNum').val()},
		dataType: 'json',
		success: function(data){
			console.log(data);
			$("#complainTbody tr:gt(0)").remove();
			let eachPart_seq;
			$.each(data.complainList, function(index, items){
				
				if(items.product_seq != 0)
					eachPart_seq = items.product_seq
				else if(items.review_seq != 0)
					eachPart_seq = items.review_seq
				else if(items.board_seq != 0)
					eachPart_seq = items.board_seq
				else if(items.comment_seq != 0)
					eachPart_seq = items.comment_seq
//				else if(items.talk_seq != 0)
//					items.eachPart_seq = items.talk_seq
					
				$('<tr/>').append($('<td/>',{
					text: items.complain_seq
				})).append($('<td/>',{
					text: items.complain_category
				})).append($('<td/>',{
					}).append($('<a/>',{
						href: '#',
						text: eachPart_seq,
						id: 'subjectA',
						class: items.eachPart_seq+""
				}))).append($('<td/>',{
					text: items.complain_content
				})).append($('<td/>',{
					text: items.mem_id
				})).append($('<td/>',{
					text: items.reporter_id,
				})).appendTo($('#complainTbody'));
			});
		},error: function(err){
			console.log(err);
		}
	});//ajax
	
	$('#memberSearchBtn').click(function(){
		alert("aaa");
		console.log($('#searchType').val() + "/" +$('#keyword').val() +"/"+$('#selectPrint').val());
		$.ajax({
			type: 'post',
			url: '/market/admin/searchReportedMember',
			data: {'searchType': $('#searchType').val(), 
					'keyword': $('#keyword').val(),
					'pg': 1,//$('#pg').val(),
					'viewNum': $('#selectPrint').val()},
			dataType: 'json',
			success: function(data){
				$("#complainTbody tr:gt(0)").remove();
				console.log(data.list);
				let eachPart_seq;
				$.each(data.list, function(index, items){
					if(items.product_seq != 0)
						eachPart_seq = items.product_seq
					else if(items.review_seq != 0)
						eachPart_seq = items.review_seq
					else if(items.board_seq != 0)
						eachPart_seq = items.board_seq
					else if(items.comment_seq != 0)
						eachPart_seq = items.comment_seq
//					else if(items.talk_seq != 0)
//						items.eachPart_seq = items.talk_seq
						
					$('<tr/>').append($('<td/>',{
						text: items.complain_seq
					})).append($('<td/>',{
						text: items.complain_category
					})).append($('<td/>',{
						}).append($('<a/>',{
							href: '#',
							text: eachPart_seq,
							id: 'subjectA',
							class: items.eachPart_seq+""
					}))).append($('<td/>',{
						text: items.complain_content
					})).append($('<td/>',{
						text: items.mem_id
					})).append($('<td/>',{
						text: items.reporter_id,
					})).appendTo($('#complainTbody'));
				});//each
			}
		});
	});
	
});



