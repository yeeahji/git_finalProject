//알림음 설정
var flagAlram = true;
var titleOrigin = document.title;
var timeoutId;


//창 활성화, 비활성화 여부 설정
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


//XSS 체크(스크립트 코드 방지)
const arrXss = ['<script', '<style', '<link', '<iframe', 'document.cookie', 'javascript:', '&#x', '<html', '<body', '</html', '</body', '<head'];

function xss_check(str) {
	str = str.replace(/ /gi, ""); //공백 제거
	var Break = new Error('Break');
	var ret = '';
	try {
		arrXss.forEach(function(element) {
			if(str.toLowerCase().match(element) != null) { //설정한 금지 태그가 하나라도 있으면
				ret = element;
				throw Break; //Break 예외 발생시키기
			}
		});
	} catch (e) { //사용자가 입력한 태그 리턴
		if(ret.substring(0,2) == '</') //문자열 발췌
			return ret.substring(2); //문자열 자르기
		else if(ret.substring(0,1) == '<')
			return ret.substring(1);
		else
			return ret;
	}
	return null;
}


//불건전 단어 체크
const arrWord = [ '씨발', '시발', 'ㅅㅂ' ];
const arrWord2 = [ '병신', '븅신' ];
const arrWord3 = [ 'fuck', 'sibal' ];

function word_check(str) {
	var str_reg = str;
	var ret = '';
	var regExp = /[\s\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
    var regExp2 = /[0-9]/g;
    var regExp3 = /[a-z]/gi;
	var Break = new Error('Break');
	
	try {
		arrWord.forEach(function(element) {
			if(str_reg.toLowerCase().match(element) != null) {
				ret = element;
				throw Break;
			}
		});
	} catch (e) {
		return ret;
	}
	
	str_reg = str;
	str_reg = str_reg.replace(regExp, "");
	str_reg = str_reg.replace(regExp2, "");
	str_reg = str_reg.replace(regExp3, "");
	try {
		arrWord2.forEach(function(element) {
			if(str_reg.toLowerCase().match(element) != null) {
				ret = element;
				throw Break;
			}
		});
	} catch (e) {
		return ret;
	}
	
	str_reg = str;
	str_reg = str_reg.replace(regExp, "");
	str_reg = str_reg.replace(regExp2, ""); 
	try {
		arrWord3.forEach(function(element) {
			if(str_reg.toLowerCase().match(element) != null) {
				ret = element;
				throw Break;
			}
		});
	} catch (e) {
		return ret;
	}
	
	return null;
}


//이미지 전송
//$('#uploadImg').on('change', getData);
//
//var data;
//function getData() {
//	const input = this;
//	const file = input.files[0];
//	const reader = new FileReader();
//	reader.onload = function(progressEvent) {
//		console.log(progressEvent.target.result);
//	};
//	
//	return new Promise(function(resolve, reject) {
//		data = reader.readAsDataURL(file);
//		console.log(data);
//	});
//};
//
//getData().then(function(resolvedData) {
//	console.log('늦게 : ' + resolvedData);
//	webSocket.sendCmd('CMD_MSG_SEND', '<img src="'+resolvedData+'" width="100" height="100">');
//});

//이미지 전송
//$('#uploadImg').on('change', readURL);
//
//function readURL() {
//	var imageURL;
//	const input = this;
//	
//	if(input.files && input.files[0]) {
//        imageURL = window.URL.createObjectURL(input.files[0]);
//		console.log(imageURL);
//	
//	webSocket.sendCmd('CMD_MSG_SEND', '<img src="'+imageURL+'" width="100" height="100">');
//	}
//};

//이미지 전송
//$('#uploadImg').on('change', function(){
//	var imageURL = '';
//	const input = this;
//	const file = input.files[0];
//	const reader = new FileReader(); //파일 읽는 함수
//	
//	reader.readAsDataURL(file); //파일을 dataURL로 변환
//	reader.onload = function(e) { //파일 읽기 완료(콜백 함수)
//
//		const image = new Image();
//        image.src = e.target.result;
//
//        image.onload = function(imgEvent) {
//			//이미지 리사이즈
//			let canvas = document.createElement("canvas"),
//			 max_size = 300, //최대 기준을 300으로 잡음
//			 width = image.width,
//			 height = image.height;
//			
//			if(width > height) { //가로가 길 경우
//			  if(width > max_size) {
//			    height *= max_size / width;
//			    width = max_size;
//			  }
//			} else { //세로가 길 경우
//			  if(height > max_size) {
//			    width *= max_size / height;
//			    height = max_size;
//			  }
//			}
//			canvas.width = width;
//			canvas.height = height;
//			canvas.getContext("2d").drawImage(image, 0, 0, width, height);
//			const dataURL = canvas.toDataURL("image/jpeg");
//          	
//			//보내기
//			console.log(dataURL);
//			
//			webSocket.sendCmd('CMD_MSG_SEND', '<img src="'+dataURL+'" width="150" height="150">');
//          
//        };//imageOnloadEvent
//        
//	};//readerOnloadEvent
//});