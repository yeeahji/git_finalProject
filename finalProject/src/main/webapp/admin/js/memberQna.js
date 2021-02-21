$(document).ready(function() {
	qnaList();//리스트 출력
	
	//대분류
	$.ajax({
		type: 'post',
		url: '/market/notice/getMainCate',
		dataType: 'json',
		success: function(data){
			$.each(data.list, function(index, items){
				$('#qnaCate_main').append("<option value='"+items.qnaCate_code+"' name='"+items.qnaCate_name+"'>"+items.qnaCate_name+"</option>");
				$('#qnaCate_mainName').val(items.qnaCate_name);
			})
		}
	});
	//소분류
	$(document).on("change","#qnaCate_main",function(){
		$("option:selected", this).each(function(){
			var selectValue = $(this).val();//main에서 선택한값
			$.ajax({
				type: 'post',
				url: '/market/notice/getSubCate',
				data: 'qnaCate_mainCode='+selectValue,
				dataType: 'json',
				success: function(data){
					$("select[name='qnaCate_sub']").children().remove();//기존리스트삭제
					$.each(data.list, function(index, items){
						$("select[name='qnaCate_sub']").append("<option value='"+items.qnaCate_name+"' name='"+items.qnaCate_name+"'>"+items.qnaCate_name+"</option>");
					})
				}
			});		
		});
	});
	
	
	//20개, 50개, 100개 보기
	$('#selectPrint').change(function(){
		var viewNum = $(this).val();
		console.log("출력개수:"+viewNum);
		$('#viewNum').val(viewNum);
		
		qnaList();
	});
	//검색
	$('#memberQnaSearchBtn').click(function(event, str){
		if(str != 'research'){
			$('input[name=searchPg]').val(1);
		}
		if(!($('#qnaCate_sub').val() == '카테고리2' ||$('#keyword').val() == ''))
			alert('검색 조건을 선택하거나, 검색할 아이디를 입력하세요');
		//카테고리로 검색할 경우
		else if($('#qnaCate_sub').val() != '카테고리2'){
			cate_viewNum_qnaList();
			//조건 검색후 selectPrint눌렀을때 (20개보기 50개보기..)
			$('#selectPrint').change(function(){
				var viewNum = $(this).val();
				$('#viewNum').val(viewNum);
				cate_viewNum_qnaList();
			});
		//회원 아이디로 검색할 경우
		}else if($('#keyword').val() != ''){
			search_viewNum_qnaList();
			//조건 검색후 selectPrint눌렀을때 (20개보기 50개보기..)
			$('#selectPrint').change(function(){
				var viewNum = $(this).val();
				$('#viewNum').val(viewNum);
				 
				 search_viewNum_qnaList();
			});
		}
	});
});	//ready


//페이징 처리
function boardPaging(pg){
	var keyword = document.getElementById("keyword").value;
	$('#pg').val(pg);

	 if(keyword ==''){
		location.href='/market/admin/memberQna?pg='+pg+'&viewNum='+$('#viewNum').val();
	 }else{
		$('#memberQnaSearchBtn').trigger('click','research');
	 }
}
function showList(data){
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
	
}
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
			showList(data);
			
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


//문의글 소카테고리로 출력
function cate_viewNum_qnaList(){
	console.log("vvv");
	$.ajax({
		type: 'post',
		url: '/market/admin/getSearchQnaList',
		data: {'pg': $('#pg').val(), 
			   'viewNum': $('#viewNum').val(),
			   'searchType2':'qnaCate_Sub', //'소분류카테고리'가
			   'keyword':$('#qnaCate_sub').val()}, //'~'인 것만 출력
		dataType: 'json',
		success: function(data){
			$("#tbody tr:gt(0)").remove();
			showList(data);
			//페이징처리
			$('#boardPagingDiv').html(data.getSearchqnaBP.pagingHTML);
			showQnaContent();//문의글 확인
			writeAnswer()//답변등록
		},error: function(err){
			console.log(err);
		}
	});//ajax
}
//문의글 회원 아이디 검색으로 출력
function search_viewNum_qnaList(){
	$.ajax({
		type: 'post',
		url: '/market/admin/getSearchQnaList',
		data: {'pg': $('#pg').val(), 
			   'viewNum': $('#viewNum').val(),
			   'searchType2':'mem_id', //'아이디'가
			   'keyword':$('#keyword').val()},//'키워드'인것만 검색
		dataType: 'json',
		success: function(data){
			$("#tbody tr:gt(0)").remove();
			showList(data);
			//페이징처리
			$('#boardPagingDiv').html(data.getSearchqnaBP.pagingHTML);
			showQnaContent();//문의글 확인
			writeAnswer()//답변등록
		},error: function(err){
			console.log(err);
		}
	});//ajax
}

//우측 ===========================================

//1:1문의 내용 확인하기
function showQnaContent(){
	
	$('#tbody').on('click', '#subjectA', function(){
		$('#qnaAnswerTextarea').val('');
		$('#qnaImg1').attr('src','');
		$.ajax({
			type: 'post',
			url: '/market/admin/getQnaContent',
			data: {'qna_seq': $(this).text() },
			dataType: 'json',//qnaDTO
			success: function(data){
				console.log("aa"+data.qnaDTO.qnaCate_main)
				$('#qnaCate_main2').text(data.qnaDTO.qnaCate_main);
				$('#qnaCate_sub2').text(data.qnaDTO.qnaCate_sub);
				$('#mem_id').text(data.qnaDTO.mem_id);
				$('#qna_logtime').text(data.qnaDTO.qna_logtime);
				$('#qnaContent').text(data.qnaDTO.qna_content);
				$('#qna_seq').text(data.qnaDTO.qna_seq);
				if(data.qnaDTO.qna_img1 != null){
					$('#qnaImg1').attr('src','/market/storage/'+data.qnaDTO.qna_img1)
				}else{
					$('#noImg').text('[이미지 없음]');
				}
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
