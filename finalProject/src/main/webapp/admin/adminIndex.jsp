<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="sec" %>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    <meta name="description" content="" />
    <meta name="author" content="" />
    <title>관리자 페이지</title>
    <link href="/market/admin/css/styles.css" rel="stylesheet" />
    <link href="https://cdn.datatables.net/1.10.20/css/dataTables.bootstrap4.min.css" rel="stylesheet" crossorigin="anonymous" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/js/all.min.js" crossorigin="anonymous"></script>
	
	<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.min.js" crossorigin="anonymous"></script>
    <script src="https://cdn.datatables.net/1.10.20/js/jquery.dataTables.min.js" crossorigin="anonymous"></script>
    <script src="https://cdn.datatables.net/1.10.20/js/dataTables.bootstrap4.min.js" crossorigin="anonymous"></script>
    <script src="/market/admin/js/scripts.js"></script>
</head>


<body class="sb-nav-fixed">
<sec:authentication property="principal" var="member"/> <!-- 사용자 정보 가져오기 -->
<!-- 메인 시큐리티 로그인 중인 아이디 -->
<input type="hidden" class="loginId" value="${member.username}">

   <nav class="sb-topnav navbar navbar-expand navbar-dark bg-dark">
       <jsp:include page="adminHead.jsp" />
		
    </nav>
    
    <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
            <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                <div class="sb-sidenav-menu">
                    <div class="nav">
                       <jsp:include page="adminNav.jsp" />
                    </div>
                </div>
            </nav>
        </div>
        
        
<!--  ======================================================= -->     
<!--  ======================================================= -->
		<div id="layoutSidenav_content">
            <main>
		
		<div id="section">
		<c:if test="${not empty display }">
			<jsp:include page="${display }" />
		</c:if>
		<c:if test="${empty display }">
			<div class="container-fluid">
			<h1 class="mt-4">관리자 로그인</h1>
            <ol class="breadcrumb mb-4">
               <li class="breadcrumb-item active">관리자 님 환영합니다.</li>
            </ol>
            </div>
		</c:if>
		</div>
        </main>
            
<!--  ======================================================= -->     
<!--  ======================================================= --> 
      
            <!-- footer -->
<footer class="py-4 bg-light mt-auto">
                <div class="container-fluid">
                    <div class="d-flex align-items-center justify-content-between small">
                        <div class="text-muted">Copyright &copy; Your Website 2020</div>
                        <div>
                            <a href="#">Privacy Policy</a>
                            &middot;
                            <a href="#">Terms &amp; Conditions</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    </div>
    
    
    
</body>
</html>
