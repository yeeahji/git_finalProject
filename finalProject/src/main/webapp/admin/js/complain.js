$(document).ready(function() {
	complainList();
	selectPrint();
	findComplainContent();
	searchReportedMember();
	findWithdrawCate();
	
});	//ready	

function showList(data){
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
			
		//처리완료여부 출력. 1이면 체크(처리완료)되어 있고, 0이면 체크 x(처리 전)
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
					onchange: 'checkStatus(this,'+items.complain_seq+')',//처리여부변경
					checked:checkOX 
				}))
			)).appendTo($('#complainTbody'));
	});//each
	
}
//출력
function complainList(data){
	$.ajax({
		type: 'post',
		url: '/market/admin/getComplainList',
		data: {'pg': $('#pg').val(), 
				'viewNum': $('#selectPrint').val()},
		dataType: 'json',
		success: function(data){
			$("#complainTbody tr:gt(0)").remove();
			showList(data);
			//페이징처리
			$('#boardPagingDiv').html(data.adminComplainBP.pagingHTML);
		},error: function(err){
			console.log(err);
		}
	});//ajax
}
//페이징처리
function boardPaging(pg){
	var keyword = document.getElementById("keyword").value; //검색용 키워드
	$('#pg').val(pg);
	
	//검색하지 않고 일반 페이징
	if($('#searchType').val() == '선택'||keyword ==''){
		location.href='/market/admin/complainList?pg='+pg+'&viewNum='+$('#viewNum').val();
	}//검색+페이징
	else{
		$('#memberSearchBtn').trigger('click','research');
	 }
}
//조건검색======================================================
//20, 50개 출력
function selectPrint(){
	$('#selectPrint').change(function(){
		var viewNum = $(this).val();//몇개 출력할지 선택한 값
		$('#viewNum').val(viewNum);
		
		complainList();
	});
}

	
//신고자or신고당한사람 검색
function searchReportedMember(){
	$('#memberSearchBtn').click(function(event, str){
		if(str != 'research')
			$('input[name=searchPg]').val(1);
		if($('#searchType').val() == '선택')
			alert('검색 조건을 선택하세요');
		else if($('#keyword').val() == '')
			alert('검색어를 입력하세요');
		else {
			search_viewNum_change();
			//조건 검색후 selectPrint눌렀을때 (20개보기 50개보기..)
			$('#selectPrint').change(function(){
				var viewNum = $(this).val();
				$('#viewNum').val(viewNum);
				search_viewNum_change();
			});
		}
	});
}
	
//검색 + 출력 개수
function search_viewNum_change(){
	$.ajax({
		type: 'post',
		url: '/market/admin/searchReportedMember',
		data: {'pg': $('#searchPg').val(), 
			   'viewNum': $('#selectPrint').val(),
			   'searchType': $('#searchType').val(),
			   'keyword':$('#keyword').val()},
		dataType: 'json',
		success: function(data){
			$("#complainTbody tr:gt(0)").remove();
			showList(data); //리스트 출력
			//페이징처리
			$('#boardPagingDiv').html(data.adminSearchComplainBP.pagingHTML);
			
			findComplainContent();//우측에 신고 상세 내역 출력(게시글/댓글/리뷰만)
		}
	});
}

//카테고리 검색 출력
function findWithdrawCate(){
	$('#withdrawCate').change(function(){
		let withdrawCate = $(this).val();//특정 신고 내역 확인
		$('#withdrawCate').val(withdrawCate);
		$.ajax({
			type: 'post',
			url: '/market/admin/findWithdrawCate',
			data: {'pg': $('#searchPg').val(), 
				   'viewNum': $('#selectPrint').val(),
				   'withdrawCate': $('#withdrawCate').val()},
			dataType: 'json',
			success: function(data){
				$("#complainTbody tr:gt(0)").remove();
				showList(data); //리스트 출력
				//페이징처리
				$('#boardPagingDiv').html(data.adminComplainCateBP.pagingHTML);
				
				
				findComplainContent();//우측에 신고 상세 내역 출력(게시글/댓글/리뷰만)
			}
		});//ajax
	});
}

//========================================================================
//신고내역 처리 상태 변환
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

//우측=============================================================================================


//신고 내용 확인
function findComplainContent(){
	$('#complainTbody').on('click', '#subjectA', function(){
		$('#reported_id').text('');
		$('#reported_logtime').text('');
		$('#reported_content').text('');
		$('#mother').text('');
		$('#daughter').text('');
		$('#mother_seq').text('');
		$('#daughter_seq').text('');
		
		// [댓글] 내용 우측에 띄우기
		if($(this).parent().prev().text()=='댓글 신고'){
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
		}
		//[게시글] 페이지 업 + 내용 우측에 띄우기
		else if($(this).parent().prev().text()=='게시글 신고'){
			let seq = $(this).parent().text();
			window.open("/market/board/articleForm?seq="+seq+"&pg=1","PopupWin","width=1000,height=800");
			$('#thisIs').val('게시글');
			
			//게시글 내용 우측에 띄우기
			$.ajax({
				type : 'post',
				url : '/market/board/getArticle',
				data : 'seq='+$(this).parent().text(), 
				dataType : 'json', 
				success : function(data){
					$('#reported_id').text(data.boardDTO.mem_id);
					$('#reported_logtime').text(data.boardDTO.board_logtime);
					$('#reported_content').text(data.boardDTO.board_content);
					$('#mother').text('게시글 번호');
					$('#daughter').text('댓글 번호');
					$('#thisIs').val('게시글');
					$('#mother_seq').text(data.boardDTO.board_seq);
					$('#daughter_seq').text('-');
				},error: function(err){
					console.log(err);
				}
			});
		}
		//[상품] 페이지 업
		else if($(this).parent().prev().text()=='상품 신고'){
			let seq = $(this).parent().text();
			window.open("/market/product/productDetail?seq="+seq,"PopupWin","width=1000,height=800");
		}
		// [리뷰] 내용 우측에 띄우기
		else if($(this).parent().prev().text()=='리뷰 신고'){
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
		}//상점 페이지 업
		else if($(this).parent().prev().text()=='상점 신고'){
			let id = $(this).parent().text();
			window.open("/market/store/store?id"+id,"PopupWin","width=1000,height=800");
		}
	});
	goComplainPage();
	blindComplain();
	memberBlock();
}
//회원 영구 정지
function memberBlock(){
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
}
//신고글 블라인드 처리
function blindComplain(){
	$('#blindComplainBtn').click(function(){
		var result = confirm('해당 글을 블라인드 처리하시겠습니까?');
	    if(result){
	       $.ajax({
	          type: 'post',
	          url: '/market/admin/blindComplain',
	          data: {'board_seq':$('#mother_seq').text(),
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
}
//신고당한 작성글의 페이지 띄우기(게시글 신고/상점신고/상품 신고만. 리뷰x. 댓글은 '페이지 이동'버튼 눌러야만 뜸)
function goComplainPage(){
	$('#goComplainPage').click(function(){
		window.open("/market/board/articleForm?seq="+$('#mother_seq').text()+"&pg=1",
				"PopupWin","width=1000,height=800");
	});
}







