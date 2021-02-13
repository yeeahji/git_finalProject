<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta name="robots" content="index,nofollow">
	<meta name="description" content="무료채팅 사이트">
	<meta property="og:type" content="website"> 
	<meta property="og:title" content="무료채팅">
	<meta property="og:description" content="무료채팅 사이트">
	<meta property="og:url" content="http://www.eoeca.com">
	<title>무료채팅 - 이오이카</title>	
	<script src="/resources/js/common.js?v=1612702090700"></script>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script> 
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js"></script>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap-theme.min.css">
	<link rel="canonical" href="http://www.eoeca.com">
	
	<style type="text/css">
		html, body {
			position: absolute;
			width: 100%;
			height: 100%;
		}
	</style>
	
	<script type="text/javascript">
	
	Object.defineProperty(console, '_commandLineAPI', { get : function() { throw '콘솔을 사용할 수 없습니다.' } });
	
		var UserAgent = navigator.userAgent;
		if(UserAgent.match(/iPhone|iPod|iPad|iPad2|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i) != null || UserAgent.match(/LG|SAMSUNG|Samsung/) != null) {
			location.replace('/m_main.do');
		}
	
		// 로그인
		function login() {
			var nicknameCheck = RegExp(/[\s\\\'\"<>]/);
			var ageCheck = RegExp(/^[0-9]{1,2}$/);
			var areaCheck = RegExp(/^[가-힣·]{2,5}$/);
			
			// 별명 체크
			if($('#frmLogin #nickname').val() == '') {
				alert('별명을 입력 하세요.');
				$('#frmLogin #nickname').focus();
				return;
			}
			if(countSymbols($('#frmLogin #nickname').val()) < 2 || countSymbols($('#frmLogin #nickname').val()) > 10) {
				alert('별명은 2~10자리로 입력 하세요.');
				$('#frmLogin #nickname').focus();
				return;
			}
			if(nicknameCheck.test($('#frmLogin #nickname').val()) == true) {
				alert('별명에 공백, 따옴표, 괄호<>, 역슬래쉬는 들어갈 수 없습니다.');
				$('#frmLogin #nickname').focus();
				return;
			}		  
			
			// 성별 체크
			if($('#frmLogin #sex').val() == '') {
				alert('성별을 입력 하세요.');
				$('#frmLogin #sex').focus();
				return;
			}
			if($('#frmLogin #sex').val() != '남자' && $('#frmLogin #sex').val() != '여자') {
				alert('성별 입력 값이 옳바르지 않습니다.');
				$('#frmLogin #sex').focus();
				return;
			}
			
			// 나이 체크
			if($('#frmLogin #age').val() == '') {
				alert('나이를 입력 하세요.');
				$('#frmLogin #age').focus();
				return;
			}
			if(ageCheck.test($('#frmLogin #age').val()) == false
			|| $('#frmLogin #age').val() < 1 || $('#frmLogin #age').val() > 99) {
				alert('나이는 1~99 사이의 값을 입력 하세요.');
				$('#frmLogin #age').focus();
				return;
			}
			
			// 지역 체크
			if($('#frmLogin #area').val() == '') {
				alert('지역을 입력 하세요.');
				$('#frmLogin #area').focus();
				return;
			}
			if(areaCheck.test($('#frmLogin #area').val()) == false) {
				alert('지역 입력값이 옳바르지 않습니다.');
				$('#frmLogin #area').focus();
				return;
			}
			
			// 별명 불건전단어 체크
			var str = $('#frmLogin #nickname').val();
			if((word = word_check(str.trim())) != null) {
				alert('별명에 불건전 단어 [' + word + ']가 포함 되었습니다.');
				$('#frmLogin #nickname').focus();
				return;
			}
			
			// 운영자 체크
			if(str.indexOf("운영자") != -1) {
				alert('운영자 아이디는 사용할 수 없습니다.');
				$('#frmLogin #nickname').focus();
				return;
			}
				
			var formData = $('#frmLogin').serialize();
			$.ajax({
				cache : false,
				url : '/ajax_login.do',
				type : 'POST', 
				data : formData, 
				success : function(data) {
					if(data.code == 'true') {
						alert('별명이 설정 되었습니다.');
						location.replace('/main.do');
					}
					else {
						alert('별명 설정이 실패 했습니다.');
					}
				}, 
				error : function(xhr, status) {
					alert('네트워크 오류 : ' + xhr + ' : ' + status);
				}
	        });
		}
		
		// 로그아웃
		function logout() {
			$.ajax({
				cache : false,
				url : '/ajax_logout.do',
				type : 'POST', 
				success : function(data) {
					if(data.code == 'true') {
						alert('로그아웃 되었습니다.');
						location.replace('/main.do');
					}
					else {
						alert('로그아웃이 실패 했습니다.');
					}
				}, 
				error : function(xhr, status) {
					alert('네트워크 오류 : ' + xhr + ' : ' + status);
				}
	        });
		}
		
		// 채팅방 생성 화면 보기
		function viewCreateRoom() {
			if('' == null || '' == '' || '' == 'N') {
				alert('채팅방을 만들려면 먼저 별명설정을 해야 합니다.');
				return;
			}
			$('#divMain').hide();
			$('#divCreateRoom').show();
			$('#divButtonMain').show();
			$('#divButtonCreateRoom').hide();
			$('#labelHeadText').text('채팅방 만들기');
		}
		
		// 메인 화면 보기
		function viewMain() {
			$('#divMain').show();
			$('#divCreateRoom').hide();
			$('#divButtonMain').hide();
			$('#divButtonCreateRoom').show();
			$('#labelHeadText').text('채팅방 목록');
		}
	
		// 채팅방 생성
		function createRoom() {
			var bangNameCheck = RegExp(/[\\\'\"<>]/);
			var bangAreaCheck = RegExp(/^[가-힣·]{2,5}$/);
			var bangMaxMemberCntCheck = RegExp(/^[0-9]{1,3}$/);
			
			// 방제목 체크
			if($('#frmCreateRoom #bang_title').val() == '') {
				alert('방제목을 입력 하세요.');
				$('#frmCreateRoom #bang_title').focus();
				return;
			}
			if(countSymbols($('#frmCreateRoom #bang_title').val()) < 2 || countSymbols($('#frmCreateRoom #bang_title').val()) > 60) {
				alert('방제목은 2~60자리로 입력 하세요.');
				$('#frmCreateRoom #bang_title').focus();
				return;
			}
			if(bangNameCheck.test($('#frmCreateRoom #bang_title').val()) == true) {
				alert('방제목에 따옴표, 괄호<>, 역슬래쉬는 들어갈 수 없습니다.');
				$('#frmCreateRoom #bang_title').focus();
				return;
			}
			
			// 지역 체크
			if($('#frmCreateRoom #bang_area').val() == '') {
				alert('방지역을 입력 하세요.');
				$('#frmCreateRoom #bang_area').focus();
				return;
			}
			if(bangAreaCheck.test($('#frmCreateRoom #bang_area').val()) == false) {
				alert('방지역 입력값이 옳바르지 않습니다.');
				$('#frmCreateRoom #bang_area').focus();
				return;
			}
			
			// 방인원수
			if($('#frmCreateRoom #bang_max_member_cnt').val() == '') {
				alert('방인원수를 입력 하세요.');
				$('#frmCreateRoom #bang_max_member_cnt').focus();
				return;
			}
			if(bangMaxMemberCntCheck.test($('#frmCreateRoom #bang_max_member_cnt').val()) == false 
			|| $('#frmCreateRoom #bang_max_member_cnt').val() < 2 || $('#frmCreateRoom #bang_max_member_cnt').val() > 50) {
				alert('방인원수는 2~50 사이의 값을 입력 하세요.');
				$('#frmCreateRoom #bang_max_member_cnt').focus();
				return;
			}
			
			// 방제목 불건전단어 체크
			var str = $('#frmCreateRoom #bang_title').val();
			if((word = word_check(str.trim())) != null) {
				alert('방제목에 불건전 단어 [' + word + ']가 포함 되었습니다.');
				$('#frmCreateRoom #bang_title').focus();
				return;
			}
			
			$('#frmCreateRoom #bang_max_member_cnt').val($('#frmCreateRoom #bang_max_member_cnt').val().replace(/(^0+)/, ""));
			
			if(doubleSubmitCheck()) return;
			$('#frmCreateRoom').submit();
		}
		
		// 지역 선택
		function chooseArea(area) {
			url = '/main.do' + '?area=' + encodeURI(area);
			location.href = url;
			return;
		}
	</script>
	
	<script>
		// 광고 새로 고침
		function autoRefreshDiv() {
			  $("#divAd1").load(window.location.href+" #divAd1");
			  $("#divAd2").load(window.location.href+" #divAd2");
		}
				
		$(document).ready(function() {
			setInterval('autoRefreshDiv()', 60000);
		});
	</script>
	
</head>
<body>
	<div style="width: 100%; height: 63px; border-bottom: solid 1px #e1e3e9;">
		<div style="width: 1290px; height: 62px; margin-left: auto; margin-right: auto;">
			<div style="width: 100%; height: 100%; padding: 10px 0px 0px 5px;">
				<a href="/main.do">
					<font style="font-size: 17px;">무료채팅 이오이카</font><br>
					<font style="font-size: 17px;">www.eoeca.com</font>
				</a>
			</div>
		</div>		
	</div>
	<div style="width: 100%; height: 801px; border-bottom: solid 1px #e1e3e9; background-image: url(/resources/img/background.png);" >
		<div style="width: 1290px; height: 800px; margin-left: auto; margin-right: auto; background-color: #FFFFFF;">
		
			<!--------------------- 지역 목록 --------------------->
			<div style="width: 280px; height: 100%; float: left; border-left: solid 1px #e1e3e9;">
				<div style="width: 100%; height: 67%; padding: 10px;">
					<div style="margin-bottom: 5px;">
						<font style="font-weight: bold;">지역 목록</font>
					</div>
					<div id="divArea">
						<div style="margin-bottom: 7px;">
							<a onclick="chooseArea('서울')" style="cursor: pointer;"><font style="font-weight: bold;">● 서울</font></a>
						</div>
						<div style="margin-bottom: 7px;">
							<a onclick="chooseArea('인천')" style="cursor: pointer;"><font style="font-weight: bold;">● 인천</font></a>
						</div>
						<div style="margin-bottom: 7px;">
							<a onclick="chooseArea('대전·세종')" style="cursor: pointer;"><font style="font-weight: bold;">● 대전·세종</font></a>
						</div>
						<div style="margin-bottom: 7px;">
							<a onclick="chooseArea('대구')" style="cursor: pointer;"><font style="font-weight: bold;">● 대구</font></a>
						</div>
						<div style="margin-bottom: 7px;">
							<a onclick="chooseArea('부산')" style="cursor: pointer;"><font style="font-weight: bold;">● 부산</font></a>
						</div>
						<div style="margin-bottom: 7px;">
							<a onclick="chooseArea('광주')" style="cursor: pointer;"><font style="font-weight: bold;">● 광주</font></a>
						</div>
						<div style="margin-bottom: 7px;">
							<a onclick="chooseArea('울산')" style="cursor: pointer;"><font style="font-weight: bold;">● 울산</font></a>
						</div>
						<div style="margin-bottom: 7px;">
							<a onclick="chooseArea('경기도')" style="cursor: pointer;"><font style="font-weight: bold;">● 경기도</font></a>
						</div>
						<div style="margin-bottom: 7px;">
							<a onclick="chooseArea('강원도')" style="cursor: pointer;"><font style="font-weight: bold;">● 강원도</font></a>
						</div>
						<div style="margin-bottom: 7px;">
							<a onclick="chooseArea('충남·충북')" style="cursor: pointer;"><font style="font-weight: bold;">● 충남·충북</font></a>
						</div>
						<div style="margin-bottom: 7px;">
							<a onclick="chooseArea('전남·전북')" style="cursor: pointer;"><font style="font-weight: bold;">● 전남·전북</font></a>
						</div>
						<div style="margin-bottom: 7px;">
							<a onclick="chooseArea('경남·경북')" style="cursor: pointer;"><font style="font-weight: bold;">● 경남·경북</font></a>
						</div>
						<div style="margin-bottom: 7px;">
							<a onclick="chooseArea('제주도')" style="cursor: pointer;"><font style="font-weight: bold;">● 제주도</font></a>
						</div>
					</div>
				</div>
				<div id="divAd1" style="width: 100%; height: 33%; display: flex; align-items: center; justify-content: center;">
					<div id='mobonDivBanner_392498'><iframe name='ifrad' id='mobonIframe_392498' src='//www.mediacategory.com/servlet/adBanner?from=http%3A//www.eoeca.com&s=392498&igb=61&iwh=250_250&cntad=1&cntsr=1' frameborder='0' scrolling='no' style='height:250px; width:250px;'></iframe></div>
				</div>
			</div>
			<!--------------------- 지역 목록 --------------------->
			
			<!--------------------- 본문 영역 --------------------->
			<div style="width: 760px; height: 100%; float: left; border-left: solid 1px #e1e3e9; border-right: solid 1px #e1e3e9;">
				<div style="width: 100%; height: 8%; padding: 10px; border-bottom: solid 1px #e1e3e9;">		
					<div style="width:80%; height:100%; float: left;">
						<div style="margin-bottom: 5px;">
							<font style="font-weight: bold;"><label id="labelHeadText">채팅방 목록</label></font>
						</div>
					</div>
					<div id="divButtonCreateRoom" style="width:20%; height:100%; padding: 5px; float: left; display: block;">
						<button type="button" onclick="viewCreateRoom()" class="btn btn-info" style="float:right;">채팅방 만들기</button>
					</div>
					<div id="divButtonMain" style="width:20%; height:100%; padding: 5px; float: left; display: none;">
						<button type="button" onclick="viewMain()" class="btn btn-info" style="float:right;">메인화면 이동</button>
					</div>
				</div>
				
				<!-- 채팅방 목록 -->
				<div id="divMain" style="width: 100%; height: 77%; padding: 10px; overflow: auto; word-break:break-all;  border-bottom: solid 1px #e1e3e9; display: block;">
					<div id="divMainInner">
						<table class="table">
							<thead>
								<tr>
									<th style="width: 13%; text-align: center;">지역</th>
									<th style="width: 41%; text-align: center;">방제목</th>
									<th style="width: 12%; text-align: center;">방정원수</th>
									<th style="width: 18%; text-align: center;">방장</th>
									<th style="width: 8%; text-align: center;">성별</th>
									<th style="width: 8%; text-align: center;">나이</th>
								</tr>
							</thead>
							<tbody>
							
								<tr onclick="window.location='/chat.do?bang_id=05b8e491-8352-43d3-b602-a03b93309f94'" style="cursor:pointer;" onMouseOver="this.style.backgroundColor='#FFFFEE'" onMouseOut="this.style.backgroundColor='#FFFFFF'">
									<td style="text-align: center;">[서울]</td>
									<td style="text-align: left; padding-left: 10px;">초보 오세요</td>
									<td style="text-align: center;">1명 / 2명</td>
									<td style="text-align: center;">동행</td>
									<td style="text-align: center;">남자</td>
									<td style="text-align: center;">33살</td>
								</tr>
							
								<tr onclick="window.location='/chat.do?bang_id=dc82857f-a057-4757-8427-7a588cfe81fa'" style="cursor:pointer;" onMouseOver="this.style.backgroundColor='#FFFFEE'" onMouseOut="this.style.backgroundColor='#FFFFFF'">
									<td style="text-align: center;">[서울]</td>
									<td style="text-align: left; padding-left: 10px;">450 정숙 유녀 오세요 </td>
									<td style="text-align: center;">1명 / 2명</td>
									<td style="text-align: center;">기다림</td>
									<td style="text-align: center;">남자</td>
									<td style="text-align: center;">32살</td>
								</tr>
							
								<tr onclick="window.location='/chat.do?bang_id=df26e6f7-f7aa-497a-b671-5c4b54fe5fdd'" style="cursor:pointer;" onMouseOver="this.style.backgroundColor='#FFFFEE'" onMouseOut="this.style.backgroundColor='#FFFFFF'">
									<td style="text-align: center;">[서울]</td>
									<td style="text-align: left; padding-left: 10px;">불끈~! 솟은 남자 ... 후끈 여자 오세요</td>
									<td style="text-align: center;">1명 / 2명</td>
									<td style="text-align: center;">불기둥</td>
									<td style="text-align: center;">남자</td>
									<td style="text-align: center;">52살</td>
								</tr>
							
								<tr onclick="window.location='/chat.do?bang_id=c11cc3bc-d700-463a-b32e-c0c64154bb9b'" style="cursor:pointer;" onMouseOver="this.style.backgroundColor='#FFFFEE'" onMouseOut="this.style.backgroundColor='#FFFFFF'">
									<td style="text-align: center;">[서울]</td>
									<td style="text-align: left; padding-left: 10px;">둘만의 솔직통화 일탈~ 여자분만</td>
									<td style="text-align: center;">1명 / 2명</td>
									<td style="text-align: center;">라인</td>
									<td style="text-align: center;">남자</td>
									<td style="text-align: center;">42살</td>
								</tr>
							
								<tr onclick="window.location='/chat.do?bang_id=8b1d4413-3ee2-4c57-8df3-b430d2eb3e67'" style="cursor:pointer;" onMouseOver="this.style.backgroundColor='#FFFFEE'" onMouseOut="this.style.backgroundColor='#FFFFFF'">
									<td style="text-align: center;">[경남·경북]</td>
									<td style="text-align: left; padding-left: 10px;">진하게...여선분만,,,오세여``</td>
									<td style="text-align: center;">1명 / 2명</td>
									<td style="text-align: center;">나그네</td>
									<td style="text-align: center;">남자</td>
									<td style="text-align: center;">49살</td>
								</tr>
							
								<tr onclick="window.location='/chat.do?bang_id=6425bb9f-9b65-4504-a684-0dce17a09e18'" style="cursor:pointer;" onMouseOver="this.style.backgroundColor='#FFFFEE'" onMouseOut="this.style.backgroundColor='#FFFFFF'">
									<td style="text-align: center;">[대구]</td>
									<td style="text-align: left; padding-left: 10px;">띵가띵가</td>
									<td style="text-align: center;">1명 / 3명</td>
									<td style="text-align: center;">미칭개이</td>
									<td style="text-align: center;">남자</td>
									<td style="text-align: center;">47살</td>
								</tr>
							
								<tr onclick="window.location='/chat.do?bang_id=9b56c10f-d25e-4156-8515-c202fc656f46'" style="cursor:pointer;" onMouseOver="this.style.backgroundColor='#FFFFEE'" onMouseOut="this.style.backgroundColor='#FFFFFF'">
									<td style="text-align: center;">[경기도]</td>
									<td style="text-align: left; padding-left: 10px;">4050유녀의 일탈과 경험담</td>
									<td style="text-align: center;">1명 / 2명</td>
									<td style="text-align: center;">이재이</td>
									<td style="text-align: center;">남자</td>
									<td style="text-align: center;">50살</td>
								</tr>
							
								<tr onclick="window.location='/chat.do?bang_id=94fade8b-54a0-4d0d-8d4d-d63e814d6266'" style="cursor:pointer;" onMouseOver="this.style.backgroundColor='#FFFFEE'" onMouseOut="this.style.backgroundColor='#FFFFFF'">
									<td style="text-align: center;">[대전·세종]</td>
									<td style="text-align: left; padding-left: 10px;">일상컨트롤 받으면서 채팅할 아줌마 고민말고 들어와요 ㅎ</td>
									<td style="text-align: center;">1명 / 2명</td>
									<td style="text-align: center;">MD</td>
									<td style="text-align: center;">남자</td>
									<td style="text-align: center;">35살</td>
								</tr>
							
								<tr onclick="window.location='/chat.do?bang_id=02162897-46ca-4cd5-ac89-99b2ddff828b'" style="cursor:pointer;" onMouseOver="this.style.backgroundColor='#FFFFEE'" onMouseOut="this.style.backgroundColor='#FFFFFF'">
									<td style="text-align: center;">[서울]</td>
									<td style="text-align: left; padding-left: 10px;">(•‾̑⌣‾̑•)ノ! 자유 대화방</td>
									<td style="text-align: center;">1명 / 10명</td>
									<td style="text-align: center;">심심이</td>
									<td style="text-align: center;">여자</td>
									<td style="text-align: center;">22살</td>
								</tr>
							
								<tr onclick="window.location='/chat.do?bang_id=2e3a090e-c38b-485a-8f3a-f2a54dfc5959'" style="cursor:pointer;" onMouseOver="this.style.backgroundColor='#FFFFEE'" onMouseOut="this.style.backgroundColor='#FFFFFF'">
									<td style="text-align: center;">[인천]</td>
									<td style="text-align: left; padding-left: 10px;">인천 주안만 들오세요 게임 좋아하시는분 여자분만</td>
									<td style="text-align: center;">1명 / 2명</td>
									<td style="text-align: center;">오후</td>
									<td style="text-align: center;">남자</td>
									<td style="text-align: center;">40살</td>
								</tr>
							
							</tbody>
						</table>
					</div>
				</div>
				<!-- 채팅방 목록 -->
				
				<!-- 채팅방 생성 -->
				<div id="divCreateRoom" style="width: 100%; height: 77%; padding: 10px; overflow: auto; word-break:break-all;  border-bottom: solid 1px #e1e3e9; display: none;">
					<div id="divCreateRoomInner">
						<form id="frmCreateRoom" action="proc_create_room.do" method="post">
						<div style="padding-top: 20px;">
							<div class="form-group">
								<label for="bang_title" class="col-sm-2 control-label">방제목</label>
								<div class="col-sm-10">
									<input type="text" id="bang_title" name="bang_title" size="60" maxlength="60" class="form-control" placeholder="불법적인 방제목(성매매, 음란물 유통, 명예훼손)은 강력 제재 합니다." onkeypress="if(event.keyCode==13){createRoom();}">
								</div>
								<div style="height: 25px;"></div>
							</div>
							<div class="form-group">
								<label for="bang_area" class="col-sm-2 control-label">지역</label>
								<div class="col-sm-10">
									<select id="bang_area" name="bang_area" class="form-control" style="width: 200px;">
										<option value="서울" >서울</option>
										<option value="인천" >인천</option>
										<option value="대전·세종" >대전·세종</option>
										<option value="대구" >대구</option>
										<option value="부산" >부산</option>
										<option value="광주" >광주</option>
										<option value="울산" >울산</option>
										<option value="경기도" >경기도</option>
										<option value="강원도" >강원도</option>
										<option value="충남·충북" >충남·충북</option>
										<option value="전남·전북" >전남·전북</option>
										<option value="경남·경북" >경남·경북</option>
										<option value="제주도" >제주도</option>
									</select>
								</div>
								<div style="height: 25px;"></div>
							</div>
							<div class="form-group">
								<label for="bang_max_member_cnt" class="col-sm-2 control-label">방인원수</label>
								<div class="col-sm-10">
									<input type="text" id="bang_max_member_cnt" name="bang_max_member_cnt" size="2" maxlength="2" class="form-control" placeholder="2 ~ 50 사이의 숫자를 입력하세요."  onkeypress="if(event.keyCode==13){createRoom();}">
								</div>
								<div style="height: 25px;"></div>
							</div>
						</div>
						<br>
						<div style="display: flex; align-items: center; justify-content: center;">
							<button type="button" onclick="createRoom();" class="btn btn-primary">채팅방 생성</button>
						</div>
						</form>
					</div>
				</div>
				<!-- 채팅방 생성 -->
				
				<div style="width: 100%; height: 15%; display: flex; padding-top: 5px; padding-left: 15px; padding-right: 15px;">
					<font style="font-size: 14px;">
					<b>* 공지사항</b><br>
					다른 사용자에게 시비, 욕설을 반복하는 사용자는 앞으로 영구IP차단 하니 매너채팅 부탁 드립니다.<br><br>
					<!--
					영구IP차단 : 14.46.197.XX<br>
					채팅내용 : "모해욤 볼품엄시 장박혀서"의 내용으로 오랜기간 반복해서 다른 사용자에게 시비<br>
					-->
					</font>
				</div>
			</div>
			<!--------------------- 본문 영역 --------------------->
			
			<!--------------------- 로그인 정보 --------------------->
			<div style="width: 250px; height: 100%; padding: 0px 10px 0px 10px; float: left; border-right: solid 1px #e1e3e9;">
				<div style="width: 100%; height: 20%;">
				<form id="frmLogin">
					<div style="width: 100%;">
						<div class="form-group">
							<label for="nickname" class="col-sm-2 control-label" style="width: 30%;">별명</label>
							<div class="col-sm-10" style="width: 70%;">
								<input type="text" id="nickname" name="nickname" size="10" maxlength="10" value="" class="form-control" placeholder="별명 입력"  style="cursor: default;">
							</div> 
						</div>
						<div class="form-group">
							<label for="sex" class="col-sm-2 control-label" style="width: 30%;">성별</label>
							<div class="col-sm-10" style="width: 70%;">
								<select id="sex" name="sex" class="form-control"  style="cursor: default;">
									<option value="남자" >남자</option>
									<option value="여자" >여자</option>
								</select>
							</div>
						</div>
						<div class="form-group">
							<label for="age" class="col-sm-2 control-label" style="width: 30%;">나이</label>
							<div class="col-sm-10" style="width: 70%;">
								<input type="text" id="age" name="age" size="5" maxlength="2" value="" class="form-control" placeholder="1~99의 숫자"  style="cursor: default;">
							</div>
						</div>
						<div class="form-group">
							<label for="area" class="col-sm-2 control-label" style="width: 30%;">지역</label>
							<div class="col-sm-10" style="width: 70%;">
								<select id="area" name="area" class="form-control"  style="cursor: default;">
									<option value="서울" >서울</option>
									<option value="인천" >인천</option>
									<option value="대전·세종" >대전·세종</option>
									<option value="대구" >대구</option>
									<option value="부산" >부산</option>
									<option value="광주" >광주</option>
									<option value="울산" >울산</option>
									<option value="경기도" >경기도</option>
									<option value="강원도" >강원도</option>
									<option value="충남·충북" >충남·충북</option>
									<option value="전남·전북" >전남·전북</option>
									<option value="경남·경북" >경남·경북</option>
									<option value="제주도" >제주도</option>
								</select>
							</div>
						</div>
					</div>
					<br>
					<div style="width: 100%; padding-top:5px; display: flex; align-items: center; justify-content: center;">
						<div id="divButtonLogin" style="display: block;">
							<button type="button" onclick="login();" class="btn btn-primary btn-sm" style="width:200px;">별명설정</button>
						</div>
						<div id="divButtonLogout" style="display: none;">
							<button type="button" onclick="logout();" class="btn btn-default btn-sm" style="width:200px;">로그아웃</button>
						</div>
					</div>
				</form>
				</div>
				<div id="divAd2" style="width: 100%; height: 80%; display: flex; align-items: center; justify-content: center;">
					<div id='mobonDivBanner_392503'><iframe name='ifrad' id='mobonIframe_392503' src='//www.mediacategory.com/servlet/adBanner?from=http%3A//www.eoeca.com&s=392503&igb=61&iwh=160_600&cntad=1&cntsr=1' frameborder='0' scrolling='no' style='height:600px; width:160px;'></iframe></div>
				</div>
			</div>
			<!--------------------- 로그인 정보 --------------------->
		</div>
	</div>
	<div style="width: 100%; height: 25px;">
		<div style="width: 1290px; height: 25px; margin-left: auto; margin-right: auto;">
			<div style="width: 100%; height: 100%; padding: 2px 0px 0px 5px;">
				<font style="font-size: 12px; font-family: 'Malgun Gothic', '맑은 고딕';"><a href="/youthpolicy.do" style="text-decoration: none; color: #777;">청소년보호정책</a> / <a href="/cs.do" style="text-decoration: none; color: #777;">고객문의</a></font>
			</div>
		</div>		
	</div>
</body>
</html>