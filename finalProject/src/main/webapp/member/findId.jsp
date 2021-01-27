<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>아이디/비밀번호 찾기</title>
<link rel="stylesheet" type = "text/css" href="../css/member/member.css?ver=4">

</head>
<body>
<div align="center">

<p id ="title" name = "title" align ="center"><strong>아이디/비밀번호 찾기</strong></p>
<hr>
<!-- <label><input type="radio" name="chooseOption" id="chooseOption" value="chooseIdForm" checked>아이디 찾기</label> -->
<!-- <label><input type="radio" name="chooseOption" id="chooseOption" value="choodsPwdForm">비밀번호 찾기</label> -->

<a href="#" id="chooseIdForm">아이디 찾기</a>
<a href="#" id="choosePwdForm">비밀번호 찾기</a>

<div id ="findIdFormDiv">
 <form id ="findId" name="findId" onclick="" 
 	goPage('findId', 'findId'); class="on">
     <table  align="center">
         <tr>
             <td>
                 <input placeholder="이름" type ="text" name ="find_name" id="find_name" >
                 <div class="caution" name="find_nameDiv"></div>
             </td>
         </tr>
         <tr>
             <td>
                 <input placeholder="이메일" type = "text" name="find_email" id="find_email">
                 <input type="button" id="find_id_Btn" value="아이디 찾기">

                 <div class="caution" id="find_emailDiv"></div>
                 <div class="caution" id="send_emailDiv"></div>
             </td>
         </tr>
     </table>
     <input type="button" id="goLoginBtn" value="로그인하러 가기">
 </form>
 </div>
<!--     ======================================================= -->
 <div id ="findPwdFormDiv" name="findPwd" onclick=""
 		goPage('findPwd', 'findPwd'); class="">
 <form id ="findPwd" name="findPwd">
     <table>
         <tr>
             <td>
                 <input type ="text" name ="find_Id" id="find_Id" placeholder="아이디">
                 <div id="find_IdDiv"></div>
             </td>
         </tr>
         <tr>
             <td>
                 <input type = "text" name="find_email" id="find_email" placeholder="이메일">
                 <input type="button" id="find_pwd_Btn" value="비밀번호 찾기">
                 <div id="find_emailDiv"></div>
                 <div id="send_emailDiv"></div>
             </td>
         </tr>
         <tr>
             <td>
                 <input type="text" name="certifyNum" id="certifyNum" placeholder="인증번호">
                 <input type="button" id="certifyNumBtn" value="인증번호 확인">
                 <div id="certify_pwdDiv"></div>

             </td>
         </tr>
          </table>
 <div id="modifyPwdFormDiv">
    <table>
         <tr><td >
                 <input type="text" name="modifyPwd" id="certifyNum" placeholder="비밀번호 수정"><br>
                 <div id="modifyPwdDiv"></div>
                 <input type="text" name="modifyRepwd" id="certifyNum" placeholder="비밀번호 재확인">
                 <input type="button" name="modifyPwdBtn" id="modifyPwdBtn" value="비밀번호 수정">
                 <div id="modifyRePwdDiv"></div>
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