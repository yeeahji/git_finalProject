<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>아나바다 탈퇴하기</title>
	<link rel="stylesheet" type = "text/css" href="../css/member/withdraw.css">
	<script type = "text/javascript" src = "https://code.jquery.com/jquery-3.5.1.min.js"></script>
	<script type = "text/javascript" src = "../js/member/withdraw.js"></script>
</head>
<body>
<h1><a href="../index.jsp"><img class="logo_full" src="/market/image/member/logo_full.png" alt="메인"></a>&emsp;회원탈퇴 신청</h1>
<h3>▶회원탈퇴 신청에 앞서 아래 내용을 반드시 확인해 주세요.</h3> 
<hr>
<div border='1'>
<h4>회원탈퇴 시 처리내용</h4>
<ul>
    <li>아나바다 마켓 에코지수는 소멸되며 복원되지 않습니다.
    <li>아나바다 마켓 구매 정보가 삭제됩니다.
    <li>소비자보호에 관한 법률 제6조에 의거,계약 또는 청약철회 등에 관한 기록은 5년, 대금결제 및 재화등의 공급에 관한 기록은 5년, 소비자의 불만 또는 분쟁처리에 관한 기록은 3년 동안 보관됩니다.
    	 동 개인정보는 법률에 의한 보유 목적 외에 다른 목적으로는 이용되지 않습니다.
</ul>
<h4>회원탈퇴 시 게시물 관리</h4>
	<ul><li>회원탈퇴 후 아나바다 마켓 서비스에 입력한 게시물 및 댓글은 삭제되지 않으며, <strong>회원정보 삭제로 인해 작성자 본인을 확인할 수 없으므로 게시물 편집 및 삭제 처리가 원천적으로 불가능합니다. 
	게시물 삭제를 원하시는 경우에는 먼저 해당 게시물을 삭제하신 후, 탈퇴를 신청하시기 바랍니다.</strong></ul>
<h4>회원탈퇴 후 재가입 규정</h4>
	<ul><li>탈퇴 회원이 재가입하더라도 기존의 아나바다 마켓 에코지수는 이미 소멸되었기 때문에 복원되지 않습니다.</ul></div>
<div class="confirm ui-checked-left-right-text ui-checked">
    <input id="confirm" type="checkbox">
    <label for="confirm">위 내용을 모두 확인하였습니다. <span class="alert"><strong>(필수)</strong></span></label>
	<div id="confirmDiv" class="caution"></div>
</div>
<hr>

<form name="withdrawForm" action="/market/member/withdraw" method="post">
<div class="field">
    <h3>▶ 아나바다 마켓 회원에서 탈퇴하려는 이유가 무엇인가요?<span class="alert">(필수, 복수선택 가능)</span></h3>
    <div class="box">
        <div class="check_box">
            <input type="checkbox" name="withdraw_lowFrequency" id="withdraw_lowFrequency" value="1" class="reason">
            <label for="reason_0">이용빈도 낮음&emsp;&emsp;</label>
        </div>
        <div class="check_box">
            <input type="checkbox" name="withdraw_rejoin" id="withdraw_rejoin" value="1" class="reason">
            <label for="reason_1">재가입&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</label>
        </div>
        <div class="check_box">
            <input type="checkbox" name="withdraw_lowContents" id="withdraw_lowContents" value="1" class="reason">
            <label for="reason_2">콘텐츠/상품 부족</label>
        </div><br>
        <div class="check_box">
            <input type="checkbox" name="withdraw_protectInfo" id="withdraw_protectInfo" value="1" class="reason">
            <label for="reason_3">개인정보보호&emsp; &emsp;</label>
        </div>
        <div class="check_box">
            <input type="checkbox" name="withdraw_lowBenefit" id="withdraw_lowBenefit" value="1" class="reason">
            <label for="reason_4">혜택 부족&emsp;&emsp;&emsp;  &emsp; &emsp;&emsp;</label>
        </div>
        <div class="check_box">
            <input type="checkbox" name="withdraw_others" id="withdraw_others" value="1" class="reason">
            <label for="reason_5">기타</label>
        </div>
		<div id="reasonDiv" class="caution"></div>
    </div>
</div>
<div class="field">
    <h3>▶ 아나바다 마켓 서비스 이용 중 어떤 부분이 불편하셨나요? (선택) </h3>
        아나바다 마켓에 떠나는 이유를 자세히 말씀해주세요.<br>여러분의 소중한 의견을 반영해 더 좋은 서비스로 찾아뵙겠습니다.<br>
    <textarea placeholder="※ 탈퇴 사유 작성 전 아래 내용을 참고해주세요.
	- 아나바다 마켓 이용 빈도가 낮아졌다면 어떤 이유로 자주 사용하지 않게 되었는지 구체적인 사유를 남겨주세요
	- 상품 등 찾으려고 했던 정보가 부족하거나 없었다면 어떤 정보가 필요하신지 자세하게 남겨주세요
	- 기타 사유를 포함하여 아나바다 마켓 이용중 불편하셨던 점, 전반적으로 개선할 부분을 자세하게 남겨주세요
	- 다시 돌아오셨을 때 지금보다 더 발전된 아나바다 마켓이 되어있을 수 있도록 다양하고 충분한 의견 부탁드립니다^^*" 
		name="withdraw_detailReason" id="withdraw_detailReason"></textarea>
    <div id="text_length">
        <div id="textareaDiv"><span id="counter">0</span>자/1000자</div>    
        <div class="caution"></div>
    </div>
</div><hr><!-- field -->
</form><!-- withdrawForm -->
<div class="field notice">
    <h3>▶ 개인정보보호에 대한 안내</h3>
</div>
<div class="notice__content">
<h4>고객님께 개인정보보호에 대한 안내드립니다.</h4>
        아나바다 마켓에서는 고객 여러분의 개인 정보를 개인정보보호 방침에 따라 안전하게 관리하고 있습니다. <br>
        고객님께서 안전하게 이용하실 수 있도록 보안에 더욱 힘쓰겠습니다. 감사합니다.
</div>
</div>
<br><br>
<div id="withdraw">
	<input type="button" id="withdrawBtn" value="탈퇴신청">
</div>



</body>
</html>