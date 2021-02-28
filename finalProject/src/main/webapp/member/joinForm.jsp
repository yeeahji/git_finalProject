<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<!-- 담당 : 김명경 -->
<html>
<head>
    <meta charset="UTF-8" />
    <title>아나바다 마켓 회원가입</title>
    <link rel="stylesheet" type = "text/css" href="../css/member/member.css?ver=6">
</head> 

<body>
	<a href="../index.jsp">
	<img class="logo_full" src="/market/image/member/logo_full.png" alt="풀로고">
	</a>
    <p  id ="title" name = "title" align ="center"><strong>회 원 가 입</strong></p>
   
    <form name = "joinForm" action="/market/member/join" method="post">
      <table align= "center">
        <tr>
            <td>
                <input placeholder="이름" type="text" name="mem_name" id="name" size=40px;>
                <div class="caution" id = "nameDiv"></div>
            </td>
        <tr>
            <td>
                <input placeholder="아이디" type="text" name="mem_id" id="id" size=40px;>
                <input type="hidden" id="hiddenId">
                <div class="caution" id = "idDiv"></div>
            </td>
        </tr>
        <tr>
            <td>
                <input placeholder="비밀번호 8-15자(영문+숫자+특문(.!@#$%^&+=))" type="password" 
               			name="mem_pwd" id="pwd" size=40px autocomplete="off">
                <div class="caution" id = "pwdDiv"></div>
            </td>
        </tr>
        <tr>
            <td>
                <input placeholder="비밀번호 재확인" type="password" name="repwd" id="repwd" size=40px
                		autocomplete="off">
                <div class="caution" id="repwdDiv"></div>
            </td>
        </tr>
        <tr>
            <td>
                <input placeholder="이메일 (abc123)" type="text" name="mem_email1" id="email1" size=15px;>@
                <input placeholder="page.com" type="text" name="mem_email2" id="email2" size=16px;>
                <input type="hidden" id="email" name="mem_email">
                <div class="caution" id="emailDiv"></div>
            </td>
        </tr>
        <tr>
            <td>
                <input placeholder="이메일 인증번호" type="text" name="emailNum" id="emailNum" size=24px;>
                <input type="button" name="certifyEmailBtn" id="certifyEmailBtn" value="인증번호 발송">
                <input type="hidden" id="randomNum" name="randomNum">
                <div class="caution" id="emailNumDiv"></div>
            </td>
        </tr>
        <tr>
            <td>
                <select name="mem_tel1" id="tel1" style="width: 80px; ">
					<option value="010">  010
					<option value="011">  011
					<option value="011">  016
					<option value="017">  017
				</select>-
				 <input type="text" name="mem_tel2" id="tel2"size="10" placeholder="0000"> -  
				 <input type="text" name="mem_tel3" id="tel3"size="10" placeholder="0000">
				 <input type="hidden" id="tel" name="mem_tel">
                <div class="caution" id="telDiv"></div>
            </td>
        </tr>
        <tr>
            <td>
                <input placeholder="우편번호" name="mem_postcode"id="postcode" type="text" size="24" readonly>
                <input type="button" name="checkPostBtn" id="checkPostBtn" value="우편번호 " onclick="sample5_execDaumPostcode()">
            	<div class="caution" id="postcodeDiv"></div>
            	
                <input placeholder="주소" type="text" name="mem_add1" id="add1" size=40px readonly><br>
                <input placeholder="상세 주소" type="text" name="mem_add2" id="add2" size=40px;>
                <div class="caution" id="addDiv"></div>
                <div id="map" style="width:365px;height:365px;margin-top:10px;display:none"></div>
            </td>
        </tr>
        <tr>
            <td>
                <p id="agreement" align="center">약관동의</p>
                <fieldset>
                <input type="checkbox" id="all" class="check" name="14years">전체 선택<br>
                <hr>
                <input type="checkbox" id="requirementCheck"class="allcheck">본인은 만 14세 이상입니다.(필수)<br>
                <input type="checkbox" id="requirementCheck"class="allcheck"><a href="#" id="personalData">개인정보처리방침(필수)</a><br>
                <input type="checkbox" id="requirementCheck"class="allcheck"><a href="#" id="serviceTerm">아나바다 마켓 이용약관(필수)</a><br>
                <input type="checkbox" class="allcheck" name="mem_agree" onchange="agree(this);">이벤트 알림 메일 수신(선택)
                </fieldset>
                <div class="caution" id="checkboxDiv"></div>
            </td>
        </tr>
        <tr>
            <td align= 'center'>
                <input type="button" name="joinBtn" id="joinBtn" value="가입하기">
            </td>
        </tr>
      </table>
    </form>
<script src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
<script src="//dapi.kakao.com/v2/maps/sdk.js?appkey=a038dceda6f2c98fdcda082f8520e744&libraries=services"></script>    
<script type = "text/javascript" src = "https://code.jquery.com/jquery-3.5.1.min.js"></script>
<script type = "text/javascript" src = "../js/member/join.js?ver=8"></script>
</body>
</html>