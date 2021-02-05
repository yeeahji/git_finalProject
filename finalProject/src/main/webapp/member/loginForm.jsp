<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<script type="text/javascript" defer src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
<script type="text/javascript" defer src="../js/member/login.js"></script>

<form name ="loginForm" action="${pageContext.request.contextPath}/member/login" method="post">
<!-- <form name ="loginForm"> -->
    <p id ="title" name = "title" align ="center"><strong>로그인</strong></p>
    <hr>
    <table align= "center">
        <tr>
            <td>
                <input placeholder="아이디" type="text" name="mem_id" id="id" size=46px align="center">
            </td>
        </tr>
        <td>
            <input placeholder="비밀번호" type="password" name="mem_pwd" id="pwd" size=46px>
            <div class="caution" id="failLoginDiv">${requestScope.loginFailMsg}</div>
        </td>
    </tr>
    <tr>
        <td>
            <input name="remember-me" type="checkbox"> <span>자동 로그인</span><br><br>
        </td>
    </tr>
    <tr>
        <td align= 'center'>
            <input type="submit" name="loginBtn" id="loginBtn" value="로그인">
        </td>
    </tr>
    <tr>
        <td align= 'center'>
	        <a id="kakao-login-btn" href="javascript:kakaoLogin();">
			  <img src="//k.kakaocdn.net/14/dn/btqCn0WEmI3/nijroPfbpCa4at5EIsjyf0/o.jpg" width="365"/>
			</a>
			<p id="token-result"></p>
			<a href="javascript:kakaoLogout();"
	  		 style="text-decoration: none; color:#61615b;">저장된 카카오 계정 연결 끊기</a><br>
       
        </td>
    </tr>
    <tr>
        <td align='center'>
        	
            <a href="/market/member/findIdForm">아이디/비밀번호 찾기</a>&emsp;｜&emsp;<a href="/market/member/joinForm">회원가입</a>
        </td>
    </tr>
</table>
</form>