//담당 : 김명경
//[목록 출력]
$(document).ready(function(){
	
	$.ajax({
		type: 'post',
		url: '/market/member/sessionLogin',
		success: function(){// 글 리스트. 페이지. 세
			console.log("세션 아이디, 이메일, 카카오 구분 정보 저장 완료");
		}, error:function(err){
			console.log("세션 안생김! err"+err);
		}
	});
	
	$.ajax({
		type: 'post',
		url: '/market/board/showList',
		data: {'pg': $('#pg').val()},  //list.jsp의 히든 pg값
		dataType: 'json',
		success: function(data){// 글 리스트. 페이지. 세션 아이디. 보드페이징
			//검색 데이터 출력
			printList(data);
			
			//글 제목 클릭 시, 
			getArticle(data);
			
			//페이징 처리
			$('#boardPagingDiv').html(data.boardPaging.pagingHTML);
//											↑이 변수안에 페이지 넘버가 들어있다.
		},error: function(data, status, opt){
			console.log("code:"+data.status+"\n"+"message:"+data.responseText+"\n"+"error:"+opt);
		}
	});//리스트 출력.ajax
	
	//글쓰기 버튼 클릭 시, 글쓰기 페이지로 이동(로그인 상태일 때만 적용된다)
	$('#goWriteBtn').click(function(){
		location.href = '/market/board/writeForm';
	});
	
	//[검색]======================================================================================================================
	$('#boardSearchBtn').click(function(event, str){ //paging함수에서 발생한 이벤트를 그대로 받아온다.
		//직접 검색 버튼을 눌렀을 때
		if(str != 'research') {
			$('input[name=pg]').val(1); //이동페이지 값은 무조건 1로 지정
		}
		//입력 유효성 검사
		if($('#searchText').val()==''){
			$('#searchDiv').text("검색어를 입력하세요");
		}
		//검색
		else{
			$.ajax({
				type:'post',
				url:'/market/board/getBoardSearch',
				data : $('#boardSearchForm').serialize(), //pg, searchType, searchText
				dataType : 'json',
				success:function(data){
					//data: pg.list.boardPaging
					//기본 리스트 삭제
					$('#boardListTable tr:gt(0)').remove();
					
					//검색 데이터 출력
					printList(data);
					
					//글 제목 클릭 시, 
					getArticle(data);
					//페이징 처리
					$('#boardPagingDiv').html(data.boardPaging.pagingHTML);
				}, error: function(err){
					console.log("err"+err);
					}
				})
			}
	});//boardSearchBtn
});//document.ready

//글리스트 출력(전체글 / 검색글)
function printList(data){//data : list, pg, boardPaging
	$.each(data.list, function(index, items){
		$('<tr/>').append($('<td/>',{
			align: 'center',
			text: items.board_seq
		})).append($('<td/>',{
			}).append($('<a/>',{
				href: '#',
				text: items.board_subject,
				id: 'subjectA', //아이디를 추가한다.
				class: items.board_seq+''
			}))
		).append($('<td/>',{
			align: 'center',
			text: items.mem_id
		})).append($('<td/>',{
			align: 'center',
			text: items.board_hit
		})).append($('<td/>',{
			align: 'center',
			text: items.board_logtime
		})).appendTo($('#boardListTable')); 
		
//		▶ 답글 화살표 이미지 추가
		for(i=0; i<items.board_lev; i++){
			$('.'+items.board_seq).before('&emsp;');
		}
		if(items.board_pseq != 0) {//답글인 경우(pseq가 0이면 원글이다)
			$('.'+items.board_seq).before($('<img/>',{
				src : '../image/board/reply.gif'
			}));
		}
	});//each
}

//선택한 글 보기
function getArticle(data){//data : list, pg, boardPaging
	$('#boardListTable').on('click', '#subjectA', function(){
		let seq = $(this).parent().prev().text();
		let pg = data.pg;
		location.href = '/market/board/articleForm?seq='+seq+"&pg="+pg;
	});
}

//페이지 이동
function boardPaging(pg){
	var searchText=$('#searchText').val();
	if(searchText == ''){//검색값이 없기 때문에 원래 리스트대로 처리하면 된다
		location.href="list?pg="+pg; 
	}else{
		$('input[name=pg]').val(pg);
		$('#boardSearchBtn').trigger('click','research');//검색버튼 눌렀을때 같은 효과
	}	
}



























