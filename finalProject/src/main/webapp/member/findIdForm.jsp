<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<!-- 담당 : 김명경 -->
<html>
<head>
<meta charset="UTF-8">
<title>아이디/비밀번호 찾기</title>
<link rel="stylesheet" type = "text/css" href="../css/member/member.css?ver=5">
</head>

<body>
<div align="center">
<p id ="title" name = "title" align ="center"><strong>아이디/비밀번호 찾기</strong></p>
<hr>
<a href="#" id="chooseIdForm"><input type="button" id="chooseIdBtn" value="아이디 찾기"></a>
<a href="#" id="choosePwdForm"><input type="button" id="choosePwdBtn" value="비밀번호 찾기"></a>

<div id ="findIdFormDiv">
 <form id ="findId" name="findId" onclick="" 	goPage('findId', 'findId'); class="on">
     <table  align="center">
         <tr>
             <td>
                 <input placeholder="이메일" type="text" id="email1" size=7px;>@
                 <input placeholder="page.com" type="text" id="email2" size=10px;>
                 <input type="hidden" id="email" name="mem_email">
                 <input type="button" id="findIdBtn" value="아이디 찾기">
                 <div class="caution" id="emailDiv"></div>
             </td>
         </tr>
     </table>
     <input type="button" id="goLoginBtn" value="로그인하러 가기">
 </form>
 </div>
<!--     ======================================================= -->
 <div id ="findPwdFormDiv" name="findPwd" onclick=""	goPage('findPwd', 'findPwd'); class="">
 <form id ="findPwd" name="findPwd">
     <table>
         <tr><td>
             <input type ="text" id="idP" placeholder="아이디" size=26px;>
             <div class="caution" id="idDivP"></div>
         </td></tr>
         <tr><td>
             <input placeholder="이메일" type="text" id="email1P" size=7px;>@
             <input placeholder="page.com" type="text" id="email2P" size=10px;>
             <input type="hidden" id="emailP" >
             <input type="button" id="sendNumBtnP" value="인증번호 발송">
             <div class="caution" id="emailDivP"></div>
         </td></tr>
         <tr><td>
             <input placeholder="인증번호" type="text" id="certifyNum" size=26px;>
             <input type="hidden" id="randomNum">
             <input type="button" id="certifyNumBtn" value="인증번호 확인">
             <div class="caution" id="certifyNumDiv"></div>
         </td></tr>
         <tr><td >
             <input type="password"  id="resetPwd" placeholder="비밀번호 재설정" size=26px;><br>
             <div id="resetPwdDiv"></div>
             <input type="password" id="certifyPwd" placeholder="비밀번호 확인" size=26px;>
             <input type="button" id="resetPwdBtn" value="비밀번호 수정">
             <div id="certifyPwdDiv"></div>
         </td></tr>
     </table>
     <input type="button" id="goLoginBtn" value="로그인하러 가기">
     </div><!-- modifyPwdForm -->
 </form></div><!-- findPwdFormDiv -->
</div>
       
<script type = "text/javascript" src = "https://code.jquery.com/jquery-3.5.1.min.js"></script>
<script type = "text/javascript" src = "../js/member/findId.js?ver=2"></script>
</body>
</html>