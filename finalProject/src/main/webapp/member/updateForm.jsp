<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix = "c" uri = "http://java.sun.com/jsp/jstl/core"  %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>회원정보수정</title>
    <link rel="stylesheet" type = "text/css" href="../css/member/member.css">

</head>
    
<body>
	<a href="../index.jsp">
	<img class="logo_full" src="/market/image/member/logo_full.png" alt="풀로고">
	</a>
    <p id ="title" name = "title" align ="center"><strong>회원정보수정</strong></p>
    <hr>
    <form id="updateForm">
    <table align= "center">
       
        <tr>
            <td>
                <input placeholder="아이디" type="text" name="mem_id" id="id" size=40px readonly
                value="${sessionScope.sessionId}">
            </td>
        </tr>
        <tr>
            <td>
                <input placeholder="이름" type="text" name="mem_name" id="name" size=40px; 
                value="${memberDTO.mem_name}" readonly>
            </td>
        </tr>
        <c:if test="${sessionKakao ==0}"><!-- 일반로그인일때만 비밀번호 영역이 보이게 한다. -->
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
        </c:if>
        <tr>
            <td>
                <input placeholder="이메일 (abc123)" type="text" name="email1" id="email1" size=15px; 
                		value="${map.email1}" readonly >@
                <input placeholder="page.com" type="text" name="email2" id="email2" size=16px; 
                		value="${map.email2 }" readonly>
                <input type="hidden" id="mem_email" name="mem_email" >
                <div class="caution" id="emailDiv"></div>
            </td>
        </tr>
        <tr>
            <td>
                <select name="tel1" id="tel1" style="width: 80px; "
                		value="${map.tel1}">
					<option value="010">  010
					<option value="011">  011
					<option value="011">  016
					<option value="017">  017
				</select>-
				 <input type="text" name="tel2" id="tel2"size="10" placeholder="0000"
				 		value="${map.tel2 }"> -  
				 <input type="text" name="tel3" id="tel3"size="10" placeholder="0000"
				 		value="${map.tel3}">
				 <input type="hidden" id="mem_tel" name="mem_tel">
                <div class="caution" id="telDiv"></div>
            </td>
        </tr>
        <tr>
            <td>
            
            	<input placeholder="우편번호" name="mem_postcode"id="postcode" type="text" 
            	value="${memberDTO.mem_postcode }"  size="24" readonly>
                <input type="button" name="checkPostBtn" id="checkPostBtn" value="우편번호 " onclick="sample5_execDaumPostcode()">
            	<div class="caution" id="postcodeDiv"></div>
               
            	
                <input placeholder="주소" type="text" name="mem_add1" id="add1" size=40px
                		value="${memberDTO.mem_add1 }" readonly><br>
                <input placeholder="상세 주소" type="text" name="mem_add2" id="add2" size=40px;
                		value="${memberDTO.mem_add2 }">
                <div class="caution" id="addDiv"></div>
                 <div id="map" style="width:365px;height:365px;margin-top:10px;display:none"></div>
                
                
                
            </td>
        </tr>
        <tr>
            <td align='center'>
                <input type="button" name="updateBtn" id="updateBtn" value="수정하기">
            </td>
        </tr>
    </table>
    </form>
    <script src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
<script src="//dapi.kakao.com/v2/maps/sdk.js?appkey=a038dceda6f2c98fdcda082f8520e744&libraries=services"></script> 
<script type = "text/javascript" src = "https://code.jquery.com/jquery-3.5.1.min.js"></script>
<script type = "text/javascript" src = "../js/member/update.js?ver=2"></script>
   
</body>
</html>