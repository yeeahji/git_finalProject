<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<link rel="stylesheet" type="text/css"
	href="/market/css/member/loginModal.css?ver=3">
<link rel="stylesheet" type="text/css"
	href="/market/css/member/member.css?ver=2">
<script type="text/javascript"
	src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
<script type="text/javascript" src="/market/js/member/login.js?ver=4"></script>


<div class="login-btn">

    <!-- 우측정렬을 위한 공백 -->
	<div class="login-box"></div>

	<div class="login-box">

		<!-- 상단 회원 -->
		<c:if test="${memId == null}">
			<a href="/market/member/joinForm"
				style="text-decoration: none; color: #61615b;">회원가입</a>
			&emsp;
			<a href="#" id="goLoginBtn"
				style="text-decoration: none; color: #61615b;">로그인</a>
			&emsp;&emsp;&emsp;
		</c:if>
		<c:if test="${memId != null}">
			<span>${memId}님 환영합니다.&emsp;</span>
			<a href="/market/member/logout"
				style="text-decoration: none; color: #61615b;">로그아웃</a>
			&emsp;
			<a href="/market/member/certifyForm"
				style="text-decoration: none; color: #61615b;">내 계정 관리</a>
			&emsp;&emsp;&emsp;
			<a href="#" style="text-decoration: none; color: #61615b;">알림 ▼</a>
			&emsp;&emsp;&emsp;
		</c:if>

		<div id="loginModalHidden">
			<div id='loginModalWrap'>

				<form name="loginForm">
					<button class="loginModalCloseBtn">
						<img
							src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAiBJREFUaAXtmM1xwjAQRrFvcE+aSJoIPaSI5MCNHmC4caCK1ECaCE0kBTBccPxl0MyO0C6r1drkIF/Q6Gf3vbU9kplM6lUrUCtQK/BvK7Bard622+3DvQCRGwxS/pYbvCzcHY/H/T0kkBO5e76dJMEKzGazj6Zpvrquex5bIsAjNxjAwhW64QbQHweaTqfzxWLxI60pHcvNKQqMLZELD76bAmNJWODVAkNLWOGzBIaSKIHPFvCWKIU3CXhJeMCbBUolvOCLBKwSnvDFAgmJQ7/ZvXCb3QX+s99hn7DDemyMqn0AoNIVgSUlNHOkHNyYiwCCS4DSGAem7XcT4CTQ3x8Gw2OTvDta2NQ8VwEkiKuNvssz7w6P2O4CCEol/pI0zSDwiM1+D2DQep1Op6vCpPqs8em6q0R00NLebDaP5/N5Hx4bxAjttm3ny+Xy2xKXW+MqEMMDGImpkLeEm0AKPlRbGuMqq+13EdAAauZooem8YoEcsJy5FFJqFwlYgCxrBhEoASlZG8uY7oAHgEcMyGQLeCVGco9YWQIeCQFOr9KY6qNEaSIKTdvYK7C59R84B+zY2PRwlqJzpLZKAAGH3E1jCRy/tRI3HyF6skSVvI8CtLrxXZY+T8M6USCG1wQMga2/uTlZgdxAVuDUupzc7DvQP4ev4Rg8RuWpCP7VQM7wYoOFjqvb6/X6HdVQL3CeiHcCDM5ha7hagVqBWgHHCvwCWAH5e5bAf84AAAAASUVORK5CYII="
							width="24" height="24" alt="닫기 버튼 아이콘">
					</button>
					<p id="title" name="title" align="center">
						<strong>로그인</strong>
					</p>

					<hr>
					<table align="center">
						<tr>
							<td><input placeholder="아이디" type="text" name="id" id="id"
								size=40px"></td>
						</tr>
						<td><input placeholder="비밀번호" type="password" name="pwd"
							id="pwd" size=40px>
							<div id="failLoginDiv"></div></td>
						</tr>
						<tr>
							<td><input type="checkbox"><span>로그인 상태 유지</span><br>
								<br></td>
						</tr>
						<tr>
							<td align='center'><input type="button" name="loginBtn"
								id="loginBtn" value="로그인"></td>
						</tr>
						<tr>
							<td align='center'><input type="button" name="kakao"
								id="kakao" value="카카오로 로그인"><br> <br></td>
						</tr>
						<tr>
							<td align='center'><a href="/market/member/findId">아이디/비밀번호
									찾기</a>&emsp;｜&emsp;<a href="/market/member/joinForm"">회원가입</a></td>
						</tr>

					</table>
				</form>
			</div>
		</div>
	</div>
</div>





