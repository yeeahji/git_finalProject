<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>  
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="sec" %>

<link rel="stylesheet" type = "text/css" href="/market/css/member/loginModal.css?ver=3">
<link rel="stylesheet" type = "text/css" href="/market/css/member/member.css?ver=9">

<script type="text/javascript" src="//developers.kakao.com/sdk/js/kakao.min.js"></script>
<script type="text/javascript" src="https://code.jquery.com/jquery-3.5.1.min.js"></script>

<div class="login-btn">
	<!-- 우측정렬을 위한 공백 -->
	<div class="login-box"></div>
	
	<!-- 상단 회원 -->
	<div class="login-box">
		<sec:authentication property="principal" var="member"/> <!-- 사용자 정보 가져오기 -->
		<!-- ${pageContext.request.userPrincipal} : 사용자 principal 확인 -->
		
		<!-- 비회원 -->
		<sec:authorize access="isAnonymous()">
		<a href="/market/member/joinForm" 
		   style="text-decoration: none; color:#61615b;">회원가입</a>&emsp;
		<a href="/market/member/loginForm" 
		   style="text-decoration: none; color:#61615b;">로그인</a>&emsp;
		</sec:authorize>
		
		<!-- 권한이 있을 때(회원, 관리자) -->
		<sec:authorize access="isAuthenticated()">   
		<span>${member.username}님 환영합니다.&emsp;</span>
		<a href="/market/member/logout" 
		   style="text-decoration: none; color:#61615b;">로그아웃</a>&emsp;
		<a href="/market/member/certifyForm" 
		   style="text-decoration: none; color:#61615b;">내 계정 관리</a>&emsp;&emsp;&emsp;
		<a href="#" 
		   style="text-decoration: none; color:#61615b;">알림 ▼</a>&emsp;&emsp;&emsp;
		</sec:authorize>

		<!-- 관리자 -->
		<sec:authorize access="hasRole('ROLE_ADMIN')"> 
		<a href="/market/admin/adminIndex" 
		   style="text-decoration: none; color:#61615b;">관리자 페이지</a>
		</sec:authorize>
		
	</div><!-- login-box -->

</div><!-- login-btn -->
