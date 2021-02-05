<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>  

<link rel="stylesheet" type = "text/css" href="/market/css/member/loginModal.css?ver=3">
<link rel="stylesheet" type = "text/css" href="/market/css/member/member.css?ver=9">
<!-- <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery-modal/0.9.1/jquery.modal.min.css" /> -->

<script type="text/javascript" src="//developers.kakao.com/sdk/js/kakao.min.js"></script>
<script type="text/javascript" src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
<script type="text/javascript" src="/market/js/member/login.js?ver=4"></script>
<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.0.0/jquery.min.js"></script> -->
<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-modal/0.9.1/jquery.modal.min.js"></script> -->

<div class="login-btn">

<div id = "loginModalHidden">
	<jsp:include page="../member/loginForm.jsp"/>
</div>
    <!-- 우측정렬을 위한 공백 -->
	<div class="login-box"></div>

	<div class="login-box">
	
<!-- 상단 회원 -->
<c:if test="${memId == null}">   
<a href="/market/member/joinForm" 
   style="text-decoration: none; color:#61615b;">회원가입</a>&emsp;
<a href="#" id="goLoginBtn"
   style="text-decoration: none; color:#61615b;">로그인</a>&emsp;&emsp;&emsp;
</c:if>
<c:if test="${memId != null}">      
<span>${memId}님 환영합니다.&emsp;</span>
<a href="/market/member/logout" 
   style="text-decoration: none; color:#61615b;">로그아웃</a>&emsp;
<a href="/market/member/certifyForm" 
   style="text-decoration: none; color:#61615b;">내 계정 관리</a>&emsp;&emsp;&emsp;

  
<a href="#" 
   style="text-decoration: none; color:#61615b;">알림 ▼</a>&emsp;&emsp;&emsp;
</c:if>


</div>
</div>
 



