



<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta name="robots" content="noindex,nofollow">
	<meta name="description" content="무료채팅 사이트">
	<meta property="og:type" content="website"> 
	<meta property="og:title" content="무료채팅">
	<meta property="og:description" content="무료채팅 사이트">
	<meta property="og:url" content="http://www.eoeca.com">
	<title>무료채팅 - 이오이카</title>
	<script src="/resources/js/common.js?v=1612702219596"></script>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/sockjs-client/1.4.0/sockjs.js"></script>
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
	
	<script>
		var UserAgent = navigator.userAgent;
		if(UserAgent.match(/iPhone|iPod|iPad|iPad2|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i) != null || UserAgent.match(/LG|SAMSUNG|Samsung/) != null) {
			location.replace('/m_chat.do');
		}
		
		// 안내문
		var flagNotice = true;
		var strNotice = '─────────────────────────<br>'
					+ ' [도움말 안내] <br>'
					+ ' 채팅창에 /도움말 이라고 입력해보세요. <br>'
					+ ' HTML 태그도 가능합니다. <br>'
					+ ' 즐거운 채팅 즐기시기 바랍니다! <br>'
					+ ' ───────────────────────── <br>';
		
		// 도움말
		var strHelp = '<font color="orange">&nbsp;&nbsp;<b>[도움말]</b></font><br>'
			+ '<font color="orange">* 강퇴&nbsp;&nbsp;&nbsp; : /강퇴 별명</font><br>'
			+ '<font color="orange">* 귓속말 : /귓속말 별명 채팅내용</font><br>'
			+ '<font color="orange">* 귓속말 반복 : ↑ (방향키)</font><br>'
			+ '<font color="orange">* 방청소 : /방청소</font><br>'
			+ '<font color="orange">* 도움말 : /도움말</font><br>'
			+ '<font color="royalblue">* 이미지 태그 : &lt;img src="URL"&gt;</font><br>'
			+ '<font color="royalblue">* 길호넷 : <a href="https://image.kilho.net">https://image.kilho.net</a></font><br>';
		
		// F5 새로고침 방지
		function noEvent() {
			if (event.keyCode == 116) {
				event.keyCode= 2;
				return false;
			}
			else if(event.ctrlKey && (event.keyCode==78 || event.keyCode == 82))
			{
				return false;
			}
		}
		document.onkeydown = noEvent;
		
		// 새 메세지 알림
		var flagAlram = true;
		var titleOrigin = document.title;
		var timeoutId;
		
		// 창 활성화, 비활성화 여부
		var flagFocused = true;
		window.onfocus = function() {
			flagFocused = true;
			if(typeof timeoutId != 'undefined' && timeoutId != null && timeoutId != '') {
				clearInterval(timeoutId);
				timeoutId = '';
				document.title = titleOrigin;
			}
		};
		window.onblur = function() {
			flagFocused = false;
		};
		
		// 귓속말 반복
		var prevWhisper = '';
		
		// 태그 사용 여부
		var flagTag = true;
	</script>
	
	<script>
		var webSocket = {
			flagMember: true,
			sessionId: '',
			init: function(oParam) {
				this._url = oParam.url || '';
				this._initSocket();
			},
			sendChat: function() {
				if($('#message').val().trim() == '') {
					$('#message').val('');
					return;
				}
				if((tag = xss_check($('#message').val().trim())) != null) {
					alert('허용된 HTML 태그만 사용 가능 합니다.\n' + '금지태그 : [' + tag + ']');
					$('#message').val('');
					return;
				}
				
				// 명령 메세지
				if($('#message').val().trim().charAt(0) == '/') {
					// 도움말
					if($('#message').val().trim().length >= 4 && $('#message').val().trim().substring(1) == '도움말') {
						$('#divChatData').append('<div style="margin-bottom: 10px;"><font color="orange">' + strHelp + '</font></div>');
						$("#divChat").scrollTop($("#divChat")[0].scrollHeight);
						$('#message').val('');
						$('#message').focus();
						return;
					}
					// 강퇴
					if($('#message').val().trim().length >= 3 && $('#message').val().trim().substring(1, 3) == '강퇴') {
						// 방장인지 체크
						if('' != '' && 'E8976A11159760F5936F5E891F3BD513' == '') {
							var token = $('#message').val().trim().split(" ");
							if(token.length == 2 && token[1]) {
								this.sendCmd('6', '강퇴', '생물계절관측', token[1]);
								$('#message').val('');
								$('#message').focus();
								return;	
							}
						}
					}
					// 귓속말
					if($('#message').val().trim().length >= 4 && $('#message').val().trim().substring(1, 4) == '귓속말') {
						var token = $('#message').val().trim().split(" ");
						if(token.length >= 3 && token[1]) {
							prevWhisper = $('#message').val().trim().substring(0, 5+token[1].length) + ' ';
							this.sendCmd('7', $('#message').val().trim().substring(5+token[1].length), '생물계절관측', token[1]);
							$('#message').val('');
							$('#message').focus();
							return;
						}
					}
					// 방청소
					if($('#message').val().trim().length >= 4 && $('#message').val().trim().substring(1) == '방청소') {
						$('#divChatData').empty();
						$('#divChatData').append('<div style="margin-bottom: 3px;"><font color="orange">' + '방청소가 되었습니다.' + '</font></div>');
						$('#message').val('');
						$('#message').focus();
						return;
					}
				}
				// 일반 메세지
				this._sendMessage('5702a33d-c50b-4961-8381-01f67b26564f', '1', $('#message').val(), '생물계절관측', '');
				$('#message').val('');
				$('#message').focus();
			},
			sendCmd: function(cmd, msg, sender, receiver) {
				this._sendMessage('5702a33d-c50b-4961-8381-01f67b26564f', cmd, msg, sender, receiver);
			},
			receiveMessage: function(msgData) {
				if(flagTag == false) {
					msgData.msg = removeTag(msgData.msg);
				}
				// 메세지
				if(msgData.cmd == '1') {
					if(xss_check($('#message').val().trim()) != null) {
						return;
					}
					$('#divChatData').append('<div style="margin-bottom: 3px;"><font color="black">' + '<b>' + msgData.sender + '</b> : ' + msgData.msg + '</font></div>');
				}
				// 본인 메세지 
				else if(msgData.cmd == '0') {
					if(xss_check(msgData.msg.trim()) != null) {
						msgData.msg = '금지된 태그를 사용 하였습니다.';
					}
					$('#divChatData').append('<div style="margin-bottom: 3px;"><font color="blue">' + '<b>' + msgData.sender + '</b> : ' + msgData.msg + '</font></div>');
				}
				// 입장
				else if(msgData.cmd == '2') {
					// 안내문
					if(flagNotice == true) {
						$('#divChatData').append('<div style="margin-bottom: 3px;"><font color="red">' + strNotice + '</font></div>');
						flagNotice = false;
					}
					$('#divChatData').append('<div style="margin-bottom: 3px;"><font color="green">' + msgData.msg + '</font></div>');
					// 방멤버 정보 요청			
					if(this.flagMember == true) {
						this.flagMember = false;
						setTimeout(function() {
							webSocket.sendCmd('4', '방멤버 요청', '생물계절관측', '');
							webSocket.flagMember = true;
						}, 500);
					}
				}
				// 퇴장
				else if(msgData.cmd == '3') {
					$('#divChatData').append('<div style="margin-bottom: 3px;"><font color="red">' + msgData.msg + '</font></div>');
					// 방멤버 정보 요청
					if(this.flagMember == true) {
						this.flagMember = false;
						setTimeout(function() {
							webSocket.sendCmd('4', '방멤버 요청', '생물계절관측', '');
							webSocket.flagMember = true;
						}, 500);
					}
				}
				// 에러
				else if(msgData.cmd == '5') {
					$('#divChatData').append('<div style="margin-bottom: 3px;"><font color="red">' + msgData.msg + '</font></div>');
				}
				// 방멤버 정보
				else if(msgData.cmd == '4') {
					$('#divMember').empty();
					var arrayMember = msgData.msg.split(',');
					$('#labelNowMemberCnt').text(arrayMember.length);
					for(var i in arrayMember) {
						// [jsession_id, session_id, nickname]
						var member = arrayMember[i].split('/')
						$('#divMember').append('<div style="margin-bottom: 7px;">');
						if('E8976A11159760F5936F5E891F3BD513' != '' && 'E8976A11159760F5936F5E891F3BD513' == member[0]) {
							$('#divMember').append('@');
						}
						$('#divMember').append(member[2]);
						if(this.sessionId == member[1]) {
							$('#divMember').append(' [나]');
						}
						$('#divMember').append('</div>');
					}
				}
				// 강퇴
				else if(msgData.cmd == '6') {
					if(xss_check($('#message').val().trim()) != null) {
						return;
					}
					$('#divChatData').append('<div style="margin-bottom: 3px;"><font color="orange">' + msgData.msg + '</font></div>');
				}
				// 귓속말
				else if(msgData.cmd == '7') {
					if(xss_check($('#message').val().trim()) != null) {
						return;
					}
					$('#divChatData').append('<div style="margin-bottom: 3px;"><font color="plum">' + '<b>' + msgData.sender + ' : ' + msgData.msg + '</b>' + '</font></div>');
				}
				
				if(typeof msgData.cmd != 'undefined' && msgData.cmd != null) {	
					// 오래된 채팅 삭제
					if($('#divChatData div').children().length > 200) {
						$('#divChatData div:first-child').remove();
					}
					// 창 활성화 되어 있을 때만 입력창에 포커스
					if(flagFocused == true) {
						$('#message').focus();
					}
					// 창 비활성화 상태에서는 알림
					else {
						if(flagAlram == true) {
							$('#audio_alram').trigger("play");
						}
						if(typeof timeoutId == 'undefined' || timeoutId == null || timeoutId == '') {
							timeoutId = setInterval( function() { document.title = document.title == '★ 새로운 메세지 ★' ? titleOrigin : '★ 새로운 메세지 ★'; }, 700);
						}
					}
					// 스크롤바 이동
					setTimeout(function() {
						$('#divChat').scrollTop($('#divChat')[0].scrollHeight);
					}, 10);
				}
			},
			closeMessage: function() {
				$('#divChatData').append('<div><font color="red">연결이 종료 되었습니다.</font></div>');
			},
			disconnect: function() {
				this._socket.close();
			},
			_initSocket: function() {
				this._socket = new SockJS(this._url);
				this._socket.onopen = function(evt) {
					webSocket.sendCmd('2', '입장', '생물계절관측', '');
					// url 형식 --> ws://localhost/chat/636/wt1naem2/websocket
					webSocket.sessionId = webSocket._socket._transport.url.split('/')[5];
				};
				this._socket.onmessage = function(evt) {
					webSocket.receiveMessage(JSON.parse(evt.data));
				};
				this._socket.onclose = function(evt) {
					webSocket.closeMessage();
				};
			},
			_sendMessage: function(bang_id, cmd, msg, sender, receiver) {
				var msgData = {
						bang_id : bang_id,
						session_id : this.sessionId,
						jsession_id : '',
						cmd : cmd,
						msg : msg,
						sender : sender,
						receiver : receiver
				};
				var jsonData = JSON.stringify(msgData);
				this._socket.send(jsonData);
			}
		};
		
		// 채팅방 나가기
		function exitRoom() {
			webSocket.disconnect();
			// 스크롤바 이동
			setTimeout(function() {
				$('#divChat').scrollTop($('#divChat')[0].scrollHeight);
			}, 50);
			// 페이지 이동
			setTimeout(function() {
				location.replace('/main.do');
			}, 300);
		}
		
		// 귓속말 반복
		function setPrevWhisper() {
			if(prevWhisper != null && prevWhisper != '') {
				$('#message').val(prevWhisper);
				setCaretAtEnd($('#message'));
			}
		}
	</script>

	<script>
		$(document).ready(function() {
			webSocket.init({ url: '/chat' });
			$('#message').focus();
		});
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
	
	<style type="text/css">
		#slide_warp { margin:0px; }
		#slide_mask { float:left; overflow:hidden; width:670px; height:120px; margin:0px;  }

		#slide_content { width:2010px;} /* 배너 1개 가로 크기 * 총 개수 */
		#slide_content dd { width:670px; height:120px; margin:0px; float:left; }
		#slide_content dl { margin:0px; }
		#slide_content div { width:100%; height:100%; padding: 5px 0px 5px 0px; overflow:hidden; }

		#slide_prevbtn { float:left; cursor:pointer; position:relative; top:45px; padding-right:15px; }
		#slide_nextbtn { float:left; cursor:pointer; position:relative; top:45px; padding-left:15px; }
	</style>

	<script>
		var divWidth = "670";	//배너 1개 가로크기

		// 이전 슬라이드
		function slide_prev() {
			$("#slide_content").stop(true,true);

			var moveX = parseInt($("#slide_content").css("margin-left"));

			if( moveX < 0 ) {
				$("#slide_content").animate({"margin-left":"+=" + divWidth + "px"},500);
				$('#slide_nextbtn').css('cursor', 'pointer');
			}
			else {
				$('#slide_prevbtn').css('cursor', 'default');
			}
		}

		// 다음 슬라이드
		function slide_next() {
			$("#slide_content").stop(true,true);

			var hiddenWidth		= ($("#slide_content dd").length-1)*(-divWidth);
			var moveX			= parseInt($("#slide_content").css("margin-left")) ;
			var lastWidth		= ( moveX - divWidth );

			if( hiddenWidth < moveX ) {
				$("#slide_content").animate({"margin-left":"-=" + divWidth + "px"},500);
				$('#slide_prevbtn').css('cursor', 'pointer');
			}
			else {
				$('#slide_nextbtn').css('cursor', 'default');
			}
		}
	</script>
	
	<script>
		// 하단 기능 버튼
		$(document).ready(function() {
			// 알림음 켜기
			$('#btn_alram_on').click(function(){
		    	flagAlram = true;
		        if( $(this).hasClass('btn-default') ) $(this).removeClass('btn-default');
		        if( !$(this).hasClass('btn-primary') ) $(this).addClass('btn-primary');
		        if( $('#btn_alram_off').hasClass('btn-primary') ) $('#btn_alram_off').removeClass('btn-primary');
		        if( !$('#btn_alram_off').hasClass('btn-default') ) $('#btn_alram_off').addClass('btn-default');
		    });
			// 알림음 끄기
		    $('#btn_alram_off').click(function(){
		    	flagAlram = false;
		        if( $(this).hasClass('btn-default') ) $(this).removeClass('btn-default');
		        if( !$(this).hasClass('btn-primary') ) $(this).addClass('btn-primary');
		        if( $('#btn_alram_on').hasClass('btn-primary') ) $('#btn_alram_on').removeClass('btn-primary');
		        if( !$('#btn_alram_on').hasClass('btn-default') ) $('#btn_alram_on').addClass('btn-default');
		    });
		 	// 태그 켜기
			$('#btn_tag_on').click(function(){
		    	flagTag = true;
		        if( $(this).hasClass('btn-default') ) $(this).removeClass('btn-default');
		        if( !$(this).hasClass('btn-primary') ) $(this).addClass('btn-primary');
		        if( $('#btn_tag_off').hasClass('btn-primary') ) $('#btn_tag_off').removeClass('btn-primary');
		        if( !$('#btn_tag_off').hasClass('btn-default') ) $('#btn_tag_off').addClass('btn-default');
		    });
			// 태그 끄기
		    $('#btn_tag_off').click(function(){
		    	flagTag = false;
		        if( $(this).hasClass('btn-default') ) $(this).removeClass('btn-default');
		        if( !$(this).hasClass('btn-primary') ) $(this).addClass('btn-primary');
		        if( $('#btn_tag_on').hasClass('btn-primary') ) $('#btn_tag_on').removeClass('btn-primary');
		        if( !$('#btn_tag_on').hasClass('btn-default') ) $('#btn_tag_on').addClass('btn-default');
		    });
			
		 	// 이모티콘 전송
			$('#img_emoji_1').click(function(){
				webSocket.sendCmd('1', '<img src="/resources/emoji/gif_200px/emoji_1.gif">', '생물계절관측', '');
			});
			$('#img_emoji_4').click(function(){
				webSocket.sendCmd('1', '<img src="/resources/emoji/gif_200px/emoji_4.gif">', '생물계절관측', '');
			});
			$('#img_emoji_5').click(function(){
				webSocket.sendCmd('1', '<img src="/resources/emoji/gif_200px/emoji_5.gif">', '생물계절관측', '');
			});
			$('#img_emoji_8').click(function(){
				webSocket.sendCmd('1', '<img src="/resources/emoji/gif_200px/emoji_8.gif">', '생물계절관측', '');
			});
			$('#img_emoji_11').click(function(){
				webSocket.sendCmd('1', '<img src="/resources/emoji/gif_200px/emoji_11.gif">', '생물계절관측', '');
			});
			$('#img_emoji_12').click(function(){
				webSocket.sendCmd('1', '<img src="/resources/emoji/gif_200px/emoji_12.gif">', '생물계절관측', '');
			});
			$('#img_emoji_14').click(function(){
				webSocket.sendCmd('1', '<img src="/resources/emoji/gif_200px/emoji_14.gif">', '생물계절관측', '');
			});
			$('#img_emoji_16').click(function(){
				webSocket.sendCmd('1', '<img src="/resources/emoji/gif_200px/emoji_16.gif">', '생물계절관측', '');
			});
			$('#img_emoji_18').click(function(){
				webSocket.sendCmd('1', '<img src="/resources/emoji/gif_200px/emoji_18.gif">', '생물계절관측', '');
			});
			$('#img_emoji_20').click(function(){
				webSocket.sendCmd('1', '<img src="/resources/emoji/gif_200px/emoji_20.gif">', '생물계절관측', '');
			});
			$('#img_emoji_21').click(function(){
				webSocket.sendCmd('1', '<img src="/resources/emoji/gif_200px/emoji_21.gif">', '생물계절관측', '');
			});
			$('#img_emoji_22').click(function(){
				webSocket.sendCmd('1', '<img src="/resources/emoji/gif_200px/emoji_22.gif">', '생물계절관측', '');
			});
			$('#img_emoji_23').click(function(){
				webSocket.sendCmd('1', '<img src="/resources/emoji/gif_200px/emoji_23.gif">', '생물계절관측', '');
			});
			$('#img_emoji_24').click(function(){
				webSocket.sendCmd('1', '<img src="/resources/emoji/gif_200px/emoji_24.gif">', '생물계절관측', '');
			});
			$('#img_emoji_27').click(function(){
				webSocket.sendCmd('1', '<img src="/resources/emoji/gif_200px/emoji_27.gif">', '생물계절관측', '');
			});
			$('#img_emoji_28').click(function(){
				webSocket.sendCmd('1', '<img src="/resources/emoji/gif_200px/emoji_28.gif">', '생물계절관측', '');
			});
				
			// 소리 전송
			$('#btn_sound_gukmin').click(function(){
				webSocket.sendCmd('1', '<audio controls autoplay><source src="/resources/mp3/국민체조.mp3" type="audio/mpeg"></audio>', '생물계절관측', '');
			});
			$('#btn_sound_gisang').click(function(){
				webSocket.sendCmd('1', '<audio controls autoplay><source src="/resources/mp3/기상나팔.mp3" type="audio/mpeg"></audio>', '생물계절관측', '');
			});
			$('#btn_sound_gaesaeggi').click(function(){
				webSocket.sendCmd('1', '<audio controls autoplay><source src="/resources/mp3/개새끼야.mp3" type="audio/mpeg"></audio>', '생물계절관측', '');
			});
			$('#btn_sound_baunce').click(function(){
				webSocket.sendCmd('1', '<audio controls autoplay><source src="/resources/mp3/바운스.mp3" type="audio/mpeg"></audio>', '생물계절관측', '');
			});
			$('#btn_sound_sparta').click(function(){
				webSocket.sendCmd('1', '<audio controls autoplay><source src="/resources/mp3/스파르타.mp3" type="audio/mpeg"></audio>', '생물계절관측', '');
			});
			$('#btn_sound_eriupsum').click(function(){
				webSocket.sendCmd('1', '<audio controls autoplay><source src="/resources/mp3/어이없음.mp3" type="audio/mpeg"></audio>', '생물계절관측', '');
			});
			$('#btn_sound_laugh').click(function(){
				webSocket.sendCmd('1', '<audio controls autoplay><source src="/resources/mp3/웃음.mp3" type="audio/mpeg"></audio>', '생물계절관측', '');
			});
			$('#btn_sound_jayonin').click(function(){
				webSocket.sendCmd('1', '<audio controls autoplay><source src="/resources/mp3/나는자연인이다.mp3" type="audio/mpeg"></audio>', '생물계절관측', '');
			});
			$('#btn_sound_ggoruruk').click(function(){
				webSocket.sendCmd('1', '<audio controls autoplay><source src="/resources/mp3/꼬르륵.mp3" type="audio/mpeg"></audio>', '생물계절관측', '');
			});
			$('#btn_sound_whatthefuck').click(function(){
				webSocket.sendCmd('1', '<audio controls autoplay><source src="/resources/mp3/왓더퍽.mp3" type="audio/mpeg"></audio>', '생물계절관측', '');
			});
			$('#btn_sound_yeaeae').click(function(){
				webSocket.sendCmd('1', '<audio controls autoplay><source src="/resources/mp3/예에에.mp3" type="audio/mpeg"></audio>', '생물계절관측', '');
			});
			$('#btn_sound_punch').click(function(){
				webSocket.sendCmd('1', '<audio controls autoplay><source src="/resources/mp3/펀치.mp3" type="audio/mpeg"></audio>', '생물계절관측', '');
			});
			$('#btn_sound_igunnermu').click(function(){
				webSocket.sendCmd('1', '<audio controls autoplay><source src="/resources/mp3/이건너무한거.mp3" type="audio/mpeg"></audio>', '생물계절관측', '');
			});
			$('#btn_sound_siren').click(function(){
				webSocket.sendCmd('1', '<audio controls autoplay><source src="/resources/mp3/싸이렌.mp3" type="audio/mpeg"></audio>', '생물계절관측', '');
			});
			$('#btn_sound_gabbunssa').click(function(){
				webSocket.sendCmd('1', '<audio controls autoplay><source src="/resources/mp3/갑분싸.mp3" type="audio/mpeg"></audio>', '생물계절관측', '');
			});
			$('#btn_sound_dduhuk').click(function(){
				webSocket.sendCmd('1', '<audio controls autoplay><source src="/resources/mp3/뜨헉.mp3" type="audio/mpeg"></audio>', '생물계절관측', '');
			});
		});
	</script>
</head>

<body>
	<div style="width: 100%; height: 63px; border-bottom: solid 1px #e1e3e9;">
		<div style="width: 1290px; height: 62px; margin-left: auto; margin-right: auto;">
			<div style="width: 100%; height: 100%; padding: 10px 0px 0px 5px;">
				<a onclick="exitRoom()" style="cursor: pointer;">
					<font style="font-size: 17px;">무료채팅 이오이카</font><br>
					<font style="font-size: 17px;">www.eoeca.com</font>
				</a>
			</div>
		</div>		
	</div>
	<div style="width: 100%; height: 801px; border-bottom: solid 1px #e1e3e9; background-image: url(/resources/img/background.png);" >
		<div style="width: 1290px; height: 800px; margin-left: auto; margin-right: auto; background-color: #FFFFFF;">
		
			<!--------------------- 방 인원 --------------------->
			<div style="width: 280px; height: 100%; float: left; border-left: solid 1px #e1e3e9;">
				<div style="width: 100%; height: 67%; padding: 10px; overflow-y: scroll; word-break:break-all;">
					<div>
						<div style="margin-bottom: 5px;">
							<font style="font-weight: bold;">방인원 (<label id="labelNowMemberCnt">0</label>명 / 2명) </font>
						</div>
						<div id="divMember"></div>
					</div>
				</div>
				<div id="divAd1" style="width: 100%; height: 33%; display: flex; align-items: center; justify-content: center;">
					<div id='mobonDivBanner_392498'><iframe name='ifrad' id='mobonIframe_392498' src='//www.mediacategory.com/servlet/adBanner?from=http%3A//www.eoeca.com/main.do&s=392498&igb=61&iwh=250_250&cntad=1&cntsr=1' frameborder='0' scrolling='no' style='height:250px; width:250px;'></iframe></div>
				</div>
			</div>
			<!--------------------- 방 인원 --------------------->
			
			<!--------------------- 채팅 영역 --------------------->
			<div style="width: 760px; height: 100%; float: left; border-left: solid 1px #e1e3e9; border-right: solid 1px #e1e3e9;">
				<div style="width: 100%; height: 8%; padding: 10px; border-bottom: solid 1px #e1e3e9;">
					<div style="width:80%; height:100%; float: left;">
						<div style="margin-bottom: 5px;">
							<font style="font-weight: bold;">
							
							
							
							둘만의 솔직통화 일탈~ 여자분만
							
							
							</font>
						</div>
						<div>
							<font style="font-weight: bold;">방장 : 라인 / 42살 / 남자</font><br>
						</div>
					</div>
					<div id="divButtonCreateRoom" style="width:20%; height:100%; padding: 5px; float: left;">
						<button type="button" onclick="exitRoom()" class="btn btn-info" style="float:right;">나가기</button>
					</div>
				</div>
				<div id="divChat" style="width: 100%; height: 71%; padding: 10px; overflow-y: scroll; word-break:break-all;  border-bottom: solid 1px #e1e3e9;">
					<div id="divChatData"></div>
				</div>
				<div style="width: 100%; height: 6%; padding: 10px; border-bottom: solid 1px #e1e3e9;">
					<div style="width: 87%; height: 100%; float: left;">
						<input type="text" id="message" maxlength="1500" onkeypress="if(event.keyCode==13){webSocket.sendChat();}" onkeydown="if(event.keyCode==38){setPrevWhisper();}" onfocus="this.value = this.value;" style="width: 100%; height: 30px; ime-mode:active;" />
					</div>
					<div style="width: 13%; height: 100%; float: left;">
	    				<button type="button" id="btnSend" onclick="webSocket.sendChat()" class="btn btn-sm btn-primary" style="width: 100%;">채팅 전송</button>
	    			</div>
				</div>
				<div style="width: 100%; height: 15%; display: flex; align-items: center; justify-content: center;">
					<div id="slide_warp">
						<div id="slide_prevbtn" onclick="slide_prev()"><img src="/resources/img/prev_img.gif"></div>
						<div id="slide_mask">
							<div id="slide_content">
								<dl>
									<dd>
										<div>
											<div class="btn-group" role="group" style="width: 100%; height: 50%;">
												<label style="margin: 0px 0px 3px 0px; font-size: 13px;">채팅 메세지 알림음을 키고 끌 수 있습니다.</label>
												<br>
												<button type="button" id="btn_alram_on" class="btn btn-primary btn-xs">알림 켜기</button>
												<button type="button" id="btn_alram_off" class="btn btn-default btn-xs">알림 끄기</button>
											</div>
											<div class="btn-group" role="group" style="width: 100%; height: 50%;">
												<label style="margin: 0px 0px 3px 0px; font-size: 13px;">태그(소리, 이모티콘) 사용을 키고 끌 수 있습니다.</label>
												<br>
												<button type="button" id="btn_tag_on" class="btn btn-primary btn-xs">태그 켜기</button>
												<button type="button" id="btn_tag_off" class="btn btn-default btn-xs">태그 끄기</button>
											</div>
										</div>
									</dd>
									<dd>
										<div>
											<label style="margin: 0px 0px 3px 0px; font-size: 13px;">[이모티콘 전송]</label>
											<br>
											<img src="/resources/emoji/jpg_44px/emoji_1.jpg" id="img_emoji_1" style="padding-right: 8px; cursor: pointer;">
											<img src="/resources/emoji/jpg_44px/emoji_4.jpg" id="img_emoji_4" style="padding-right: 8px; cursor: pointer;">
											<img src="/resources/emoji/jpg_44px/emoji_5.jpg" id="img_emoji_5" style="padding-right: 8px; cursor: pointer;">
											<img src="/resources/emoji/jpg_44px/emoji_8.jpg" id="img_emoji_8" style="padding-right: 8px; cursor: pointer;">
											<img src="/resources/emoji/jpg_44px/emoji_11.jpg" id="img_emoji_11" style="padding-right: 8px; cursor: pointer;">
											<img src="/resources/emoji/jpg_44px/emoji_12.jpg" id="img_emoji_12" style="padding-right: 8px; cursor: pointer;">
											<img src="/resources/emoji/jpg_44px/emoji_14.jpg" id="img_emoji_14" style="padding-right: 8px; cursor: pointer;">
											<img src="/resources/emoji/jpg_44px/emoji_16.jpg" id="img_emoji_16" style="padding-right: 8px; cursor: pointer;">
											<br>
											<img src="/resources/emoji/jpg_44px/emoji_18.jpg" id="img_emoji_18" style="padding-right: 8px; cursor: pointer;">
											<img src="/resources/emoji/jpg_44px/emoji_20.jpg" id="img_emoji_20" style="padding-right: 8px; cursor: pointer;">
											<img src="/resources/emoji/jpg_44px/emoji_21.jpg" id="img_emoji_21" style="padding-right: 8px; cursor: pointer;">
											<img src="/resources/emoji/jpg_44px/emoji_22.jpg" id="img_emoji_22" style="padding-right: 8px; cursor: pointer;">
											<img src="/resources/emoji/jpg_44px/emoji_23.jpg" id="img_emoji_23" style="padding-right: 8px; cursor: pointer;">
											<img src="/resources/emoji/jpg_44px/emoji_24.jpg" id="img_emoji_24" style="padding-right: 8px; cursor: pointer;">
											<img src="/resources/emoji/jpg_44px/emoji_27.jpg" id="img_emoji_27" style="padding-right: 8px; cursor: pointer;">
											<img src="/resources/emoji/jpg_44px/emoji_28.jpg" id="img_emoji_28" style="padding-right: 8px; cursor: pointer;">
										</div>
									</dd>
									<dd>
										<div>
											<label style="margin: 0px 0px 3px 0px; font-size: 13px;">[소리 전송]</label>
											<br>
											<button type="button" id="btn_sound_gukmin" class="btn btn-default btn-sm">국민체조</button>
											<button type="button" id="btn_sound_gisang" class="btn btn-default btn-sm">기상나팔</button>
											<br>
											<button type="button" id="btn_sound_gaesaeggi" class="btn btn-default btn-sm">개새끼야</button>
											<button type="button" id="btn_sound_baunce" class="btn btn-default btn-sm">바운스</button>
											<button type="button" id="btn_sound_sparta" class="btn btn-default btn-sm">스파르타</button>
											<button type="button" id="btn_sound_eriupsum" class="btn btn-default btn-sm">어이없음</button>
											<button type="button" id="btn_sound_laugh" class="btn btn-default btn-sm">웃음</button>
											<button type="button" id="btn_sound_jayonin" class="btn btn-default btn-sm">나는자연인이다</button>
											<button type="button" id="btn_sound_ggoruruk" class="btn btn-default btn-sm">꼬르륵</button>
											<br>
											<button type="button" id="btn_sound_whatthefuck" class="btn btn-default btn-sm">왓더퍽</button>
											<button type="button" id="btn_sound_yeaeae" class="btn btn-default btn-sm">예에에</button>
											<button type="button" id="btn_sound_punch" class="btn btn-default btn-sm">펀치</button>
											<button type="button" id="btn_sound_igunnermu" class="btn btn-default btn-sm">이건너무한거아니냐고</button>
											<button type="button" id="btn_sound_siren" class="btn btn-default btn-sm">싸이렌</button>
											<button type="button" id="btn_sound_gabbunssa" class="btn btn-default btn-sm">갑분싸</button>
											<button type="button" id="btn_sound_dduhuk" class="btn btn-default btn-sm">뜨헉</button>
										</div>
									</dd>
								</dl>
							</div>
						</div>
						<div id="slide_nextbtn" onclick="slide_next()"><img src="/resources/img/next_img.gif"></div>
					</div>
				</div>
			</div>
			<!--------------------- 채팅 영역 --------------------->
			
			<!--------------------- 로그인 정보 --------------------->
			<div style="brown; width: 250px; height: 100%; float: left; border-right: solid 1px #e1e3e9;">
				<div style="width: 100%; height: 23%; padding: 10px;">
					<div style="margin-bottom: 5px;">
						<font style="font-weight: bold;">로그인 정보</font>
					</div>
					<div>
						
							
							
								익명 입니다.
							
						
					</div>
				</div>
				<div id="divAd2" style="width: 100%; height: 77%; display: flex; align-items: center; justify-content: center;">
					<div id='mobonDivBanner_392503'><iframe name='ifrad' id='mobonIframe_392503' src='//www.mediacategory.com/servlet/adBanner?from=http%3A//www.eoeca.com/main.do&s=392503&igb=61&iwh=160_600&cntad=1&cntsr=1' frameborder='0' scrolling='no' style='height:600px; width:160px;'></iframe></div>					
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
	<div style="display: none;">
		<audio id="audio_alram"><source src="/resources/mp3/alram.mp3" type="audio/mpeg"></audio>
	</div>
</body>
</html>
