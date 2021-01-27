<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>아나바다 탈퇴하기</title>
<link rel="stylesheet" type = "text/css" href="../css/member/member.css">

</head>
<body>
    <h2>회원 탈퇴 신청</h2>
<h3>회원 탈퇴 신청에 앞서 아래 내용을 반드시 확인해 주세요.</h3>

<div border='1'>
<h4>회원탈퇴 시 처리내용</h4>
<ul>
    <li>아나바다 마켓 에코지수는 소멸되며 복원되지 않습니다.
    <li>아나바다 마켓 구매 정보가 삭제됩니다.
    <li>소비자보호에 관한 법률 제6조에 의거,계약 또는 청약철회 등에 관한 기록은 5년, 대금결제 및 재화등의 공급에 관한 기록은 5년, 소비자의 불만 또는 분쟁처리에 관한 기록은 3년 동안 보관됩니다. 동 개인정보는 법률에 의한 보유 목적 외에 다른 목적으로는 이용되지 않습니다.
</ul>
	<h4>회원탈퇴 시 게시물 관리</h4>
	회원탈퇴 후 아나바다 마켓 서비스에 입력한 게시물 및 댓글은 삭제되지 않으며, 회원정보 삭제로 인해 작성자 본인을 확인할 수 없으므로 게시물 편집 및 삭제 처리가 원천적으로 불가능 합니다. 게시물 삭제를 원하시는 경우에는 먼저 해당 게시물을 삭제 하신 후, 탈퇴를 신청하시기 바랍니다.
	<h4>회원탈퇴 후 재가입 규정</h4>
	탈퇴 회원이 재가입하더라도 기존의 아나바다 마켓 에코지수는 이미 소멸되었기 때문에 복원되지 않습니다.</div>
<div class="confirm ui-checked-left-right-text ui-checked">
    <input id="confirm" type="checkbox">
    <div class="image"></div>
    <label for="confirm">위 내용을 모두 확인하였습니다. <span class="alert">필수</span></label>
</div>
<div class="field">
    <div class="title">아나바다 마켓 회원에서 탈퇴하려는 이유가 무엇인가요? (복수선택 가능) <span class="alert">필수</span></div>
    <div class="box">
        <div class="check_box ui-checked ui-checked-left-right-text">
            <input type="checkbox" name="reason_0" id="reason_0" value="이용빈도 낮음" class="reason">
            <div class="image"></div>
            <label for="reason_0">이용빈도 낮음</label>
        </div>
        <div class="check_box ui-checked ui-checked-left-right-text">
            <input type="checkbox" name="reason_1" id="reason_1" value="재가입" class="reason">
            <div class="image"></div>
            <label for="reason_1">재가입</label>
        </div>
        <div class="check_box ui-checked ui-checked-left-right-text">
            <input type="checkbox" name="reason_2" id="reason_2" value="콘텐츠/제품정보/상품 부족" class="reason">
            <div class="image"></div>
            <label for="reason_2">콘텐츠/제품정보/상품 부족</label>
        </div>
        <div class="check_box ui-checked ui-checked-left-right-text">
            <input type="checkbox" name="reason_3" id="reason_3" value="개인정보보호" class="reason">
            <div class="image"></div>
            <label for="reason_3">개인정보보호</label>
        </div>
        <div class="check_box ui-checked ui-checked-left-right-text">
            <input type="checkbox" name="reason_4" id="reason_4" value="회원특혜/쇼핑혜택 부족" class="reason">
            <div class="image"></div>
            <label for="reason_4">회원특혜/쇼핑혜택 부족</label>
        </div>
        <div class="check_box ui-checked ui-checked-left-right-text">
            <input type="checkbox" name="reason_5" id="reason_5" value="기타" class="reason">
            <div class="image"></div>
            <label for="reason_5">기타</label>
        </div>

        <input type="hidden" name="withdrawal[reason]" id="withdrawal_reason">
    </div>
</div>
<div class="field">
    <div class="title">아나바다 마켓 서비스 이용 중 어떤 부분이 불편하셨나요? <span class="info">선택</span></div>
    <div class="sub_title">
        아나바다 마켓에 떠나는 이유를 자세히 알려주시겠어요? 여러분의 소중한 의견을 반영해 더 좋은 서비스로 꼭 찾아뵙겠습니다.<br>
    </div>
    <textarea placeholder="※ 탈퇴 사유 작성 전 아래 내용을 참고해주세요.
		- 아나바다 마켓 이용 빈도가 낮아졌다면 어떤 이유로 자주 사용하지 않게 되었는지 구체적인 사유를 남겨주세요
		- 상품 등 찾으려고 했던 정보가 부족하거나 없었다면 어떤 정보가 필요하신지 자세하게 남겨주세요
		- 기타 사유를 포함하여 아나바다 마켓 이용중 불편하셨던 점이나 앱 기능 등 전반적으로 개선되었으면 하는 부분을 자세하게 남겨주세요
		- 다시 돌아오셨을 때 지금 보다 더 발전된 아나바다 마켓이 되어있을 수 있도록 다양하고 충분한 의견 부탁드립니다^^*" name="withdrawal[reason_detail]" id="withdrawal_reason_detail"></textarea>
    <div id="text_length">
        <span>0</span>자/2000자
    </div>
</div>
<div class="field notice">
    <div class="notice__header">
        <div class="notice__header__title">
            개인정보보호에 대한 안내
        </div>
       </div>
    <div class="notice__content">
        고객님께 개인정보보호에 대한 안내드립니다.<br>
        아나바다 마켓에서는 고객 여러분의 개인 정보를 개인정보보호 방침에 따라 안전하게 관리하고 있습니다. <br>
        또한 <span>최근 언론을 통해 보도된 개인정보유출 사고는 아나바다 마켓과 관련이 없음을 안내해 드리며,</span> 고객님께서 안전하게 이용하실 수 있도록 보안에 더욱 힘쓰겠습니다. 감사합니다.
    </div>
</div>
<input type="submit" name="commit" value="탈퇴신청" class="button" data-disable-with="탈퇴신청">
<a class="button withdrawal-cancel-button" href="https://ohou.se/users/3877203/edit">취소하기</a>

<script type = "text/javascript" src = "https://code.jquery.com/jquery-3.5.1.min.js"></script>
<script type = "text/javascript" src = "../js/member/update.js?ver=2"></script>

</body>
</html>