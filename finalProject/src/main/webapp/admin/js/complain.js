$(document).ready(function() {
	$.ajax({
		type: 'post',
		url: '/market/admin/getComplainList',
		data: {'pg': $('#pg').val(), 
				'viewNum': $('#viewNum').val()},
		dataType: 'json',
		success: function(data){
			$("#complainTbody tr:gt(0)").remove();
			complainList(data); //전체 출력
			findComplainContent(); //
		},error: function(err){
			console.log(err);
		}
	});//ajax
	

	//회원 영구 정지
	$('#stopMemberBtn').click(function(){
		var result = confirm($('#reported_id').text()+'님을 영구정지 하시겠습니까?');
	    if(result){
	       $.ajax({
	          type: 'get',
	          url: '/market/admin/memberBlock',
	          data: {'id':$('#reported_id').text()},
	          success: function(){
	             alert('계정을 정지했습니다.');
	          },
	          error: function(){
	             alert($('#reported_id').text()+'님의 계정을 영구정지 했습니다.');
	             location.reload();
	          }
	       });
	    }
	});//stopMemberBtn

	//신고글 삭제
	$('#blindComplainBtn').click(function(){
		var result = confirm('해당 글을 블라인드 처리하시겠습니까?');
	    if(result){
	       $.ajax({
	          type: 'post',
	          url: '/market/admin/blindComplain',
	          data: {'board_seq':$('#daughter_seq').text(),
	        	  'comment_seq':$('#daughter_seq').text(),
	        	  'review_seq':$('#daughter_seq').text(),
	        	  'thisIs':$('#thisIs').val(),
	        	  },
	          success: function(){
	             alert('글을 블라인드 처리했습니다.');
	          }, error: function(err){
	             console.log(err);
	          }
	       });
	    }
	});

	
	
});	
	
//20, 50개 출력
$('#selectPrint').change(function(){
	var viewNum = $(this).val();
	$('#viewNum').val(viewNum);
	
	$.ajax({
		type: 'post',
		url: '/market/admin/getComplainList',
		data: {'pg': $('#pg').val(),
			'viewNum': $('#viewNum').val()},
		dataType: 'json',
		success: function(data){
			$("#complainTbody tr:gt(0)").remove();
			complainList(data)
			findComplainContent();
		},error: function(err){
			console.log(err);
		}
	});//ajax
});
	
//출력 개수/키워드 넣고 검색	
$('#memberSearchBtn').click(function(){
	$.ajax({
		type: 'post',
		url: '/market/admin/searchReportedMember',
		data: {'searchType': $('#searchType').val(), 
				'keyword': $('#keyword').val(),
				'pg': $('#pg').val(),
				'viewNum': $('#selectPrint').val()},
		dataType: 'json',
		success: function(data){
			$("#complainTbody tr:gt(0)").remove();
			complainList(data);
			findComplainContent();
		}
	});
});


//출력
function complainList(data){
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
		else if(items.store_seq != 0)
			eachPart_seq = items.store_seq
//		else if(items.talk_seq != 0)
//			items.eachPart_seq = items.talk_seq
		
		//1이면 체크되어 있고, 0이면 체크 x
		let statusValue = items.complain_status;
		let checkOX;
		if(statusValue==1) 
			checkOX = true;
		else
			checkOX = false;
		
	
		$('<tr/>').append($('<td/>',{
			text: items.complain_seq
		})).append($('<td/>',{
			text: items.complain_category
		})).append($('<td/>',{
			}).append($('<a/>',{
				href: '#',
				text: eachPart_seq,
				id: 'subjectA',
				class: eachPart_seq+""
		}))).append($('<td/>',{
			text: items.complain_content
		})).append($('<td/>',{
			text: items.mem_id
		})).append($('<td/>',{
			text: items.reporter_id
		})).append($('<td/>',{
			text: items.complain_logtime
		})).append($('<td/>',{
			}).append($('<div/>',{
				class: 'checkboxDiv',
				}).append($('<input/>',{//해결버튼
					type: 'checkbox',
					id: 'statusCheckbox'+items.complain_seq,
					onchange: 'checkStatus(this,'+items.complain_seq+')',
					checked:checkOX 
				}))
			)).appendTo($('#complainTbody'));
			
	});//each
	//페이징처리
	$('#boardPagingDiv').html(data.adminComplainBP.pagingHTML);
}

//신고 내용 확인
function findComplainContent(){
	$('#complainTbody').on('click', '#subjectA', function(){
		if($(this).parent().prev().text()=='댓글 신고'){// 댓글 내용 우측에 띄우기
			$.ajax({
				type: 'post',
				url: '/market/admin/getCommentContent',
				data: {'comment_seq': $(this).parent().text() },
				dataType: 'json',
				success: function(data){
					$('#reported_id').text(data.commentDTO.mem_id);
					$('#reported_logtime').text(data.commentDTO.comment_logtime);
					$('#reported_content').text(data.commentDTO.comment_content);
					$('#mother').text('게시글 번호');
					$('#daughter').text('댓글 번호');
					$('#thisIs').val('댓글');
					$('#mother_seq').text(data.commentDTO.board_seq);
					$('#daughter_seq').text(data.commentDTO.comment_seq);
				}
			});//ajax
		}else if($(this).parent().prev().text()=='게시글 신고'){//게시글 페이지 업
			let seq = $(this).parent().text();
			window.open("/market/board/articleForm?seq="+seq+"&pg=1","PopupWin","width=800,height=800");
			$('#thisIs').val('게시글');
			
		}else if($(this).parent().prev().text()=='상품 신고'){//상품 페이지 업
			let seq = $(this).parent().text();
			window.open("/market/product/productDetail?seq="+seq,"PopupWin","width=800,height=800");
		}else if($(this).parent().prev().text()=='리뷰 신고'){// 리뷰 내용 우측에 띄우기
			$.ajax({
				type: 'post',
				url: '/market/admin/getReviewContent',
				data: {'comment_seq': $(this).parent().text() },
				dataType: 'json',
				success: function(data){
					$('#reported_id').text(data.reviewDTO.mem_id);
					$('#reported_logtime').text(data.reviewDTO.review_date);
					$('#reported_content').text(data.reviewDTO.review_content);
					$('#mother').text('상품글 번호');
					$('#daughter').text('리뷰 번호');
					$('#thisIs').val('리뷰');
					$('#mother_seq').text(data.reviewDTO.product_seq);
					$('#daughter_seq').text(data.reviewDTO.review_seq);
				}
			});//ajax
		}else if($(this).parent().prev().text()=='상점 신고'){//상점 페이지 업
			let id = $(this).parent().text();
			window.open("/market/store/store?id"+id,"PopupWin","width=800,height=800");
		}else if($(this).parent().prev().text()=='바다톡 신고'){//talk
			
			
		}
	});
}
//페이징처리
function boardPaging(pg){
	var keyword = document.getElementById("keyword").value;
	$('#pg').val(pg);

	 if(keyword ==''){
		location.href='/market/admin/complainList?pg='+pg+'&viewNum='+$('#viewNum').val();
	 }else{
		$('#memberSearchBtn').trigger('click','research');
	 }
}
//상태 처리하기
function checkStatus(complain_status, complain_seq){
	let checked = complain_status.checked;
	if(checked){
		complain_status.value="1"
		$.ajax({
			type: 'post',
			url: '/market/admin/solveComplain',
			data: {'complain_seq': complain_seq,
					'complain_status':1},
			success: function(){
				console.log(complain_seq+ "번 해결완료");
			}
		});
	}else{
		complain_status.value="0"
		$.ajax({
			type: 'post',
			url: '/market/admin/solveComplain',
			data: {'complain_seq': complain_seq,
					'complain_status':0},
			success: function(){
				console.log(complain_seq+ "번 해결미완");
			}
		});
	}
}






