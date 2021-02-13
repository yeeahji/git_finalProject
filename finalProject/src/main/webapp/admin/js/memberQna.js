$(document).ready(function() {
	qnaList();
});	

//selectPrint눌렀을때 (20개보기 50개보기..)
$('#selectPrint').change(function(){
	var viewNum = $(this).val();
	$('#viewNum').val(viewNum);
	
	qnaList();
});

//리스트 출력
function qnaList(){
	$.ajax({
		type: 'post',
		url: '/market/admin/getQnaList',
		data: {'pg': $('#pg').val(), 
				'viewNum': $('#viewNum').val()},
		dataType: 'json',
		success: function(data){
			$("#tbody tr:gt(0)").remove();
			$.each(data.list, function(index, items){
				let answerOX;
				if(items.qna_answer != null){
					answerOX = 'O';
				}else{
					answerOX = 'X';
				}
				
				$('<tr/>').append($('<td/>',{
					}).append($('<a/>',{
						href: '#',
						text: items.qna_seq,
						id: 'subjectA',
						class: items.qna_seq+""
				}))).append($('<td/>',{
					text: items.qnaCate_main
				})).append($('<td/>',{
					text: items.qnaCate_sub
				})).append($('<td/>',{
					text: items.mem_id
				})).append($('<td/>',{
					text: items.qna_logtime
				})).append($('<td/>',{
					text: answerOX
				})).append($('<td/>',{
					text: items.qna_answerLogtime
				})).appendTo($('#tbody'));
			});//each
			//페이징처리
			$('#boardPagingDiv').html(data.qnaBP.pagingHTML);
			showQnaContent();//문의글 확인
			writeAnswer()//답변등록
		},error: function(err){
			console.log(err);
		}
	});//ajax
}

//조건검색======================================================

//검색
$('#memberQnaSearchBtn').click(function(event, str){
	if(str != 'research'){
		$('input[name=searchPg]').val(1);
	}
	if($('#keyword').val() == ''){
		alert('검색어를 입력하세요');
	}else{
		 search_viewNum_qnaList();
		
		//조건 검색후 selectPrint눌렀을때 (20개보기 50개보기..)
		$('#selectPrint').change(function(){
			var viewNum = $(this).val();
			$('#viewNum').val(viewNum);
			
			 search_viewNum_qnaList();
		});
	}
});

function search_viewNum_qnaList(){
	$.ajax({
		type: 'post',
		url: '/market/admin/getSearchQnaList',
		data: {'pg': $('#pg').val(), 
			   'viewNum': $('#viewNum').val(),
			   'searchType2':$('#searchType2').val(),
			   'keyword':$('#keyword').val()},
		dataType: 'json',
		success: function(data){
			$("#tbody tr:gt(0)").remove();
			$.each(data.list, function(index, items){
				let answerOX;
				if(items.qna_answer != null){
					answerOX = 'O';
				}else{
					answerOX = 'X';
				}
				
				$('<tr/>').append($('<td/>',{
					}).append($('<a/>',{
						href: '#',
						text: items.qna_seq,
						id: 'subjectA',
						class: items.qna_seq+""
				}))).append($('<td/>',{
					text: items.qnaCate_main
				})).append($('<td/>',{
					text: items.qnaCate_sub
				})).append($('<td/>',{
					text: items.mem_id
				})).append($('<td/>',{
					text: items.qna_logtime
				})).append($('<td/>',{
					text: answerOX
				})).append($('<td/>',{
					text: items.qna_answerLogtime
				})).appendTo($('#tbody'));
			});//each
			//페이징처리
			$('#boardPagingDiv').html(data.getSearchqnaBP.pagingHTML);
			showQnaContent();//문의글 확인
			writeAnswer()//답변등록
		},error: function(err){
			console.log(err);
		}
	});//ajax
}

//공통 ===========================================

//1:1문의 내용 확인하기
function showQnaContent(){
	
	$('#tbody').on('click', '#subjectA', function(){
		$('#qnaAnswerTextarea').val('');
		$.ajax({
			type: 'post',
			url: '/market/admin/getQnaContent',
			data: {'qna_seq': $(this).text() },
			dataType: 'json',
			success: function(data){
				$('#qnaCate_main').text(data.qnaDTO.qnaCate_main);
				$('#qnaCate_sub').text(data.qnaDTO.qnaCate_sub);
				$('#mem_id').text(data.qnaDTO.mem_id);
				$('#qna_logtime').text(data.qnaDTO.qna_logtime);
				$('#qnaContent').text(data.qnaDTO.qna_content);
				$('#qna_seq').text(data.qnaDTO.qna_seq);
				
				if(data.qnaDTO.qna_answer != null){
					$('#qnaAnswerTextarea').val(data.qnaDTO.qna_answer);
					$("#qnaAnswerTextarea").attr("readonly", true);
					$("#writeAnswerBtn").attr("disabled", true);
				}else{
					$('#qnaAnswerTextarea').val('');
					$("#qnaAnswerTextarea").attr("readonly", false);
					$("#writeAnswerBtn").attr("disabled", false);
				}
			}
		})//ajax
	});//tbody
}


//문의글 답변하기
function writeAnswer(){
	$('.input-group').on('click', '#writeAnswerBtn', function(){
		$.ajax({
			type: 'post',
			url: '/market/admin/writeAnswer',
			data: {'qna_seq': $('#qna_seq').text(),
				'qna_answer': $('#qnaAnswerTextarea').val()},
			success: function(){
				alert("답변을 등록했습니다.");
				location.reload();
			}
		})//ajax
	})//click
}

































