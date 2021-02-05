var slideIndex = 0; // slide index

// HTML 로드가 끝난 후 동작
window.onload=function(){
  showSlides(slideIndex);
  
//Auto Move Slide
/*var sec = 3000;
  setInterval(function(){
    slideIndex++;
    showSlides(slideIndex);

  }, sec);*/
}


// Next/previous controls
function moveSlides(n) {
  slideIndex = slideIndex + n
  showSlides(slideIndex);
}

// Thumbnail image controls
function currentSlide(n) {
  slideIndex = n;
  showSlides(slideIndex);
}

function showSlides(n) {

  var slides = document.getElementsByClassName("swiper-slide");
  var dots = document.getElementsByClassName("dot");
  var size = slides.length;

  if ((n+1) > size) {
    slideIndex = 0; n = 0;
  }else if (n < 0) {
    slideIndex = (size-1);
    n = (size-1);
  }

  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }

  slides[n].style.display = "block";
  dots[n].className += " active";
}

$(function() {
	initPdMenu();
	initPicture();
	initCategoryBox();
	initFavorite();
	initBtn();
	initCommentEvent();
	initShareBtn();
});

function initPicture() {
	var mySwiper = new Swiper ('.detail-info__image__list', { // Optional
																// parameters
		 // If we need pagination
		loop : true,
		effect : 'fade', // 페이드 효과 사용
		pagination: { el: '.swiper-pagination', clickable : true}, // Navigation
																	// arrows
		navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev', }, // And
																						// if
																						// we
																						// need
																						// scrollbar
	});
	
	const $enlgBtn = $('.detail-info__image--enlg');
	const $enlgArea = $('.enlarge-modal__area');
	const $enlgClose = $('.enlarge-modal__close-btn');
	
	$enlgBtn.click(function() {$enlgArea.css('display', 'flex')});
	$enlgClose.click(function() {$enlgArea.hide()});
	
	var modalSwiper = new Swiper('.enlarge-modal__div2', {
		pagination: { el: '.swiper-pagination', clickable : true}, // Navigation
																	// arrows
		navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev', hideOnClick: true}, // And
																										// if
																										// we
																										// need
																										// scrollbar
		slidesPerView: 1,
		width: 550,
	});
	
	
}

function initCategoryBox() {
	$('.detail-menu-cbox__area').mouseenter(showCbox);
	$('.detail-menu-cbox__area').mouseleave(hideCbox);

	function showCbox() {
		$(this).find('.detail-menu-cbox__list').show();
	}

	function hideCbox() {
		$(this).find('.detail-menu-cbox__list').hide();
	}
}

function initBtn() {
	// 연락하기 모달
	const callModal = document.getElementById('callModal');
	const callOpenBtn = document.getElementById('callBtn');
	let callOpen2Btn;
	let callCloseBtn;
	let callModalObj;
	
	if(callOpenBtn) {
		callOpen2Btn = document.getElementById('bottomCallBtn');
		callCloseBtn = document.querySelector('.call-modal__close');
		callModalObj = { open: [callOpenBtn, callOpen2Btn], modal: callModal, close: callCloseBtn};
		modalSetting(callModalObj);
	}
	const url = window.location.href;
	const userNo = url.slice(url.lastIndexOf('/')+1, url.lastIndexOf('.'));
	
	// user값
	const callModalLink = document.querySelector('.call-modal__link');
	if(callModalLink) callModalLink.addEventListener('click', openTalk);
	
	function openTalk() {
		callCloseBtn.dispatchEvent(new Event('click'));
		function getLoginStatus() {
			return new Promise(function(resolve, reject) {
				$.ajax({
					url: contextPath + 'sign/login/check.do',
					method: 'get',
					success: resolve,
					error: reject
				});
			});
		}
		
		getLoginStatus().then(function(data) {
			if(data.loginStatus == 'true') {
				link = callModalLink.dataset.href;
				const center = ',top='+(window.screen.height/2 - 350)+ ',left=' + (window.screen.width/2 - 250); 
				const newWindow = window.open(link, userNo, 'width=500px, height=667px'+center);
			} else {
				const loginBtn = document.getElementById('loginBtn');
				if(loginBtn) loginBtn.dispatchEvent(new Event('click'));
			}
		});
		
	}
	
	
	$('#bottomCallBtn').click(function() {
		$('#callModal').css('display', 'flex');
	});
	$('#bottomBuyBtn').click(function() {
		$('#buyModal').css('display', 'flex');
	});

	$('#buyBtn').click(function() {
		$('#buyModal').css('display', 'flex');
	});
	
	

	$('#reportBtn').click(function() {
		$('#productReportModal').css('display', 'flex');
	});
	
	/*
	 * modalObj .open -> 모달 여는 버튼 .modal -> 모달태그 .close -> 닫기버튼태그
	 */
	
	function modalSetting(modalObj) {
		if(!modalObj.constructor ==  Object  || !modalObj.modal || !modalObj.close || !modalObj.open) { return false; }
		
		clickEvent(modalObj.open, modalOpen);
		clickEvent(modalObj.close, modalClose);
		
		// 모달 열기
		function modalOpen() {
			modalObj.modal.style.display = 'flex';
		}
		
		// 모달 닫기
		function modalClose() {
			modalObj.modal.style.display = 'none';
		}
		
		function clickEvent(something, callback) {
			if(something.constructor == Array) {
				something.forEach(e => e.addEventListener('click', callback));
			} else if(something.constructor == HTMLButtonElement) {
				something.addEventListener('click', callback);
			}
		}
	}
}


function initFavorite() {
	
	const $zzimBtn = $('#zzimBtn');
	const $favoriteToast = $('#favoriteToast');
	const $favoriteMsg = $('#favoriteMsg');
	const url = window.location.href;
	const productNo = url.substring(url.lastIndexOf('/') + 1, url
			.lastIndexOf('.'));
	
	$zzimBtn.click(insertFavorite);
	
	function insertFavorite() {
		const $target = $(this);
		const $favoriteCnt = $('#favoriteCnt');
		
		if($target.hasClass('detail--active')) {
			toggleFavorite(false);
		} else {
			toggleFavorite(true);
		}
		
		
		function toggleFavorite(status) {
			$.ajax({
				url: (contextPath + 'products/favorite/') + (status ? 'new.do' : 'delete.do'),
				method: 'post',
				data: {
					productNo: productNo
				}
			}).done(function(data) {
				if(data > 0) {
					$target.toggleClass('detail--active');
					let html = '';
					html += '<i class="fas fa-heart"></i>'
                    html += ('<span class="detail-zzim--msg" id="favoriteMsg">') + (status ? '상품을 찜</span> 하였습니다.' : ' 찜이 해제</span> 되었습니다.');
					$favoriteToast.html(html).css('display', 'flex').hide().fadeIn(1000, function() {$(this).fadeOut(1000)});
					$favoriteCnt.text(status ? Number($favoriteCnt.text()) + 1 : Number($favoriteCnt.text()) - 1);
				} else if(data == -1) {
					alert('로그인이 필요한 서비스입니다.');
					document.getElementById('loginBtn').dispatchEvent(new Event('click'));
				}
			}).fail(function(err) {
				alert(status ? '찜 등록에 실패하였습니다.' : '찜 삭제에 실패하였습니다.');
			});
		}
	}
	
}

function initCommentEvent() {

	const $textArea = $('.detail-comment__textarea');
	const $commentDelBtnList = $('.comment-del-btn');
	const $commentResBtnList = $('.comment-response-btn');
	
	/* 답글 시 음영 처리 */
	const $commentBodyList = $('.detail-right__body');
	$commentBodyList.each((i, e) => {
		const data = e.innerText;
		const prefix = data.slice(0, data.indexOf('@'));
		const prefixMsg = data.slice(data.indexOf(prefix), data.indexOf(':')+1);
		const content = data.slice(data.indexOf(':')+1);
		e.innerHTML = `<span>${prefixMsg}</span>${content}`;
	});
	
	
	/* 파라미터에서 상품번호 뺴오는 것 */
	const url = window.location.href;
	const productNo = url.substring(url.lastIndexOf('/') + 1, url
			.lastIndexOf('.'));
	
	sizeObj = {};
	sizeObj.textId = 'commentTextArea';
	sizeObj.sizeId = 'commentSize';
	sizeObj.size = 100;

	$textArea.keyup(function() {
		sizeCheck.call(this, sizeObj)
	});

	/* 댓글 등록 */
	$('.detail-comment__reg-btn').click(insertComment);
	
	/* 댓글 삭제 */
	if($commentDelBtnList.length) {
		$commentDelBtnList.click(deleteComment);
	}
	
	/* 답글 달기 */
	$commentResBtnList.click(responseComment);
	
	/* 댓글 등록 */
	function insertComment() {

		if (checkNull('commentTextArea', '메시지'))
			return false;

		const param = {
			productNo : productNo,
			productCommentContent : $textArea.val(),
		};

		$.ajax({
			url : productNo + '/new.do',
			method : 'post',
			data : param,
		}).done(function(data) {
			if (data == -1) {
				alert('로그인이 필요한 서비스입니다.');
				document.getElementById('loginBtn').dispatchEvent(new Event('click'));
			} else if (data == 0) {
				alert('댓글 등록에 실패하였습니다.');
			} else if (data == 1) {
				alert('댓글 등록에 성공하였습니다.');
				location.reload(true);
			}
		}).fail(function(err) {
			alert('오류가 발생하였습니다.', err.type);
		});
	}
	
	/* 댓글 삭제 */
	function deleteComment() {
		// 확인 창
		if(!confirm("삭제 하시겠습니까?")) {
			return false;
		}
		
		const productCommentNo = $(this).closest('.detail-history__area').data('commentno');
		
		const param = {
			productCommentNo: productCommentNo  
		};
		
		$.ajax({
			url : productNo + '/delete.do',
			method: 'post',
			data : param,
		}).done(function(data) {
			if(data == -1 || data==0) {
				alert('삭제하는데 오류가 발생하였습니다.');
			} else {
				alert('삭제에 성공하였습니다.');
				location.reload(true);
			}
		}).fail(function(err) {
			alert('삭제하는데 실패하였습니다.');
		});
	}
	
	/* 답글 달기 */
	function responseComment() {
		const target = $(this);
		const msg = '@'+target.closest('.detail-history__right').find('.detail-right__title').text()+':';
		$textArea.val(msg);
		$textArea.trigger('keyup');
	}
	
	/* 공백 검사 */
	function checkNull(id, msg) {
		const $target = $(`#${id}`);
		if (!$target.val().length) {
			alert(`${msg}을 입력해주세요`);
			$target.focus();
			return true;
		}
		return false;
	}

	/*
	 * 제목 size check sizeObj 속성값 sizeObj.textId : 검사할 해당 input sizeObj.sizeId :
	 * 길이를 나타내는 div의 id sizeObj.size : 길이
	 */
	function sizeCheck(sizeObj) {

		const $textId = $(`#${sizeObj.textId}`);
		const $sizeId = $(`#${sizeObj.sizeId}`);
		const size = sizeObj.size;

		if ($textId.val().length > size) {
			alert(`${size}자를 초과할 수 없습니다.`);
			$textId.val($textId.val().substring(0, size));
		}
		$sizeId.text($textId.val().length + '/100');
	}
	
}
function initShareBtn() {
	const $shareUrlBtn = $('#shareUrlBtn');
	const $shareTwitterBtn = $('#shareTwitterBtn');
	const $shareFacebookBtn = $('#shareFacebookBtn');
	
	$shareUrlBtn.click(copyUrl);
	
	const viewCount = $('#viewCount').text().trim();
	const commentCount = $('.detail-comment__header').children('.detail--empha').text().trim();
	const zzimCount = $('#zzimCount').text().trim();
	
	/* 카테고리를 해쉬태그로 바꾸는 부분 */
	let descriptionMsg = '';
	$('.detail-menu-cbox__display').each((i, e) => {
		descriptionMsg += '#'+e.innerText + ' '
	});
	descriptionMsg = descriptionMsg.substring(0, descriptionMsg.length-1);
		
	
	/* 카카오 링크 */
	if(document.getElementById('kakao-link-btn'))
	initKakaoShare();
	/* 페이스북 링크 : 중간 */
// initFbShare();
	
	
	/* 카카오 링크 */
	function initKakaoShare() {
		Kakao.cleanup();
	    Kakao.init('7f60851ef3536c185d43dc653f4abb8d');
	    Kakao.Link.createDefaultButton({
	      container: '#kakao-link-btn',
	      objectType: 'feed',
	      content: {
	        title: document.title,
	        description: descriptionMsg,
	        imageUrl: document.images[0].src,
	        link: {
	          webUrl: document.location.href,
	          mobileWebUrl: document.location.href
	        }
	      },
	      social: {
	    	// 찜 개수
	    	likeCount: Number(zzimCount),
	        commentCount: Number(commentCount),
	        viewCount: Number(viewCount)
	      },
	      buttons: [
	        {
	          title: '웹으로 보기',
	          link: {
	            mobileWebUrl: document.location.href,
	            webUrl: document.location.href
	          }
	        }  
	      ]
	    });
	}
	    
	/* 페이스북 링크 */
	function initFbShare() {
		(function(d, s, id) {
			var js, fjs = d.getElementsByTagName(s)[0];
			if (d.getElementById(id)) return;
			js = d.createElement(s); js.id = id;
			js.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.0";
			fjs.parentNode.insertBefore(js, fjs);
			}(document, 'script', 'facebook-jssdk'));
		
		FB.init({
	        appId      : '308411826950117',
	        xfbml      : true,
	        version    : 'v7.0'
	    });
		
		$("#shareFacebookBtn").on("click", function(){
		    FB.ui({
		    	method: 'share',
		    	href: window.location.href,
		    	
		        /*
				 * method: 'share_open_graph', action_type: 'og.shares',
				 * action_properties: JSON.stringify({ object: { 'og:url':
				 * window.location.href, 'og:title': document.title,
				 * 'og:description': descriptionMsg, 'og:image':
				 * document.images[0].src, } })
				 */
		    });
		});
	}
	
	
	/* url복사 */
	function copyUrl() {
		
		const msgArea = document.getElementsByClassName('url__msg')[0];
		msgArea.innerText = '복사중...';
		
		const tempInput = document.createElement('input');
		tempInput.value = window.document.location.href;
		this.appendChild(tempInput);
		tempInput.select();
		document.execCommand("copy"); // 클립보드에 복사합니다.
		
		this.removeChild(tempInput); // 선택된 것을 다시 선택안된 것으로 바꿈니다.
		msgArea.innerText = '복사 완료!';
	}
}