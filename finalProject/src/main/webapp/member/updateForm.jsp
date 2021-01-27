<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>회원정보수정</title>
    <link rel="stylesheet" type = "text/css" href="../css/member/member.css">

</head>
    
<body>
    <p id ="title" name = "title" align ="center"><strong>회원정보수정</strong></p>
    <hr>
    <form id="updateForm">
    <table align= "center">
       
        <tr>
            <td>
                <input placeholder="아이디" type="text" name="mem_id" id="id" size=40px
                value="${sessionScope.memId}">
            </td>
        </tr>
        <tr>
            <td>
                <input placeholder="이름" type="text" name="mem_name" id="name" size=40px; 
                value="${sessionScope.memName}" readonly>
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
                <input placeholder="이메일 (abc123)" type="text" name="text" id="email1" size=15px; 
                		value="${map.email1}" readonly >@
                <input placeholder="page.com" type="text" name="mem_email" id="email2" size=16px; 
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
                <input placeholder="우편번호" name="mem_postcode"id="postcode" type="text" size="24"
						value="${memberDTO.mem_postcode }" readonly>
                <input type="button" name="checkPostBtn" id="checkPostBtn" value="우편번호 ">
            	<div class="caution" id="postcodeDiv"></div>
            	
                <input placeholder="주소" type="text" name="mem_add1" id="add1" size=40px
                		value="${memberDTO.mem_add1 }" readonly><br>
                <input placeholder="상세 주소" type="text" name="mem_add2" id="add2" size=40px;
                		value="${memberDTO.mem_add2 }">
                <div class="caution" id="addDiv"></div>
            </td>
        </tr>
        <tr>
            <td align='center'>
                <input type="button" name="updateBtn" id="updateBtn" value="수정하기">
            </td>
        </tr>
    </table>
    </form>
<script type = "text/javascript" src = "https://code.jquery.com/jquery-3.5.1.min.js"></script>
<script type = "text/javascript" src = "../js/member/update.js?ver=2"></script>
</body>
</html>