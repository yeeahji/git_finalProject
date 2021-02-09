// 불건전 단어 체크
const arrWord = [ '성교', '네토라레', '네토라래', '내토라레', '내토라레', '네토', 'ntr', '초대남', '능욕', '정액', '수간', '좆', '쟈위', '스카이프', '질사', '질싸', '성추행', '시오후키', '시후오키', '암컷', '암캐', '근친', '복종녀', '가축조교' ];
const arrWord2 = [ '조건', 'ㅈㄱ', '만남', 'ㅁㄴ', '원나잇', '성매매', '알바', '용돈', '섹스', '쎅스', '쎅쓰', '섹쓰', 'ㅅㅅ', '보지', 'ㅂㅈ', '자지', 'ㅈㅈ', '개좆', '소음순', '대음순', '허벌창', '오랄', '애널', '후장', '오르가즘', '쓰리썸', '자살', '사까시', '팸섭', '펨섭', '맬돔', '멜돔', '펨돔', '팸돔', '노예', '자위', '섹파', '쎅파', 'ㅅㅍ', '파트너', '대물', '섹녀', '쎅녀', '야동', '보빨', '폰섹', '폰쎅', '보징어', '토토', '강간', '변태', '변녀', '변남', '걸레', '암캐', '씨발년', '긴밤' ];
const arrWord3 = [ 'sex', 'anal', 'oral', 'orgasm', 'femsub', 'meldom', 'femdom' ];

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

// XSS 체크
const arrXss = ['<script', '<style', '<link', '<iframe', 'document.cookie', 'javascript:', '&#x', '<html', '<body', '</html', '</body', '<head'];
function xss_check(str) {
	str = str.replace(/ /gi, "");
	var Break = new Error('Break');
	var ret = '';
	try {
		arrXss.forEach(function(element) {
			if(str.toLowerCase().match(element) != null) {
				ret = element;
				throw Break;
			}
		});
	} catch (e) {
		if(ret.substring(0,2) == '</')
			return ret.substring(2);
		else if(ret.substring(0,1) == '<')
			return ret.substring(1);
		else
			return ret;
	}
	return null;
}

// 중복 submit 방지
var doubleSubmitFlag = false;
function doubleSubmitCheck() {
	if (doubleSubmitFlag) {
		return doubleSubmitFlag;
	} else {
		doubleSubmitFlag = true;
		return false;
	}
}

//유니코드 적용된 문자열 length 계산
function countSymbols(string) {
	var regexAstralSymbols = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
    return string
        // 모든 대체쌍을 BMP 기호로 교체하고
        .replace(regexAstralSymbols, '_')
        // length를 구한다
        .length;
}


// 커서 가장 끝으로 이동
function setCaretAtEnd(elem) {
	var elemVal = elem.val();
	var elemLen = elem.val().length;
	if(elemLen == 0){
		elem.focus();
		return;
	}
	// IE Only
	if (document.selection) {
		elem.focus();
		var range = document.selection.createRange();
		range.move('character', elemLen);
		range.select();
	}
	// Firefox/Chrome
	else if (document.selection == undefined || elem.selectionStart == null || elem.selectionStart == '') {
		setTimeout(function() {
			elem.val('');
			elem.val(elemVal);    
		}, 10);
	}
}

// 태그 제거
function removeTag(pValue) {
    var strReturenValue = "";
    strReturenValue = pValue.replace(/&/gi, '&amp;').replace(/</gi, '&lt;').replace(/>/gi, '&gt;').replace(/"/gi, '&quot;').replace(/'/gi, '&apos;');
    return strReturenValue;
}
