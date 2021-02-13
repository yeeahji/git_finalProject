$(document).ready(function(){
	withdrawList();
});

//selectPrint눌렀을때 (20개보기 50개보기..)
$('#selectPrint').change(function(){
	var viewNum = $(this).val();
	$('#viewNum').val(viewNum);
	
	withdrawList();
});

//리스트 전체 출력
function withdrawList(data){
	$.ajax({
		type: 'post',
		url: '/market/admin/getWithdrawList',
		data: {'pg': $('#pg').val(), 
			   'viewNum': $('#viewNum').val()},
		dataType: 'json',
		success: function(data){
			$("#tbody tr:gt(0)").remove();
			let withdrawReason;
			$.each(data.list, function(index, items){
				withdrawReason='';
				if(items.withdraw_lowFrequency ==1){
					withdrawReason = '이용빈도 낮음'
				}if(items.withdraw_rejoin ==1){
					if (withdrawReason==''){
						withdrawReason += "재가입"
					}else withdrawReason += ", 재가입"
				}if(items.withdraw_lowContents ==1){
					if (withdrawReason==''){
						withdrawReason += "콘텐츠/상품 부족"
					}else withdrawReason += ", 콘텐츠/상품 부족"
				}if(items.withdraw_protectInfo ==1){
					if (withdrawReason==''){
						withdrawReason += "개인정보보호"
					}else withdrawReason += ", 개인정보보호"
				}if(items.withdraw_lowBenefit ==1){
					if (withdrawReason==''){
						withdrawReason += "혜택 부족"
					}else withdrawReason += ", 혜택 부족"
				}if(items.withdraw_others ==1){
					if (withdrawReason==''){
						withdrawReason += "기타"
					}else withdrawReason += ", 기타"
				}
					
				console.log("탈퇴사유:"+withdrawReason);
				
				$('<tr/>').append($('<td/>',{
					text: items.withdraw_seq
				})).append($('<td/>',{
					text: items.mem_id
				})).append($('<td/>',{
					text: withdrawReason,
				})).append($('<td/>',{
					text: items.withdraw_detailReason
				})).append($('<td/>',{
					text: items.withdraw_logtime
				})).appendTo($('#tbody'));
					
			});//each
			//페이징처리
			$('#boardPagingDiv').html(data.withdrawBP.pagingHTML);
			drawPie();
			drawGraph();
		},error: function(err){
			console.log(err);
		}
	});//ajax
}
//탈퇴 회원 분석(파이)
function drawPie(){
	$.ajax({
		type: 'post',
		url: '/market/admin/getWithdrawTotal',
		dataType: 'json',
		success: function(data){//탈퇴회원 전체 수
			let all = data.map.withdrawTotal 
					+ data.map.lowFrequencyTotal
					+ data.map.rejoinTotal
					+ data.map.lowContentsTotal
					+ data.map.lowBenefitTotal
					+ data.map.othersTotal;
		let lowFrequency = parseInt(data.map.lowFrequencyTotal/all*100);
		let rejoin = parseInt(data.map.rejoinTotal/all*100);
		let lowContent = parseInt(data.map.lowContentsTotal/all*100);
		let protectInfo = parseInt(data.map.protectInfoTotal/all*100);
		let lowBenefit = parseInt(data.map.lowBenefitTotal/all*100);
		let others = parseInt(data.map.othersTotal/all*100);
	data = { 
			datasets: [{ 
				backgroundColor: ['red','yellow','blue','green','orange','purple'], 
				data: [lowFrequency, lowContent, rejoin,protectInfo,lowBenefit,others] }], // 퍼센테이지.라벨의 이름이 툴팁처럼 마우스가 근처에 오면 나타남 
			labels: ['이용빈도 낮음','재가입','혜택 부족','콘텐츠 부족','개인정보보호','기타'] };
			var ctx1 = document.getElementById("myChart1"); 
			var myPieChart = new Chart(ctx1, { 
								type: 'pie', 
								data: data, 
								options: {} 
							});
		}
	});//ajax
}
//회원 증감 추이(그래프)
function drawGraph(){
	var ctx = document.getElementById('myChart').getContext('2d'); var chart = new Chart(ctx, { 
		// 챠트 종류를 선택 
		type: 'line', // 챠트를 그릴 데이타 
		data: { labels: ['1월', '2월', '3월', '4월', '5월', '6월', '7월'], 
			datasets: [{ label: '회원 증감 추이', 
						backgroundColor: 'transparent', 
						borderColor: 'red', 
						data: [0, 10, 5, 2, 20, 30, 45] }] }, 
			options: {} }); 

}		



//조건검색======================================================

//검색
$('#storeSearchBtn').click(function(event, str){
	if(str != 'research'){
		$('input[name=searchPg]').val(1);
	}
	if($('#keyword').val() == ''){
		alert('검색어를 입력하세요');
	}else{
		search_viewNum_change();
		
		//조건 검색후 selectPrint눌렀을때 (20개보기 50개보기..)
		$('#selectPrint').change(function(){
			var viewNum = $(this).val();
			$('#viewNum').val(viewNum);
			
			search_viewNum_change();
		});
	}
});


function search_viewNum_change(){
	$.ajax({
		type: 'post',
		url: '/market/admin/getSearchWithdrawList',
		data: {'pg': $('#pg').val(), 
			   'viewNum': $('#viewNum').val(),
			   'searchType':$('#searchType').val(),
			   'keyword':$('#keyword').val()},
		dataType: 'json',
		success: function(data){
			$("#tbody tr:gt(0)").remove();
			let withdrawReason;
			$.each(data.list, function(index, items){
				withdrawReason='';
				if(items.withdraw_lowFrequency ==1){
					withdrawReason = '이용빈도 낮음'
				}if(items.withdraw_rejoin ==1){
					if (withdrawReason==''){
						withdrawReason += "재가입"
					}else withdrawReason += ", 재가입"
				}if(items.withdraw_lowContents ==1){
					if (withdrawReason==''){
						withdrawReason += "콘텐츠/상품 부족"
					}else withdrawReason += ", 콘텐츠/상품 부족"
				}if(items.withdraw_protectInfo ==1){
					if (withdrawReason==''){
						withdrawReason += "개인정보보호"
					}else withdrawReason += ", 개인정보보호"
				}if(items.withdraw_lowBenefit ==1){
					if (withdrawReason==''){
						withdrawReason += "혜택 부족"
					}else withdrawReason += ", 혜택 부족"
				}if(items.withdraw_others ==1){
					if (withdrawReason==''){
						withdrawReason += "기타"
					}else withdrawReason += ", 기타"
				}
					
				console.log("탈퇴사유:"+withdrawReason);
				
				$('<tr/>').append($('<td/>',{
					text: items.withdraw_seq
				})).append($('<td/>',{
					text: items.mem_id
				})).append($('<td/>',{
					text: withdrawReason,
				})).append($('<td/>',{
					text: items.withdraw_detailReason
				})).append($('<td/>',{
					text: items.withdraw_logtime
				})).appendTo($('#tbody'));
					
			});//each
			//페이징처리
			$('#boardPagingDiv').html(data.withdrawBP.pagingHTML);
			drawPie();
			drawGraph();
		},error: function(err){
			console.log(err);
		}
	});//ajax
}


















