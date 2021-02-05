<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<script type="text/javascript" src="//developers.kakao.com/sdk/js/kakao.min.js"></script>

<!-- <div id = "loginModalHidden"> -->
<div id = 'loginModalWrap'>

<form name ="loginForm">
	<button class="loginModalCloseBtn"> 
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAiBJREFUaAXtmM1xwjAQRrFvcE+aSJoIPaSI5MCNHmC4caCK1ECaCE0kBTBccPxl0MyO0C6r1drkIF/Q6Gf3vbU9kplM6lUrUCtQK/BvK7Bard622+3DvQCRGwxS/pYbvCzcHY/H/T0kkBO5e76dJMEKzGazj6Zpvrquex5bIsAjNxjAwhW64QbQHweaTqfzxWLxI60pHcvNKQqMLZELD76bAmNJWODVAkNLWOGzBIaSKIHPFvCWKIU3CXhJeMCbBUolvOCLBKwSnvDFAgmJQ7/ZvXCb3QX+s99hn7DDemyMqn0AoNIVgSUlNHOkHNyYiwCCS4DSGAem7XcT4CTQ3x8Gw2OTvDta2NQ8VwEkiKuNvssz7w6P2O4CCEol/pI0zSDwiM1+D2DQep1Op6vCpPqs8em6q0R00NLebDaP5/N5Hx4bxAjttm3ny+Xy2xKXW+MqEMMDGImpkLeEm0AKPlRbGuMqq+13EdAAauZooem8YoEcsJy5FFJqFwlYgCxrBhEoASlZG8uY7oAHgEcMyGQLeCVGco9YWQIeCQFOr9KY6qNEaSIKTdvYK7C59R84B+zY2PRwlqJzpLZKAAGH3E1jCRy/tRI3HyF6skSVvI8CtLrxXZY+T8M6USCG1wQMga2/uTlZgdxAVuDUupzc7DvQP4ev4Rg8RuWpCP7VQM7wYoOFjqvb6/X6HdVQL3CeiHcCDM5ha7hagVqBWgHHCvwCWAH5e5bAf84AAAAASUVORK5CYII=" width="24" height="24" alt="닫기 버튼 아이콘">
    </button>
    <p id="title" name="title" align="center"><strong>로그인</strong></p>
   
    <hr>
    <table align= "center">
        <tr>
            <td>
                <input placeholder="아이디" type="text" name="id" id="id" size=46px align="center">
            </td>
        </tr>
        <td>
            <input placeholder="비밀번호" type="password" name="pwd" id="pwd" size=46px>
            <div class="caution" id="failLoginDiv"></div>
        </td>
    </tr>
    <tr>
        <td>
            <input type="checkbox"><span>로그인 상태 유지</span><br><br>
        </td>
    </tr>
    <tr>
        <td align= 'center'>
            <input type="button" name="loginBtn" id="loginBtn" value="로그인 ">
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
</div><!-- loginModalWrap -->
<!-- </div>loginModalHidden -->

<!-- <script type="text/javascript" src="https://code.jquery.com/jquery-3.5.1.min.js"></script> -->
<%-- <script type="text/javascript" src="${pageContext.request.contextPath}/js/member/login.js?ver=8"></script> --%>
